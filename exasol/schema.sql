-- CIRCE: Exasol Unified Schema
--
-- Schema for Circe on Exasol Personal / Nano:
-- 1. CIRCE_AUDIT_LOG: Compliance and investigator audit trail
-- 2. ENTITIES: Platform entity registry
-- 3. INVOICES: Raw transaction ledger
-- 4. GROUND_TRUTH_RINGS: Benchmark ground-truth injected rings
-- 5. CANDIDATE_RINGS: Candidate cycle rings
-- 6. RING_HOPS: Individual hops per candidate ring (invoices & corporate bridges)
-- 7. SCORED_RINGS: Multi-factor scored rings
-- 8. RING_EVIDENCE: Forensic evidence strings per scored ring

CREATE SCHEMA IF NOT EXISTS STARTER_KIT;

CREATE TABLE IF NOT EXISTS STARTER_KIT.CIRCE_AUDIT_LOG (
  ID                   DECIMAL(18,0) IDENTITY PRIMARY KEY,
  RING_ID              VARCHAR(20)   NOT NULL,
  ACTION_TYPE          VARCHAR(30)   NOT NULL,   -- flagged | escalated | override_documented
  ACTOR                VARCHAR(120)  NOT NULL,
  ACTOR_ROLE           VARCHAR(60),
  NOTE                 VARCHAR(2000),             -- required by the API when ACTION_TYPE = override_documented
  AGGREGATE_AT_TIME    DECIMAL(4,3),               -- snapshot of the ring's aggregate score at the moment of action
  CLOSURE_TYPE_AT_TIME VARCHAR(20),
  CREATED_AT           TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS STARTER_KIT.ENTITIES (
  ID                VARCHAR(20)   PRIMARY KEY,
  NAME              VARCHAR(255)  NOT NULL,
  INDUSTRY_CODE     VARCHAR(30)   NOT NULL,
  INDUSTRY_CLASS    VARCHAR(30)   NOT NULL,
  DIRECTORS         VARCHAR(2000) NOT NULL,       -- JSON array of director DIN strings
  ADDRESS           VARCHAR(1000) NOT NULL,
  REGISTRATION_DATE DATE          NOT NULL
);

CREATE TABLE IF NOT EXISTS STARTER_KIT.INVOICES (
  INVOICE_ID        VARCHAR(20)   PRIMARY KEY,
  FROM_ENTITY       VARCHAR(20)   NOT NULL,
  TO_ENTITY         VARCHAR(20)   NOT NULL,
  VALUE             DECIMAL(18,0) NOT NULL,
  HS_CODE           VARCHAR(10),
  INVOICE_DATE      DATE          NOT NULL,
  DISCOUNTING_DATE  DATE          NOT NULL
);

CREATE TABLE IF NOT EXISTS STARTER_KIT.GROUND_TRUTH_RINGS (
  TRUTH_ID          VARCHAR(20)   PRIMARY KEY,
  ENTITIES          VARCHAR(2000) NOT NULL,       -- JSON array of entity IDs
  HIDDEN_LEGS       VARCHAR(4000) NOT NULL        -- JSON array of hidden leg invoice specs
);

CREATE TABLE IF NOT EXISTS STARTER_KIT.CANDIDATE_RINGS (
  RING_ID           VARCHAR(20)   PRIMARY KEY,
  CANONICAL_KEY     VARCHAR(500)  NOT NULL,
  CLOSURE_TYPE      VARCHAR(20)   NOT NULL,       -- transaction | corporate
  ENTITIES          VARCHAR(2000) NOT NULL        -- JSON array of entity IDs
);

CREATE TABLE IF NOT EXISTS STARTER_KIT.RING_ENTITIES (
  RING_ID           VARCHAR(20)   NOT NULL,
  ENTITY_ID         VARCHAR(20)   NOT NULL,
  PRIMARY KEY (RING_ID, ENTITY_ID)
);

CREATE TABLE IF NOT EXISTS STARTER_KIT.RING_HOPS (
  RING_ID           VARCHAR(20)   NOT NULL,
  HOP_INDEX         DECIMAL(3,0)  NOT NULL,
  HOP_TYPE          VARCHAR(30)   NOT NULL,       -- invoice | corporate_bridge
  FROM_ENTITY       VARCHAR(20)   NOT NULL,
  TO_ENTITY         VARCHAR(20)   NOT NULL,
  INVOICE_ID        VARCHAR(20),
  VALUE             DECIMAL(18,0),
  HS_CODE           VARCHAR(10),
  INVOICE_DATE      DATE,
  DISCOUNTING_DATE  DATE,
  BRIDGE_KIND       VARCHAR(50),                  -- shared_director | shared_address | registration_cohort
  BRIDGE_EVIDENCE   VARCHAR(2000),                -- JSON string of bridge evidence
  PRIMARY KEY (RING_ID, HOP_INDEX)
);

CREATE TABLE IF NOT EXISTS STARTER_KIT.SCORED_RINGS (
  RING_ID           VARCHAR(20)   PRIMARY KEY,
  CANONICAL_KEY     VARCHAR(500)  NOT NULL,
  CLOSURE_TYPE      VARCHAR(20)   NOT NULL,
  ENTITIES          VARCHAR(2000) NOT NULL,
  SCORE_VALUE       DECIMAL(4,3),
  SCORE_PRODUCT     DECIMAL(4,3),
  SCORE_TIMING      DECIMAL(4,3),
  SCORE_EXTERNALITY DECIMAL(4,3),
  ABSTAINED         VARCHAR(255)  NOT NULL,       -- JSON array of abstained signal names
  AGGREGATE_SCORE   DECIMAL(4,3)  NOT NULL,
  EXPECTED_LOSS     DECIMAL(18,0) NOT NULL
);

CREATE TABLE IF NOT EXISTS STARTER_KIT.RING_EVIDENCE (
  RING_ID              VARCHAR(20)   PRIMARY KEY,
  EVIDENCE_VALUE       VARCHAR(2000) NOT NULL,
  EVIDENCE_PRODUCT     VARCHAR(2000) NOT NULL,
  EVIDENCE_TIMING      VARCHAR(2000) NOT NULL,
  EVIDENCE_EXTERNALITY VARCHAR(2000) NOT NULL,
  EVIDENCE_INDUSTRY    VARCHAR(2000) NOT NULL
);
