# Circe: Financial Ring Intelligence

**Submission for the Exasol AI + Data Challenge 2026**
* Primary Track: **Predict, Detect & Optimize** (Fraud & Anomaly Detection)
* Secondary Alignment: **AI Trust, Safety & Governance** (Observability, Compliance Audit Trails, and Calibrated Refusal)

Automated detection and discrimination of circular trading fraud on trade receivables and invoice discounting platforms (TReDS), powered by Exasol Personal / Nano as the high-performance system of record and in-database analytical compute surface.

---

## Overview

Circular trading is a systemic financial fraud mechanism where a syndicate of affiliated entities issues circular chains of fabricated invoices ($E_1 \rightarrow E_2 \rightarrow \dots \rightarrow E_k \rightarrow E_1$). The objectives include artificial turnover inflation, fraudulent Input Tax Credit (ITC) extraction, and the repeated discounting of non-existent trade receivables across multiple financing institutions.

Circe resolves two fundamental operational challenges in financial network surveillance:

1. **The Hairball Problem**: Legitimate supply chains naturally exhibit cyclic commerce (e.g., raw material suppliers, component manufacturers, assemblers, and logistics distributors). Topologically identifying a cycle is insufficient; the system must rigorously distinguish genuine economic loops from circular fraud.
2. **The Missing Leg Problem**: Sophisticated fraud syndicates deliberately avoid closing the circular invoice chain on-ledger, utilizing off-platform cash settlements or informal arrangements for the terminal leg ($E_k \dots E_1$). Circe bridges unclosed invoice paths by extracting cross-entity corporate metadata (shared directors, registered office addresses, and incorporation dates) to uncover the hidden loop.

---

## System Architecture

Circe operates as a modular, schema-enforced pipeline structured into four decoupled layers, with Exasol Personal serving as the central analytical backbone:

```
+-----------------------------------------------------------------------------+
|                     1. EXASOL DATA PLATFORM & SYSTEM OF RECORD              |
|  - Relational Schema: ENTITIES, INVOICES, GROUND_TRUTH, CANDIDATE_RINGS     |
|  - SCORED_RINGS, RING_HOPS, RING_EVIDENCE, CIRCE_AUDIT_LOG                  |
|  - Fast Bulk Load (pyexasol) and Exact Frozen JSON Wire Protocol Export     |
+-----------------------------------------------------------------------------+
                                       |
                                       v
+-----------------------------------------------------------------------------+
|                                2. GRAPH LAYER                               |
|  - Entity Canonicalization (Name & Address Normalization)                   |
|  - Iterative Tarjan Strongly Connected Components (SCC) Partitioning        |
|  - Depth-Limited DFS with Canonical-Start Pruning (Simple Cycles)           |
|  - Pairwise Corporate-Graph Closure (Director, Address, Registration Dates) |
+-----------------------------------------------------------------------------+
                                       |
                                       v
+-----------------------------------------------------------------------------+
|                     3. IN-DATABASE ANALYTICAL SCORING LAYER                 |
|  - In-Database Columnar Execution: S_externality Aggregated In-Place in SQL |
|  - 4 Pure Multi-Factor Signals (Flow, HS Product, Timing, Externality)      |
|  - Calibrated Signal Abstention (Missing Data Handled Without Noise)        |
|  - Mathematical Parity Proof Between In-DB Exasol and Reference Engine      |
+-----------------------------------------------------------------------------+
                                       |
                                       v
+-----------------------------------------------------------------------------+
|                4. INVESTIGATOR CONSOLE & AI GOVERNANCE LAYER                |
|  - Counsel Design System UI (Dark Palette, Tabular Financial Typography)    |
|  - 4-Stage Guided Workflow: Review -> Visualise -> Investigate -> Verify    |
|  - AI Evidence Explainer: "Our Model Decides, Our LLM Explains"             |
|  - Dual-Stack Local Server & Exasol-Backed Live Rescoring (/api/rescore)    |
+-----------------------------------------------------------------------------+
```

---

## Core Modules and Capabilities

### 1. Exasol as System of Record and In-Database Compute (`exasol/`)

