const SCORED = {
  "schema_version": 1,
  "source_dataset": "entities",
  "count": 50,
  "rings": [
    {
      "ring_id": "R5403",
      "canonical_key": "E050|E051|E052|E053|E054|E055|E056",
      "closure_type": "transaction",
      "entities": [
        "E050",
        "E051",
        "E052",
        "E053",
        "E054",
        "E055",
        "E056"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E050",
          "to": "E051",
          "invoice_id": "I0162",
          "value": 59214275,
          "hs_code": "39012000",
          "invoice_date": "2026-01-06",
          "discounting_date": "2026-01-10"
        },
        {
          "hop_type": "invoice",
          "from": "E051",
          "to": "E052",
          "invoice_id": "I0163",
          "value": 59208112,
          "hs_code": "39012000",
          "invoice_date": "2026-01-10",
          "discounting_date": "2026-01-18"
        },
        {
          "hop_type": "invoice",
          "from": "E052",
          "to": "E053",
          "invoice_id": "I0164",
          "value": 59198769,
          "hs_code": "39012000",
          "invoice_date": "2026-01-11",
          "discounting_date": "2026-01-18"
        },
        {
          "hop_type": "invoice",
          "from": "E053",
          "to": "E054",
          "invoice_id": "I0165",
          "value": 60856405,
          "hs_code": null,
          "invoice_date": "2026-01-13",
          "discounting_date": "2026-01-19"
        },
        {
          "hop_type": "invoice",
          "from": "E054",
          "to": "E055",
          "invoice_id": "I0166",
          "value": 60058052,
          "hs_code": "39012000",
          "invoice_date": "2026-01-17",
          "discounting_date": "2026-01-22"
        },
        {
          "hop_type": "invoice",
          "from": "E055",
          "to": "E056",
          "invoice_id": "I0167",
          "value": 61309081,
          "hs_code": "39012000",
          "invoice_date": "2026-01-21",
          "discounting_date": "2026-01-24"
        },
        {
          "hop_type": "invoice",
          "from": "E056",
          "to": "E050",
          "invoice_id": "I0168",
          "value": 62145979,
          "hs_code": null,
          "invoice_date": "2026-01-25",
          "discounting_date": "2026-01-31"
        }
      ],
      "scores": {
        "value": 0.89,
        "product": null,
        "timing": 0.6,
        "externality": 1.0
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.79,
      "expected_loss": 331441685,
      "evidence": {
        "value": "Net position score: 0.89",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.60",
        "externality": "Externality score: 1.00",
        "industry": "Flagged cross-industry trades: Entity E051 (NIC-4669) received HS 39012000; Entity E052 (NIC-4669) received HS 39012000; Entity E053 (NIC-4620) received HS 39012000; Entity E055 (NIC-5229) received HS 39012000; Entity E056 (NIC-5210) received HS 39012000"
      }
    },
    {
      "ring_id": "R3366",
      "canonical_key": "E005|E023|E019|E008|E028|E030|E020|E029",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E023",
        "E019",
        "E008",
        "E028",
        "E030",
        "E020",
        "E029"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E005",
          "to": "E023",
          "invoice_id": "I0081",
          "value": 98077236,
          "hs_code": "49011000",
          "invoice_date": "2025-11-24",
          "discounting_date": "2025-12-24"
        },
        {
          "hop_type": "invoice",
          "from": "E023",
          "to": "E019",
          "invoice_id": "I0124",
          "value": 113317145,
          "hs_code": null,
          "invoice_date": "2026-01-18",
          "discounting_date": "2026-01-23"
        },
        {
          "hop_type": "invoice",
          "from": "E019",
          "to": "E008",
          "invoice_id": "I0088",
          "value": 114847359,
          "hs_code": "72081000",
          "invoice_date": "2026-02-10",
          "discounting_date": "2026-03-02"
        },
        {
          "hop_type": "invoice",
          "from": "E008",
          "to": "E028",
          "invoice_id": "I0118",
          "value": 118095206,
          "hs_code": "72081000",
          "invoice_date": "2026-03-24",
          "discounting_date": "2026-05-05"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E030",
          "invoice_id": "I0116",
          "value": 104796883,
          "hs_code": "72081000",
          "invoice_date": "2026-01-19",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E020",
          "invoice_id": "I0048",
          "value": 84274070,
          "hs_code": "72081000",
          "invoice_date": "2025-12-20",
          "discounting_date": "2026-01-12"
        },
        {
          "hop_type": "invoice",
          "from": "E020",
          "to": "E029",
          "invoice_id": "I0056",
          "value": 98071917,
          "hs_code": "84571000",
          "invoice_date": "2025-11-16",
          "discounting_date": "2025-12-28"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E005",
          "invoice_id": "I0140",
          "value": 88392555,
          "hs_code": "39012000",
          "invoice_date": "2026-01-12",
          "discounting_date": "2026-02-08"
        }
      ],
      "scores": {
        "value": 0.49,
        "product": null,
        "timing": 0.32,
        "externality": 0.21
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.37,
      "expected_loss": 306544246,
      "evidence": {
        "value": "Net position score: 0.49",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.32",
        "externality": "Externality score: 0.21",
        "industry": "Flagged cross-industry trades: Entity E023 (NIC-7020) received HS 49011000; Entity E008 (NIC-4662) received HS 72081000; Entity E028 (NIC-4620) received HS 72081000; Entity E030 (NIC-4620) received HS 72081000; Entity E020 (NIC-5210) received HS 72081000; Entity E029 (NIC-4690) received HS 84571000; Entity E005 (NIC-4690) received HS 39012000"
      }
    },
    {
      "ring_id": "R3365",
      "canonical_key": "E005|E023|E019|E008|E028|E030|E017|E029",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E023",
        "E019",
        "E008",
        "E028",
        "E030",
        "E017",
        "E029"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E005",
          "to": "E023",
          "invoice_id": "I0081",
          "value": 98077236,
          "hs_code": "49011000",
          "invoice_date": "2025-11-24",
          "discounting_date": "2025-12-24"
        },
        {
          "hop_type": "invoice",
          "from": "E023",
          "to": "E019",
          "invoice_id": "I0124",
          "value": 113317145,
          "hs_code": null,
          "invoice_date": "2026-01-18",
          "discounting_date": "2026-01-23"
        },
        {
          "hop_type": "invoice",
          "from": "E019",
          "to": "E008",
          "invoice_id": "I0088",
          "value": 114847359,
          "hs_code": "72081000",
          "invoice_date": "2026-02-10",
          "discounting_date": "2026-03-02"
        },
        {
          "hop_type": "invoice",
          "from": "E008",
          "to": "E028",
          "invoice_id": "I0118",
          "value": 118095206,
          "hs_code": "72081000",
          "invoice_date": "2026-03-24",
          "discounting_date": "2026-05-05"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E030",
          "invoice_id": "I0116",
          "value": 104796883,
          "hs_code": "72081000",
          "invoice_date": "2026-01-19",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E017",
          "invoice_id": "I0085",
          "value": 100627925,
          "hs_code": "74031100",
          "invoice_date": "2026-02-28",
          "discounting_date": "2026-03-21"
        },
        {
          "hop_type": "invoice",
          "from": "E017",
          "to": "E029",
          "invoice_id": "I0034",
          "value": 85103166,
          "hs_code": null,
          "invoice_date": "2025-11-14",
          "discounting_date": "2025-12-09"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E005",
          "invoice_id": "I0140",
          "value": 88392555,
          "hs_code": "39012000",
          "invoice_date": "2026-01-12",
          "discounting_date": "2026-02-08"
        }
      ],
      "scores": {
        "value": 0.59,
        "product": null,
        "timing": 0.19,
        "externality": 0.22
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.34,
      "expected_loss": 277495780,
      "evidence": {
        "value": "Net position score: 0.59",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.19",
        "externality": "Externality score: 0.22",
        "industry": "Flagged cross-industry trades: Entity E023 (NIC-7020) received HS 49011000; Entity E008 (NIC-4662) received HS 72081000; Entity E028 (NIC-4620) received HS 72081000; Entity E030 (NIC-4620) received HS 72081000; Entity E017 (NIC-8299) received HS 74031100; Entity E005 (NIC-4690) received HS 39012000"
      }
    },
    {
      "ring_id": "R5401",
      "canonical_key": "E040|E041|E042|E043|E044|E045",
      "closure_type": "transaction",
      "entities": [
        "E040",
        "E041",
        "E042",
        "E043",
        "E044",
        "E045"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E040",
          "to": "E041",
          "invoice_id": "I0152",
          "value": 58056130,
          "hs_code": null,
          "invoice_date": "2026-02-04",
          "discounting_date": "2026-02-12"
        },
        {
          "hop_type": "invoice",
          "from": "E041",
          "to": "E042",
          "invoice_id": "I0153",
          "value": 56548644,
          "hs_code": "39012000",
          "invoice_date": "2026-02-07",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E042",
          "to": "E043",
          "invoice_id": "I0154",
          "value": 56776799,
          "hs_code": "39012000",
          "invoice_date": "2026-02-09",
          "discounting_date": "2026-02-17"
        },
        {
          "hop_type": "invoice",
          "from": "E043",
          "to": "E044",
          "invoice_id": "I0155",
          "value": 56340798,
          "hs_code": "39012000",
          "invoice_date": "2026-02-10",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E044",
          "to": "E045",
          "invoice_id": "I0156",
          "value": 55996107,
          "hs_code": "39012000",
          "invoice_date": "2026-02-13",
          "discounting_date": "2026-02-17"
        },
        {
          "hop_type": "invoice",
          "from": "E045",
          "to": "E040",
          "invoice_id": "I0157",
          "value": 54403286,
          "hs_code": "39012000",
          "invoice_date": "2026-02-15",
          "discounting_date": "2026-02-23"
        }
      ],
      "scores": {
        "value": 0.86,
        "product": null,
        "timing": 0.65,
        "externality": 1.0
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.79,
      "expected_loss": 268213745,
      "evidence": {
        "value": "Net position score: 0.86",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.65",
        "externality": "Externality score: 1.00",
        "industry": "Flagged cross-industry trades: Entity E042 (NIC-4690) received HS 39012000; Entity E043 (NIC-6202) received HS 39012000; Entity E044 (NIC-5229) received HS 39012000; Entity E045 (NIC-4662) received HS 39012000; Entity E040 (NIC-6202) received HS 39012000"
      }
    },
    {
      "ring_id": "R5404",
      "canonical_key": "E057|E058|E059|E060",
      "closure_type": "transaction",
      "entities": [
        "E057",
        "E058",
        "E059",
        "E060"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E057",
          "to": "E058",
          "invoice_id": "I0169",
          "value": 73338794,
          "hs_code": "74031100",
          "invoice_date": "2026-03-07",
          "discounting_date": "2026-03-13"
        },
        {
          "hop_type": "invoice",
          "from": "E058",
          "to": "E059",
          "invoice_id": "I0170",
          "value": 71620926,
          "hs_code": "74031100",
          "invoice_date": "2026-03-11",
          "discounting_date": "2026-03-16"
        },
        {
          "hop_type": "invoice",
          "from": "E059",
          "to": "E060",
          "invoice_id": "I0171",
          "value": 72589201,
          "hs_code": "74031100",
          "invoice_date": "2026-03-12",
          "discounting_date": "2026-03-20"
        },
        {
          "hop_type": "invoice",
          "from": "E060",
          "to": "E057",
          "invoice_id": "I0172",
          "value": 73266854,
          "hs_code": "74031100",
          "invoice_date": "2026-03-14",
          "discounting_date": "2026-03-15"
        }
      ],
      "scores": {
        "value": 0.92,
        "product": 1.0,
        "timing": 0.69,
        "externality": 1.0
      },
      "abstained": [],
      "aggregate": 0.89,
      "expected_loss": 258206259,
      "evidence": {
        "value": "Net position score: 0.92",
        "product": "HS code consistency: 1.00",
        "timing": "Regularity score: 0.69",
        "externality": "Externality score: 1.00",
        "industry": "Flagged cross-industry trades: Entity E058 (NIC-1392) received HS 74031100; Entity E059 (NIC-7020) received HS 74031100; Entity E060 (NIC-4620) received HS 74031100; Entity E057 (NIC-1392) received HS 74031100"
      }
    },
    {
      "ring_id": "R5400",
      "canonical_key": "E033|E034|E035|E036|E037|E038|E039",
      "closure_type": "corporate",
      "entities": [
        "E033",
        "E034",
        "E035",
        "E036",
        "E037",
        "E038",
        "E039"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E033",
          "to": "E034",
          "invoice_id": "I0146",
          "value": 58683548,
          "hs_code": "74031100",
          "invoice_date": "2025-11-05",
          "discounting_date": "2025-11-08"
        },
        {
          "hop_type": "invoice",
          "from": "E034",
          "to": "E035",
          "invoice_id": "I0147",
          "value": 57224489,
          "hs_code": "74031100",
          "invoice_date": "2025-11-08",
          "discounting_date": "2025-11-10"
        },
        {
          "hop_type": "invoice",
          "from": "E035",
          "to": "E036",
          "invoice_id": "I0148",
          "value": 57375843,
          "hs_code": "74031100",
          "invoice_date": "2025-11-09",
          "discounting_date": "2025-11-16"
        },
        {
          "hop_type": "invoice",
          "from": "E036",
          "to": "E037",
          "invoice_id": "I0149",
          "value": 55804437,
          "hs_code": "74031100",
          "invoice_date": "2025-11-13",
          "discounting_date": "2025-11-19"
        },
        {
          "hop_type": "invoice",
          "from": "E037",
          "to": "E038",
          "invoice_id": "I0150",
          "value": 54184687,
          "hs_code": "74031100",
          "invoice_date": "2025-11-14",
          "discounting_date": "2025-11-20"
        },
        {
          "hop_type": "invoice",
          "from": "E038",
          "to": "E039",
          "invoice_id": "I0151",
          "value": 54695446,
          "hs_code": "74031100",
          "invoice_date": "2025-11-15",
          "discounting_date": "2025-11-21"
        },
        {
          "hop_type": "corporate_bridge",
          "from": "E039",
          "to": "E033",
          "bridge_kind": "registration_cohort",
          "bridge_evidence": {
            "registration_date": "2021-09-19"
          }
        }
      ],
      "scores": {
        "value": 0.9,
        "product": null,
        "timing": 0.47,
        "externality": 1.0
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.72,
      "expected_loss": 244495217,
      "evidence": {
        "value": "Net position score: 0.90",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.47",
        "externality": "Externality score: 1.00",
        "industry": "Flagged cross-industry trades: Entity E034 (NIC-5210) received HS 74031100; Entity E035 (NIC-4620) received HS 74031100; Entity E036 (NIC-4690) received HS 74031100; Entity E037 (NIC-2410) received HS 74031100; Entity E038 (NIC-4662) received HS 74031100; Entity E039 (NIC-6202) received HS 74031100"
      }
    },
    {
      "ring_id": "R5110",
      "canonical_key": "E009|E029|E018|E030|E020|E013|E028",
      "closure_type": "transaction",
      "entities": [
        "E009",
        "E029",
        "E018",
        "E030",
        "E020",
        "E013",
        "E028"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E009",
          "to": "E029",
          "invoice_id": "I0052",
          "value": 100973640,
          "hs_code": null,
          "invoice_date": "2026-03-27",
          "discounting_date": "2026-04-17"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E018",
          "invoice_id": "I0123",
          "value": 89042300,
          "hs_code": "49011000",
          "invoice_date": "2025-12-26",
          "discounting_date": "2026-01-30"
        },
        {
          "hop_type": "invoice",
          "from": "E018",
          "to": "E030",
          "invoice_id": "I0065",
          "value": 85035182,
          "hs_code": "26011100",
          "invoice_date": "2026-03-01",
          "discounting_date": "2026-03-26"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E020",
          "invoice_id": "I0048",
          "value": 84274070,
          "hs_code": "72081000",
          "invoice_date": "2025-12-20",
          "discounting_date": "2026-01-12"
        },
        {
          "hop_type": "invoice",
          "from": "E020",
          "to": "E013",
          "invoice_id": "I0131",
          "value": 94441896,
          "hs_code": "84571000",
          "invoice_date": "2025-11-20",
          "discounting_date": "2025-12-25"
        },
        {
          "hop_type": "invoice",
          "from": "E013",
          "to": "E028",
          "invoice_id": "I0092",
          "value": 84263562,
          "hs_code": "85176200",
          "invoice_date": "2026-01-09",
          "discounting_date": "2026-01-22"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E009",
          "invoice_id": "I0040",
          "value": 82458160,
          "hs_code": "27101990",
          "invoice_date": "2025-11-04",
          "discounting_date": "2025-12-03"
        }
      ],
      "scores": {
        "value": 0.54,
        "product": null,
        "timing": 0.29,
        "externality": 0.26
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.39,
      "expected_loss": 240798337,
      "evidence": {
        "value": "Net position score: 0.54",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.29",
        "externality": "Externality score: 0.26",
        "industry": "Flagged cross-industry trades: Entity E018 (NIC-2610) received HS 49011000; Entity E030 (NIC-4620) received HS 26011100; Entity E020 (NIC-5210) received HS 72081000; Entity E013 (NIC-1392) received HS 84571000; Entity E028 (NIC-4620) received HS 85176200; Entity E009 (NIC-6202) received HS 27101990"
      }
    },
    {
      "ring_id": "R3367",
      "canonical_key": "E005|E023|E019|E008|E028|E030|E031",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E023",
        "E019",
        "E008",
        "E028",
        "E030",
        "E031"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E005",
          "to": "E023",
          "invoice_id": "I0081",
          "value": 98077236,
          "hs_code": "49011000",
          "invoice_date": "2025-11-24",
          "discounting_date": "2025-12-24"
        },
        {
          "hop_type": "invoice",
          "from": "E023",
          "to": "E019",
          "invoice_id": "I0124",
          "value": 113317145,
          "hs_code": null,
          "invoice_date": "2026-01-18",
          "discounting_date": "2026-01-23"
        },
        {
          "hop_type": "invoice",
          "from": "E019",
          "to": "E008",
          "invoice_id": "I0088",
          "value": 114847359,
          "hs_code": "72081000",
          "invoice_date": "2026-02-10",
          "discounting_date": "2026-03-02"
        },
        {
          "hop_type": "invoice",
          "from": "E008",
          "to": "E028",
          "invoice_id": "I0118",
          "value": 118095206,
          "hs_code": "72081000",
          "invoice_date": "2026-03-24",
          "discounting_date": "2026-05-05"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E030",
          "invoice_id": "I0116",
          "value": 104796883,
          "hs_code": "72081000",
          "invoice_date": "2026-01-19",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E031",
          "invoice_id": "I0134",
          "value": 119445501,
          "hs_code": "10063000",
          "invoice_date": "2026-03-25",
          "discounting_date": "2026-05-08"
        },
        {
          "hop_type": "invoice",
          "from": "E031",
          "to": "E005",
          "invoice_id": "I0053",
          "value": 78494117,
          "hs_code": "72081000",
          "invoice_date": "2026-03-03",
          "discounting_date": "2026-03-13"
        }
      ],
      "scores": {
        "value": 0.38,
        "product": null,
        "timing": 0.25,
        "externality": 0.27
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.31,
      "expected_loss": 233273027,
      "evidence": {
        "value": "Net position score: 0.38",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.25",
        "externality": "Externality score: 0.27",
        "industry": "Flagged cross-industry trades: Entity E023 (NIC-7020) received HS 49011000; Entity E008 (NIC-4662) received HS 72081000; Entity E028 (NIC-4620) received HS 72081000; Entity E030 (NIC-4620) received HS 72081000; Entity E031 (NIC-4662) received HS 10063000; Entity E005 (NIC-4690) received HS 72081000"
      }
    },
    {
      "ring_id": "R5402",
      "canonical_key": "E046|E047|E048|E049",
      "closure_type": "transaction",
      "entities": [
        "E046",
        "E047",
        "E048",
        "E049"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E046",
          "to": "E047",
          "invoice_id": "I0158",
          "value": 67315196,
          "hs_code": "10063000",
          "invoice_date": "2026-03-16",
          "discounting_date": "2026-03-19"
        },
        {
          "hop_type": "invoice",
          "from": "E047",
          "to": "E048",
          "invoice_id": "I0159",
          "value": 67890089,
          "hs_code": "10063000",
          "invoice_date": "2026-03-20",
          "discounting_date": "2026-03-28"
        },
        {
          "hop_type": "invoice",
          "from": "E048",
          "to": "E049",
          "invoice_id": "I0160",
          "value": 67256734,
          "hs_code": "10063000",
          "invoice_date": "2026-03-22",
          "discounting_date": "2026-03-25"
        },
        {
          "hop_type": "invoice",
          "from": "E049",
          "to": "E046",
          "invoice_id": "I0161",
          "value": 68914123,
          "hs_code": "10063000",
          "invoice_date": "2026-03-23",
          "discounting_date": "2026-03-25"
        }
      ],
      "scores": {
        "value": 0.9,
        "product": null,
        "timing": 0.69,
        "externality": 1.0
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.83,
      "expected_loss": 225460706,
      "evidence": {
        "value": "Net position score: 0.90",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.69",
        "externality": "Externality score: 1.00",
        "industry": "Flagged cross-industry trades: Entity E047 (NIC-2410) received HS 10063000; Entity E048 (NIC-4690) received HS 10063000; Entity E049 (NIC-7020) received HS 10063000; Entity E046 (NIC-2410) received HS 10063000"
      }
    },
    {
      "ring_id": "R5123",
      "canonical_key": "E009|E029|E021|E018|E020|E013|E028",
      "closure_type": "transaction",
      "entities": [
        "E009",
        "E029",
        "E021",
        "E018",
        "E020",
        "E013",
        "E028"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E009",
          "to": "E029",
          "invoice_id": "I0052",
          "value": 100973640,
          "hs_code": null,
          "invoice_date": "2026-03-27",
          "discounting_date": "2026-04-17"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E021",
          "invoice_id": "I0017",
          "value": 79184989,
          "hs_code": "49011000",
          "invoice_date": "2025-12-14",
          "discounting_date": "2026-01-28"
        },
        {
          "hop_type": "invoice",
          "from": "E021",
          "to": "E018",
          "invoice_id": "I0023",
          "value": 89902530,
          "hs_code": "39012000",
          "invoice_date": "2026-03-21",
          "discounting_date": "2026-04-21"
        },
        {
          "hop_type": "invoice",
          "from": "E018",
          "to": "E020",
          "invoice_id": "I0025",
          "value": 99283231,
          "hs_code": "72081000",
          "invoice_date": "2026-01-21",
          "discounting_date": "2026-02-27"
        },
        {
          "hop_type": "invoice",
          "from": "E020",
          "to": "E013",
          "invoice_id": "I0131",
          "value": 94441896,
          "hs_code": "84571000",
          "invoice_date": "2025-11-20",
          "discounting_date": "2025-12-25"
        },
        {
          "hop_type": "invoice",
          "from": "E013",
          "to": "E028",
          "invoice_id": "I0092",
          "value": 84263562,
          "hs_code": "85176200",
          "invoice_date": "2026-01-09",
          "discounting_date": "2026-01-22"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E009",
          "invoice_id": "I0040",
          "value": 82458160,
          "hs_code": "27101990",
          "invoice_date": "2025-11-04",
          "discounting_date": "2025-12-03"
        }
      ],
      "scores": {
        "value": 0.44,
        "product": null,
        "timing": 0.29,
        "externality": 0.21
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.34,
      "expected_loss": 216910610,
      "evidence": {
        "value": "Net position score: 0.44",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.29",
        "externality": "Externality score: 0.21",
        "industry": "Flagged cross-industry trades: Entity E021 (NIC-1392) received HS 49011000; Entity E018 (NIC-2610) received HS 39012000; Entity E020 (NIC-5210) received HS 72081000; Entity E013 (NIC-1392) received HS 84571000; Entity E028 (NIC-4620) received HS 85176200; Entity E009 (NIC-6202) received HS 27101990"
      }
    },
    {
      "ring_id": "R3826",
      "canonical_key": "E005|E028|E030|E020|E029|E018|E019|E031",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E028",
        "E030",
        "E020",
        "E029",
        "E018",
        "E019",
        "E031"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E005",
          "to": "E028",
          "invoice_id": "I0086",
          "value": 92449408,
          "hs_code": "39012000",
          "invoice_date": "2026-02-17",
          "discounting_date": "2026-03-08"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E030",
          "invoice_id": "I0116",
          "value": 104796883,
          "hs_code": "72081000",
          "invoice_date": "2026-01-19",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E020",
          "invoice_id": "I0048",
          "value": 84274070,
          "hs_code": "72081000",
          "invoice_date": "2025-12-20",
          "discounting_date": "2026-01-12"
        },
        {
          "hop_type": "invoice",
          "from": "E020",
          "to": "E029",
          "invoice_id": "I0056",
          "value": 98071917,
          "hs_code": "84571000",
          "invoice_date": "2025-11-16",
          "discounting_date": "2025-12-28"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E018",
          "invoice_id": "I0123",
          "value": 89042300,
          "hs_code": "49011000",
          "invoice_date": "2025-12-26",
          "discounting_date": "2026-01-30"
        },
        {
          "hop_type": "invoice",
          "from": "E018",
          "to": "E019",
          "invoice_id": "I0119",
          "value": 60906538,
          "hs_code": "39012000",
          "invoice_date": "2026-01-29",
          "discounting_date": "2026-02-01"
        },
        {
          "hop_type": "invoice",
          "from": "E019",
          "to": "E031",
          "invoice_id": "I0050",
          "value": 71326148,
          "hs_code": "10063000",
          "invoice_date": "2026-02-01",
          "discounting_date": "2026-02-15"
        },
        {
          "hop_type": "invoice",
          "from": "E031",
          "to": "E005",
          "invoice_id": "I0053",
          "value": 78494117,
          "hs_code": "72081000",
          "invoice_date": "2026-03-03",
          "discounting_date": "2026-03-13"
        }
      ],
      "scores": {
        "value": 0.32,
        "product": null,
        "timing": 0.35,
        "externality": 0.24
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.32,
      "expected_loss": 215601160,
      "evidence": {
        "value": "Net position score: 0.32",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.35",
        "externality": "Externality score: 0.24",
        "industry": "Flagged cross-industry trades: Entity E028 (NIC-4620) received HS 39012000; Entity E030 (NIC-4620) received HS 72081000; Entity E020 (NIC-5210) received HS 72081000; Entity E029 (NIC-4690) received HS 84571000; Entity E018 (NIC-2610) received HS 49011000; Entity E019 (NIC-4620) received HS 39012000; Entity E031 (NIC-4662) received HS 10063000; Entity E005 (NIC-4690) received HS 72081000"
      }
    },
    {
      "ring_id": "R5113",
      "canonical_key": "E009|E029|E018|E030|E020|E015|E025|E028",
      "closure_type": "transaction",
      "entities": [
        "E009",
        "E029",
        "E018",
        "E030",
        "E020",
        "E015",
        "E025",
        "E028"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E009",
          "to": "E029",
          "invoice_id": "I0052",
          "value": 100973640,
          "hs_code": null,
          "invoice_date": "2026-03-27",
          "discounting_date": "2026-04-17"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E018",
          "invoice_id": "I0123",
          "value": 89042300,
          "hs_code": "49011000",
          "invoice_date": "2025-12-26",
          "discounting_date": "2026-01-30"
        },
        {
          "hop_type": "invoice",
          "from": "E018",
          "to": "E030",
          "invoice_id": "I0065",
          "value": 85035182,
          "hs_code": "26011100",
          "invoice_date": "2026-03-01",
          "discounting_date": "2026-03-26"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E020",
          "invoice_id": "I0048",
          "value": 84274070,
          "hs_code": "72081000",
          "invoice_date": "2025-12-20",
          "discounting_date": "2026-01-12"
        },
        {
          "hop_type": "invoice",
          "from": "E020",
          "to": "E015",
          "invoice_id": "I0014",
          "value": 66619754,
          "hs_code": "49011000",
          "invoice_date": "2026-03-22",
          "discounting_date": "2026-04-02"
        },
        {
          "hop_type": "invoice",
          "from": "E015",
          "to": "E025",
          "invoice_id": "I0127",
          "value": 61253795,
          "hs_code": "72081000",
          "invoice_date": "2025-11-11",
          "discounting_date": "2025-12-11"
        },
        {
          "hop_type": "invoice",
          "from": "E025",
          "to": "E028",
          "invoice_id": "I0121",
          "value": 53050466,
          "hs_code": "84571000",
          "invoice_date": "2026-01-23",
          "discounting_date": "2026-03-03"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E009",
          "invoice_id": "I0040",
          "value": 82458160,
          "hs_code": "27101990",
          "invoice_date": "2025-11-04",
          "discounting_date": "2025-12-03"
        }
      ],
      "scores": {
        "value": 0.36,
        "product": null,
        "timing": 0.31,
        "externality": 0.28
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.33,
      "expected_loss": 205032754,
      "evidence": {
        "value": "Net position score: 0.36",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.31",
        "externality": "Externality score: 0.28",
        "industry": "Flagged cross-industry trades: Entity E018 (NIC-2610) received HS 49011000; Entity E030 (NIC-4620) received HS 26011100; Entity E020 (NIC-5210) received HS 72081000; Entity E015 (NIC-2013) received HS 49011000; Entity E025 (NIC-5229) received HS 72081000; Entity E028 (NIC-4620) received HS 84571000; Entity E009 (NIC-6202) received HS 27101990"
      }
    },
    {
      "ring_id": "R5130",
      "canonical_key": "E009|E029|E021|E018|E030|E020|E013|E028",
      "closure_type": "transaction",
      "entities": [
        "E009",
        "E029",
        "E021",
        "E018",
        "E030",
        "E020",
        "E013",
        "E028"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E009",
          "to": "E029",
          "invoice_id": "I0052",
          "value": 100973640,
          "hs_code": null,
          "invoice_date": "2026-03-27",
          "discounting_date": "2026-04-17"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E021",
          "invoice_id": "I0017",
          "value": 79184989,
          "hs_code": "49011000",
          "invoice_date": "2025-12-14",
          "discounting_date": "2026-01-28"
        },
        {
          "hop_type": "invoice",
          "from": "E021",
          "to": "E018",
          "invoice_id": "I0023",
          "value": 89902530,
          "hs_code": "39012000",
          "invoice_date": "2026-03-21",
          "discounting_date": "2026-04-21"
        },
        {
          "hop_type": "invoice",
          "from": "E018",
          "to": "E030",
          "invoice_id": "I0065",
          "value": 85035182,
          "hs_code": "26011100",
          "invoice_date": "2026-03-01",
          "discounting_date": "2026-03-26"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E020",
          "invoice_id": "I0048",
          "value": 84274070,
          "hs_code": "72081000",
          "invoice_date": "2025-12-20",
          "discounting_date": "2026-01-12"
        },
        {
          "hop_type": "invoice",
          "from": "E020",
          "to": "E013",
          "invoice_id": "I0131",
          "value": 94441896,
          "hs_code": "84571000",
          "invoice_date": "2025-11-20",
          "discounting_date": "2025-12-25"
        },
        {
          "hop_type": "invoice",
          "from": "E013",
          "to": "E028",
          "invoice_id": "I0092",
          "value": 84263562,
          "hs_code": "85176200",
          "invoice_date": "2026-01-09",
          "discounting_date": "2026-01-22"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E009",
          "invoice_id": "I0040",
          "value": 82458160,
          "hs_code": "27101990",
          "invoice_date": "2025-11-04",
          "discounting_date": "2025-12-03"
        }
      ],
      "scores": {
        "value": 0.47,
        "product": null,
        "timing": 0.14,
        "externality": 0.28
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.29,
      "expected_loss": 200573417,
      "evidence": {
        "value": "Net position score: 0.47",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.14",
        "externality": "Externality score: 0.28",
        "industry": "Flagged cross-industry trades: Entity E021 (NIC-1392) received HS 49011000; Entity E018 (NIC-2610) received HS 39012000; Entity E030 (NIC-4620) received HS 26011100; Entity E020 (NIC-5210) received HS 72081000; Entity E013 (NIC-1392) received HS 84571000; Entity E028 (NIC-4620) received HS 85176200; Entity E009 (NIC-6202) received HS 27101990"
      }
    },
    {
      "ring_id": "R3220",
      "canonical_key": "E005|E019|E008|E028|E030|E032|E014|E031",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E019",
        "E008",
        "E028",
        "E030",
        "E032",
        "E014",
        "E031"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E005",
          "to": "E019",
          "invoice_id": "I0079",
          "value": 92203262,
          "hs_code": "49011000",
          "invoice_date": "2026-02-10",
          "discounting_date": "2026-03-26"
        },
        {
          "hop_type": "invoice",
          "from": "E019",
          "to": "E008",
          "invoice_id": "I0088",
          "value": 114847359,
          "hs_code": "72081000",
          "invoice_date": "2026-02-10",
          "discounting_date": "2026-03-02"
        },
        {
          "hop_type": "invoice",
          "from": "E008",
          "to": "E028",
          "invoice_id": "I0118",
          "value": 118095206,
          "hs_code": "72081000",
          "invoice_date": "2026-03-24",
          "discounting_date": "2026-05-05"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E030",
          "invoice_id": "I0116",
          "value": 104796883,
          "hs_code": "72081000",
          "invoice_date": "2026-01-19",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E032",
          "invoice_id": "I0099",
          "value": 99275859,
          "hs_code": "72081000",
          "invoice_date": "2025-12-10",
          "discounting_date": "2026-01-08"
        },
        {
          "hop_type": "invoice",
          "from": "E032",
          "to": "E014",
          "invoice_id": "I0100",
          "value": 117945293,
          "hs_code": "39012000",
          "invoice_date": "2025-12-26",
          "discounting_date": "2026-01-26"
        },
        {
          "hop_type": "invoice",
          "from": "E014",
          "to": "E031",
          "invoice_id": "I0117",
          "value": 143828973,
          "hs_code": "85176200",
          "invoice_date": "2026-01-29",
          "discounting_date": "2026-03-08"
        },
        {
          "hop_type": "invoice",
          "from": "E031",
          "to": "E005",
          "invoice_id": "I0053",
          "value": 78494117,
          "hs_code": "72081000",
          "invoice_date": "2026-03-03",
          "discounting_date": "2026-03-13"
        }
      ],
      "scores": {
        "value": 0.28,
        "product": null,
        "timing": 0.17,
        "externality": 0.26
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.23,
      "expected_loss": 198518576,
      "evidence": {
        "value": "Net position score: 0.28",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.17",
        "externality": "Externality score: 0.26",
        "industry": "Flagged cross-industry trades: Entity E019 (NIC-4620) received HS 49011000; Entity E008 (NIC-4662) received HS 72081000; Entity E028 (NIC-4620) received HS 72081000; Entity E030 (NIC-4620) received HS 72081000; Entity E032 (NIC-5229) received HS 72081000; Entity E014 (NIC-2610) received HS 39012000; Entity E031 (NIC-4662) received HS 85176200; Entity E005 (NIC-4690) received HS 72081000"
      }
    },
    {
      "ring_id": "R119",
      "canonical_key": "E001|E010|E018|E020|E029|E005|E023|E019",
      "closure_type": "transaction",
      "entities": [
        "E001",
        "E010",
        "E018",
        "E020",
        "E029",
        "E005",
        "E023",
        "E019"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E001",
          "to": "E010",
          "invoice_id": "I0016",
          "value": 58795148,
          "hs_code": "39012000",
          "invoice_date": "2026-01-22",
          "discounting_date": "2026-02-23"
        },
        {
          "hop_type": "invoice",
          "from": "E010",
          "to": "E018",
          "invoice_id": "I0036",
          "value": 68366640,
          "hs_code": "10063000",
          "invoice_date": "2025-12-26",
          "discounting_date": "2026-01-27"
        },
        {
          "hop_type": "invoice",
          "from": "E018",
          "to": "E020",
          "invoice_id": "I0025",
          "value": 99283231,
          "hs_code": "72081000",
          "invoice_date": "2026-01-21",
          "discounting_date": "2026-02-27"
        },
        {
          "hop_type": "invoice",
          "from": "E020",
          "to": "E029",
          "invoice_id": "I0056",
          "value": 98071917,
          "hs_code": "84571000",
          "invoice_date": "2025-11-16",
          "discounting_date": "2025-12-28"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E005",
          "invoice_id": "I0140",
          "value": 88392555,
          "hs_code": "39012000",
          "invoice_date": "2026-01-12",
          "discounting_date": "2026-02-08"
        },
        {
          "hop_type": "invoice",
          "from": "E005",
          "to": "E023",
          "invoice_id": "I0081",
          "value": 98077236,
          "hs_code": "49011000",
          "invoice_date": "2025-11-24",
          "discounting_date": "2025-12-24"
        },
        {
          "hop_type": "invoice",
          "from": "E023",
          "to": "E019",
          "invoice_id": "I0124",
          "value": 113317145,
          "hs_code": null,
          "invoice_date": "2026-01-18",
          "discounting_date": "2026-01-23"
        },
        {
          "hop_type": "invoice",
          "from": "E019",
          "to": "E001",
          "invoice_id": "I0126",
          "value": 135912903,
          "hs_code": "27101990",
          "invoice_date": "2025-12-15",
          "discounting_date": "2025-12-26"
        }
      ],
      "scores": {
        "value": 0.21,
        "product": null,
        "timing": 0.32,
        "externality": 0.29
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.26,
      "expected_loss": 195206660,
      "evidence": {
        "value": "Net position score: 0.21",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.32",
        "externality": "Externality score: 0.29",
        "industry": "Flagged cross-industry trades: Entity E010 (NIC-4662) received HS 39012000; Entity E018 (NIC-2610) received HS 10063000; Entity E020 (NIC-5210) received HS 72081000; Entity E029 (NIC-4690) received HS 84571000; Entity E005 (NIC-4690) received HS 39012000; Entity E023 (NIC-7020) received HS 49011000; Entity E001 (NIC-5229) received HS 27101990"
      }
    },
    {
      "ring_id": "R5224",
      "canonical_key": "E013|E028|E030|E032|E017|E029|E018|E020",
      "closure_type": "transaction",
      "entities": [
        "E013",
        "E028",
        "E030",
        "E032",
        "E017",
        "E029",
        "E018",
        "E020"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E013",
          "to": "E028",
          "invoice_id": "I0092",
          "value": 84263562,
          "hs_code": "85176200",
          "invoice_date": "2026-01-09",
          "discounting_date": "2026-01-22"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E030",
          "invoice_id": "I0116",
          "value": 104796883,
          "hs_code": "72081000",
          "invoice_date": "2026-01-19",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E032",
          "invoice_id": "I0099",
          "value": 99275859,
          "hs_code": "72081000",
          "invoice_date": "2025-12-10",
          "discounting_date": "2026-01-08"
        },
        {
          "hop_type": "invoice",
          "from": "E032",
          "to": "E017",
          "invoice_id": "I0044",
          "value": 52730277,
          "hs_code": "49011000",
          "invoice_date": "2026-01-10",
          "discounting_date": "2026-02-17"
        },
        {
          "hop_type": "invoice",
          "from": "E017",
          "to": "E029",
          "invoice_id": "I0034",
          "value": 85103166,
          "hs_code": null,
          "invoice_date": "2025-11-14",
          "discounting_date": "2025-12-09"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E018",
          "invoice_id": "I0123",
          "value": 89042300,
          "hs_code": "49011000",
          "invoice_date": "2025-12-26",
          "discounting_date": "2026-01-30"
        },
        {
          "hop_type": "invoice",
          "from": "E018",
          "to": "E020",
          "invoice_id": "I0025",
          "value": 99283231,
          "hs_code": "72081000",
          "invoice_date": "2026-01-21",
          "discounting_date": "2026-02-27"
        },
        {
          "hop_type": "invoice",
          "from": "E020",
          "to": "E013",
          "invoice_id": "I0131",
          "value": 94441896,
          "hs_code": "84571000",
          "invoice_date": "2025-11-20",
          "discounting_date": "2025-12-25"
        }
      ],
      "scores": {
        "value": 0.28,
        "product": null,
        "timing": 0.25,
        "externality": 0.32
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.28,
      "expected_loss": 195151292,
      "evidence": {
        "value": "Net position score: 0.28",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.25",
        "externality": "Externality score: 0.32",
        "industry": "Flagged cross-industry trades: Entity E028 (NIC-4620) received HS 85176200; Entity E030 (NIC-4620) received HS 72081000; Entity E032 (NIC-5229) received HS 72081000; Entity E017 (NIC-8299) received HS 49011000; Entity E018 (NIC-2610) received HS 49011000; Entity E020 (NIC-5210) received HS 72081000; Entity E013 (NIC-1392) received HS 84571000"
      }
    },
    {
      "ring_id": "R5228",
      "canonical_key": "E013|E030|E017|E029|E021|E018|E020",
      "closure_type": "transaction",
      "entities": [
        "E013",
        "E030",
        "E017",
        "E029",
        "E021",
        "E018",
        "E020"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E013",
          "to": "E030",
          "invoice_id": "I0045",
          "value": 78457894,
          "hs_code": "26011100",
          "invoice_date": "2026-01-01",
          "discounting_date": "2026-02-03"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E017",
          "invoice_id": "I0085",
          "value": 100627925,
          "hs_code": "74031100",
          "invoice_date": "2026-02-28",
          "discounting_date": "2026-03-21"
        },
        {
          "hop_type": "invoice",
          "from": "E017",
          "to": "E029",
          "invoice_id": "I0034",
          "value": 85103166,
          "hs_code": null,
          "invoice_date": "2025-11-14",
          "discounting_date": "2025-12-09"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E021",
          "invoice_id": "I0017",
          "value": 79184989,
          "hs_code": "49011000",
          "invoice_date": "2025-12-14",
          "discounting_date": "2026-01-28"
        },
        {
          "hop_type": "invoice",
          "from": "E021",
          "to": "E018",
          "invoice_id": "I0023",
          "value": 89902530,
          "hs_code": "39012000",
          "invoice_date": "2026-03-21",
          "discounting_date": "2026-04-21"
        },
        {
          "hop_type": "invoice",
          "from": "E018",
          "to": "E020",
          "invoice_id": "I0025",
          "value": 99283231,
          "hs_code": "72081000",
          "invoice_date": "2026-01-21",
          "discounting_date": "2026-02-27"
        },
        {
          "hop_type": "invoice",
          "from": "E020",
          "to": "E013",
          "invoice_id": "I0131",
          "value": 94441896,
          "hs_code": "84571000",
          "invoice_date": "2025-11-20",
          "discounting_date": "2025-12-25"
        }
      ],
      "scores": {
        "value": 0.41,
        "product": null,
        "timing": 0.21,
        "externality": 0.32
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.31,
      "expected_loss": 194366604,
      "evidence": {
        "value": "Net position score: 0.41",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.21",
        "externality": "Externality score: 0.32",
        "industry": "Flagged cross-industry trades: Entity E030 (NIC-4620) received HS 26011100; Entity E017 (NIC-8299) received HS 74031100; Entity E021 (NIC-1392) received HS 49011000; Entity E018 (NIC-2610) received HS 39012000; Entity E020 (NIC-5210) received HS 72081000; Entity E013 (NIC-1392) received HS 84571000"
      }
    },
    {
      "ring_id": "R3071",
      "canonical_key": "E004|E032|E017|E029|E005|E023|E019",
      "closure_type": "transaction",
      "entities": [
        "E004",
        "E032",
        "E017",
        "E029",
        "E005",
        "E023",
        "E019"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E004",
          "to": "E032",
          "invoice_id": "I0115",
          "value": 86359380,
          "hs_code": "85176200",
          "invoice_date": "2025-12-02",
          "discounting_date": "2025-12-31"
        },
        {
          "hop_type": "invoice",
          "from": "E032",
          "to": "E017",
          "invoice_id": "I0044",
          "value": 52730277,
          "hs_code": "49011000",
          "invoice_date": "2026-01-10",
          "discounting_date": "2026-02-17"
        },
        {
          "hop_type": "invoice",
          "from": "E017",
          "to": "E029",
          "invoice_id": "I0034",
          "value": 85103166,
          "hs_code": null,
          "invoice_date": "2025-11-14",
          "discounting_date": "2025-12-09"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E005",
          "invoice_id": "I0140",
          "value": 88392555,
          "hs_code": "39012000",
          "invoice_date": "2026-01-12",
          "discounting_date": "2026-02-08"
        },
        {
          "hop_type": "invoice",
          "from": "E005",
          "to": "E023",
          "invoice_id": "I0081",
          "value": 98077236,
          "hs_code": "49011000",
          "invoice_date": "2025-11-24",
          "discounting_date": "2025-12-24"
        },
        {
          "hop_type": "invoice",
          "from": "E023",
          "to": "E019",
          "invoice_id": "I0124",
          "value": 113317145,
          "hs_code": null,
          "invoice_date": "2026-01-18",
          "discounting_date": "2026-01-23"
        },
        {
          "hop_type": "invoice",
          "from": "E019",
          "to": "E004",
          "invoice_id": "I0129",
          "value": 122878237,
          "hs_code": "72081000",
          "invoice_date": "2026-02-26",
          "discounting_date": "2026-03-24"
        }
      ],
      "scores": {
        "value": 0.24,
        "product": null,
        "timing": 0.45,
        "externality": 0.26
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.3,
      "expected_loss": 193930501,
      "evidence": {
        "value": "Net position score: 0.24",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.45",
        "externality": "Externality score: 0.26",
        "industry": "Flagged cross-industry trades: Entity E032 (NIC-5229) received HS 85176200; Entity E017 (NIC-8299) received HS 49011000; Entity E005 (NIC-4690) received HS 39012000; Entity E023 (NIC-7020) received HS 49011000; Entity E004 (NIC-2610) received HS 72081000"
      }
    },
    {
      "ring_id": "R3274",
      "canonical_key": "E005|E019|E031|E008|E028|E030|E020|E029",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E019",
        "E031",
        "E008",
        "E028",
        "E030",
        "E020",
        "E029"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E005",
          "to": "E019",
          "invoice_id": "I0079",
          "value": 92203262,
          "hs_code": "49011000",
          "invoice_date": "2026-02-10",
          "discounting_date": "2026-03-26"
        },
        {
          "hop_type": "invoice",
          "from": "E019",
          "to": "E031",
          "invoice_id": "I0050",
          "value": 71326148,
          "hs_code": "10063000",
          "invoice_date": "2026-02-01",
          "discounting_date": "2026-02-15"
        },
        {
          "hop_type": "invoice",
          "from": "E031",
          "to": "E008",
          "invoice_id": "I0093",
          "value": 86365017,
          "hs_code": "74031100",
          "invoice_date": "2026-02-28",
          "discounting_date": "2026-03-07"
        },
        {
          "hop_type": "invoice",
          "from": "E008",
          "to": "E028",
          "invoice_id": "I0118",
          "value": 118095206,
          "hs_code": "72081000",
          "invoice_date": "2026-03-24",
          "discounting_date": "2026-05-05"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E030",
          "invoice_id": "I0116",
          "value": 104796883,
          "hs_code": "72081000",
          "invoice_date": "2026-01-19",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E020",
          "invoice_id": "I0048",
          "value": 84274070,
          "hs_code": "72081000",
          "invoice_date": "2025-12-20",
          "discounting_date": "2026-01-12"
        },
        {
          "hop_type": "invoice",
          "from": "E020",
          "to": "E029",
          "invoice_id": "I0056",
          "value": 98071917,
          "hs_code": "84571000",
          "invoice_date": "2025-11-16",
          "discounting_date": "2025-12-28"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E005",
          "invoice_id": "I0140",
          "value": 88392555,
          "hs_code": "39012000",
          "invoice_date": "2026-01-12",
          "discounting_date": "2026-02-08"
        }
      ],
      "scores": {
        "value": 0.32,
        "product": null,
        "timing": 0.2,
        "externality": 0.23
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.26,
      "expected_loss": 190428544,
      "evidence": {
        "value": "Net position score: 0.32",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.20",
        "externality": "Externality score: 0.23",
        "industry": "Flagged cross-industry trades: Entity E019 (NIC-4620) received HS 49011000; Entity E031 (NIC-4662) received HS 10063000; Entity E008 (NIC-4662) received HS 74031100; Entity E028 (NIC-4620) received HS 72081000; Entity E030 (NIC-4620) received HS 72081000; Entity E020 (NIC-5210) received HS 72081000; Entity E029 (NIC-4690) received HS 84571000; Entity E005 (NIC-4690) received HS 39012000"
      }
    },
    {
      "ring_id": "R2174",
      "canonical_key": "E003|E028|E030|E020|E029",
      "closure_type": "transaction",
      "entities": [
        "E003",
        "E028",
        "E030",
        "E020",
        "E029"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E003",
          "to": "E028",
          "invoice_id": "I0067",
          "value": 103807836,
          "hs_code": "49011000",
          "invoice_date": "2026-02-12",
          "discounting_date": "2026-03-19"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E030",
          "invoice_id": "I0116",
          "value": 104796883,
          "hs_code": "72081000",
          "invoice_date": "2026-01-19",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E020",
          "invoice_id": "I0048",
          "value": 84274070,
          "hs_code": "72081000",
          "invoice_date": "2025-12-20",
          "discounting_date": "2026-01-12"
        },
        {
          "hop_type": "invoice",
          "from": "E020",
          "to": "E029",
          "invoice_id": "I0056",
          "value": 98071917,
          "hs_code": "84571000",
          "invoice_date": "2025-11-16",
          "discounting_date": "2025-12-28"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E003",
          "invoice_id": "I0046",
          "value": 93130035,
          "hs_code": "84571000",
          "invoice_date": "2026-01-02",
          "discounting_date": "2026-01-24"
        }
      ],
      "scores": {
        "value": 0.5,
        "product": null,
        "timing": 0.4,
        "externality": 0.16
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.39,
      "expected_loss": 189426459,
      "evidence": {
        "value": "Net position score: 0.50",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.40",
        "externality": "Externality score: 0.16",
        "industry": "Flagged cross-industry trades: Entity E028 (NIC-4620) received HS 49011000; Entity E030 (NIC-4620) received HS 72081000; Entity E020 (NIC-5210) received HS 72081000; Entity E029 (NIC-4690) received HS 84571000; Entity E003 (NIC-5210) received HS 84571000"
      }
    },
    {
      "ring_id": "R3313",
      "canonical_key": "E005|E023|E019|E006|E013|E028|E009|E029",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E023",
        "E019",
        "E006",
        "E013",
        "E028",
        "E009",
        "E029"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E005",
          "to": "E023",
          "invoice_id": "I0081",
          "value": 98077236,
          "hs_code": "49011000",
          "invoice_date": "2025-11-24",
          "discounting_date": "2025-12-24"
        },
        {
          "hop_type": "invoice",
          "from": "E023",
          "to": "E019",
          "invoice_id": "I0124",
          "value": 113317145,
          "hs_code": null,
          "invoice_date": "2026-01-18",
          "discounting_date": "2026-01-23"
        },
        {
          "hop_type": "invoice",
          "from": "E019",
          "to": "E006",
          "invoice_id": "I0137",
          "value": 127696693,
          "hs_code": "72081000",
          "invoice_date": "2026-03-29",
          "discounting_date": "2026-05-06"
        },
        {
          "hop_type": "invoice",
          "from": "E006",
          "to": "E013",
          "invoice_id": "I0122",
          "value": 74003244,
          "hs_code": "85176200",
          "invoice_date": "2025-11-13",
          "discounting_date": "2025-11-21"
        },
        {
          "hop_type": "invoice",
          "from": "E013",
          "to": "E028",
          "invoice_id": "I0092",
          "value": 84263562,
          "hs_code": "85176200",
          "invoice_date": "2026-01-09",
          "discounting_date": "2026-01-22"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E009",
          "invoice_id": "I0040",
          "value": 82458160,
          "hs_code": "27101990",
          "invoice_date": "2025-11-04",
          "discounting_date": "2025-12-03"
        },
        {
          "hop_type": "invoice",
          "from": "E009",
          "to": "E029",
          "invoice_id": "I0052",
          "value": 100973640,
          "hs_code": null,
          "invoice_date": "2026-03-27",
          "discounting_date": "2026-04-17"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E005",
          "invoice_id": "I0140",
          "value": 88392555,
          "hs_code": "39012000",
          "invoice_date": "2026-01-12",
          "discounting_date": "2026-02-08"
        }
      ],
      "scores": {
        "value": 0.31,
        "product": null,
        "timing": 0.17,
        "externality": 0.26
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.24,
      "expected_loss": 185619849,
      "evidence": {
        "value": "Net position score: 0.31",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.17",
        "externality": "Externality score: 0.26",
        "industry": "Flagged cross-industry trades: Entity E023 (NIC-7020) received HS 49011000; Entity E006 (NIC-2610) received HS 72081000; Entity E013 (NIC-1392) received HS 85176200; Entity E028 (NIC-4620) received HS 85176200; Entity E009 (NIC-6202) received HS 27101990; Entity E005 (NIC-4690) received HS 39012000"
      }
    },
    {
      "ring_id": "R3221",
      "canonical_key": "E005|E019|E008|E028|E030|E032|E017|E029",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E019",
        "E008",
        "E028",
        "E030",
        "E032",
        "E017",
        "E029"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E005",
          "to": "E019",
          "invoice_id": "I0079",
          "value": 92203262,
          "hs_code": "49011000",
          "invoice_date": "2026-02-10",
          "discounting_date": "2026-03-26"
        },
        {
          "hop_type": "invoice",
          "from": "E019",
          "to": "E008",
          "invoice_id": "I0088",
          "value": 114847359,
          "hs_code": "72081000",
          "invoice_date": "2026-02-10",
          "discounting_date": "2026-03-02"
        },
        {
          "hop_type": "invoice",
          "from": "E008",
          "to": "E028",
          "invoice_id": "I0118",
          "value": 118095206,
          "hs_code": "72081000",
          "invoice_date": "2026-03-24",
          "discounting_date": "2026-05-05"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E030",
          "invoice_id": "I0116",
          "value": 104796883,
          "hs_code": "72081000",
          "invoice_date": "2026-01-19",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E032",
          "invoice_id": "I0099",
          "value": 99275859,
          "hs_code": "72081000",
          "invoice_date": "2025-12-10",
          "discounting_date": "2026-01-08"
        },
        {
          "hop_type": "invoice",
          "from": "E032",
          "to": "E017",
          "invoice_id": "I0044",
          "value": 52730277,
          "hs_code": "49011000",
          "invoice_date": "2026-01-10",
          "discounting_date": "2026-02-17"
        },
        {
          "hop_type": "invoice",
          "from": "E017",
          "to": "E029",
          "invoice_id": "I0034",
          "value": 85103166,
          "hs_code": null,
          "invoice_date": "2025-11-14",
          "discounting_date": "2025-12-09"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E005",
          "invoice_id": "I0140",
          "value": 88392555,
          "hs_code": "39012000",
          "invoice_date": "2026-01-12",
          "discounting_date": "2026-02-08"
        }
      ],
      "scores": {
        "value": 0.32,
        "product": null,
        "timing": 0.19,
        "externality": 0.19
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.24,
      "expected_loss": 184215276,
      "evidence": {
        "value": "Net position score: 0.32",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.19",
        "externality": "Externality score: 0.19",
        "industry": "Flagged cross-industry trades: Entity E019 (NIC-4620) received HS 49011000; Entity E008 (NIC-4662) received HS 72081000; Entity E028 (NIC-4620) received HS 72081000; Entity E030 (NIC-4620) received HS 72081000; Entity E032 (NIC-5229) received HS 72081000; Entity E017 (NIC-8299) received HS 49011000; Entity E005 (NIC-4690) received HS 39012000"
      }
    },
    {
      "ring_id": "R3846",
      "canonical_key": "E005|E028|E030|E032|E014|E031",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E028",
        "E030",
        "E032",
        "E014",
        "E031"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E005",
          "to": "E028",
          "invoice_id": "I0086",
          "value": 92449408,
          "hs_code": "39012000",
          "invoice_date": "2026-02-17",
          "discounting_date": "2026-03-08"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E030",
          "invoice_id": "I0116",
          "value": 104796883,
          "hs_code": "72081000",
          "invoice_date": "2026-01-19",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E032",
          "invoice_id": "I0099",
          "value": 99275859,
          "hs_code": "72081000",
          "invoice_date": "2025-12-10",
          "discounting_date": "2026-01-08"
        },
        {
          "hop_type": "invoice",
          "from": "E032",
          "to": "E014",
          "invoice_id": "I0100",
          "value": 117945293,
          "hs_code": "39012000",
          "invoice_date": "2025-12-26",
          "discounting_date": "2026-01-26"
        },
        {
          "hop_type": "invoice",
          "from": "E014",
          "to": "E031",
          "invoice_id": "I0117",
          "value": 143828973,
          "hs_code": "85176200",
          "invoice_date": "2026-01-29",
          "discounting_date": "2026-03-08"
        },
        {
          "hop_type": "invoice",
          "from": "E031",
          "to": "E005",
          "invoice_id": "I0053",
          "value": 78494117,
          "hs_code": "72081000",
          "invoice_date": "2026-03-03",
          "discounting_date": "2026-03-13"
        }
      ],
      "scores": {
        "value": 0.23,
        "product": null,
        "timing": 0.44,
        "externality": 0.24
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.29,
      "expected_loss": 184158384,
      "evidence": {
        "value": "Net position score: 0.23",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.44",
        "externality": "Externality score: 0.24",
        "industry": "Flagged cross-industry trades: Entity E028 (NIC-4620) received HS 39012000; Entity E030 (NIC-4620) received HS 72081000; Entity E032 (NIC-5229) received HS 72081000; Entity E014 (NIC-2610) received HS 39012000; Entity E031 (NIC-4662) received HS 85176200; Entity E005 (NIC-4690) received HS 72081000"
      }
    },
    {
      "ring_id": "R3317",
      "canonical_key": "E005|E023|E019|E006|E013|E030|E017|E029",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E023",
        "E019",
        "E006",
        "E013",
        "E030",
        "E017",
        "E029"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E005",
          "to": "E023",
          "invoice_id": "I0081",
          "value": 98077236,
          "hs_code": "49011000",
          "invoice_date": "2025-11-24",
          "discounting_date": "2025-12-24"
        },
        {
          "hop_type": "invoice",
          "from": "E023",
          "to": "E019",
          "invoice_id": "I0124",
          "value": 113317145,
          "hs_code": null,
          "invoice_date": "2026-01-18",
          "discounting_date": "2026-01-23"
        },
        {
          "hop_type": "invoice",
          "from": "E019",
          "to": "E006",
          "invoice_id": "I0137",
          "value": 127696693,
          "hs_code": "72081000",
          "invoice_date": "2026-03-29",
          "discounting_date": "2026-05-06"
        },
        {
          "hop_type": "invoice",
          "from": "E006",
          "to": "E013",
          "invoice_id": "I0122",
          "value": 74003244,
          "hs_code": "85176200",
          "invoice_date": "2025-11-13",
          "discounting_date": "2025-11-21"
        },
        {
          "hop_type": "invoice",
          "from": "E013",
          "to": "E030",
          "invoice_id": "I0045",
          "value": 78457894,
          "hs_code": "26011100",
          "invoice_date": "2026-01-01",
          "discounting_date": "2026-02-03"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E017",
          "invoice_id": "I0085",
          "value": 100627925,
          "hs_code": "74031100",
          "invoice_date": "2026-02-28",
          "discounting_date": "2026-03-21"
        },
        {
          "hop_type": "invoice",
          "from": "E017",
          "to": "E029",
          "invoice_id": "I0034",
          "value": 85103166,
          "hs_code": null,
          "invoice_date": "2025-11-14",
          "discounting_date": "2025-12-09"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E005",
          "invoice_id": "I0140",
          "value": 88392555,
          "hs_code": "39012000",
          "invoice_date": "2026-01-12",
          "discounting_date": "2026-02-08"
        }
      ],
      "scores": {
        "value": 0.3,
        "product": null,
        "timing": 0.18,
        "externality": 0.21
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.24,
      "expected_loss": 183524088,
      "evidence": {
        "value": "Net position score: 0.30",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.18",
        "externality": "Externality score: 0.21",
        "industry": "Flagged cross-industry trades: Entity E023 (NIC-7020) received HS 49011000; Entity E006 (NIC-2610) received HS 72081000; Entity E013 (NIC-1392) received HS 85176200; Entity E030 (NIC-4620) received HS 26011100; Entity E017 (NIC-8299) received HS 74031100; Entity E005 (NIC-4690) received HS 39012000"
      }
    },
    {
      "ring_id": "R5097",
      "canonical_key": "E009|E029|E018|E020|E013|E028",
      "closure_type": "transaction",
      "entities": [
        "E009",
        "E029",
        "E018",
        "E020",
        "E013",
        "E028"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E009",
          "to": "E029",
          "invoice_id": "I0052",
          "value": 100973640,
          "hs_code": null,
          "invoice_date": "2026-03-27",
          "discounting_date": "2026-04-17"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E018",
          "invoice_id": "I0123",
          "value": 89042300,
          "hs_code": "49011000",
          "invoice_date": "2025-12-26",
          "discounting_date": "2026-01-30"
        },
        {
          "hop_type": "invoice",
          "from": "E018",
          "to": "E020",
          "invoice_id": "I0025",
          "value": 99283231,
          "hs_code": "72081000",
          "invoice_date": "2026-01-21",
          "discounting_date": "2026-02-27"
        },
        {
          "hop_type": "invoice",
          "from": "E020",
          "to": "E013",
          "invoice_id": "I0131",
          "value": 94441896,
          "hs_code": "84571000",
          "invoice_date": "2025-11-20",
          "discounting_date": "2025-12-25"
        },
        {
          "hop_type": "invoice",
          "from": "E013",
          "to": "E028",
          "invoice_id": "I0092",
          "value": 84263562,
          "hs_code": "85176200",
          "invoice_date": "2026-01-09",
          "discounting_date": "2026-01-22"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E009",
          "invoice_id": "I0040",
          "value": 82458160,
          "hs_code": "27101990",
          "invoice_date": "2025-11-04",
          "discounting_date": "2025-12-03"
        }
      ],
      "scores": {
        "value": 0.5,
        "product": null,
        "timing": 0.23,
        "externality": 0.18
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.33,
      "expected_loss": 180864548,
      "evidence": {
        "value": "Net position score: 0.50",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.23",
        "externality": "Externality score: 0.18",
        "industry": "Flagged cross-industry trades: Entity E018 (NIC-2610) received HS 49011000; Entity E020 (NIC-5210) received HS 72081000; Entity E013 (NIC-1392) received HS 84571000; Entity E028 (NIC-4620) received HS 85176200; Entity E009 (NIC-6202) received HS 27101990"
      }
    },
    {
      "ring_id": "R3827",
      "canonical_key": "E005|E028|E030|E020|E029|E021|E019|E031",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E028",
        "E030",
        "E020",
        "E029",
        "E021",
        "E019",
        "E031"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E005",
          "to": "E028",
          "invoice_id": "I0086",
          "value": 92449408,
          "hs_code": "39012000",
          "invoice_date": "2026-02-17",
          "discounting_date": "2026-03-08"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E030",
          "invoice_id": "I0116",
          "value": 104796883,
          "hs_code": "72081000",
          "invoice_date": "2026-01-19",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E020",
          "invoice_id": "I0048",
          "value": 84274070,
          "hs_code": "72081000",
          "invoice_date": "2025-12-20",
          "discounting_date": "2026-01-12"
        },
        {
          "hop_type": "invoice",
          "from": "E020",
          "to": "E029",
          "invoice_id": "I0056",
          "value": 98071917,
          "hs_code": "84571000",
          "invoice_date": "2025-11-16",
          "discounting_date": "2025-12-28"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E021",
          "invoice_id": "I0017",
          "value": 79184989,
          "hs_code": "49011000",
          "invoice_date": "2025-12-14",
          "discounting_date": "2026-01-28"
        },
        {
          "hop_type": "invoice",
          "from": "E021",
          "to": "E019",
          "invoice_id": "I0111",
          "value": 56062341,
          "hs_code": "72081000",
          "invoice_date": "2026-02-19",
          "discounting_date": "2026-02-28"
        },
        {
          "hop_type": "invoice",
          "from": "E019",
          "to": "E031",
          "invoice_id": "I0050",
          "value": 71326148,
          "hs_code": "10063000",
          "invoice_date": "2026-02-01",
          "discounting_date": "2026-02-15"
        },
        {
          "hop_type": "invoice",
          "from": "E031",
          "to": "E005",
          "invoice_id": "I0053",
          "value": 78494117,
          "hs_code": "72081000",
          "invoice_date": "2026-03-03",
          "discounting_date": "2026-03-13"
        }
      ],
      "scores": {
        "value": 0.29,
        "product": null,
        "timing": 0.28,
        "externality": 0.21
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.27,
      "expected_loss": 180674336,
      "evidence": {
        "value": "Net position score: 0.29",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.28",
        "externality": "Externality score: 0.21",
        "industry": "Flagged cross-industry trades: Entity E028 (NIC-4620) received HS 39012000; Entity E030 (NIC-4620) received HS 72081000; Entity E020 (NIC-5210) received HS 72081000; Entity E029 (NIC-4690) received HS 84571000; Entity E021 (NIC-1392) received HS 49011000; Entity E019 (NIC-4620) received HS 72081000; Entity E031 (NIC-4662) received HS 10063000; Entity E005 (NIC-4690) received HS 72081000"
      }
    },
    {
      "ring_id": "R3309",
      "canonical_key": "E005|E023|E012|E008|E028|E030|E020|E029",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E023",
        "E012",
        "E008",
        "E028",
        "E030",
        "E020",
        "E029"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E005",
          "to": "E023",
          "invoice_id": "I0081",
          "value": 98077236,
          "hs_code": "49011000",
          "invoice_date": "2025-11-24",
          "discounting_date": "2025-12-24"
        },
        {
          "hop_type": "invoice",
          "from": "E023",
          "to": "E012",
          "invoice_id": "I0106",
          "value": 103290650,
          "hs_code": null,
          "invoice_date": "2026-01-07",
          "discounting_date": "2026-01-13"
        },
        {
          "hop_type": "invoice",
          "from": "E012",
          "to": "E008",
          "invoice_id": "I0058",
          "value": 53403007,
          "hs_code": "49011000",
          "invoice_date": "2026-03-01",
          "discounting_date": "2026-03-22"
        },
        {
          "hop_type": "invoice",
          "from": "E008",
          "to": "E028",
          "invoice_id": "I0118",
          "value": 118095206,
          "hs_code": "72081000",
          "invoice_date": "2026-03-24",
          "discounting_date": "2026-05-05"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E030",
          "invoice_id": "I0116",
          "value": 104796883,
          "hs_code": "72081000",
          "invoice_date": "2026-01-19",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E020",
          "invoice_id": "I0048",
          "value": 84274070,
          "hs_code": "72081000",
          "invoice_date": "2025-12-20",
          "discounting_date": "2026-01-12"
        },
        {
          "hop_type": "invoice",
          "from": "E020",
          "to": "E029",
          "invoice_id": "I0056",
          "value": 98071917,
          "hs_code": "84571000",
          "invoice_date": "2025-11-16",
          "discounting_date": "2025-12-28"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E005",
          "invoice_id": "I0140",
          "value": 88392555,
          "hs_code": "39012000",
          "invoice_date": "2026-01-12",
          "discounting_date": "2026-02-08"
        }
      ],
      "scores": {
        "value": 0.19,
        "product": null,
        "timing": 0.33,
        "externality": 0.24
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.24,
      "expected_loss": 178045494,
      "evidence": {
        "value": "Net position score: 0.19",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.33",
        "externality": "Externality score: 0.24",
        "industry": "Flagged cross-industry trades: Entity E023 (NIC-7020) received HS 49011000; Entity E008 (NIC-4662) received HS 49011000; Entity E028 (NIC-4620) received HS 72081000; Entity E030 (NIC-4620) received HS 72081000; Entity E020 (NIC-5210) received HS 72081000; Entity E029 (NIC-4690) received HS 84571000; Entity E005 (NIC-4690) received HS 39012000"
      }
    },
    {
      "ring_id": "R3216",
      "canonical_key": "E005|E019|E008|E028|E030|E020|E029",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E019",
        "E008",
        "E028",
        "E030",
        "E020",
        "E029"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E005",
          "to": "E019",
          "invoice_id": "I0079",
          "value": 92203262,
          "hs_code": "49011000",
          "invoice_date": "2026-02-10",
          "discounting_date": "2026-03-26"
        },
        {
          "hop_type": "invoice",
          "from": "E019",
          "to": "E008",
          "invoice_id": "I0088",
          "value": 114847359,
          "hs_code": "72081000",
          "invoice_date": "2026-02-10",
          "discounting_date": "2026-03-02"
        },
        {
          "hop_type": "invoice",
          "from": "E008",
          "to": "E028",
          "invoice_id": "I0118",
          "value": 118095206,
          "hs_code": "72081000",
          "invoice_date": "2026-03-24",
          "discounting_date": "2026-05-05"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E030",
          "invoice_id": "I0116",
          "value": 104796883,
          "hs_code": "72081000",
          "invoice_date": "2026-01-19",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E020",
          "invoice_id": "I0048",
          "value": 84274070,
          "hs_code": "72081000",
          "invoice_date": "2025-12-20",
          "discounting_date": "2026-01-12"
        },
        {
          "hop_type": "invoice",
          "from": "E020",
          "to": "E029",
          "invoice_id": "I0056",
          "value": 98071917,
          "hs_code": "84571000",
          "invoice_date": "2025-11-16",
          "discounting_date": "2025-12-28"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E005",
          "invoice_id": "I0140",
          "value": 88392555,
          "hs_code": "39012000",
          "invoice_date": "2026-01-12",
          "discounting_date": "2026-02-08"
        }
      ],
      "scores": {
        "value": 0.44,
        "product": null,
        "timing": 0.14,
        "externality": 0.16
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.25,
      "expected_loss": 177683930,
      "evidence": {
        "value": "Net position score: 0.44",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.14",
        "externality": "Externality score: 0.16",
        "industry": "Flagged cross-industry trades: Entity E019 (NIC-4620) received HS 49011000; Entity E008 (NIC-4662) received HS 72081000; Entity E028 (NIC-4620) received HS 72081000; Entity E030 (NIC-4620) received HS 72081000; Entity E020 (NIC-5210) received HS 72081000; Entity E029 (NIC-4690) received HS 84571000; Entity E005 (NIC-4690) received HS 39012000"
      }
    },
    {
      "ring_id": "R2245",
      "canonical_key": "E003|E028|E030|E032|E014|E031|E008",
      "closure_type": "transaction",
      "entities": [
        "E003",
        "E028",
        "E030",
        "E032",
        "E014",
        "E031",
        "E008"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E003",
          "to": "E028",
          "invoice_id": "I0067",
          "value": 103807836,
          "hs_code": "49011000",
          "invoice_date": "2026-02-12",
          "discounting_date": "2026-03-19"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E030",
          "invoice_id": "I0116",
          "value": 104796883,
          "hs_code": "72081000",
          "invoice_date": "2026-01-19",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E032",
          "invoice_id": "I0099",
          "value": 99275859,
          "hs_code": "72081000",
          "invoice_date": "2025-12-10",
          "discounting_date": "2026-01-08"
        },
        {
          "hop_type": "invoice",
          "from": "E032",
          "to": "E014",
          "invoice_id": "I0100",
          "value": 117945293,
          "hs_code": "39012000",
          "invoice_date": "2025-12-26",
          "discounting_date": "2026-01-26"
        },
        {
          "hop_type": "invoice",
          "from": "E014",
          "to": "E031",
          "invoice_id": "I0117",
          "value": 143828973,
          "hs_code": "85176200",
          "invoice_date": "2026-01-29",
          "discounting_date": "2026-03-08"
        },
        {
          "hop_type": "invoice",
          "from": "E031",
          "to": "E008",
          "invoice_id": "I0093",
          "value": 86365017,
          "hs_code": "74031100",
          "invoice_date": "2026-02-28",
          "discounting_date": "2026-03-07"
        },
        {
          "hop_type": "invoice",
          "from": "E008",
          "to": "E003",
          "invoice_id": "I0071",
          "value": 53177285,
          "hs_code": "10063000",
          "invoice_date": "2026-01-14",
          "discounting_date": "2026-02-18"
        }
      ],
      "scores": {
        "value": 0.16,
        "product": null,
        "timing": 0.4,
        "externality": 0.29
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.24,
      "expected_loss": 172699168,
      "evidence": {
        "value": "Net position score: 0.16",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.40",
        "externality": "Externality score: 0.29",
        "industry": "Flagged cross-industry trades: Entity E028 (NIC-4620) received HS 49011000; Entity E030 (NIC-4620) received HS 72081000; Entity E032 (NIC-5229) received HS 72081000; Entity E014 (NIC-2610) received HS 39012000; Entity E031 (NIC-4662) received HS 85176200; Entity E008 (NIC-4662) received HS 74031100; Entity E003 (NIC-5210) received HS 10063000"
      }
    },
    {
      "ring_id": "R5219",
      "canonical_key": "E013|E028|E030|E017|E029|E018|E020",
      "closure_type": "transaction",
      "entities": [
        "E013",
        "E028",
        "E030",
        "E017",
        "E029",
        "E018",
        "E020"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E013",
          "to": "E028",
          "invoice_id": "I0092",
          "value": 84263562,
          "hs_code": "85176200",
          "invoice_date": "2026-01-09",
          "discounting_date": "2026-01-22"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E030",
          "invoice_id": "I0116",
          "value": 104796883,
          "hs_code": "72081000",
          "invoice_date": "2026-01-19",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E017",
          "invoice_id": "I0085",
          "value": 100627925,
          "hs_code": "74031100",
          "invoice_date": "2026-02-28",
          "discounting_date": "2026-03-21"
        },
        {
          "hop_type": "invoice",
          "from": "E017",
          "to": "E029",
          "invoice_id": "I0034",
          "value": 85103166,
          "hs_code": null,
          "invoice_date": "2025-11-14",
          "discounting_date": "2025-12-09"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E018",
          "invoice_id": "I0123",
          "value": 89042300,
          "hs_code": "49011000",
          "invoice_date": "2025-12-26",
          "discounting_date": "2026-01-30"
        },
        {
          "hop_type": "invoice",
          "from": "E018",
          "to": "E020",
          "invoice_id": "I0025",
          "value": 99283231,
          "hs_code": "72081000",
          "invoice_date": "2026-01-21",
          "discounting_date": "2026-02-27"
        },
        {
          "hop_type": "invoice",
          "from": "E020",
          "to": "E013",
          "invoice_id": "I0131",
          "value": 94441896,
          "hs_code": "84571000",
          "invoice_date": "2025-11-20",
          "discounting_date": "2025-12-25"
        }
      ],
      "scores": {
        "value": 0.49,
        "product": null,
        "timing": 0.1,
        "externality": 0.29
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.26,
      "expected_loss": 171936009,
      "evidence": {
        "value": "Net position score: 0.49",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.10",
        "externality": "Externality score: 0.29",
        "industry": "Flagged cross-industry trades: Entity E028 (NIC-4620) received HS 85176200; Entity E030 (NIC-4620) received HS 72081000; Entity E017 (NIC-8299) received HS 74031100; Entity E018 (NIC-2610) received HS 49011000; Entity E020 (NIC-5210) received HS 72081000; Entity E013 (NIC-1392) received HS 84571000"
      }
    },
    {
      "ring_id": "R2390",
      "canonical_key": "E003|E031|E005|E028|E030|E020|E029",
      "closure_type": "transaction",
      "entities": [
        "E003",
        "E031",
        "E005",
        "E028",
        "E030",
        "E020",
        "E029"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E003",
          "to": "E031",
          "invoice_id": "I0098",
          "value": 56869830,
          "hs_code": "39012000",
          "invoice_date": "2026-03-18",
          "discounting_date": "2026-03-29"
        },
        {
          "hop_type": "invoice",
          "from": "E031",
          "to": "E005",
          "invoice_id": "I0053",
          "value": 78494117,
          "hs_code": "72081000",
          "invoice_date": "2026-03-03",
          "discounting_date": "2026-03-13"
        },
        {
          "hop_type": "invoice",
          "from": "E005",
          "to": "E028",
          "invoice_id": "I0086",
          "value": 92449408,
          "hs_code": "39012000",
          "invoice_date": "2026-02-17",
          "discounting_date": "2026-03-08"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E030",
          "invoice_id": "I0116",
          "value": 104796883,
          "hs_code": "72081000",
          "invoice_date": "2026-01-19",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E020",
          "invoice_id": "I0048",
          "value": 84274070,
          "hs_code": "72081000",
          "invoice_date": "2025-12-20",
          "discounting_date": "2026-01-12"
        },
        {
          "hop_type": "invoice",
          "from": "E020",
          "to": "E029",
          "invoice_id": "I0056",
          "value": 98071917,
          "hs_code": "84571000",
          "invoice_date": "2025-11-16",
          "discounting_date": "2025-12-28"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E003",
          "invoice_id": "I0046",
          "value": 93130035,
          "hs_code": "84571000",
          "invoice_date": "2026-01-02",
          "discounting_date": "2026-01-24"
        }
      ],
      "scores": {
        "value": 0.26,
        "product": null,
        "timing": 0.33,
        "externality": 0.26
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.28,
      "expected_loss": 171108644,
      "evidence": {
        "value": "Net position score: 0.26",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.33",
        "externality": "Externality score: 0.26",
        "industry": "Flagged cross-industry trades: Entity E031 (NIC-4662) received HS 39012000; Entity E005 (NIC-4690) received HS 72081000; Entity E028 (NIC-4620) received HS 39012000; Entity E030 (NIC-4620) received HS 72081000; Entity E020 (NIC-5210) received HS 72081000; Entity E029 (NIC-4690) received HS 84571000; Entity E003 (NIC-5210) received HS 84571000"
      }
    },
    {
      "ring_id": "R4908",
      "canonical_key": "E008|E028|E030|E020|E029|E018|E019|E031",
      "closure_type": "transaction",
      "entities": [
        "E008",
        "E028",
        "E030",
        "E020",
        "E029",
        "E018",
        "E019",
        "E031"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E008",
          "to": "E028",
          "invoice_id": "I0118",
          "value": 118095206,
          "hs_code": "72081000",
          "invoice_date": "2026-03-24",
          "discounting_date": "2026-05-05"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E030",
          "invoice_id": "I0116",
          "value": 104796883,
          "hs_code": "72081000",
          "invoice_date": "2026-01-19",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E020",
          "invoice_id": "I0048",
          "value": 84274070,
          "hs_code": "72081000",
          "invoice_date": "2025-12-20",
          "discounting_date": "2026-01-12"
        },
        {
          "hop_type": "invoice",
          "from": "E020",
          "to": "E029",
          "invoice_id": "I0056",
          "value": 98071917,
          "hs_code": "84571000",
          "invoice_date": "2025-11-16",
          "discounting_date": "2025-12-28"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E018",
          "invoice_id": "I0123",
          "value": 89042300,
          "hs_code": "49011000",
          "invoice_date": "2025-12-26",
          "discounting_date": "2026-01-30"
        },
        {
          "hop_type": "invoice",
          "from": "E018",
          "to": "E019",
          "invoice_id": "I0119",
          "value": 60906538,
          "hs_code": "39012000",
          "invoice_date": "2026-01-29",
          "discounting_date": "2026-02-01"
        },
        {
          "hop_type": "invoice",
          "from": "E019",
          "to": "E031",
          "invoice_id": "I0050",
          "value": 71326148,
          "hs_code": "10063000",
          "invoice_date": "2026-02-01",
          "discounting_date": "2026-02-15"
        },
        {
          "hop_type": "invoice",
          "from": "E031",
          "to": "E008",
          "invoice_id": "I0093",
          "value": 86365017,
          "hs_code": "74031100",
          "invoice_date": "2026-02-28",
          "discounting_date": "2026-03-07"
        }
      ],
      "scores": {
        "value": 0.27,
        "product": null,
        "timing": 0.21,
        "externality": 0.23
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.24,
      "expected_loss": 170447245,
      "evidence": {
        "value": "Net position score: 0.27",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.21",
        "externality": "Externality score: 0.23",
        "industry": "Flagged cross-industry trades: Entity E028 (NIC-4620) received HS 72081000; Entity E030 (NIC-4620) received HS 72081000; Entity E020 (NIC-5210) received HS 72081000; Entity E029 (NIC-4690) received HS 84571000; Entity E018 (NIC-2610) received HS 49011000; Entity E019 (NIC-4620) received HS 39012000; Entity E031 (NIC-4662) received HS 10063000; Entity E008 (NIC-4662) received HS 74031100"
      }
    },
    {
      "ring_id": "R5220",
      "canonical_key": "E013|E028|E030|E017|E029|E021|E018|E020",
      "closure_type": "transaction",
      "entities": [
        "E013",
        "E028",
        "E030",
        "E017",
        "E029",
        "E021",
        "E018",
        "E020"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E013",
          "to": "E028",
          "invoice_id": "I0092",
          "value": 84263562,
          "hs_code": "85176200",
          "invoice_date": "2026-01-09",
          "discounting_date": "2026-01-22"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E030",
          "invoice_id": "I0116",
          "value": 104796883,
          "hs_code": "72081000",
          "invoice_date": "2026-01-19",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E017",
          "invoice_id": "I0085",
          "value": 100627925,
          "hs_code": "74031100",
          "invoice_date": "2026-02-28",
          "discounting_date": "2026-03-21"
        },
        {
          "hop_type": "invoice",
          "from": "E017",
          "to": "E029",
          "invoice_id": "I0034",
          "value": 85103166,
          "hs_code": null,
          "invoice_date": "2025-11-14",
          "discounting_date": "2025-12-09"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E021",
          "invoice_id": "I0017",
          "value": 79184989,
          "hs_code": "49011000",
          "invoice_date": "2025-12-14",
          "discounting_date": "2026-01-28"
        },
        {
          "hop_type": "invoice",
          "from": "E021",
          "to": "E018",
          "invoice_id": "I0023",
          "value": 89902530,
          "hs_code": "39012000",
          "invoice_date": "2026-03-21",
          "discounting_date": "2026-04-21"
        },
        {
          "hop_type": "invoice",
          "from": "E018",
          "to": "E020",
          "invoice_id": "I0025",
          "value": 99283231,
          "hs_code": "72081000",
          "invoice_date": "2026-01-21",
          "discounting_date": "2026-02-27"
        },
        {
          "hop_type": "invoice",
          "from": "E020",
          "to": "E013",
          "invoice_id": "I0131",
          "value": 94441896,
          "hs_code": "84571000",
          "invoice_date": "2025-11-20",
          "discounting_date": "2025-12-25"
        }
      ],
      "scores": {
        "value": 0.48,
        "product": null,
        "timing": 0.07,
        "externality": 0.32
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.23,
      "expected_loss": 170339660,
      "evidence": {
        "value": "Net position score: 0.48",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.07",
        "externality": "Externality score: 0.32",
        "industry": "Flagged cross-industry trades: Entity E028 (NIC-4620) received HS 85176200; Entity E030 (NIC-4620) received HS 72081000; Entity E017 (NIC-8299) received HS 74031100; Entity E021 (NIC-1392) received HS 49011000; Entity E018 (NIC-2610) received HS 39012000; Entity E020 (NIC-5210) received HS 72081000; Entity E013 (NIC-1392) received HS 84571000"
      }
    },
    {
      "ring_id": "R3212",
      "canonical_key": "E005|E019|E008|E028|E030|E017|E029",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E019",
        "E008",
        "E028",
        "E030",
        "E017",
        "E029"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E005",
          "to": "E019",
          "invoice_id": "I0079",
          "value": 92203262,
          "hs_code": "49011000",
          "invoice_date": "2026-02-10",
          "discounting_date": "2026-03-26"
        },
        {
          "hop_type": "invoice",
          "from": "E019",
          "to": "E008",
          "invoice_id": "I0088",
          "value": 114847359,
          "hs_code": "72081000",
          "invoice_date": "2026-02-10",
          "discounting_date": "2026-03-02"
        },
        {
          "hop_type": "invoice",
          "from": "E008",
          "to": "E028",
          "invoice_id": "I0118",
          "value": 118095206,
          "hs_code": "72081000",
          "invoice_date": "2026-03-24",
          "discounting_date": "2026-05-05"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E030",
          "invoice_id": "I0116",
          "value": 104796883,
          "hs_code": "72081000",
          "invoice_date": "2026-01-19",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E017",
          "invoice_id": "I0085",
          "value": 100627925,
          "hs_code": "74031100",
          "invoice_date": "2026-02-28",
          "discounting_date": "2026-03-21"
        },
        {
          "hop_type": "invoice",
          "from": "E017",
          "to": "E029",
          "invoice_id": "I0034",
          "value": 85103166,
          "hs_code": null,
          "invoice_date": "2025-11-14",
          "discounting_date": "2025-12-09"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E005",
          "invoice_id": "I0140",
          "value": 88392555,
          "hs_code": "39012000",
          "invoice_date": "2026-01-12",
          "discounting_date": "2026-02-08"
        }
      ],
      "scores": {
        "value": 0.54,
        "product": null,
        "timing": 0.09,
        "externality": 0.17
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.24,
      "expected_loss": 168172668,
      "evidence": {
        "value": "Net position score: 0.54",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.09",
        "externality": "Externality score: 0.17",
        "industry": "Flagged cross-industry trades: Entity E019 (NIC-4620) received HS 49011000; Entity E008 (NIC-4662) received HS 72081000; Entity E028 (NIC-4620) received HS 72081000; Entity E030 (NIC-4620) received HS 72081000; Entity E017 (NIC-8299) received HS 74031100; Entity E005 (NIC-4690) received HS 39012000"
      }
    },
    {
      "ring_id": "R3273",
      "canonical_key": "E005|E019|E031|E008|E028|E030|E017|E029",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E019",
        "E031",
        "E008",
        "E028",
        "E030",
        "E017",
        "E029"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E005",
          "to": "E019",
          "invoice_id": "I0079",
          "value": 92203262,
          "hs_code": "49011000",
          "invoice_date": "2026-02-10",
          "discounting_date": "2026-03-26"
        },
        {
          "hop_type": "invoice",
          "from": "E019",
          "to": "E031",
          "invoice_id": "I0050",
          "value": 71326148,
          "hs_code": "10063000",
          "invoice_date": "2026-02-01",
          "discounting_date": "2026-02-15"
        },
        {
          "hop_type": "invoice",
          "from": "E031",
          "to": "E008",
          "invoice_id": "I0093",
          "value": 86365017,
          "hs_code": "74031100",
          "invoice_date": "2026-02-28",
          "discounting_date": "2026-03-07"
        },
        {
          "hop_type": "invoice",
          "from": "E008",
          "to": "E028",
          "invoice_id": "I0118",
          "value": 118095206,
          "hs_code": "72081000",
          "invoice_date": "2026-03-24",
          "discounting_date": "2026-05-05"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E030",
          "invoice_id": "I0116",
          "value": 104796883,
          "hs_code": "72081000",
          "invoice_date": "2026-01-19",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E017",
          "invoice_id": "I0085",
          "value": 100627925,
          "hs_code": "74031100",
          "invoice_date": "2026-02-28",
          "discounting_date": "2026-03-21"
        },
        {
          "hop_type": "invoice",
          "from": "E017",
          "to": "E029",
          "invoice_id": "I0034",
          "value": 85103166,
          "hs_code": null,
          "invoice_date": "2025-11-14",
          "discounting_date": "2025-12-09"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E005",
          "invoice_id": "I0140",
          "value": 88392555,
          "hs_code": "39012000",
          "invoice_date": "2026-01-12",
          "discounting_date": "2026-02-08"
        }
      ],
      "scores": {
        "value": 0.38,
        "product": null,
        "timing": 0.1,
        "externality": 0.24
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.22,
      "expected_loss": 167969256,
      "evidence": {
        "value": "Net position score: 0.38",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.10",
        "externality": "Externality score: 0.24",
        "industry": "Flagged cross-industry trades: Entity E019 (NIC-4620) received HS 49011000; Entity E031 (NIC-4662) received HS 10063000; Entity E008 (NIC-4662) received HS 74031100; Entity E028 (NIC-4620) received HS 72081000; Entity E030 (NIC-4620) received HS 72081000; Entity E017 (NIC-8299) received HS 74031100; Entity E005 (NIC-4690) received HS 39012000"
      }
    },
    {
      "ring_id": "R3806",
      "canonical_key": "E005|E028|E030|E017|E029|E018|E019|E031",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E028",
        "E030",
        "E017",
        "E029",
        "E018",
        "E019",
        "E031"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E005",
          "to": "E028",
          "invoice_id": "I0086",
          "value": 92449408,
          "hs_code": "39012000",
          "invoice_date": "2026-02-17",
          "discounting_date": "2026-03-08"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E030",
          "invoice_id": "I0116",
          "value": 104796883,
          "hs_code": "72081000",
          "invoice_date": "2026-01-19",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E017",
          "invoice_id": "I0085",
          "value": 100627925,
          "hs_code": "74031100",
          "invoice_date": "2026-02-28",
          "discounting_date": "2026-03-21"
        },
        {
          "hop_type": "invoice",
          "from": "E017",
          "to": "E029",
          "invoice_id": "I0034",
          "value": 85103166,
          "hs_code": null,
          "invoice_date": "2025-11-14",
          "discounting_date": "2025-12-09"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E018",
          "invoice_id": "I0123",
          "value": 89042300,
          "hs_code": "49011000",
          "invoice_date": "2025-12-26",
          "discounting_date": "2026-01-30"
        },
        {
          "hop_type": "invoice",
          "from": "E018",
          "to": "E019",
          "invoice_id": "I0119",
          "value": 60906538,
          "hs_code": "39012000",
          "invoice_date": "2026-01-29",
          "discounting_date": "2026-02-01"
        },
        {
          "hop_type": "invoice",
          "from": "E019",
          "to": "E031",
          "invoice_id": "I0050",
          "value": 71326148,
          "hs_code": "10063000",
          "invoice_date": "2026-02-01",
          "discounting_date": "2026-02-15"
        },
        {
          "hop_type": "invoice",
          "from": "E031",
          "to": "E005",
          "invoice_id": "I0053",
          "value": 78494117,
          "hs_code": "72081000",
          "invoice_date": "2026-03-03",
          "discounting_date": "2026-03-13"
        }
      ],
      "scores": {
        "value": 0.39,
        "product": null,
        "timing": 0.13,
        "externality": 0.23
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.24,
      "expected_loss": 166670211,
      "evidence": {
        "value": "Net position score: 0.39",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.13",
        "externality": "Externality score: 0.23",
        "industry": "Flagged cross-industry trades: Entity E028 (NIC-4620) received HS 39012000; Entity E030 (NIC-4620) received HS 72081000; Entity E017 (NIC-8299) received HS 74031100; Entity E018 (NIC-2610) received HS 49011000; Entity E019 (NIC-4620) received HS 39012000; Entity E031 (NIC-4662) received HS 10063000; Entity E005 (NIC-4690) received HS 72081000"
      }
    },
    {
      "ring_id": "R137",
      "canonical_key": "E001|E010|E018|E030|E020|E029|E005|E019",
      "closure_type": "transaction",
      "entities": [
        "E001",
        "E010",
        "E018",
        "E030",
        "E020",
        "E029",
        "E005",
        "E019"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E001",
          "to": "E010",
          "invoice_id": "I0016",
          "value": 58795148,
          "hs_code": "39012000",
          "invoice_date": "2026-01-22",
          "discounting_date": "2026-02-23"
        },
        {
          "hop_type": "invoice",
          "from": "E010",
          "to": "E018",
          "invoice_id": "I0036",
          "value": 68366640,
          "hs_code": "10063000",
          "invoice_date": "2025-12-26",
          "discounting_date": "2026-01-27"
        },
        {
          "hop_type": "invoice",
          "from": "E018",
          "to": "E030",
          "invoice_id": "I0065",
          "value": 85035182,
          "hs_code": "26011100",
          "invoice_date": "2026-03-01",
          "discounting_date": "2026-03-26"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E020",
          "invoice_id": "I0048",
          "value": 84274070,
          "hs_code": "72081000",
          "invoice_date": "2025-12-20",
          "discounting_date": "2026-01-12"
        },
        {
          "hop_type": "invoice",
          "from": "E020",
          "to": "E029",
          "invoice_id": "I0056",
          "value": 98071917,
          "hs_code": "84571000",
          "invoice_date": "2025-11-16",
          "discounting_date": "2025-12-28"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E005",
          "invoice_id": "I0140",
          "value": 88392555,
          "hs_code": "39012000",
          "invoice_date": "2026-01-12",
          "discounting_date": "2026-02-08"
        },
        {
          "hop_type": "invoice",
          "from": "E005",
          "to": "E019",
          "invoice_id": "I0079",
          "value": 92203262,
          "hs_code": "49011000",
          "invoice_date": "2026-02-10",
          "discounting_date": "2026-03-26"
        },
        {
          "hop_type": "invoice",
          "from": "E019",
          "to": "E001",
          "invoice_id": "I0126",
          "value": 135912903,
          "hs_code": "27101990",
          "invoice_date": "2025-12-15",
          "discounting_date": "2025-12-26"
        }
      ],
      "scores": {
        "value": 0.19,
        "product": null,
        "timing": 0.29,
        "externality": 0.25
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.23,
      "expected_loss": 164110128,
      "evidence": {
        "value": "Net position score: 0.19",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.29",
        "externality": "Externality score: 0.25",
        "industry": "Flagged cross-industry trades: Entity E010 (NIC-4662) received HS 39012000; Entity E018 (NIC-2610) received HS 10063000; Entity E030 (NIC-4620) received HS 26011100; Entity E020 (NIC-5210) received HS 72081000; Entity E029 (NIC-4690) received HS 84571000; Entity E005 (NIC-4690) received HS 39012000; Entity E019 (NIC-4620) received HS 49011000; Entity E001 (NIC-5229) received HS 27101990"
      }
    },
    {
      "ring_id": "R2246",
      "canonical_key": "E003|E028|E030|E032|E014|E031|E012|E008",
      "closure_type": "transaction",
      "entities": [
        "E003",
        "E028",
        "E030",
        "E032",
        "E014",
        "E031",
        "E012",
        "E008"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E003",
          "to": "E028",
          "invoice_id": "I0067",
          "value": 103807836,
          "hs_code": "49011000",
          "invoice_date": "2026-02-12",
          "discounting_date": "2026-03-19"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E030",
          "invoice_id": "I0116",
          "value": 104796883,
          "hs_code": "72081000",
          "invoice_date": "2026-01-19",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E032",
          "invoice_id": "I0099",
          "value": 99275859,
          "hs_code": "72081000",
          "invoice_date": "2025-12-10",
          "discounting_date": "2026-01-08"
        },
        {
          "hop_type": "invoice",
          "from": "E032",
          "to": "E014",
          "invoice_id": "I0100",
          "value": 117945293,
          "hs_code": "39012000",
          "invoice_date": "2025-12-26",
          "discounting_date": "2026-01-26"
        },
        {
          "hop_type": "invoice",
          "from": "E014",
          "to": "E031",
          "invoice_id": "I0117",
          "value": 143828973,
          "hs_code": "85176200",
          "invoice_date": "2026-01-29",
          "discounting_date": "2026-03-08"
        },
        {
          "hop_type": "invoice",
          "from": "E031",
          "to": "E012",
          "invoice_id": "I0024",
          "value": 47188161,
          "hs_code": "74031100",
          "invoice_date": "2026-03-14",
          "discounting_date": "2026-04-17"
        },
        {
          "hop_type": "invoice",
          "from": "E012",
          "to": "E008",
          "invoice_id": "I0058",
          "value": 53403007,
          "hs_code": "49011000",
          "invoice_date": "2026-03-01",
          "discounting_date": "2026-03-22"
        },
        {
          "hop_type": "invoice",
          "from": "E008",
          "to": "E003",
          "invoice_id": "I0071",
          "value": 53177285,
          "hs_code": "10063000",
          "invoice_date": "2026-01-14",
          "discounting_date": "2026-02-18"
        }
      ],
      "scores": {
        "value": 0.15,
        "product": null,
        "timing": 0.32,
        "externality": 0.4
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.23,
      "expected_loss": 163606181,
      "evidence": {
        "value": "Net position score: 0.15",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.32",
        "externality": "Externality score: 0.40",
        "industry": "Flagged cross-industry trades: Entity E028 (NIC-4620) received HS 49011000; Entity E030 (NIC-4620) received HS 72081000; Entity E032 (NIC-5229) received HS 72081000; Entity E014 (NIC-2610) received HS 39012000; Entity E031 (NIC-4662) received HS 85176200; Entity E012 (NIC-5229) received HS 74031100; Entity E008 (NIC-4662) received HS 49011000; Entity E003 (NIC-5210) received HS 10063000"
      }
    },
    {
      "ring_id": "R3308",
      "canonical_key": "E005|E023|E012|E008|E028|E030|E017|E029",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E023",
        "E012",
        "E008",
        "E028",
        "E030",
        "E017",
        "E029"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E005",
          "to": "E023",
          "invoice_id": "I0081",
          "value": 98077236,
          "hs_code": "49011000",
          "invoice_date": "2025-11-24",
          "discounting_date": "2025-12-24"
        },
        {
          "hop_type": "invoice",
          "from": "E023",
          "to": "E012",
          "invoice_id": "I0106",
          "value": 103290650,
          "hs_code": null,
          "invoice_date": "2026-01-07",
          "discounting_date": "2026-01-13"
        },
        {
          "hop_type": "invoice",
          "from": "E012",
          "to": "E008",
          "invoice_id": "I0058",
          "value": 53403007,
          "hs_code": "49011000",
          "invoice_date": "2026-03-01",
          "discounting_date": "2026-03-22"
        },
        {
          "hop_type": "invoice",
          "from": "E008",
          "to": "E028",
          "invoice_id": "I0118",
          "value": 118095206,
          "hs_code": "72081000",
          "invoice_date": "2026-03-24",
          "discounting_date": "2026-05-05"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E030",
          "invoice_id": "I0116",
          "value": 104796883,
          "hs_code": "72081000",
          "invoice_date": "2026-01-19",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E017",
          "invoice_id": "I0085",
          "value": 100627925,
          "hs_code": "74031100",
          "invoice_date": "2026-02-28",
          "discounting_date": "2026-03-21"
        },
        {
          "hop_type": "invoice",
          "from": "E017",
          "to": "E029",
          "invoice_id": "I0034",
          "value": 85103166,
          "hs_code": null,
          "invoice_date": "2025-11-14",
          "discounting_date": "2025-12-09"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E005",
          "invoice_id": "I0140",
          "value": 88392555,
          "hs_code": "39012000",
          "invoice_date": "2026-01-12",
          "discounting_date": "2026-02-08"
        }
      ],
      "scores": {
        "value": 0.23,
        "product": null,
        "timing": 0.19,
        "externality": 0.25
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.22,
      "expected_loss": 162910247,
      "evidence": {
        "value": "Net position score: 0.23",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.19",
        "externality": "Externality score: 0.25",
        "industry": "Flagged cross-industry trades: Entity E023 (NIC-7020) received HS 49011000; Entity E008 (NIC-4662) received HS 49011000; Entity E028 (NIC-4620) received HS 72081000; Entity E030 (NIC-4620) received HS 72081000; Entity E017 (NIC-8299) received HS 74031100; Entity E005 (NIC-4690) received HS 39012000"
      }
    },
    {
      "ring_id": "R5127",
      "canonical_key": "E009|E029|E021|E018|E020|E015|E025|E028",
      "closure_type": "transaction",
      "entities": [
        "E009",
        "E029",
        "E021",
        "E018",
        "E020",
        "E015",
        "E025",
        "E028"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E009",
          "to": "E029",
          "invoice_id": "I0052",
          "value": 100973640,
          "hs_code": null,
          "invoice_date": "2026-03-27",
          "discounting_date": "2026-04-17"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E021",
          "invoice_id": "I0017",
          "value": 79184989,
          "hs_code": "49011000",
          "invoice_date": "2025-12-14",
          "discounting_date": "2026-01-28"
        },
        {
          "hop_type": "invoice",
          "from": "E021",
          "to": "E018",
          "invoice_id": "I0023",
          "value": 89902530,
          "hs_code": "39012000",
          "invoice_date": "2026-03-21",
          "discounting_date": "2026-04-21"
        },
        {
          "hop_type": "invoice",
          "from": "E018",
          "to": "E020",
          "invoice_id": "I0025",
          "value": 99283231,
          "hs_code": "72081000",
          "invoice_date": "2026-01-21",
          "discounting_date": "2026-02-27"
        },
        {
          "hop_type": "invoice",
          "from": "E020",
          "to": "E015",
          "invoice_id": "I0014",
          "value": 66619754,
          "hs_code": "49011000",
          "invoice_date": "2026-03-22",
          "discounting_date": "2026-04-02"
        },
        {
          "hop_type": "invoice",
          "from": "E015",
          "to": "E025",
          "invoice_id": "I0127",
          "value": 61253795,
          "hs_code": "72081000",
          "invoice_date": "2025-11-11",
          "discounting_date": "2025-12-11"
        },
        {
          "hop_type": "invoice",
          "from": "E025",
          "to": "E028",
          "invoice_id": "I0121",
          "value": 53050466,
          "hs_code": "84571000",
          "invoice_date": "2026-01-23",
          "discounting_date": "2026-03-03"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E009",
          "invoice_id": "I0040",
          "value": 82458160,
          "hs_code": "27101990",
          "invoice_date": "2025-11-04",
          "discounting_date": "2025-12-03"
        }
      ],
      "scores": {
        "value": 0.24,
        "product": null,
        "timing": 0.28,
        "externality": 0.26
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.25,
      "expected_loss": 160977432,
      "evidence": {
        "value": "Net position score: 0.24",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.28",
        "externality": "Externality score: 0.26",
        "industry": "Flagged cross-industry trades: Entity E021 (NIC-1392) received HS 49011000; Entity E018 (NIC-2610) received HS 39012000; Entity E020 (NIC-5210) received HS 72081000; Entity E015 (NIC-2013) received HS 49011000; Entity E025 (NIC-5229) received HS 72081000; Entity E028 (NIC-4620) received HS 84571000; Entity E009 (NIC-6202) received HS 27101990"
      }
    },
    {
      "ring_id": "R4907",
      "canonical_key": "E008|E028|E030|E020|E029|E018|E019",
      "closure_type": "transaction",
      "entities": [
        "E008",
        "E028",
        "E030",
        "E020",
        "E029",
        "E018",
        "E019"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E008",
          "to": "E028",
          "invoice_id": "I0118",
          "value": 118095206,
          "hs_code": "72081000",
          "invoice_date": "2026-03-24",
          "discounting_date": "2026-05-05"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E030",
          "invoice_id": "I0116",
          "value": 104796883,
          "hs_code": "72081000",
          "invoice_date": "2026-01-19",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E020",
          "invoice_id": "I0048",
          "value": 84274070,
          "hs_code": "72081000",
          "invoice_date": "2025-12-20",
          "discounting_date": "2026-01-12"
        },
        {
          "hop_type": "invoice",
          "from": "E020",
          "to": "E029",
          "invoice_id": "I0056",
          "value": 98071917,
          "hs_code": "84571000",
          "invoice_date": "2025-11-16",
          "discounting_date": "2025-12-28"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E018",
          "invoice_id": "I0123",
          "value": 89042300,
          "hs_code": "49011000",
          "invoice_date": "2025-12-26",
          "discounting_date": "2026-01-30"
        },
        {
          "hop_type": "invoice",
          "from": "E018",
          "to": "E019",
          "invoice_id": "I0119",
          "value": 60906538,
          "hs_code": "39012000",
          "invoice_date": "2026-01-29",
          "discounting_date": "2026-02-01"
        },
        {
          "hop_type": "invoice",
          "from": "E019",
          "to": "E008",
          "invoice_id": "I0088",
          "value": 114847359,
          "hs_code": "72081000",
          "invoice_date": "2026-02-10",
          "discounting_date": "2026-03-02"
        }
      ],
      "scores": {
        "value": 0.24,
        "product": null,
        "timing": 0.26,
        "externality": 0.17
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.24,
      "expected_loss": 158496660,
      "evidence": {
        "value": "Net position score: 0.24",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.26",
        "externality": "Externality score: 0.17",
        "industry": "Flagged cross-industry trades: Entity E028 (NIC-4620) received HS 72081000; Entity E030 (NIC-4620) received HS 72081000; Entity E020 (NIC-5210) received HS 72081000; Entity E029 (NIC-4690) received HS 84571000; Entity E018 (NIC-2610) received HS 49011000; Entity E019 (NIC-4620) received HS 39012000; Entity E008 (NIC-4662) received HS 72081000"
      }
    },
    {
      "ring_id": "R3824",
      "canonical_key": "E005|E028|E030|E020|E029",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E028",
        "E030",
        "E020",
        "E029"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E005",
          "to": "E028",
          "invoice_id": "I0086",
          "value": 92449408,
          "hs_code": "39012000",
          "invoice_date": "2026-02-17",
          "discounting_date": "2026-03-08"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E030",
          "invoice_id": "I0116",
          "value": 104796883,
          "hs_code": "72081000",
          "invoice_date": "2026-01-19",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E020",
          "invoice_id": "I0048",
          "value": 84274070,
          "hs_code": "72081000",
          "invoice_date": "2025-12-20",
          "discounting_date": "2026-01-12"
        },
        {
          "hop_type": "invoice",
          "from": "E020",
          "to": "E029",
          "invoice_id": "I0056",
          "value": 98071917,
          "hs_code": "84571000",
          "invoice_date": "2025-11-16",
          "discounting_date": "2025-12-28"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E005",
          "invoice_id": "I0140",
          "value": 88392555,
          "hs_code": "39012000",
          "invoice_date": "2026-01-12",
          "discounting_date": "2026-02-08"
        }
      ],
      "scores": {
        "value": 0.42,
        "product": null,
        "timing": 0.33,
        "externality": 0.15
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.34,
      "expected_loss": 157659830,
      "evidence": {
        "value": "Net position score: 0.42",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.33",
        "externality": "Externality score: 0.15",
        "industry": "Flagged cross-industry trades: Entity E028 (NIC-4620) received HS 39012000; Entity E030 (NIC-4620) received HS 72081000; Entity E020 (NIC-5210) received HS 72081000; Entity E029 (NIC-4690) received HS 84571000; Entity E005 (NIC-4690) received HS 39012000"
      }
    },
    {
      "ring_id": "R3213",
      "canonical_key": "E005|E019|E008|E028|E030|E020|E014|E031",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E019",
        "E008",
        "E028",
        "E030",
        "E020",
        "E014",
        "E031"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E005",
          "to": "E019",
          "invoice_id": "I0079",
          "value": 92203262,
          "hs_code": "49011000",
          "invoice_date": "2026-02-10",
          "discounting_date": "2026-03-26"
        },
        {
          "hop_type": "invoice",
          "from": "E019",
          "to": "E008",
          "invoice_id": "I0088",
          "value": 114847359,
          "hs_code": "72081000",
          "invoice_date": "2026-02-10",
          "discounting_date": "2026-03-02"
        },
        {
          "hop_type": "invoice",
          "from": "E008",
          "to": "E028",
          "invoice_id": "I0118",
          "value": 118095206,
          "hs_code": "72081000",
          "invoice_date": "2026-03-24",
          "discounting_date": "2026-05-05"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E030",
          "invoice_id": "I0116",
          "value": 104796883,
          "hs_code": "72081000",
          "invoice_date": "2026-01-19",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E020",
          "invoice_id": "I0048",
          "value": 84274070,
          "hs_code": "72081000",
          "invoice_date": "2025-12-20",
          "discounting_date": "2026-01-12"
        },
        {
          "hop_type": "invoice",
          "from": "E020",
          "to": "E014",
          "invoice_id": "I0062",
          "value": 97589062,
          "hs_code": "84571000",
          "invoice_date": "2026-02-21",
          "discounting_date": "2026-03-01"
        },
        {
          "hop_type": "invoice",
          "from": "E014",
          "to": "E031",
          "invoice_id": "I0117",
          "value": 143828973,
          "hs_code": "85176200",
          "invoice_date": "2026-01-29",
          "discounting_date": "2026-03-08"
        },
        {
          "hop_type": "invoice",
          "from": "E031",
          "to": "E005",
          "invoice_id": "I0053",
          "value": 78494117,
          "hs_code": "72081000",
          "invoice_date": "2026-03-03",
          "discounting_date": "2026-03-13"
        }
      ],
      "scores": {
        "value": 0.2,
        "product": null,
        "timing": 0.15,
        "externality": 0.26
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.19,
      "expected_loss": 157274802,
      "evidence": {
        "value": "Net position score: 0.20",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.15",
        "externality": "Externality score: 0.26",
        "industry": "Flagged cross-industry trades: Entity E019 (NIC-4620) received HS 49011000; Entity E008 (NIC-4662) received HS 72081000; Entity E028 (NIC-4620) received HS 72081000; Entity E030 (NIC-4620) received HS 72081000; Entity E020 (NIC-5210) received HS 72081000; Entity E014 (NIC-2610) received HS 84571000; Entity E031 (NIC-4662) received HS 85176200; Entity E005 (NIC-4690) received HS 72081000"
      }
    },
    {
      "ring_id": "R4911",
      "canonical_key": "E008|E028|E030|E020|E029|E021|E019|E031",
      "closure_type": "transaction",
      "entities": [
        "E008",
        "E028",
        "E030",
        "E020",
        "E029",
        "E021",
        "E019",
        "E031"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E008",
          "to": "E028",
          "invoice_id": "I0118",
          "value": 118095206,
          "hs_code": "72081000",
          "invoice_date": "2026-03-24",
          "discounting_date": "2026-05-05"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E030",
          "invoice_id": "I0116",
          "value": 104796883,
          "hs_code": "72081000",
          "invoice_date": "2026-01-19",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E020",
          "invoice_id": "I0048",
          "value": 84274070,
          "hs_code": "72081000",
          "invoice_date": "2025-12-20",
          "discounting_date": "2026-01-12"
        },
        {
          "hop_type": "invoice",
          "from": "E020",
          "to": "E029",
          "invoice_id": "I0056",
          "value": 98071917,
          "hs_code": "84571000",
          "invoice_date": "2025-11-16",
          "discounting_date": "2025-12-28"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E021",
          "invoice_id": "I0017",
          "value": 79184989,
          "hs_code": "49011000",
          "invoice_date": "2025-12-14",
          "discounting_date": "2026-01-28"
        },
        {
          "hop_type": "invoice",
          "from": "E021",
          "to": "E019",
          "invoice_id": "I0111",
          "value": 56062341,
          "hs_code": "72081000",
          "invoice_date": "2026-02-19",
          "discounting_date": "2026-02-28"
        },
        {
          "hop_type": "invoice",
          "from": "E019",
          "to": "E031",
          "invoice_id": "I0050",
          "value": 71326148,
          "hs_code": "10063000",
          "invoice_date": "2026-02-01",
          "discounting_date": "2026-02-15"
        },
        {
          "hop_type": "invoice",
          "from": "E031",
          "to": "E008",
          "invoice_id": "I0093",
          "value": 86365017,
          "hs_code": "74031100",
          "invoice_date": "2026-02-28",
          "discounting_date": "2026-03-07"
        }
      ],
      "scores": {
        "value": 0.24,
        "product": null,
        "timing": 0.22,
        "externality": 0.2
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.22,
      "expected_loss": 156739313,
      "evidence": {
        "value": "Net position score: 0.24",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.22",
        "externality": "Externality score: 0.20",
        "industry": "Flagged cross-industry trades: Entity E028 (NIC-4620) received HS 72081000; Entity E030 (NIC-4620) received HS 72081000; Entity E020 (NIC-5210) received HS 72081000; Entity E029 (NIC-4690) received HS 84571000; Entity E021 (NIC-1392) received HS 49011000; Entity E019 (NIC-4620) received HS 72081000; Entity E031 (NIC-4662) received HS 10063000; Entity E008 (NIC-4662) received HS 74031100"
      }
    },
    {
      "ring_id": "R2248",
      "canonical_key": "E003|E028|E030|E032|E017|E029",
      "closure_type": "transaction",
      "entities": [
        "E003",
        "E028",
        "E030",
        "E032",
        "E017",
        "E029"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E003",
          "to": "E028",
          "invoice_id": "I0067",
          "value": 103807836,
          "hs_code": "49011000",
          "invoice_date": "2026-02-12",
          "discounting_date": "2026-03-19"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E030",
          "invoice_id": "I0116",
          "value": 104796883,
          "hs_code": "72081000",
          "invoice_date": "2026-01-19",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E032",
          "invoice_id": "I0099",
          "value": 99275859,
          "hs_code": "72081000",
          "invoice_date": "2025-12-10",
          "discounting_date": "2026-01-08"
        },
        {
          "hop_type": "invoice",
          "from": "E032",
          "to": "E017",
          "invoice_id": "I0044",
          "value": 52730277,
          "hs_code": "49011000",
          "invoice_date": "2026-01-10",
          "discounting_date": "2026-02-17"
        },
        {
          "hop_type": "invoice",
          "from": "E017",
          "to": "E029",
          "invoice_id": "I0034",
          "value": 85103166,
          "hs_code": null,
          "invoice_date": "2025-11-14",
          "discounting_date": "2025-12-09"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E003",
          "invoice_id": "I0046",
          "value": 93130035,
          "hs_code": "84571000",
          "invoice_date": "2026-01-02",
          "discounting_date": "2026-01-24"
        }
      ],
      "scores": {
        "value": 0.28,
        "product": null,
        "timing": 0.36,
        "externality": 0.21
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.29,
      "expected_loss": 156414908,
      "evidence": {
        "value": "Net position score: 0.28",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.36",
        "externality": "Externality score: 0.21",
        "industry": "Flagged cross-industry trades: Entity E028 (NIC-4620) received HS 49011000; Entity E030 (NIC-4620) received HS 72081000; Entity E032 (NIC-5229) received HS 72081000; Entity E017 (NIC-8299) received HS 49011000; Entity E003 (NIC-5210) received HS 84571000"
      }
    },
    {
      "ring_id": "R4950",
      "canonical_key": "E008|E028|E030|E032|E014|E031",
      "closure_type": "transaction",
      "entities": [
        "E008",
        "E028",
        "E030",
        "E032",
        "E014",
        "E031"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E008",
          "to": "E028",
          "invoice_id": "I0118",
          "value": 118095206,
          "hs_code": "72081000",
          "invoice_date": "2026-03-24",
          "discounting_date": "2026-05-05"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E030",
          "invoice_id": "I0116",
          "value": 104796883,
          "hs_code": "72081000",
          "invoice_date": "2026-01-19",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E032",
          "invoice_id": "I0099",
          "value": 99275859,
          "hs_code": "72081000",
          "invoice_date": "2025-12-10",
          "discounting_date": "2026-01-08"
        },
        {
          "hop_type": "invoice",
          "from": "E032",
          "to": "E014",
          "invoice_id": "I0100",
          "value": 117945293,
          "hs_code": "39012000",
          "invoice_date": "2025-12-26",
          "discounting_date": "2026-01-26"
        },
        {
          "hop_type": "invoice",
          "from": "E014",
          "to": "E031",
          "invoice_id": "I0117",
          "value": 143828973,
          "hs_code": "85176200",
          "invoice_date": "2026-01-29",
          "discounting_date": "2026-03-08"
        },
        {
          "hop_type": "invoice",
          "from": "E031",
          "to": "E008",
          "invoice_id": "I0093",
          "value": 86365017,
          "hs_code": "74031100",
          "invoice_date": "2026-02-28",
          "discounting_date": "2026-03-07"
        }
      ],
      "scores": {
        "value": 0.22,
        "product": null,
        "timing": 0.25,
        "externality": 0.24
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.23,
      "expected_loss": 155606153,
      "evidence": {
        "value": "Net position score: 0.22",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.25",
        "externality": "Externality score: 0.24",
        "industry": "Flagged cross-industry trades: Entity E028 (NIC-4620) received HS 72081000; Entity E030 (NIC-4620) received HS 72081000; Entity E032 (NIC-5229) received HS 72081000; Entity E014 (NIC-2610) received HS 39012000; Entity E031 (NIC-4662) received HS 85176200; Entity E008 (NIC-4662) received HS 74031100"
      }
    },
    {
      "ring_id": "R5360",
      "canonical_key": "E017|E029|E021|E018|E020|E030",
      "closure_type": "transaction",
      "entities": [
        "E017",
        "E029",
        "E021",
        "E018",
        "E020",
        "E030"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E017",
          "to": "E029",
          "invoice_id": "I0034",
          "value": 85103166,
          "hs_code": null,
          "invoice_date": "2025-11-14",
          "discounting_date": "2025-12-09"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E021",
          "invoice_id": "I0017",
          "value": 79184989,
          "hs_code": "49011000",
          "invoice_date": "2025-12-14",
          "discounting_date": "2026-01-28"
        },
        {
          "hop_type": "invoice",
          "from": "E021",
          "to": "E018",
          "invoice_id": "I0023",
          "value": 89902530,
          "hs_code": "39012000",
          "invoice_date": "2026-03-21",
          "discounting_date": "2026-04-21"
        },
        {
          "hop_type": "invoice",
          "from": "E018",
          "to": "E020",
          "invoice_id": "I0025",
          "value": 99283231,
          "hs_code": "72081000",
          "invoice_date": "2026-01-21",
          "discounting_date": "2026-02-27"
        },
        {
          "hop_type": "invoice",
          "from": "E020",
          "to": "E030",
          "invoice_id": "I0038",
          "value": 122941841,
          "hs_code": "84571000",
          "invoice_date": "2025-12-21",
          "discounting_date": "2025-12-28"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E017",
          "invoice_id": "I0085",
          "value": 100627925,
          "hs_code": "74031100",
          "invoice_date": "2026-02-28",
          "discounting_date": "2026-03-21"
        }
      ],
      "scores": {
        "value": 0.36,
        "product": null,
        "timing": 0.17,
        "externality": 0.3
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.27,
      "expected_loss": 153768794,
      "evidence": {
        "value": "Net position score: 0.36",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.17",
        "externality": "Externality score: 0.30",
        "industry": "Flagged cross-industry trades: Entity E021 (NIC-1392) received HS 49011000; Entity E018 (NIC-2610) received HS 39012000; Entity E020 (NIC-5210) received HS 72081000; Entity E030 (NIC-4620) received HS 84571000; Entity E017 (NIC-8299) received HS 74031100"
      }
    },
    {
      "ring_id": "R3214",
      "canonical_key": "E005|E019|E008|E028|E030|E020|E015|E029",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E019",
        "E008",
        "E028",
        "E030",
        "E020",
        "E015",
        "E029"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E005",
          "to": "E019",
          "invoice_id": "I0079",
          "value": 92203262,
          "hs_code": "49011000",
          "invoice_date": "2026-02-10",
          "discounting_date": "2026-03-26"
        },
        {
          "hop_type": "invoice",
          "from": "E019",
          "to": "E008",
          "invoice_id": "I0088",
          "value": 114847359,
          "hs_code": "72081000",
          "invoice_date": "2026-02-10",
          "discounting_date": "2026-03-02"
        },
        {
          "hop_type": "invoice",
          "from": "E008",
          "to": "E028",
          "invoice_id": "I0118",
          "value": 118095206,
          "hs_code": "72081000",
          "invoice_date": "2026-03-24",
          "discounting_date": "2026-05-05"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E030",
          "invoice_id": "I0116",
          "value": 104796883,
          "hs_code": "72081000",
          "invoice_date": "2026-01-19",
          "discounting_date": "2026-02-13"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E020",
          "invoice_id": "I0048",
          "value": 84274070,
          "hs_code": "72081000",
          "invoice_date": "2025-12-20",
          "discounting_date": "2026-01-12"
        },
        {
          "hop_type": "invoice",
          "from": "E020",
          "to": "E015",
          "invoice_id": "I0014",
          "value": 66619754,
          "hs_code": "49011000",
          "invoice_date": "2026-03-22",
          "discounting_date": "2026-04-02"
        },
        {
          "hop_type": "invoice",
          "from": "E015",
          "to": "E029",
          "invoice_id": "I0097",
          "value": 78601176,
          "hs_code": "72081000",
          "invoice_date": "2025-11-30",
          "discounting_date": "2025-12-11"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E005",
          "invoice_id": "I0140",
          "value": 88392555,
          "hs_code": "39012000",
          "invoice_date": "2026-01-12",
          "discounting_date": "2026-02-08"
        }
      ],
      "scores": {
        "value": 0.4,
        "product": null,
        "timing": 0.08,
        "externality": 0.21
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.21,
      "expected_loss": 153555623,
      "evidence": {
        "value": "Net position score: 0.40",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.08",
        "externality": "Externality score: 0.21",
        "industry": "Flagged cross-industry trades: Entity E019 (NIC-4620) received HS 49011000; Entity E008 (NIC-4662) received HS 72081000; Entity E028 (NIC-4620) received HS 72081000; Entity E030 (NIC-4620) received HS 72081000; Entity E020 (NIC-5210) received HS 72081000; Entity E015 (NIC-2013) received HS 49011000; Entity E029 (NIC-4690) received HS 72081000; Entity E005 (NIC-4690) received HS 39012000"
      }
    },
    {
      "ring_id": "R5234",
      "canonical_key": "E013|E030|E032|E017|E029|E018|E020",
      "closure_type": "transaction",
      "entities": [
        "E013",
        "E030",
        "E032",
        "E017",
        "E029",
        "E018",
        "E020"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E013",
          "to": "E030",
          "invoice_id": "I0045",
          "value": 78457894,
          "hs_code": "26011100",
          "invoice_date": "2026-01-01",
          "discounting_date": "2026-02-03"
        },
        {
          "hop_type": "invoice",
          "from": "E030",
          "to": "E032",
          "invoice_id": "I0099",
          "value": 99275859,
          "hs_code": "72081000",
          "invoice_date": "2025-12-10",
          "discounting_date": "2026-01-08"
        },
        {
          "hop_type": "invoice",
          "from": "E032",
          "to": "E017",
          "invoice_id": "I0044",
          "value": 52730277,
          "hs_code": "49011000",
          "invoice_date": "2026-01-10",
          "discounting_date": "2026-02-17"
        },
        {
          "hop_type": "invoice",
          "from": "E017",
          "to": "E029",
          "invoice_id": "I0034",
          "value": 85103166,
          "hs_code": null,
          "invoice_date": "2025-11-14",
          "discounting_date": "2025-12-09"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E018",
          "invoice_id": "I0123",
          "value": 89042300,
          "hs_code": "49011000",
          "invoice_date": "2025-12-26",
          "discounting_date": "2026-01-30"
        },
        {
          "hop_type": "invoice",
          "from": "E018",
          "to": "E020",
          "invoice_id": "I0025",
          "value": 99283231,
          "hs_code": "72081000",
          "invoice_date": "2026-01-21",
          "discounting_date": "2026-02-27"
        },
        {
          "hop_type": "invoice",
          "from": "E020",
          "to": "E013",
          "invoice_id": "I0131",
          "value": 94441896,
          "hs_code": "84571000",
          "invoice_date": "2025-11-20",
          "discounting_date": "2025-12-25"
        }
      ],
      "scores": {
        "value": 0.22,
        "product": null,
        "timing": 0.29,
        "externality": 0.32
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.26,
      "expected_loss": 153516633,
      "evidence": {
        "value": "Net position score: 0.22",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.29",
        "externality": "Externality score: 0.32",
        "industry": "Flagged cross-industry trades: Entity E030 (NIC-4620) received HS 26011100; Entity E032 (NIC-5229) received HS 72081000; Entity E017 (NIC-8299) received HS 49011000; Entity E018 (NIC-2610) received HS 49011000; Entity E020 (NIC-5210) received HS 72081000; Entity E013 (NIC-1392) received HS 84571000"
      }
    },
    {
      "ring_id": "R1754",
      "canonical_key": "E003|E027|E032|E014|E031|E005|E019|E008",
      "closure_type": "transaction",
      "entities": [
        "E003",
        "E027",
        "E032",
        "E014",
        "E031",
        "E005",
        "E019",
        "E008"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E003",
          "to": "E027",
          "invoice_id": "I0063",
          "value": 98268296,
          "hs_code": "84571000",
          "invoice_date": "2025-12-29",
          "discounting_date": "2026-02-06"
        },
        {
          "hop_type": "invoice",
          "from": "E027",
          "to": "E032",
          "invoice_id": "I0072",
          "value": 112159236,
          "hs_code": "49011000",
          "invoice_date": "2025-12-08",
          "discounting_date": "2026-01-04"
        },
        {
          "hop_type": "invoice",
          "from": "E032",
          "to": "E014",
          "invoice_id": "I0100",
          "value": 117945293,
          "hs_code": "39012000",
          "invoice_date": "2025-12-26",
          "discounting_date": "2026-01-26"
        },
        {
          "hop_type": "invoice",
          "from": "E014",
          "to": "E031",
          "invoice_id": "I0117",
          "value": 143828973,
          "hs_code": "85176200",
          "invoice_date": "2026-01-29",
          "discounting_date": "2026-03-08"
        },
        {
          "hop_type": "invoice",
          "from": "E031",
          "to": "E005",
          "invoice_id": "I0053",
          "value": 78494117,
          "hs_code": "72081000",
          "invoice_date": "2026-03-03",
          "discounting_date": "2026-03-13"
        },
        {
          "hop_type": "invoice",
          "from": "E005",
          "to": "E019",
          "invoice_id": "I0079",
          "value": 92203262,
          "hs_code": "49011000",
          "invoice_date": "2026-02-10",
          "discounting_date": "2026-03-26"
        },
        {
          "hop_type": "invoice",
          "from": "E019",
          "to": "E008",
          "invoice_id": "I0088",
          "value": 114847359,
          "hs_code": "72081000",
          "invoice_date": "2026-02-10",
          "discounting_date": "2026-03-02"
        },
        {
          "hop_type": "invoice",
          "from": "E008",
          "to": "E003",
          "invoice_id": "I0071",
          "value": 53177285,
          "hs_code": "10063000",
          "invoice_date": "2026-01-14",
          "discounting_date": "2026-02-18"
        }
      ],
      "scores": {
        "value": 0.12,
        "product": null,
        "timing": 0.3,
        "externality": 0.25
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.19,
      "expected_loss": 153438917,
      "evidence": {
        "value": "Net position score: 0.12",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.30",
        "externality": "Externality score: 0.25",
        "industry": "Flagged cross-industry trades: Entity E027 (NIC-5229) received HS 84571000; Entity E032 (NIC-5229) received HS 49011000; Entity E014 (NIC-2610) received HS 39012000; Entity E031 (NIC-4662) received HS 85176200; Entity E005 (NIC-4690) received HS 72081000; Entity E019 (NIC-4620) received HS 49011000; Entity E008 (NIC-4662) received HS 72081000; Entity E003 (NIC-5210) received HS 10063000"
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
    },
    {
      "id": "E033",
      "industry_class": "services"
    },
    {
      "id": "E034",
      "industry_class": "distribution"
    },
    {
      "id": "E035",
      "industry_class": "trading"
    },
    {
      "id": "E036",
      "industry_class": "distribution"
    },
    {
      "id": "E037",
      "industry_class": "manufacturing"
    },
    {
      "id": "E038",
      "industry_class": "trading"
    },
    {
      "id": "E039",
      "industry_class": "services"
    },
    {
      "id": "E040",
      "industry_class": "services"
    },
    {
      "id": "E041",
      "industry_class": "distribution"
    },
    {
      "id": "E042",
      "industry_class": "distribution"
    },
    {
      "id": "E043",
      "industry_class": "services"
    },
    {
      "id": "E044",
      "industry_class": "distribution"
    },
    {
      "id": "E045",
      "industry_class": "trading"
    },
    {
      "id": "E046",
      "industry_class": "manufacturing"
    },
    {
      "id": "E047",
      "industry_class": "manufacturing"
    },
    {
      "id": "E048",
      "industry_class": "distribution"
    },
    {
      "id": "E049",
      "industry_class": "services"
    },
    {
      "id": "E050",
      "industry_class": "distribution"
    },
    {
      "id": "E051",
      "industry_class": "trading"
    },
    {
      "id": "E052",
      "industry_class": "trading"
    },
    {
      "id": "E053",
      "industry_class": "trading"
    },
    {
      "id": "E054",
      "industry_class": "services"
    },
    {
      "id": "E055",
      "industry_class": "distribution"
    },
    {
      "id": "E056",
      "industry_class": "distribution"
    },
    {
      "id": "E057",
      "industry_class": "manufacturing"
    },
    {
      "id": "E058",
      "industry_class": "manufacturing"
    },
    {
      "id": "E059",
      "industry_class": "services"
    },
    {
      "id": "E060",
      "industry_class": "trading"
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
      "to": "E009"
    },
    {
      "from": "E009",
      "to": "E019"
    },
    {
      "from": "E033",
      "to": "E034"
    },
    {
      "from": "E034",
      "to": "E035"
    },
    {
      "from": "E035",
      "to": "E036"
    },
    {
      "from": "E036",
      "to": "E037"
    },
    {
      "from": "E037",
      "to": "E038"
    },
    {
      "from": "E038",
      "to": "E039"
    },
    {
      "from": "E040",
      "to": "E041"
    },
    {
      "from": "E041",
      "to": "E042"
    },
    {
      "from": "E042",
      "to": "E043"
    },
    {
      "from": "E043",
      "to": "E044"
    },
    {
      "from": "E044",
      "to": "E045"
    },
    {
      "from": "E045",
      "to": "E040"
    },
    {
      "from": "E046",
      "to": "E047"
    },
    {
      "from": "E047",
      "to": "E048"
    },
    {
      "from": "E048",
      "to": "E049"
    },
    {
      "from": "E049",
      "to": "E046"
    },
    {
      "from": "E050",
      "to": "E051"
    },
    {
      "from": "E051",
      "to": "E052"
    },
    {
      "from": "E052",
      "to": "E053"
    },
    {
      "from": "E053",
      "to": "E054"
    },
    {
      "from": "E054",
      "to": "E055"
    },
    {
      "from": "E055",
      "to": "E056"
    },
    {
      "from": "E056",
      "to": "E050"
    },
    {
      "from": "E057",
      "to": "E058"
    },
    {
      "from": "E058",
      "to": "E059"
    },
    {
      "from": "E059",
      "to": "E060"
    },
    {
      "from": "E060",
      "to": "E057"
    }
  ]
};
