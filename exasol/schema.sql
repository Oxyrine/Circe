-- CIRCE audit trail — Exasol schema
--
-- Local-dev-only. Run once against a Exasol Personal Local Starter Kit
-- instance (exakit) before using the /api/audit endpoint in server.py.
-- See exasol/README.md for the full setup path.

CREATE TABLE STARTER_KIT.CIRCE_AUDIT_LOG (
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

-- Note: ACTION is a reserved keyword in Exasol, hence ACTION_TYPE.
