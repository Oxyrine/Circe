const SCORED = {
  "schema_version": 1,
  "source_dataset": "fixture-h4",
  "count": 2,
  "rings": [
    {
      "ring_id": "R01",
      "canonical_key": "E001|E004|E009|E006|E012|E008",
      "closure_type": "corporate",
      "entities": [
        "E001",
        "E004",
        "E009",
        "E006",
        "E012",
        "E008"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E001",
          "to": "E004",
          "invoice_id": "I0001",
          "value": 100000000,
          "hs_code": "72081000",
          "invoice_date": "2026-03-01",
          "discounting_date": "2026-03-04"
        },
        {
          "hop_type": "invoice",
          "from": "E004",
          "to": "E009",
          "invoice_id": "I0002",
          "value": 101500000,
          "hs_code": "72081000",
          "invoice_date": "2026-03-02",
          "discounting_date": "2026-03-06"
        },
        {
          "hop_type": "invoice",
          "from": "E009",
          "to": "E006",
          "invoice_id": "I0003",
          "value": 99200000,
          "hs_code": "85176200",
          "invoice_date": "2026-03-03",
          "discounting_date": "2026-03-09"
        },
        {
          "hop_type": "invoice",
          "from": "E006",
          "to": "E012",
          "invoice_id": "I0004",
          "value": 100800000,
          "hs_code": "72081000",
          "invoice_date": "2026-03-04",
          "discounting_date": "2026-03-11"
        },
        {
          "hop_type": "invoice",
          "from": "E012",
          "to": "E008",
          "invoice_id": "I0005",
          "value": 99900000,
          "hs_code": "72081000",
          "invoice_date": "2026-03-05",
          "discounting_date": "2026-03-14"
        },
        {
          "hop_type": "corporate_bridge",
          "from": "E008",
          "to": "E001",
          "bridge_kind": "shared_director",
          "bridge_evidence": {
            "director_id": "D7",
            "director_name": "Arjun Verma"
          }
        }
      ],
      "scores": {
        "value": 0.93,
        "product": 0.58,
        "timing": 0.9,
        "externality": 0.77
      },
      "abstained": [],
      "aggregate": 0.79,
      "expected_loss": 396100000,
      "evidence": {
        "value": "Nets to within 2% across 5 invoice hops \u2014 \u20b910.0cr in, \u20b99.99cr out, no margin anywhere",
        "product": "HS code jumps from 72081000 (steel) to 85176200 (electronics) mid-chain with no processing step between \u2014 inconsistent with any single supply chain",
        "timing": "All 5 invoices dated within 5 days of each other, gaps of 1/1/1/1 days",
        "externality": "77% of these six firms' platform volume is with each other",
        "industry": "E008 (Ashoka Ferro Trading) shares both its registered director and its registered address with E001 (Vertex Steel Trading), and was incorporated 3 months before this chain of invoices began"
      }
    },
    {
      "ring_id": "R02",
      "canonical_key": "E005|E010|E013",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E010",
        "E013"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E005",
          "to": "E010",
          "invoice_id": "I0006",
          "value": 45000000,
          "hs_code": "39012000",
          "invoice_date": "2026-01-15",
          "discounting_date": "2026-02-20"
        },
        {
          "hop_type": "invoice",
          "from": "E010",
          "to": "E013",
          "invoice_id": "I0007",
          "value": 52000000,
          "hs_code": "39012000",
          "invoice_date": "2026-02-10",
          "discounting_date": "2026-03-05"
        },
        {
          "hop_type": "invoice",
          "from": "E013",
          "to": "E005",
          "invoice_id": "I0008",
          "value": 61000000,
          "hs_code": "10063000",
          "invoice_date": "2026-03-20",
          "discounting_date": "2026-04-25"
        }
      ],
      "scores": {
        "value": 0.12,
        "product": 0.08,
        "timing": 0.15,
        "externality": 0.22
      },
      "abstained": [],
      "aggregate": 0.13,
      "expected_loss": 20500000,
      "evidence": {
        "value": "Values step up 45\u219252\u219261 (\u20b94.5cr\u2192\u20b95.2cr\u2192\u20b96.1cr), consistent with normal trade margins of 12-17% per hop, not a round trip",
        "product": "39012000 (raw polymer) \u2192 39012000 (processed polymer) \u2192 10063000 (agro input) \u2014 each hop reflects a plausible transformation, not a bare re-invoice",
        "timing": "Invoices spread across 64 days (Jan 15 \u2192 Mar 20), no clustering",
        "externality": "22% of these three firms' platform volume is with each other \u2014 the rest is diversified",
        "industry": "No mismatch between declared industry and invoiced goods on any hop"
      }
    }
  ]
};