* **Comprehensive Schema (`exasol/schema.sql`)**: Manages the complete platform lifecycle including `ENTITIES`, `INVOICES`, `CANDIDATE_RINGS`, `RING_HOPS`, `SCORED_RINGS`, and `CIRCE_AUDIT_LOG`.
* **In-Database Scoring (`exasol/scoring.py`)**: Rather than extracting the entire transaction ledger into Python memory, heavy analytical signals like $S_{\text{externality}}$ run directly inside Exasol via columnar SQL aggregation, evaluating internal ring volume against total platform exposure.
* **Mathematical Parity (`exasol/parity.py`)**: Rigorous verification suite asserting that Exasol in-database scoring produces results identical to the reference Python engine across all candidate rings.
* **Offline Backup Invariant**: Adheres strictly to the specification requirement that `demo/index.html` functions with zero server or database dependencies, treating `demo/data.js` as an export artifact of Exasol.

### 2. Graph Topology and Corporate Closure (`graph/`)

* **Strongly Connected Component (SCC) Decomposition (`graph/scc.py`)**: Uses an iterative implementation of Tarjan's algorithm to partition the global platform graph into disjoint SCCs in linear time $O(V + E)$.
* **Depth-Limited Cycle Search (`graph/cycles.py`)**: Traverses SCCs using a depth-bounded DFS with canonical-start vertex ordering, ensuring each simple cycle is enumerated exactly once with deterministic execution budgets.
* **Corporate-Graph Closure (`graph/corporate.py`)**: Bridges unclosed invoice chains ($E_1 \rightarrow \dots \rightarrow E_k$) by evaluating pairwise corporate affinity (shared DINs, registered addresses, incorporation dates) to uncover the hidden closing leg.
* **Entity Canonicalization (`graph/canonicalize.py`)**: Resolves entity aliasing by blocking on strict normalized `(name, address)` tuples.

### 3. Multi-Factor Fraud Discrimination Engine (`scoring/`)

Each candidate ring is evaluated across orthogonal financial, physical, and corporate dimensions:

| Signal | Identifier | Mathematical / Logical Basis |
|---|---|---|
| Flow Conservation | `s_value` | Variance of invoice amounts across consecutive hops; fabricated loops exhibit near-identical nominal values ($S_{\text{flow}} \approx 1.0$). |
| Product Continuity | `s_product` | Harmonized System (HS) commodity code progression; tracks raw material $\rightarrow$ intermediate $\rightarrow$ finished goods transitions vs. identical commodity round-tripping. |
| Economic Isolation | `s_externality` | Ratio of internal ring invoice volume to total platform trade of member entities; shell networks operate with near-zero outside trade. Aggregated in-database in Exasol. |
| Timing Anomalies | `s_timing` | Velocity and temporal sequencing of invoices; flags ultra-short round-trip durations or out-of-order financing requests. |

**Signal Abstention Protocol**: When input records lack non-mandatory metadata, signals explicitly enter an `ABSTAINED` state rather than assigning an artificial zero, preserving aggregate score integrity.

**Expected Loss Formulation**:
$$\text{Expected Loss} = \text{Aggregate Risk Score} \times \text{Gross Platform Exposure}$$

### 4. AI Evidence Explainer and Governance (`ai/`)

* **Governance Principle**: *"Our model decides, our LLM explains."* The LLM never enters the fraud decision path.
* **Evidence Synthesis (`ai/provider.py`)**: Accepts deterministic mathematical scores and corporate metadata and synthesizes a formal financial intelligence memo.
* **Graceful Degradation**: Operates via Gemini REST API using standard libraries; if no API key is present, the system cleanly returns a structured, deterministic explanation without crashing.
* **Observability Log**: Every AI narrative generated is recorded in Exasol's `CIRCE_AUDIT_LOG`.

---

## Repository Structure

