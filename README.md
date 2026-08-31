# Circe: Financial Ring Intelligence

Automated detection and discrimination of circular trading fraud on trade receivables and invoice discounting platforms (TReDS).

---

## Overview

Circular trading is a systemic financial fraud mechanism where a syndicate of affiliated entities issues circular chains of fabricated invoices ($E_1 \rightarrow E_2 \rightarrow \dots \rightarrow E_k \rightarrow E_1$). The objectives include artificial turnover inflation, fraudulent Input Tax Credit (ITC) extraction, and the repeated discounting of non-existent trade receivables across multiple financing institutions.

Circe resolves two fundamental operational challenges in financial network surveillance:

1. **The Hairball Problem**: Legitimate supply chains naturally exhibit cyclic commerce (e.g., raw material suppliers, component manufacturers, assemblers, and logistics distributors). Topologically identifying a cycle is insufficient; the system must rigorously distinguish genuine economic loops from circular fraud.
2. **The Missing Leg Problem**: Sophisticated fraud syndicates deliberately avoid closing the circular invoice chain on-ledger, utilizing off-platform cash settlements or informal arrangements for the terminal leg ($E_k \dots E_1$). Circe bridges unclosed invoice paths by extracting cross-entity corporate metadata (shared directors, registered office addresses, and incorporation dates) to uncover the hidden loop.

---

## System Architecture

Circe operates as a modular, schema-enforced pipeline structured into four distinct layers:

```
+-----------------------------------------------------------------------------+
|                                1. DATA LAYER                                |
|  - Synthetic Economy Generation (Input-Output Matrix & Sector Propensity)   |
|  - Syndicate Injection (Isolated Shells & Adversarial Embedded Rings)       |
|  - Frozen JSON Schema Validation (contract/*.schema.json)                   |
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
|                               3. SCORING LAYER                              |
|  - 8 Orthogonal Multi-Factor Signals (Flow, HS Product, Timing, etc.)       |
|  - Abstained Signal Protocol (Distinguishes Missing Metadata from Zero Risk)|
|  - Composite Aggregate Score & Gross Expected Loss Computation              |
+-----------------------------------------------------------------------------+
                                       |
                                       v
+-----------------------------------------------------------------------------+
|                           4. INVESTIGATOR CONSOLE                           |
|  - Counsel Design System UI (Dark Palette, Tabular Financial Typography)    |
|  - 4-Stage Guided Workflow: Review -> Visualise -> Investigate -> Verify    |
|  - Dual-Stack Local Server & Vercel Serverless Rescoring API (/api/rescore) |
+-----------------------------------------------------------------------------+
```

---

## Core Modules and Capabilities

### 1. Graph Topology and Corporate Closure (`graph/`)

The graph engine constructs directed multigraphs from raw invoice ledgers and identifies candidate fraud topologies:

* **Strongly Connected Component (SCC) Decomposition (`graph/scc.py`)**: Uses an iterative implementation of Tarjan's algorithm to partition the global platform graph into disjoint SCCs, pruning non-cyclic subgraphs in linear time $O(V + E)$.
* **Depth-Limited Cycle Search (`graph/cycles.py`)**: Traverses SCCs using a depth-bounded DFS (default: depth 8) with canonical-start vertex ordering to guarantee that every simple cycle is enumerated exactly once without redundant permutations. Includes hard search-step and cycle-count execution budgets to prevent algorithmic stalls on dense subgraphs.
* **Corporate-Graph Closure (`graph/corporate.py`)**: For unclosed invoice chains ($E_1 \rightarrow \dots \rightarrow E_k$), the engine computes pairwise corporate affinity between $E_k$ and $E_1$. If the terminal entities share a Director Identification Number (DIN), physical address, or registration timestamp, a synthetic `corporate` bridge edge is instantiated, recovering the ring at 1.00 Jaccard similarity.
* **Entity Canonicalization (`graph/canonicalize.py`)**: Resolves entity aliasing by blocking on strict normalized `(name, address)` tuples to prevent synthetic identity fragmentation.

### 2. Multi-Factor Fraud Scoring Engine (`scoring/`)

Each candidate ring is evaluated across eight orthogonal financial, physical, and corporate dimensions:

