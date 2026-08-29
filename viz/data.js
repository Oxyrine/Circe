const SCORED = {
  "schema_version": 1,
  "source_dataset": "entities",
  "count": 2,
  "rings": [
    {
      "ring_id": "R01",
      "canonical_key": "E001|E002|E003",
      "closure_type": "transaction",
      "entities": [
        "E001",
        "E002",
        "E003"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E001",
          "to": "E002",
          "invoice_id": "I0001",
          "value": 100000000,
          "hs_code": "72081000",
          "invoice_date": "2026-03-01",
          "discounting_date": "2026-03-10"
        },
        {
          "hop_type": "invoice",
          "from": "E002",
          "to": "E003",
          "invoice_id": "I0002",
          "value": 102000000,
          "hs_code": "72089000",
          "invoice_date": "2026-03-05",
          "discounting_date": "2026-03-12"
        },
        {
          "hop_type": "invoice",
          "from": "E003",
          "to": "E001",
          "invoice_id": "I0003",
          "value": 99500000,
          "hs_code": "72081000",
          "invoice_date": "2026-03-09",
          "discounting_date": "2026-03-15"
        }
      ],
      "scores": {
        "value": 0.9,
        "product": null,
        "timing": 0.89,
        "externality": 0.0
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.0,
      "expected_loss": 279601,
      "evidence": {
        "value": "Net position score: 0.90",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.89",
        "externality": "Externality score: 0.00",
        "industry": "Flagged cross-industry trades: Entity E002 (NIC-4662) received HS 72081000; Entity E003 (NIC-5210) received HS 72089000; Entity E001 (NIC-5229) received HS 72081000"
      }
    },
    {
      "ring_id": "R02",
      "canonical_key": "E010|E011|E012",
      "closure_type": "corporate",
      "entities": [
        "E010",
        "E011",
        "E012"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E010",
          "to": "E011",
          "invoice_id": "I0010",
          "value": 50000000,
          "hs_code": "27101990",
          "invoice_date": "2026-02-10",
          "discounting_date": "2026-02-18"
        },
        {
          "hop_type": "invoice",
          "from": "E011",
          "to": "E012",
          "invoice_id": "I0011",
          "value": 51500000,
          "hs_code": "27101990",
          "invoice_date": "2026-02-14",
          "discounting_date": "2026-02-20"
        },
        {
          "hop_type": "corporate_bridge",
          "from": "E012",
          "to": "E010",
          "bridge_kind": "shared_director",
          "bridge_evidence": {
            "director_id": "D7",
            "director_name": "R. Menon"
          }
        }
      ],
      "scores": {
        "value": 0.91,
        "product": null,
        "timing": null,
        "externality": 0.0
      },
      "abstained": [
        "product",
        "timing"
      ],
      "aggregate": 0.0,
      "expected_loss": 3055,
      "evidence": {
        "value": "Net position score: 0.91",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Abstained (fewer than 2 gaps or missing dates)",
        "externality": "Externality score: 0.00",
        "industry": "Flagged cross-industry trades: Entity E011 (NIC-1392) received HS 27101990; Entity E012 (NIC-5229) received HS 27101990"
      }
    }
  ]
};