```
.
├── .github/
│   ├── CODEOWNERS               # Track ownership specifications
│   └── workflows/ci.yml         # Continuous integration test runner and freshness checks
├── ai/                          # AI governance and narrative generation
│   ├── provider.py              # LLM client with zero-dependency REST integration
│   └── tests/                   # Narrative test suite
├── api/
│   ├── health.py                # Vercel serverless health endpoint (/api/health)
│   └── rescore.py               # Vercel serverless dynamic rescoring engine (/api/rescore)
├── artifacts/
│   ├── candidate_rings.json     # Graph engine candidate output
│   ├── exasol_benchmark.json    # Measured performance benchmark artifact
│   └── scored_rings.json        # Ranked, scored ring dataset
├── contract/                    # Frozen JSON Schema contracts and validation tools
│   ├── candidate_ring.schema.json
│   ├── entity.schema.json
│   ├── ground_truth.schema.json
│   ├── invoice.schema.json
│   ├── scored_ring.schema.json
│   └── validate.py
├── data/                        # Economy generation and synthetic fraud injectors
│   ├── generator/               # Sector trade matrices, shell generator, fraud injector
│   ├── entities.json            # Base platform corporate registry
│   ├── ground_truth.json        # Injected fraud ring benchmark identities
│   └── invoices.json            # Platform transaction ledger
├── demo/                        # Production investigator application
│   ├── app.js                   # UI controllers, mutable state store, SVG visualizers
│   ├── build_data.py            # Deterministic data.js compiler
│   ├── constellation.js         # WebGL constellation intro animation
│   ├── data.js                  # Pre-compiled dataset bundle (offline reference demo)
│   ├── index.html               # Main application shell
│   └── styles.css               # Counsel Design System tokens and component rules
├── exasol/                      # Exasol Personal / Nano integration
│   ├── benchmark.py             # Performance benchmark runner
│   ├── connection.py            # Central credential and connection factory
│   ├── load.py                  # Bulk data loader
│   ├── parity.py                # Mathematical parity verification suite
│   ├── README.md                # Exasol setup and execution run guide
│   ├── repository.py            # Schema-compliant query and export layer
│   ├── schema.sql               # Exasol DDL definitions
│   ├── scoring.py               # In-database scoring engine
│   └── tests/                   # Parity verification tests
├── graph/                       # Graph topology, SCC partitioning, DFS, corporate closure
├── pipeline/                    # Unified service layer connecting backend and Exasol
│   └── service.py               # Service handlers for detection and live rescoring
├── scoring/                     # Pure reference 4-factor scoring engine
│   ├── scoring.py
│   └── tests/                   # Comprehensive regression asserts
├── server.py                    # Local dual-stack development server with live Exasol backend
├── vercel.json                  # Production Vercel deployment configuration
└── WIRE_PROTOCOL.md             # Inter-track data exchange contracts and dated amendments
```

---

## Performance Benchmarking

Performance was evaluated on a benchmark dataset of 5,542 candidate rings across the platform transaction graph:

| Execution Engine | Environment | Wall-Clock Duration | Throughput | Parity Status |
|---|---|---|---|---|
| Python Reference Engine | Out-of-Database (Local Process) | 2.1102 s | 2,626.3 rings/sec | Reference Baseline |
| Exasol In-Database Scoring | Exasol Personal / Nano (In-DB SQL) | Sub-second per batch | High-concurrency Columnar | Proven (0 mismatches) |

*Full machine-readable benchmark details are recorded in `artifacts/exasol_benchmark.json`.*

---

## Testing and Verification

Circe maintains a 75-test automated verification suite covering unit logic, graph invariants, cycle search budgets, corporate bridge recovery, schema contracts, and adversarial benchmarks:

```bash
# Run complete test suite
python -m pytest -q

# Validate all data and artifacts against formal JSON schemas
python contract/validate.py data/*.json artifacts/*.json

# Run Exasol parity test (when local Exasol instance is running)
python -m exasol.parity
```

---

## Running the Application

### Local Development with Exasol
```bash
# Launch server with Exasol support and live rescoring
python server.py 8000
```
Open `http://localhost:8000/demo/` in any modern web browser.

### Zero-Server Offline Demo
Simply open `demo/index.html` directly in your browser (`file://`). The application renders the complete, styled investigator experience with full interactivity and no network requests required.

---

## Benchmark Metrics Against Ground Truth

Evaluated against the ground-truth benchmark dataset (`data/ground_truth.json`):

* **Recall**: 100% (6/6 injected fraud rings identified).
* **Corporate-Closed Ring Discovery**: Recovered hidden-leg rings (`T04`, `T06`) at 1.00 Jaccard similarity via pairwise director, address, and registration linkages.
* **Precision@6**: 66.7% (top-ranked candidate is a confirmed fraud syndicate).
* **Mathematical Parity**: 100% agreement between Python reference and Exasol in-database scoring.
* **Determinism**: 100% reproducible across operating systems via canonical coordinate layout algorithms and deterministic ID hashing.

---

## Limitations and Disclosures

* **Data Sourcing**: In accordance with the challenge scope, economic trade transactions and corporate syndicates are generated via synthetic input-output macroeconomic models rather than proprietary bank TReDS feeds.
* **Deployment Target**: Tested against local Exasol Personal / Nano starter kit instances. Cloud deployment to AWS or Azure can be provisioned via the Exasol launcher without code modification.
* **AI Architectural Separation**: LLM narrative generation is intentionally non-decisional; all fraud classification and ranking are performed deterministically by the mathematical scoring engine.

---

## License

Internal research and prototype developed for DevJams'26 and the Exasol AI + Data Challenge 2026. All rights reserved.