| Signal | Identifier | Mathematical / Logical Basis |
|---|---|---|
| Flow Conservation | `s_flow` | Variance of invoice amounts across consecutive hops; fabricated loops exhibit near-identical nominal values ($S_{\text{flow}} \approx 1.0$). |
| Product Continuity | `s_product` | Harmonized System (HS) commodity code progression; tracks raw material $\rightarrow$ intermediate $\rightarrow$ finished goods transitions vs. identical commodity round-tripping. |
| Economic Isolation | `s_externality` | Ratio of internal ring invoice volume to total platform trade of member entities; shell networks operate with near-zero outside trade. |
| Timing Anomalies | `s_timing` | Velocity and temporal sequencing of invoices; flags ultra-short round-trip durations or out-of-order financing requests. |
| Corporate Density | `s_corporate` | Pairwise corporate linkage density among ring participants (shared DINs, registered addresses, incorporation dates). |
| Industry Incongruity | `s_industry` | National Industrial Classification (NIC/SIC) compatibility across transacting pairs (e.g., agricultural firm billing software consultancy). |
| Financing Velocity | `s_discounting` | Platform discounting frequency and outstanding exposure relative to net asset capitalization. |
| Amount Uniformity | `s_amount` | Degree of gross transaction value roundness and round-trip capital conservation. |

**Signal Abstention Protocol**: When input records lack non-mandatory metadata (e.g., unassigned HS commodity codes), the corresponding signal explicitly enters an `ABSTAINED` state rather than assigning an artificial $0.0$ or $1.0$, preserving aggregate score integrity.

**Expected Loss Formulation**:
$$\text{Aggregate Risk Score} = \sum_{i=1}^{8} w_i \cdot S_i \quad \text{where } \sum w_i = 1.0$$
$$\text{Expected Loss} = \text{Aggregate Risk Score} \times \text{Gross Platform Exposure}$$

### 3. Investigator Intelligence Console (`demo/` and `console/`)

A browser-based investigative platform designed around the Counsel financial design standard:

* **Review Queue (`01 REVIEW`)**: Displays prioritized rings ranked by expected loss. Features isolated, per-ring vector SVG visualizations with geometric node clearance, directional arrows, and hatched abstention signal bars.
* **Interconnection Topology (`02 VISUALISE`)**: Interactive WebGL and SVG platform map supporting pan, zoom, component filtering, and individual entity trajectory inspection.
* **Entity Directory (`03 INVESTIGATE`)**: Searchable index of all transacting corporations, displaying NIC sectors, total invoice velocity, associated ring counts, and gross platform exposure.
* **Invoice Ledger & Simulation Sandbox (`04 VERIFY`)**: Paginated raw ledger with modal invoice inspectors. Includes an interactive `+ Add Invoice` facility that submits new trade records to `/api/rescore`, dynamically re-executing Tarjan cycle discovery and 8-signal scoring in real time.

---

## Repository Structure

```
.
├── .github/
│   ├── CODEOWNERS               # Strict single-writer track ownership specifications
│   └── workflows/ci.yml         # Continuous integration test runner and artifact validator
├── api/
│   ├── health.py                # Vercel serverless health endpoint (/api/health)
│   └── rescore.py               # Vercel serverless dynamic rescoring engine (/api/rescore)
├── artifacts/
│   ├── candidate_rings.json     # Graph engine candidate output
│   ├── degradation_report.json  # Search budget and edge degradation audit
│   └── scored_rings.json        # Ranked, scored ring dataset
├── console/                     # Static analyst console wireframe
│   ├── app.js
│   ├── data.js
│   ├── index.html
│   └── styles.css
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
│   ├── app.js                   # UI controllers, modal managers, SVG visualizers
│   ├── build_data.py            # Deterministic data.js compiler
│   ├── constellation.js         # WebGL constellation intro animation
│   ├── data.js                  # Pre-compiled dataset bundle
│   ├── index.html               # Main application shell
│   └── styles.css               # Counsel Design System tokens and component rules
├── docs/agents/                 # Internal specifications, domain dictionaries, triage rules
├── graph/                       # Graph topology, SCC partitioning, DFS, corporate closure
│   ├── canonicalize.py          # Entity alias resolution
│   ├── corporate.py             # Corporate bridge detection
│   ├── cycles.py                # Depth-limited cycle search
│   ├── ring_utils.py            # Topological helpers
│   ├── run.py                   # CLI pipeline runner
│   ├── scc.py                   # Iterative Tarjan SCC implementation
│   └── transaction_graph.py     # Multigraph data structures
├── plans/                       # Architecture decision records and remediation blueprints
├── scoring/                     # 8-factor fraud discrimination engine
│   └── scoring.py
├── index.html                   # Root domain entry redirect
├── requirements.txt             # Python dependencies (jsonschema, pytest)
├── server.py                    # Local dual-stack development server with live rescoring
├── vercel.json                  # Vercel deployment configuration with static/serverless routes
└── WIRE_PROTOCOL.md             # Inter-track data exchange contracts and handoff rules
```

