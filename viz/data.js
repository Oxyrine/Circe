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
const BACKDROP = {
  "nodes": [
    {
      "id": "E001",
      "industry_class": "distribution"
    },
    {
      "id": "E002",
      "industry_class": "trading"
    },
    {
      "id": "E003",
      "industry_class": "distribution"
    },
    {
      "id": "E004",
      "industry_class": "manufacturing"
    },
    {
      "id": "E005",
      "industry_class": "distribution"
    },
    {
      "id": "E006",
      "industry_class": "manufacturing"
    },
    {
      "id": "E007",
      "industry_class": "trading"
    },
    {
      "id": "E008",
      "industry_class": "trading"
    },
    {
      "id": "E009",
      "industry_class": "services"
    },
    {
      "id": "E010",
      "industry_class": "trading"
    },
    {
      "id": "E011",
      "industry_class": "manufacturing"
    },
    {
      "id": "E012",
      "industry_class": "distribution"
    },
    {
      "id": "E013",
      "industry_class": "manufacturing"
    },
    {
      "id": "E014",
      "industry_class": "manufacturing"
    },
    {
      "id": "E015",
      "industry_class": "manufacturing"
    },
    {
      "id": "E016",
      "industry_class": "manufacturing"
    },
    {
      "id": "E017",
      "industry_class": "services"
    },
    {
      "id": "E018",
      "industry_class": "manufacturing"
    },
    {
      "id": "E019",
      "industry_class": "trading"
    },
    {
      "id": "E020",
      "industry_class": "distribution"
    },
    {
      "id": "E021",
      "industry_class": "manufacturing"
    },
    {
      "id": "E022",
      "industry_class": "manufacturing"
    },
    {
      "id": "E023",
      "industry_class": "services"
    },
    {
      "id": "E024",
      "industry_class": "manufacturing"
    },
    {
      "id": "E025",
      "industry_class": "distribution"
    },
    {
      "id": "E026",
      "industry_class": "manufacturing"
    },
    {
      "id": "E027",
      "industry_class": "distribution"
    },
    {
      "id": "E028",
      "industry_class": "trading"
    },
    {
      "id": "E029",
      "industry_class": "distribution"
    },
    {
      "id": "E030",
      "industry_class": "trading"
    },
    {
      "id": "E031",
      "industry_class": "trading"
    },
    {
      "id": "E032",
      "industry_class": "distribution"
    }
  ],
  "edges": [
    {
      "from": "E032",
      "to": "E009"
    },
    {
      "from": "E022",
      "to": "E023"
    },
    {
      "from": "E001",
      "to": "E023"
    },
    {
      "from": "E010",
      "to": "E001"
    },
    {
      "from": "E016",
      "to": "E025"
    },
    {
      "from": "E016",
      "to": "E011"
    },
    {
      "from": "E018",
      "to": "E007"
    },
    {
      "from": "E030",
      "to": "E012"
    },
    {
      "from": "E018",
      "to": "E014"
    },
    {
      "from": "E002",
      "to": "E014"
    },
    {
      "from": "E028",
      "to": "E025"
    },
    {
      "from": "E013",
      "to": "E030"
    },
    {
      "from": "E024",
      "to": "E025"
    },
    {
      "from": "E020",
      "to": "E015"
    },
    {
      "from": "E027",
      "to": "E016"
    },
    {
      "from": "E001",
      "to": "E010"
    },
    {
      "from": "E029",
      "to": "E021"
    },
    {
      "from": "E019",
      "to": "E025"
    },
    {
      "from": "E013",
      "to": "E002"
    },
    {
      "from": "E013",
      "to": "E027"
    },
    {
      "from": "E007",
      "to": "E008"
    },
    {
      "from": "E016",
      "to": "E006"
    },
    {
      "from": "E021",
      "to": "E018"
    },
    {
      "from": "E031",
      "to": "E012"
    },
    {
      "from": "E018",
      "to": "E020"
    },
    {
      "from": "E009",
      "to": "E016"
    },
    {
      "from": "E022",
      "to": "E027"
    },
    {
      "from": "E002",
      "to": "E031"
    },
    {
      "from": "E025",
      "to": "E029"
    },
    {
      "from": "E032",
      "to": "E017"
    },
    {
      "from": "E026",
      "to": "E029"
    },
    {
      "from": "E002",
      "to": "E016"
    },
    {
      "from": "E025",
      "to": "E031"
    },
    {
      "from": "E017",
      "to": "E029"
    },
    {
      "from": "E005",
      "to": "E001"
    },
    {
      "from": "E010",
      "to": "E018"
    },
    {
      "from": "E024",
      "to": "E007"
    },
    {
      "from": "E020",
      "to": "E030"
    },
    {
      "from": "E016",
      "to": "E019"
    },
    {
      "from": "E028",
      "to": "E009"
    },
    {
      "from": "E007",
      "to": "E025"
    },
    {
      "from": "E031",
      "to": "E020"
    },
    {
      "from": "E016",
      "to": "E023"
    },
    {
      "from": "E029",
      "to": "E003"
    },
    {
      "from": "E024",
      "to": "E032"
    },
    {
      "from": "E030",
      "to": "E020"
    },
    {
      "from": "E012",
      "to": "E023"
    },
    {
      "from": "E019",
      "to": "E031"
    },
    {
      "from": "E001",
      "to": "E011"
    },
    {
      "from": "E009",
      "to": "E029"
    },
    {
      "from": "E031",
      "to": "E005"
    },
    {
      "from": "E026",
      "to": "E001"
    },
    {
      "from": "E016",
      "to": "E030"
    },
    {
      "from": "E020",
      "to": "E029"
    },
    {
      "from": "E012",
      "to": "E008"
    },
    {
      "from": "E015",
      "to": "E019"
    },
    {
      "from": "E013",
      "to": "E032"
    },
    {
      "from": "E004",
      "to": "E019"
    },
    {
      "from": "E020",
      "to": "E014"
    },
    {
      "from": "E003",
      "to": "E027"
    },
    {
      "from": "E002",
      "to": "E030"
    },
    {
      "from": "E018",
      "to": "E030"
    },
    {
      "from": "E022",
      "to": "E007"
    },
    {
      "from": "E003",
      "to": "E028"
    },
    {
      "from": "E004",
      "to": "E008"
    },
    {
      "from": "E016",
      "to": "E020"
    },
    {
      "from": "E008",
      "to": "E003"
    },
    {
      "from": "E027",
      "to": "E032"
    },
    {
      "from": "E009",
      "to": "E023"
    },
    {
      "from": "E019",
      "to": "E023"
    },
    {
      "from": "E031",
      "to": "E032"
    },
    {
      "from": "E025",
      "to": "E017"
    },
    {
      "from": "E007",
      "to": "E029"
    },
    {
      "from": "E005",
      "to": "E019"
    },
    {
      "from": "E022",
      "to": "E021"
    },
    {
      "from": "E005",
      "to": "E023"
    },
    {
      "from": "E007",
      "to": "E020"
    },
    {
      "from": "E024",
      "to": "E012"
    },
    {
      "from": "E006",
      "to": "E027"
    },
    {
      "from": "E030",
      "to": "E017"
    },
    {
      "from": "E005",
      "to": "E028"
    },
    {
      "from": "E020",
      "to": "E017"
    },
    {
      "from": "E019",
      "to": "E008"
    },
    {
      "from": "E004",
      "to": "E021"
    },
    {
      "from": "E015",
      "to": "E020"
    },
    {
      "from": "E003",
      "to": "E008"
    },
    {
      "from": "E013",
      "to": "E028"
    },
    {
      "from": "E031",
      "to": "E008"
    },
    {
      "from": "E015",
      "to": "E026"
    },
    {
      "from": "E026",
      "to": "E007"
    },
    {
      "from": "E024",
      "to": "E010"
    },
    {
      "from": "E015",
      "to": "E029"
    },
    {
      "from": "E003",
      "to": "E031"
    },
    {
      "from": "E030",
      "to": "E032"
    },
    {
      "from": "E032",
      "to": "E014"
    },
    {
      "from": "E002",
      "to": "E015"
    },
    {
      "from": "E014",
      "to": "E012"
    },
    {
      "from": "E009",
      "to": "E008"
    },
    {
      "from": "E023",
      "to": "E012"
    },
    {
      "from": "E027",
      "to": "E007"
    },
    {
      "from": "E007",
      "to": "E012"
    },
    {
      "from": "E002",
      "to": "E018"
    },
    {
      "from": "E005",
      "to": "E027"
    },
    {
      "from": "E021",
      "to": "E019"
    },
    {
      "from": "E006",
      "to": "E011"
    },
    {
      "from": "E004",
      "to": "E032"
    },
    {
      "from": "E028",
      "to": "E030"
    },
    {
      "from": "E014",
      "to": "E031"
    },
    {
      "from": "E008",
      "to": "E028"
    },
    {
      "from": "E018",
      "to": "E019"
    },
    {
      "from": "E010",
      "to": "E027"
    },
    {
      "from": "E025",
      "to": "E028"
    },
    {
      "from": "E006",
      "to": "E013"
    },
    {
      "from": "E029",
      "to": "E018"
    },
    {
      "from": "E023",
      "to": "E019"
    },
    {
      "from": "E026",
      "to": "E004"
    },
    {
      "from": "E019",
      "to": "E001"
    },
    {
      "from": "E015",
      "to": "E025"
    },
    {
      "from": "E030",
      "to": "E031"
    },
    {
      "from": "E019",
      "to": "E004"
    },
    {
      "from": "E028",
      "to": "E007"
    },
    {
      "from": "E020",
      "to": "E013"
    },
    {
      "from": "E008",
      "to": "E012"
    },
    {
      "from": "E010",
      "to": "E005"
    },
    {
      "from": "E021",
      "to": "E007"
    },
    {
      "from": "E004",
      "to": "E007"
    },
    {
      "from": "E019",
      "to": "E006"
    },
    {
      "from": "E029",
      "to": "E012"
    },
    {
      "from": "E029",
      "to": "E017"
    },
    {
      "from": "E029",
      "to": "E005"
    },
    {
      "from": "E019",
      "to": "E007"
    },
    {
      "from": "E007",
      "to": "E003"
    },
    {
      "from": "E003",
      "to": "E022"
    },
    {
      "from": "E022",
      "to": "E005"
    },
    {
      "from": "E017",
      "to": "E031"
    },
    {
      "from": "E031",
      "to": "E014"
    },
    {
      "from": "E014",
      "to": "E006"
    },
    {
      "from": "E009",
      "to": "E002"
    },
    {
      "from": "E002",
      "to": "E010"
    },
    {
      "from": "E023",
      "to": "E009"
    },
    {
      "from": "E027",
      "to": "E012"
    },
    {
      "from": "E012",
      "to": "E006"
    },
    {
      "from": "E006",
      "to": "E024"
    },
    {
      "from": "E023",
      "to": "E018"
    },
    {
      "from": "E018",
      "to": "E011"
    },
    {
      "from": "E011",
      "to": "E027"
    },
    {
      "from": "E027",
      "to": "E021"
    },
    {
      "from": "E021",
      "to": "E006"
    },
    {
      "from": "E006",
      "to": "E025"
    },
    {
      "from": "E025",
      "to": "E023"
    },
    {
      "from": "E024",
      "to": "E018"
    },
    {
      "from": "E018",
      "to": "E006"
    },
    {
      "from": "E006",
      "to": "E028"
    }
  ]
};
