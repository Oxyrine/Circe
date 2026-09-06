# Exasol AI + Data Challenge 2026: Circe Integration Guide

This guide documents the end-to-end integration of Exasol Personal / Nano as the system of record, in-database analytical scoring compute surface, and compliance audit trail for Circe.

---

## 1. Architecture Overview

In Circe, Exasol is not merely an external logging sink; it serves as:
1. **System of Record**: Stores platform entities (`ENTITIES`), transaction ledgers (`INVOICES`), benchmark syndicates (`GROUND_TRUTH_RINGS`), detected loops (`CANDIDATE_RINGS`, `RING_HOPS`), and multi-factor scores (`SCORED_RINGS`, `RING_EVIDENCE`).
2. **In-Database Compute Engine**: Executes high-throughput analytical scoring (such as $S_{\text{externality}}$, which aggregates ring-internal vs. total trading volume via columnar SQL queries) directly in the database where data resides.
3. **Audit Trail & Governance Log**: Implements an immutable log (`CIRCE_AUDIT_LOG`) capturing investigator triage actions (flagged, escalated, override documented) and AI-generated forensic narratives with snapshots of risk aggregates at action time.
4. **Offline Reference Oracle**: Adheres to the frozen requirement that `demo/index.html` runs with zero database dependencies via `demo/data.js` as an offline snapshot, while seamlessly upgrading to live Exasol capabilities whenever the server is active.

---

## 2. Prerequisites and Local Setup

### 2.1 Starter Kit Installation
Exasol Personal Local Starter Kit runs via Docker.
Clone and start the official starter kit repository:
```bash
git clone https://github.com/exasol-labs/exasol-personal-local-starterkit.git
cd exasol-personal-local-starterkit
./exakit start
```

### 2.2 Python3 Script Language Container (SLC)
To support in-database Python UDF execution, install the Python 3 language container:
```bash
./exakit slc install python3
```
*Note: This operation re-initializes the container.*

### 2.3 Install Python Driver
Install `pyexasol` in your local development environment:
```bash
pip install pyexasol
```

---

## 3. Database Initialization and Bulk Data Ingestion

### 3.1 Schema Migration
Deploy the comprehensive Circe schema:
```bash
# Run schema.sql via exakit CLI or your preferred SQL tool as user 'sys'
# For example:
python -c "from exasol.connection import connect; from exasol.load import init_schema; conn=connect(); init_schema(conn); conn.close(); print('Schema initialized.')"
```

### 3.2 Ingest Platform Datasets and Candidate Rings
Bulk-load entities, invoices, ground truth, candidate rings, and initial scores into Exasol:
```bash
python -m exasol.load --data-dir data/ --artifacts-dir artifacts/
```

### 3.3 Validate Roundtrip Schema Conformance
Verify that data reconstructed from Exasol matches the frozen JSON contracts byte-for-byte:
```bash
python -m exasol.repository --export-dir /tmp/exasol_export/
python contract/validate.py /tmp/exasol_export/*.json
```

---

## 4. In-Database Analytical Scoring & Parity Verification

### 4.1 Execute In-Database Scoring
Run multi-factor scoring inside Exasol, utilizing columnar SQL aggregation for $S_{\text{externality}}$ and updating `SCORED_RINGS`:
```bash
python -m exasol.scoring
```

### 4.2 Verify Mathematical Parity
Execute the parity verification script to prove that in-database Exasol scoring and the reference Python engine produce identical results across all candidate rings:
```bash
python -m exasol.parity
```
Or via the automated test suite:
```bash
pytest exasol/tests/test_parity.py -v
```

---

## 5. Performance Benchmarking

Benchmark out-of-database Python scoring against in-database Exasol analytical compute:
```bash
python -m exasol.benchmark
```
Results are saved to `artifacts/exasol_benchmark.json` and report wall-clock time and throughput (rings per second).

---

## 6. AI Evidence-Narrative Governance Layer

Circe follows the governance principle: **"Our model decides, our LLM explains."**
The LLM never makes the fraud determination; it accepts the deterministic mathematical scores and corporate metadata from Exasol and compiles an institutional compliance memorandum.

1. Optional configuration:
   ```bash
   export GEMINI_API_KEY="your_api_key_here"
   ```
2. If unconfigured, the system gracefully degrades to a deterministic rule-based narrative engine without error.
3. Every narrative generation is logged directly to `STARTER_KIT.CIRCE_AUDIT_LOG` in Exasol.

---

## 7. Running the Application

Launch the local dual-stack development server:
```bash
python server.py 8000
```

Available endpoints:
* `GET  /api/health`: Service health and Exasol connection status
* `POST /api/rescore`: Live invoice injection and re-detection via Exasol
* `GET  /api/audit`: Retrieve ring audit trails from Exasol
* `POST /api/audit`: Persist investigator escalation or override
* `POST /api/ai/narrative`: Generate compliance memo and log to Exasol audit trail
* Web UI: `http://localhost:8000/demo/`