---

## Installation and Setup

### Prerequisites

* Python 3.10, 3.11, or 3.12
* Modern web browser with WebGL and ES6 support

### Environment Configuration

1. Clone the repository:
   ```bash
   git clone https://github.com/Oxyrine/Circe.git
   cd Circe
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   # On Linux/macOS:
   source .venv/bin/activate
   # On Windows (PowerShell):
   .\.venv\Scripts\Activate.ps1
   ```

3. Install required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

---

## Running the Pipeline

### 1. Data Generation

Generate the baseline economic trade graph and inject controlled fraud syndicates:
```bash
python -m data.generate --seed 42 --regime A --out data/
```

Validate data integrity against schema contracts:
```bash
python contract/validate.py data/entities.json data/invoices.json data/ground_truth.json
```

### 2. Candidate Ring Detection

Execute Tarjan SCC partitioning, depth-limited DFS, and corporate closure:
```bash
python -m graph.run --entities data/entities.json \
                    --invoices data/invoices.json \
                    --out artifacts/candidate_rings.json \
                    --max-depth 8
```

Validate generated candidate rings:
```bash
python contract/validate.py artifacts/candidate_rings.json
```

### 3. Multi-Factor Scoring

Evaluate all candidate rings across the 8-signal scoring matrix:
```bash
python -m scoring.scoring --candidates artifacts/candidate_rings.json \
                          --invoices data/invoices.json \
                          --entities data/entities.json \
                          --out artifacts/scored_rings.json
```

Validate scored output:
```bash
python contract/validate.py artifacts/scored_rings.json
```

### 4. Compiling UI Data Bundles

Compile the ranked dataset and platform backdrop into the standalone browser bundle:
```bash
python demo/build_data.py --scored artifacts/scored_rings.json \
                         --entities data/entities.json \
                         --invoices data/invoices.json \
                         --out demo/data.js
```

---

## Testing and Verification

The test suite covers unit logic, graph invariants, cycle search budgets, corporate bridge detection, schema contracts, and adversarial fraud detection benchmarks:

Execute all tests:
```bash
python -m pytest -q
```

Run internal scoring checks and adversarial benchmarks:
```bash
python scoring/scoring.py
```

---

## Running the Application

### Local Development Server

Launch the dual-stack development server supporting both static asset serving and the live `/api/rescore` endpoint:
```bash
python server.py 8000
```

Access the interfaces:
* Production Demo: `http://localhost:8000/demo/`
* Analyst Console: `http://localhost:8000/console/`
* Health Check: `http://localhost:8000/api/health`

### Production Deployment (Vercel)

The repository includes a production-ready `vercel.json` and dedicated serverless handlers in `api/`:

* Static assets in `demo/`, `console/`, and `index.html` are deployed directly to Vercel's Edge CDN (`@vercel/static`).
* Python endpoints in `api/health.py` and `api/rescore.py` execute as on-demand Serverless Functions (`@vercel/python`).

Deploy using the Vercel CLI or by connecting the GitHub repository:
```bash
vercel --prod
```

---

## Benchmark Results

Evaluated against the ground-truth benchmark dataset (`data/ground_truth.json`):

* **Recall**: 100% (6/6 injected fraud rings identified).
* **Corporate-Closed Ring Discovery**: Recovered hidden-leg rings (`T04`, `T06`) at 1.00 Jaccard similarity via pairwise director, address, and registration linkages.
* **Precision@6**: 66.7% (top-ranked candidate is a confirmed fraud syndicate).
* **Determinism**: 100% reproducible across operating systems via canonical coordinate layout algorithms and deterministic ID hashing.

---

## License

Internal research and prototype developed for DevJams'26. All rights reserved.
