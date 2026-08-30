const SCORED = {
  "schema_version": 1,
  "source_dataset": "entities",
  "count": 50,
  "rings": [
    {
      "ring_id": "R5541",
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
      "aggregate": 0.81,
      "expected_loss": 342178803,
      "evidence": {
        "value": "Net position score: 0.89",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.60",
        "externality": "Externality score: 1.00",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R5539",
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
      "aggregate": 0.82,
      "expected_loss": 278002806,
      "evidence": {
        "value": "Net position score: 0.86",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.65",
        "externality": "Externality score: 1.00",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R3415",
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
      "aggregate": 0.32,
      "expected_loss": 262468562,
      "evidence": {
        "value": "Net position score: 0.49",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.32",
        "externality": "Externality score: 0.21",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R5542",
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
      "expected_loss": 260247944,
      "evidence": {
        "value": "Net position score: 0.92",
        "product": "HS code consistency: 1.00",
        "timing": "Regularity score: 0.69",
        "externality": "Externality score: 1.00",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R5538",
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
      "aggregate": 0.75,
      "expected_loss": 253344813,
      "evidence": {
        "value": "Net position score: 0.90",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.47",
        "externality": "Externality score: 1.00",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R3414",
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
      "aggregate": 0.29,
      "expected_loss": 235740468,
      "evidence": {
        "value": "Net position score: 0.59",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.19",
        "externality": "Externality score: 0.22",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R5540",
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
      "aggregate": 0.85,
      "expected_loss": 231626657,
      "evidence": {
        "value": "Net position score: 0.90",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.69",
        "externality": "Externality score: 1.00",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R3416",
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
      "aggregate": 0.29,
      "expected_loss": 220185265,
      "evidence": {
        "value": "Net position score: 0.38",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.25",
        "externality": "Externality score: 0.27",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R5211",
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
      "aggregate": 0.34,
      "expected_loss": 212554891,
      "evidence": {
        "value": "Net position score: 0.54",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.29",
        "externality": "Externality score: 0.26",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R120",
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
      "aggregate": 0.27,
      "expected_loss": 204583553,
      "evidence": {
        "value": "Net position score: 0.21",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.32",
        "externality": "Externality score: 0.29",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R3882",
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
      "aggregate": 0.3,
      "expected_loss": 203765489,
      "evidence": {
        "value": "Net position score: 0.32",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.35",
        "externality": "Externality score: 0.24",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R5327",
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
      "expected_loss": 200482367,
      "evidence": {
        "value": "Net position score: 0.28",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.25",
        "externality": "Externality score: 0.32",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R3268",
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
      "expected_loss": 198092481,
      "evidence": {
        "value": "Net position score: 0.28",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.17",
        "externality": "Externality score: 0.26",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R5214",
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
      "aggregate": 0.31,
      "expected_loss": 195772490,
      "evidence": {
        "value": "Net position score: 0.36",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.31",
        "externality": "Externality score: 0.28",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R3117",
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
      "expected_loss": 194429712,
      "evidence": {
        "value": "Net position score: 0.24",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.45",
        "externality": "Externality score: 0.26",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R2281",
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
      "aggregate": 0.27,
      "expected_loss": 192973088,
      "evidence": {
        "value": "Net position score: 0.15",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.32",
        "externality": "Externality score: 0.40",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R5225",
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
      "aggregate": 0.3,
      "expected_loss": 190123590,
      "evidence": {
        "value": "Net position score: 0.44",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.29",
        "externality": "Externality score: 0.21",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R2280",
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
      "aggregate": 0.27,
      "expected_loss": 188508799,
      "evidence": {
        "value": "Net position score: 0.16",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.40",
        "externality": "Externality score: 0.29",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R5331",
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
      "aggregate": 0.3,
      "expected_loss": 188256120,
      "evidence": {
        "value": "Net position score: 0.41",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.21",
        "externality": "Externality score: 0.32",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R5232",
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
      "aggregate": 0.27,
      "expected_loss": 187229311,
      "evidence": {
        "value": "Net position score: 0.47",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.14",
        "externality": "Externality score: 0.28",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R3357",
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
      "aggregate": 0.25,
      "expected_loss": 183805664,
      "evidence": {
        "value": "Net position score: 0.19",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.33",
        "externality": "Externality score: 0.24",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R3902",
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
      "expected_loss": 183672774,
      "evidence": {
        "value": "Net position score: 0.23",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.44",
        "externality": "Externality score: 0.24",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R3361",
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
      "expected_loss": 182744030,
      "evidence": {
        "value": "Net position score: 0.31",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.17",
        "externality": "Externality score: 0.26",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R3322",
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
      "aggregate": 0.24,
      "expected_loss": 181914088,
      "evidence": {
        "value": "Net position score: 0.32",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.20",
        "externality": "Externality score: 0.23",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R3365",
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
      "aggregate": 0.23,
      "expected_loss": 173771316,
      "evidence": {
        "value": "Net position score: 0.30",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.18",
        "externality": "Externality score: 0.21",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R1787",
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
      "aggregate": 0.21,
      "expected_loss": 171993890,
      "evidence": {
        "value": "Net position score: 0.12",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.30",
        "externality": "Externality score: 0.25",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R3881",
      "canonical_key": "E005|E028|E030|E020|E029|E018|E014|E031",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E028",
        "E030",
        "E020",
        "E029",
        "E018",
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
          "to": "E014",
          "invoice_id": "I0009",
          "value": 57889740,
          "hs_code": "85176200",
          "invoice_date": "2026-02-11",
          "discounting_date": "2026-03-20"
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
        "value": 0.11,
        "product": null,
        "timing": 0.4,
        "externality": 0.29
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.23,
      "expected_loss": 171923336,
      "evidence": {
        "value": "Net position score: 0.11",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.40",
        "externality": "Externality score: 0.29",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R3883",
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
      "aggregate": 0.26,
      "expected_loss": 171034923,
      "evidence": {
        "value": "Net position score: 0.29",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.28",
        "externality": "Externality score: 0.21",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R3274",
      "canonical_key": "E005|E019|E023|E012|E008|E028|E030|E031",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E019",
        "E023",
        "E012",
        "E008",
        "E028",
        "E030",
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
          "to": "E023",
          "invoice_id": "I0074",
          "value": 120930545,
          "hs_code": "27101990",
          "invoice_date": "2026-03-06",
          "discounting_date": "2026-03-18"
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
        "value": 0.13,
        "product": null,
        "timing": 0.23,
        "externality": 0.33
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.22,
      "expected_loss": 170162437,
      "evidence": {
        "value": "Net position score: 0.13",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.23",
        "externality": "Externality score: 0.33",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R138",
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
      "aggregate": 0.24,
      "expected_loss": 170154218,
      "evidence": {
        "value": "Net position score: 0.19",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.29",
        "externality": "Externality score: 0.25",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R2426",
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
      "expected_loss": 169881742,
      "evidence": {
        "value": "Net position score: 0.26",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.33",
        "externality": "Externality score: 0.26",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R3269",
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
      "aggregate": 0.22,
      "expected_loss": 169647886,
      "evidence": {
        "value": "Net position score: 0.32",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.19",
        "externality": "Externality score: 0.19",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R3866",
      "canonical_key": "E005|E028|E030|E020|E013|E032|E014|E031",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E028",
        "E030",
        "E020",
        "E013",
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
          "to": "E032",
          "invoice_id": "I0060",
          "value": 37949407,
          "hs_code": "72081000",
          "invoice_date": "2026-01-08",
          "discounting_date": "2026-01-20"
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
        "value": 0.08,
        "product": null,
        "timing": 0.39,
        "externality": 0.34
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.22,
      "expected_loss": 166533012,
      "evidence": {
        "value": "Net position score: 0.08",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.39",
        "externality": "Externality score: 0.34",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R3356",
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
      "expected_loss": 166515527,
      "evidence": {
        "value": "Net position score: 0.23",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.19",
        "externality": "Externality score: 0.25",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R5004",
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
      "aggregate": 0.23,
      "expected_loss": 166269095,
      "evidence": {
        "value": "Net position score: 0.27",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.21",
        "externality": "Externality score: 0.23",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R3261",
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
      "aggregate": 0.2,
      "expected_loss": 165340243,
      "evidence": {
        "value": "Net position score: 0.20",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.15",
        "externality": "Externality score: 0.26",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R711",
      "canonical_key": "E003|E008|E028|E030|E031|E032|E017|E029",
      "closure_type": "transaction",
      "entities": [
        "E003",
        "E008",
        "E028",
        "E030",
        "E031",
        "E032",
        "E017",
        "E029"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E003",
          "to": "E008",
          "invoice_id": "I0091",
          "value": 65510456,
          "hs_code": "49011000",
          "invoice_date": "2026-01-23",
          "discounting_date": "2026-02-21"
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
          "to": "E032",
          "invoice_id": "I0075",
          "value": 80273443,
          "hs_code": "74031100",
          "invoice_date": "2026-01-22",
          "discounting_date": "2026-02-06"
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
        "value": 0.14,
        "product": null,
        "timing": 0.29,
        "externality": 0.31
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.23,
      "expected_loss": 165316833,
      "evidence": {
        "value": "Net position score: 0.14",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.29",
        "externality": "Externality score: 0.31",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R5323",
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
      "aggregate": 0.22,
      "expected_loss": 164710175,
      "evidence": {
        "value": "Net position score: 0.48",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.07",
        "externality": "Externality score: 0.32",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R5338",
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
      "aggregate": 0.27,
      "expected_loss": 163545156,
      "evidence": {
        "value": "Net position score: 0.22",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.29",
        "externality": "Externality score: 0.32",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R5229",
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
      "aggregate": 0.26,
      "expected_loss": 162773651,
      "evidence": {
        "value": "Net position score: 0.24",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.28",
        "externality": "Externality score: 0.26",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R5335",
      "canonical_key": "E013|E030|E031|E032|E017|E029|E018|E020",
      "closure_type": "transaction",
      "entities": [
        "E013",
        "E030",
        "E031",
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
          "to": "E032",
          "invoice_id": "I0075",
          "value": 80273443,
          "hs_code": "74031100",
          "invoice_date": "2026-01-22",
          "discounting_date": "2026-02-06"
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
        "value": 0.19,
        "product": null,
        "timing": 0.19,
        "externality": 0.36
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.23,
      "expected_loss": 162475284,
      "evidence": {
        "value": "Net position score: 0.19",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.19",
        "externality": "Externality score: 0.36",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R5339",
      "canonical_key": "E013|E030|E032|E017|E029|E021|E018|E020",
      "closure_type": "transaction",
      "entities": [
        "E013",
        "E030",
        "E032",
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
        "value": 0.24,
        "product": null,
        "timing": 0.17,
        "externality": 0.34
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.24,
      "expected_loss": 162451818,
      "evidence": {
        "value": "Net position score: 0.24",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.17",
        "externality": "Externality score: 0.34",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R5322",
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
      "aggregate": 0.25,
      "expected_loss": 161767620,
      "evidence": {
        "value": "Net position score: 0.49",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.10",
        "externality": "Externality score: 0.29",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R2462",
      "canonical_key": "E003|E031|E008|E028|E030|E032|E017|E029",
      "closure_type": "transaction",
      "entities": [
        "E003",
        "E031",
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
        "value": 0.14,
        "product": null,
        "timing": 0.28,
        "externality": 0.31
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.23,
      "expected_loss": 160181469,
      "evidence": {
        "value": "Net position score: 0.14",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.28",
        "externality": "Externality score: 0.31",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R3692",
      "canonical_key": "E005|E027|E032|E017|E029|E018|E030|E031",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E027",
        "E032",
        "E017",
        "E029",
        "E018",
        "E030",
        "E031"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E005",
          "to": "E027",
          "invoice_id": "I0110",
          "value": 83449956,
          "hs_code": "84571000",
          "invoice_date": "2026-01-10",
          "discounting_date": "2026-02-21"
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
        "value": 0.14,
        "product": null,
        "timing": 0.29,
        "externality": 0.28
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.23,
      "expected_loss": 158755591,
      "evidence": {
        "value": "Net position score: 0.14",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.29",
        "externality": "Externality score: 0.28",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R3321",
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
      "aggregate": 0.21,
      "expected_loss": 158459484,
      "evidence": {
        "value": "Net position score: 0.38",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.10",
        "externality": "Externality score: 0.24",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R5046",
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
      "aggregate": 0.24,
      "expected_loss": 157727635,
      "evidence": {
        "value": "Net position score: 0.22",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.25",
        "externality": "Externality score: 0.24",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R2429",
      "canonical_key": "E003|E031|E005|E028|E030|E032|E017|E029",
      "closure_type": "transaction",
      "entities": [
        "E003",
        "E031",
        "E005",
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
        "value": 0.17,
        "product": null,
        "timing": 0.26,
        "externality": 0.31
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.24,
      "expected_loss": 157647123,
      "evidence": {
        "value": "Net position score: 0.17",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.26",
        "externality": "Externality score: 0.31",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R5002",
      "canonical_key": "E008|E028|E030|E020|E029|E018|E014|E031",
      "closure_type": "transaction",
      "entities": [
        "E008",
        "E028",
        "E030",
        "E020",
        "E029",
        "E018",
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
          "to": "E014",
          "invoice_id": "I0009",
          "value": 57889740,
          "hs_code": "85176200",
          "invoice_date": "2026-02-11",
          "discounting_date": "2026-03-20"
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
        "value": 0.11,
        "product": null,
        "timing": 0.29,
        "externality": 0.26
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.2,
      "expected_loss": 156343401,
      "evidence": {
        "value": "Net position score: 0.11",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.29",
        "externality": "Externality score: 0.26",
        "industry": "All trades consistent with declared industry codes."
      }
    },
    {
      "ring_id": "R2460",
      "canonical_key": "E003|E031|E008|E028|E030|E020|E029",
      "closure_type": "transaction",
      "entities": [
        "E003",
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
          "to": "E003",
          "invoice_id": "I0046",
          "value": 93130035,
          "hs_code": "84571000",
          "invoice_date": "2026-01-02",
          "discounting_date": "2026-01-24"
        }
      ],
      "scores": {
        "value": 0.21,
        "product": null,
        "timing": 0.26,
        "externality": 0.26
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.24,
      "expected_loss": 156056430,
      "evidence": {
        "value": "Net position score: 0.21",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.26",
        "externality": "Externality score: 0.26",
        "industry": "All trades consistent with declared industry codes."
      }
    }
  ]
};
const BACKDROP = {
  "nodes": [
    {
      "id": "E001",
      "industry_class": "distribution",
      "name": "Meridian Supply Chain Ltd",
      "degree": 6,
      "x": 1143.6733229646416,
      "y": 434.8501527180166,
      "vx": 0.015566895716118167,
      "vy": -0.0047642452817086125
    },
    {
      "id": "E002",
      "industry_class": "trading",
      "name": "Coastal Trading Pvt Ltd",
      "degree": 7,
      "x": 857.6475597433295,
      "y": 601.7005187595256,
      "vx": 0.017679367772993438,
      "vy": -0.00033247987695971676
    },
    {
      "id": "E003",
      "industry_class": "distribution",
      "name": "Trueform Logistics Co",
      "degree": 7,
      "x": 840.9098683282066,
      "y": 382.2675355031301,
      "vx": 0.002874886267512622,
      "vy": 0.004605703427001264
    },
    {
      "id": "E004",
      "industry_class": "manufacturing",
      "name": "Silverline Industries Pvt Ltd",
      "degree": 6,
      "x": 741.0541880522256,
      "y": 630.0904056508131,
      "vx": 0.013803705386911938,
      "vy": 0.015233058777912223
    },
    {
      "id": "E005",
      "industry_class": "distribution",
      "name": "Ashoka Freight Pvt Ltd",
      "degree": 8,
      "x": 675.3974721396664,
      "y": 253.59240141574546,
      "vx": 0.010638059814207717,
      "vy": 0.017634920261374202
    },
    {
      "id": "E006",
      "industry_class": "manufacturing",
      "name": "Redstone Industries Pvt Ltd",
      "degree": 5,
      "x": 562.5818647627806,
      "y": 208.21169232867518,
      "vx": 0.004518530853572755,
      "vy": 0.01097780026556655
    },
    {
      "id": "E007",
      "industry_class": "trading",
      "name": "Silverline Commodities Pvt Ltd",
      "degree": 15,
      "x": 1218.5591821497337,
      "y": 544.9744505123903,
      "vx": 0.011003974240996016,
      "vy": -0.011285108275809624
    },
    {
      "id": "E008",
      "industry_class": "trading",
      "name": "Redstone Commodities Pvt Ltd",
      "degree": 8,
      "x": 1057.1838251522527,
      "y": 721.0280735679539,
      "vx": 0.0066162974404189055,
      "vy": -0.0007809029990065664
    },
    {
      "id": "E009",
      "industry_class": "services",
      "name": "Falcon Business Services Co",
      "degree": 8,
      "x": 761.7517230517643,
      "y": 485.8446530140682,
      "vx": 0.005351306483450676,
      "vy": 0.010396335776585497
    },
    {
      "id": "E010",
      "industry_class": "trading",
      "name": "Amber Impex Co",
      "degree": 5,
      "x": 914.1657055514183,
      "y": 269.60189133330124,
      "vx": 0.007539490368573192,
      "vy": 0.0017717779337309612
    },
    {
      "id": "E011",
      "industry_class": "manufacturing",
      "name": "Global Works Pvt Ltd",
      "degree": 3,
      "x": 794.1720034078983,
      "y": 270.83130009046704,
      "vx": 0.0061383158576804875,
      "vy": 0.006321233166889739
    },
    {
      "id": "E012",
      "industry_class": "distribution",
      "name": "Ashoka Supply Chain LLP",
      "degree": 8,
      "x": 960.8908530676977,
      "y": 380.1313470886877,
      "vx": -0.0039649656127609565,
      "vy": -0.0019020731123909284
    },
    {
      "id": "E013",
      "industry_class": "manufacturing",
      "name": "Granite Components Pvt Ltd",
      "degree": 7,
      "x": 721.9305266432685,
      "y": 366.6497170825331,
      "vx": -0.008625587805354365,
      "vy": 0.018984295649278476
    },
    {
      "id": "E014",
      "industry_class": "manufacturing",
      "name": "Global Fabricators Pvt Ltd",
      "degree": 8,
      "x": 580.3802180511185,
      "y": 326.8844298054163,
      "vx": 0.006905864245585485,
      "vy": 0.0033484310267083927
    },
    {
      "id": "E015",
      "industry_class": "manufacturing",
      "name": "Suncrest Manufacturing Co",
      "degree": 7,
      "x": 625.5038731360715,
      "y": 438.0773062438855,
      "vx": 0.0010577863765361642,
      "vy": 0.017549194550246745
    },
    {
      "id": "E016",
      "industry_class": "manufacturing",
      "name": "Highbank Fabricators Co",
      "degree": 10,
      "x": 506.64618996221515,
      "y": 421.55909960565805,
      "vx": 0.008373418443005525,
      "vy": 0.012123221025656402
    },
    {
      "id": "E017",
      "industry_class": "services",
      "name": "Marigold Advisory Co",
      "degree": 5,
      "x": 1186.6052244152204,
      "y": 322.7927931300012,
      "vx": 0.0037294871696157304,
      "vy": -0.019724921140853547
    },
    {
      "id": "E018",
      "industry_class": "manufacturing",
      "name": "Redstone Manufacturing Pvt Ltd",
      "degree": 9,
      "x": 646.4779878211357,
      "y": 556.2301162535412,
      "vx": 0.011866728989925976,
      "vy": 0.013967781684740553
    },
    {
      "id": "E019",
      "industry_class": "trading",
      "name": "Ironclad Impex Ltd",
      "degree": 14,
      "x": 872.969776038612,
      "y": 156.8947691467425,
      "vx": -0.0020936689662758965,
      "vy": 0.003155146638530437
    },
    {
      "id": "E020",
      "industry_class": "distribution",
      "name": "Trueform Logistics Pvt Ltd",
      "degree": 10,
      "x": 976.3097860173563,
      "y": 583.83222125552,
      "vx": 0.01884062289196403,
      "vy": -0.018973387740462904
    },
    {
      "id": "E021",
      "industry_class": "manufacturing",
      "name": "Kaveri Manufacturing Co",
      "degree": 6,
      "x": 1096.1796008245556,
      "y": 578.2440511786042,
      "vx": 0.012713699529148591,
      "vy": -0.012028589697988442
    },
    {
      "id": "E022",
      "industry_class": "manufacturing",
      "name": "Sapphire Industries Co",
      "degree": 6,
      "x": 977.6895085459347,
      "y": 818.4395291078464,
      "vx": 0.026876538757704693,
      "vy": -0.004462442137411771
    },
    {
      "id": "E023",
      "industry_class": "services",
      "name": "Vertex Consultants Ltd",
      "degree": 7,
      "x": 822.946848378453,
      "y": 726.9355142102936,
      "vx": 0.02257081950870823,
      "vy": 0.006660248908771818
    },
    {
      "id": "E024",
      "industry_class": "manufacturing",
      "name": "Vertex Works LLP",
      "degree": 5,
      "x": 1134.4544965616212,
      "y": 214.71734918300697,
      "vx": -0.004569896618131164,
      "vy": -0.012698693522581017
    },
    {
      "id": "E025",
      "industry_class": "distribution",
      "name": "Deccan Logistics LLP",
      "degree": 9,
      "x": 897.0175272062845,
      "y": 488.34265329812115,
      "vx": 0.002528686040319028,
      "vy": 0.007060079942426033
    },
    {
      "id": "E026",
      "industry_class": "manufacturing",
      "name": "Brightline Fabricators Ltd",
      "degree": 5,
      "x": 939.4105375437704,
      "y": 698.0182338055893,
      "vx": 0.022045401640500794,
      "vy": -0.013522411722296453
    },
    {
      "id": "E027",
      "industry_class": "distribution",
      "name": "Northgate Freight Pvt Ltd",
      "degree": 11,
      "x": 704.1252519625438,
      "y": 744.2668203750643,
      "vx": 0.018395578733656923,
      "vy": 0.013651952239632347
    },
    {
      "id": "E028",
      "industry_class": "trading",
      "name": "Highbank Commodities LLP",
      "degree": 8,
      "x": 1043.991663016693,
      "y": 293.561979609071,
      "vx": -0.0021434694785779974,
      "vy": -0.00170913285193236
    },
    {
      "id": "E029",
      "industry_class": "distribution",
      "name": "Palmgrove Freight LLP",
      "degree": 12,
      "x": 996.9110986691026,
      "y": 182.69274384122255,
      "vx": -0.006722107948177003,
      "vy": -0.006018892442473411
    },
    {
      "id": "E030",
      "industry_class": "trading",
      "name": "Granite Commodities Ltd",
      "degree": 10,
      "x": 752.9635724038892,
      "y": 158.12874814869502,
      "vx": -0.0066218991218387506,
      "vy": 0.002391243011841726
    },
    {
      "id": "E031",
      "industry_class": "trading",
      "name": "Palmgrove Trading LLP",
      "degree": 12,
      "x": 527.8550088699108,
      "y": 574.3571365474911,
      "vx": 0.007680009926213929,
      "vy": 0.008214752332470618
    },
    {
      "id": "E032",
      "industry_class": "distribution",
      "name": "Deccan Supply Chain LLP",
      "degree": 10,
      "x": 1031.4051962065516,
      "y": 477.22783215223643,
      "vx": 0.0029695290306527844,
      "vy": -0.023637933055439802
    },
    {
      "id": "E033",
      "industry_class": "services",
      "name": "Granite Advisory Ltd",
      "degree": 1,
      "x": 753.0711438732288,
      "y": 1019.6102852803814,
      "vx": -0.08003291334425504,
      "vy": 0.09707946980439287
    },
    {
      "id": "E034",
      "industry_class": "distribution",
      "name": "Kaveri Distribution LLP",
      "degree": 2,
      "x": 584.7599508526678,
      "y": 888.8952626178392,
      "vx": 0.01207093441439014,
      "vy": -0.025002120477274015
    },
    {
      "id": "E035",
      "industry_class": "trading",
      "name": "Novapoint Commodities Pvt Ltd",
      "degree": 4,
      "x": 485.0632641390409,
      "y": 686.4680931168116,
      "vx": 0.018279987676645265,
      "vy": -0.0015703561850508307
    },
    {
      "id": "E036",
      "industry_class": "distribution",
      "name": "Redstone Distribution LLP",
      "degree": 2,
      "x": 379.9473117997787,
      "y": 924.4846616478276,
      "vx": 0.14887610818614605,
      "vy": 0.0337483411528549
    },
    {
      "id": "E037",
      "industry_class": "manufacturing",
      "name": "Crestline Works Ltd",
      "degree": 2,
      "x": 459.9392555426531,
      "y": 1073.1822718778938,
      "vx": -0.0077218030809277464,
      "vy": 0.05582445352639831
    },
    {
      "id": "E038",
      "industry_class": "trading",
      "name": "Deccan Impex Pvt Ltd",
      "degree": 2,
      "x": 646.5994948822448,
      "y": 1092.3160331840654,
      "vx": -0.0213946381921636,
      "vy": 0.08792666109995532
    },
    {
      "id": "E039",
      "industry_class": "services",
      "name": "Nilgiri Consultants Co",
      "degree": 1,
      "x": 711.6604759983718,
      "y": 906.981884838227,
      "vx": 0.03062567359067622,
      "vy": 0.09537847377471423
    },
    {
      "id": "E040",
      "industry_class": "services",
      "name": "Brightline Business Services Ltd",
      "degree": 2,
      "x": 1816.0218475464812,
      "y": 224.7530480952217,
      "vx": -0.015903921986116103,
      "vy": 0.006080048180697531
    },
    {
      "id": "E041",
      "industry_class": "distribution",
      "name": "Palmgrove Freight Co",
      "degree": 2,
      "x": 1721.4637860182966,
      "y": 384.08867475168216,
      "vx": -0.01596891390280457,
      "vy": 0.005050758026971619
    },
    {
      "id": "E042",
      "industry_class": "distribution",
      "name": "Ironclad Distribution LLP",
      "degree": 2,
      "x": 1537.8414561583936,
      "y": 402.32398945231535,
      "vx": -0.013985302821011961,
      "vy": 0.020707379391018715
    },
    {
      "id": "E043",
      "industry_class": "services",
      "name": "Marigold Solutions Pvt Ltd",
      "degree": 2,
      "x": 1421.2309646820497,
      "y": 259.2400400142083,
      "vx": 0.002703249688028475,
      "vy": 0.007681147701162633
    },
    {
      "id": "E044",
      "industry_class": "distribution",
      "name": "Falcon Distribution Pvt Ltd",
      "degree": 2,
      "x": 1479.519916839765,
      "y": 83.3757701825866,
      "vx": -0.0074878439389278045,
      "vy": 0.005139320114460366
    },
    {
      "id": "E045",
      "industry_class": "trading",
      "name": "Novapoint Commodities Co",
      "degree": 2,
      "x": 1656.0083246318572,
      "y": 134.3785585822144,
      "vx": 0.0022094343803657226,
      "vy": -0.026786651906012125
    },
    {
      "id": "E046",
      "industry_class": "manufacturing",
      "name": "Amber Industries Co",
      "degree": 2,
      "x": 444.68789418414417,
      "y": 823.4467628546857,
      "vx": -0.3701636017585996,
      "vy": -0.0448908688141134
    },
    {
      "id": "E047",
      "industry_class": "manufacturing",
      "name": "Novapoint Components Co",
      "degree": 3,
      "x": 391.6872029411872,
      "y": 611.0962734812563,
      "vx": -0.05166789496653283,
      "vy": -0.03183081330676806
    },
    {
      "id": "E048",
      "industry_class": "distribution",
      "name": "Palmgrove Logistics Ltd",
      "degree": 2,
      "x": 231.56443958179915,
      "y": 790.2180176637122,
      "vx": 0.06630259322230259,
      "vy": 0.05807082225003426
    },
    {
      "id": "E049",
      "industry_class": "services",
      "name": "Meridian Solutions LLP",
      "degree": 2,
      "x": 277.8835258534618,
      "y": 649.1583685538179,
      "vx": -0.2149594751426775,
      "vy": -0.11481585801895759
    },
    {
      "id": "E050",
      "industry_class": "distribution",
      "name": "Global Logistics LLP",
      "degree": 2,
      "x": 360.54822477582644,
      "y": 327.67334708304986,
      "vx": -0.017797807239360707,
      "vy": -0.04704818094055103
    },
    {
      "id": "E051",
      "industry_class": "trading",
      "name": "Ironclad Traders LLP",
      "degree": 2,
      "x": 409.8447733966374,
      "y": 492.4779669887281,
      "vx": -0.007683543382632163,
      "vy": -0.027944448981550057
    },
    {
      "id": "E052",
      "industry_class": "trading",
      "name": "Global Commodities Pvt Ltd",
      "degree": 3,
      "x": 604.6577258231506,
      "y": 676.610875736231,
      "vx": 0.004824017284800494,
      "vy": -0.02738205468773765
    },
    {
      "id": "E053",
      "industry_class": "trading",
      "name": "Trueform Trading Co",
      "degree": 2,
      "x": 370.41341440445535,
      "y": 729.1954941446223,
      "vx": -0.022501919046627395,
      "vy": -0.13870023057531125
    },
    {
      "id": "E054",
      "industry_class": "services",
      "name": "Palmgrove Advisory Pvt Ltd",
      "degree": 2,
      "x": 160.97433012289957,
      "y": 622.0984359294914,
      "vx": -0.11506476488028158,
      "vy": -0.004830222448849816
    },
    {
      "id": "E055",
      "industry_class": "distribution",
      "name": "Deccan Supply Chain LLP",
      "degree": 3,
      "x": 293.3748394012864,
      "y": 453.7562693462326,
      "vx": 0.008563944875069162,
      "vy": 0.056414785430422096
    },
    {
      "id": "E056",
      "industry_class": "distribution",
      "name": "Northgate Freight Pvt Ltd",
      "degree": 2,
      "x": 191.46525907672236,
      "y": 273.6287728187484,
      "vx": -0.10905951074710125,
      "vy": 0.1603502997707852
    },
    {
      "id": "E057",
      "industry_class": "manufacturing",
      "name": "Horizon Industries LLP",
      "degree": 2,
      "x": 1726.9868442104266,
      "y": 861.4992596228606,
      "vx": -0.001931656370511503,
      "vy": 0.0315090602307
    },
    {
      "id": "E058",
      "industry_class": "manufacturing",
      "name": "Wavelength Manufacturing Co",
      "degree": 2,
      "x": 1613.549809102039,
      "y": 713.8639655792786,
      "vx": 0.030780847486507345,
      "vy": 0.006550848066472842
    },
    {
      "id": "E059",
      "industry_class": "services",
      "name": "Granite Consultants Pvt Ltd",
      "degree": 2,
      "x": 1442.9118935360193,
      "y": 788.341094637804,
      "vx": 0.04736860639122573,
      "vy": 0.044205416415463515
    },
    {
      "id": "E060",
      "industry_class": "trading",
      "name": "Falcon Commodities Ltd",
      "degree": 2,
      "x": 1556.348928644135,
      "y": 935.9763886824413,
      "vx": 0.014656102551403859,
      "vy": 0.06916362851292815
    }
  ],
  "edges": [
    {
      "from": "E032",
      "to": "E009",
      "type": "trade"
    },
    {
      "from": "E022",
      "to": "E023",
      "type": "trade"
    },
    {
      "from": "E001",
      "to": "E023",
      "type": "trade"
    },
    {
      "from": "E010",
      "to": "E001",
      "type": "trade"
    },
    {
      "from": "E016",
      "to": "E025",
      "type": "trade"
    },
    {
      "from": "E016",
      "to": "E011",
      "type": "trade"
    },
    {
      "from": "E018",
      "to": "E007",
      "type": "trade"
    },
    {
      "from": "E030",
      "to": "E012",
      "type": "trade"
    },
    {
      "from": "E018",
      "to": "E014",
      "type": "trade"
    },
    {
      "from": "E002",
      "to": "E014",
      "type": "trade"
    },
    {
      "from": "E028",
      "to": "E025",
      "type": "trade"
    },
    {
      "from": "E013",
      "to": "E030",
      "type": "trade"
    },
    {
      "from": "E024",
      "to": "E025",
      "type": "trade"
    },
    {
      "from": "E020",
      "to": "E015",
      "type": "trade"
    },
    {
      "from": "E027",
      "to": "E016",
      "type": "trade"
    },
    {
      "from": "E029",
      "to": "E021",
      "type": "trade"
    },
    {
      "from": "E019",
      "to": "E025",
      "type": "trade"
    },
    {
      "from": "E013",
      "to": "E002",
      "type": "trade"
    },
    {
      "from": "E013",
      "to": "E027",
      "type": "trade"
    },
    {
      "from": "E007",
      "to": "E008",
      "type": "trade"
    },
    {
      "from": "E016",
      "to": "E006",
      "type": "trade"
    },
    {
      "from": "E021",
      "to": "E018",
      "type": "trade"
    },
    {
      "from": "E031",
      "to": "E012",
      "type": "trade"
    },
    {
      "from": "E018",
      "to": "E020",
      "type": "trade"
    },
    {
      "from": "E009",
      "to": "E016",
      "type": "trade"
    },
    {
      "from": "E022",
      "to": "E027",
      "type": "trade"
    },
    {
      "from": "E002",
      "to": "E031",
      "type": "trade"
    },
    {
      "from": "E025",
      "to": "E029",
      "type": "trade"
    },
    {
      "from": "E032",
      "to": "E017",
      "type": "trade"
    },
    {
      "from": "E026",
      "to": "E029",
      "type": "trade"
    },
    {
      "from": "E002",
      "to": "E016",
      "type": "trade"
    },
    {
      "from": "E025",
      "to": "E031",
      "type": "trade"
    },
    {
      "from": "E017",
      "to": "E029",
      "type": "trade"
    },
    {
      "from": "E005",
      "to": "E001",
      "type": "trade"
    },
    {
      "from": "E010",
      "to": "E018",
      "type": "trade"
    },
    {
      "from": "E024",
      "to": "E007",
      "type": "trade"
    },
    {
      "from": "E020",
      "to": "E030",
      "type": "trade"
    },
    {
      "from": "E016",
      "to": "E019",
      "type": "trade"
    },
    {
      "from": "E028",
      "to": "E009",
      "type": "trade"
    },
    {
      "from": "E007",
      "to": "E025",
      "type": "trade"
    },
    {
      "from": "E031",
      "to": "E020",
      "type": "trade"
    },
    {
      "from": "E016",
      "to": "E023",
      "type": "trade"
    },
    {
      "from": "E029",
      "to": "E003",
      "type": "trade"
    },
    {
      "from": "E024",
      "to": "E032",
      "type": "trade"
    },
    {
      "from": "E012",
      "to": "E023",
      "type": "trade"
    },
    {
      "from": "E019",
      "to": "E031",
      "type": "trade"
    },
    {
      "from": "E001",
      "to": "E011",
      "type": "trade"
    },
    {
      "from": "E009",
      "to": "E029",
      "type": "trade"
    },
    {
      "from": "E031",
      "to": "E005",
      "type": "trade"
    },
    {
      "from": "E026",
      "to": "E001",
      "type": "trade"
    },
    {
      "from": "E016",
      "to": "E030",
      "type": "trade"
    },
    {
      "from": "E020",
      "to": "E029",
      "type": "trade"
    },
    {
      "from": "E012",
      "to": "E008",
      "type": "trade"
    },
    {
      "from": "E015",
      "to": "E019",
      "type": "trade"
    },
    {
      "from": "E013",
      "to": "E032",
      "type": "trade"
    },
    {
      "from": "E004",
      "to": "E019",
      "type": "trade"
    },
    {
      "from": "E020",
      "to": "E014",
      "type": "trade"
    },
    {
      "from": "E003",
      "to": "E027",
      "type": "trade"
    },
    {
      "from": "E002",
      "to": "E030",
      "type": "trade"
    },
    {
      "from": "E018",
      "to": "E030",
      "type": "trade"
    },
    {
      "from": "E022",
      "to": "E007",
      "type": "trade"
    },
    {
      "from": "E003",
      "to": "E028",
      "type": "trade"
    },
    {
      "from": "E004",
      "to": "E008",
      "type": "trade"
    },
    {
      "from": "E016",
      "to": "E020",
      "type": "trade"
    },
    {
      "from": "E008",
      "to": "E003",
      "type": "trade"
    },
    {
      "from": "E027",
      "to": "E032",
      "type": "trade"
    },
    {
      "from": "E009",
      "to": "E023",
      "type": "trade"
    },
    {
      "from": "E019",
      "to": "E023",
      "type": "trade"
    },
    {
      "from": "E031",
      "to": "E032",
      "type": "trade"
    },
    {
      "from": "E025",
      "to": "E017",
      "type": "trade"
    },
    {
      "from": "E007",
      "to": "E029",
      "type": "trade"
    },
    {
      "from": "E005",
      "to": "E019",
      "type": "trade"
    },
    {
      "from": "E022",
      "to": "E021",
      "type": "trade"
    },
    {
      "from": "E005",
      "to": "E023",
      "type": "trade"
    },
    {
      "from": "E007",
      "to": "E020",
      "type": "trade"
    },
    {
      "from": "E024",
      "to": "E012",
      "type": "trade"
    },
    {
      "from": "E006",
      "to": "E027",
      "type": "trade"
    },
    {
      "from": "E030",
      "to": "E017",
      "type": "trade"
    },
    {
      "from": "E005",
      "to": "E028",
      "type": "trade"
    },
    {
      "from": "E020",
      "to": "E017",
      "type": "trade"
    },
    {
      "from": "E019",
      "to": "E008",
      "type": "trade"
    },
    {
      "from": "E004",
      "to": "E021",
      "type": "trade"
    },
    {
      "from": "E013",
      "to": "E028",
      "type": "trade"
    },
    {
      "from": "E031",
      "to": "E008",
      "type": "trade"
    },
    {
      "from": "E015",
      "to": "E026",
      "type": "trade"
    },
    {
      "from": "E026",
      "to": "E007",
      "type": "trade"
    },
    {
      "from": "E024",
      "to": "E010",
      "type": "trade"
    },
    {
      "from": "E015",
      "to": "E029",
      "type": "trade"
    },
    {
      "from": "E003",
      "to": "E031",
      "type": "trade"
    },
    {
      "from": "E030",
      "to": "E032",
      "type": "trade"
    },
    {
      "from": "E032",
      "to": "E014",
      "type": "trade"
    },
    {
      "from": "E002",
      "to": "E015",
      "type": "trade"
    },
    {
      "from": "E014",
      "to": "E012",
      "type": "trade"
    },
    {
      "from": "E009",
      "to": "E008",
      "type": "trade"
    },
    {
      "from": "E027",
      "to": "E007",
      "type": "trade"
    },
    {
      "from": "E007",
      "to": "E012",
      "type": "trade"
    },
    {
      "from": "E002",
      "to": "E018",
      "type": "trade"
    },
    {
      "from": "E005",
      "to": "E027",
      "type": "trade"
    },
    {
      "from": "E021",
      "to": "E019",
      "type": "trade"
    },
    {
      "from": "E006",
      "to": "E011",
      "type": "trade"
    },
    {
      "from": "E004",
      "to": "E032",
      "type": "trade"
    },
    {
      "from": "E028",
      "to": "E030",
      "type": "trade"
    },
    {
      "from": "E014",
      "to": "E031",
      "type": "trade"
    },
    {
      "from": "E008",
      "to": "E028",
      "type": "trade"
    },
    {
      "from": "E018",
      "to": "E019",
      "type": "trade"
    },
    {
      "from": "E010",
      "to": "E027",
      "type": "trade"
    },
    {
      "from": "E006",
      "to": "E013",
      "type": "trade"
    },
    {
      "from": "E029",
      "to": "E018",
      "type": "trade"
    },
    {
      "from": "E026",
      "to": "E004",
      "type": "trade"
    },
    {
      "from": "E019",
      "to": "E001",
      "type": "trade"
    },
    {
      "from": "E015",
      "to": "E025",
      "type": "trade"
    },
    {
      "from": "E030",
      "to": "E031",
      "type": "trade"
    },
    {
      "from": "E028",
      "to": "E007",
      "type": "trade"
    },
    {
      "from": "E020",
      "to": "E013",
      "type": "trade"
    },
    {
      "from": "E010",
      "to": "E005",
      "type": "trade"
    },
    {
      "from": "E021",
      "to": "E007",
      "type": "trade"
    },
    {
      "from": "E004",
      "to": "E007",
      "type": "trade"
    },
    {
      "from": "E019",
      "to": "E006",
      "type": "trade"
    },
    {
      "from": "E029",
      "to": "E012",
      "type": "trade"
    },
    {
      "from": "E029",
      "to": "E005",
      "type": "trade"
    },
    {
      "from": "E019",
      "to": "E007",
      "type": "trade"
    },
    {
      "from": "E007",
      "to": "E003",
      "type": "trade"
    },
    {
      "from": "E003",
      "to": "E022",
      "type": "trade"
    },
    {
      "from": "E022",
      "to": "E009",
      "type": "trade"
    },
    {
      "from": "E009",
      "to": "E019",
      "type": "trade"
    },
    {
      "from": "E033",
      "to": "E034",
      "type": "trade"
    },
    {
      "from": "E034",
      "to": "E035",
      "type": "trade"
    },
    {
      "from": "E035",
      "to": "E036",
      "type": "trade"
    },
    {
      "from": "E036",
      "to": "E037",
      "type": "trade"
    },
    {
      "from": "E037",
      "to": "E038",
      "type": "trade"
    },
    {
      "from": "E038",
      "to": "E039",
      "type": "trade"
    },
    {
      "from": "E040",
      "to": "E041",
      "type": "trade"
    },
    {
      "from": "E041",
      "to": "E042",
      "type": "trade"
    },
    {
      "from": "E042",
      "to": "E043",
      "type": "trade"
    },
    {
      "from": "E043",
      "to": "E044",
      "type": "trade"
    },
    {
      "from": "E044",
      "to": "E045",
      "type": "trade"
    },
    {
      "from": "E045",
      "to": "E040",
      "type": "trade"
    },
    {
      "from": "E046",
      "to": "E047",
      "type": "trade"
    },
    {
      "from": "E047",
      "to": "E048",
      "type": "trade"
    },
    {
      "from": "E048",
      "to": "E049",
      "type": "trade"
    },
    {
      "from": "E049",
      "to": "E046",
      "type": "trade"
    },
    {
      "from": "E050",
      "to": "E051",
      "type": "trade"
    },
    {
      "from": "E051",
      "to": "E052",
      "type": "trade"
    },
    {
      "from": "E052",
      "to": "E053",
      "type": "trade"
    },
    {
      "from": "E053",
      "to": "E054",
      "type": "trade"
    },
    {
      "from": "E054",
      "to": "E055",
      "type": "trade"
    },
    {
      "from": "E055",
      "to": "E056",
      "type": "trade"
    },
    {
      "from": "E056",
      "to": "E050",
      "type": "trade"
    },
    {
      "from": "E057",
      "to": "E058",
      "type": "trade"
    },
    {
      "from": "E058",
      "to": "E059",
      "type": "trade"
    },
    {
      "from": "E059",
      "to": "E060",
      "type": "trade"
    },
    {
      "from": "E060",
      "to": "E057",
      "type": "trade"
    },
    {
      "from": "E014",
      "to": "E027",
      "type": "corporate"
    },
    {
      "from": "E014",
      "to": "E035",
      "type": "corporate"
    },
    {
      "from": "E015",
      "to": "E047",
      "type": "corporate"
    },
    {
      "from": "E027",
      "to": "E035",
      "type": "corporate"
    },
    {
      "from": "E031",
      "to": "E055",
      "type": "corporate"
    },
    {
      "from": "E032",
      "to": "E052",
      "type": "corporate"
    }
  ]
};
const ENTITIES = {
  "E001": {
    "id": "E001",
    "name": "Meridian Supply Chain Ltd",
    "industry_code": "NIC-5229",
    "industry_class": "distribution",
    "directors": [
      "D45"
    ],
    "address": "18 Avinashi Road, Chennai 600002",
    "registration_date": "2012-11-24"
  },
  "E002": {
    "id": "E002",
    "name": "Coastal Trading Pvt Ltd",
    "industry_code": "NIC-4662",
    "industry_class": "trading",
    "directors": [
      "D367"
    ],
    "address": "30 Residency Road, Chennai 600002",
    "registration_date": "2020-01-18"
  },
  "E003": {
    "id": "E003",
    "name": "Trueform Logistics Co",
    "industry_code": "NIC-5210",
    "industry_class": "distribution",
    "directors": [
      "D175"
    ],
    "address": "  36 MG Road ,  Chandigarh 160002",
    "registration_date": "2023-03-23"
  },
  "E004": {
    "id": "E004",
    "name": "Silverline Industries Pvt Ltd",
    "industry_code": "NIC-2610",
    "industry_class": "manufacturing",
    "directors": [
      "D23"
    ],
    "address": "49 Anna Salai, Bengaluru 560066",
    "registration_date": "2016-06-20"
  },
  "E005": {
    "id": "E005",
    "name": "Ashoka Freight Pvt Ltd",
    "industry_code": "NIC-4690",
    "industry_class": "distribution",
    "directors": [
      "D361"
    ],
    "address": "38 Industrial Area Phase II, Pune 411001",
    "registration_date": "2020-06-19"
  },
  "E006": {
    "id": "E006",
    "name": "Redstone Industries Pvt Ltd",
    "industry_code": "NIC-2610",
    "industry_class": "manufacturing",
    "directors": [
      "D84"
    ],
    "address": "30 Anna Salai, Indore 452001",
    "registration_date": "2017-05-15"
  },
  "E007": {
    "id": "E007",
    "name": "Silverline Commodities Pvt Ltd",
    "industry_code": "NIC-4662",
    "industry_class": "trading",
    "directors": [
      "D237"
    ],
    "address": "82 Marine Drive, Chandigarh 160002",
    "registration_date": "2019-12-08"
  },
  "E008": {
    "id": "E008",
    "name": "Redstone Commodities Pvt Ltd",
    "industry_code": "NIC-4662",
    "industry_class": "trading",
    "directors": [
      "D291"
    ],
    "address": "5 Hinjewadi Phase I, Chennai 600002",
    "registration_date": "2017-05-03"
  },
  "E009": {
    "id": "E009",
    "name": "Falcon Business Services Co",
    "industry_code": "NIC-6202",
    "industry_class": "services",
    "directors": [
      "D382"
    ],
    "address": "83 Sadar Bazaar, Mumbai 400070",
    "registration_date": "2013-05-05"
  },
  "E010": {
    "id": "E010",
    "name": "Amber Impex Co",
    "industry_code": "NIC-4662",
    "industry_class": "trading",
    "directors": [
      "D57"
    ],
    "address": "29 Marine Drive, Mumbai 400021",
    "registration_date": "2019-08-03"
  },
  "E011": {
    "id": "E011",
    "name": "Global Works Pvt Ltd",
    "industry_code": "NIC-1392",
    "industry_class": "manufacturing",
    "directors": [
      "D6"
    ],
    "address": "49 Nariman Point, Mumbai 400070",
    "registration_date": "2018-09-09"
  },
  "E012": {
    "id": "E012",
    "name": "Ashoka Supply Chain LLP",
    "industry_code": "NIC-5229",
    "industry_class": "distribution",
    "directors": [
      "D369"
    ],
    "address": "38 Sector 18, Bengaluru 560066",
    "registration_date": "2013-08-01"
  },
  "E013": {
    "id": "E013",
    "name": "Granite Components Pvt Ltd",
    "industry_code": "NIC-1392",
    "industry_class": "manufacturing",
    "directors": [
      "D102"
    ],
    "address": "81 Whitefield Main Road, Indore 452001",
    "registration_date": "2024-11-17"
  },
  "E014": {
    "id": "E014",
    "name": "Global Fabricators Pvt Ltd",
    "industry_code": "NIC-2610",
    "industry_class": "manufacturing",
    "directors": [
      "D123",
      "D42"
    ],
    "address": "42 Sadar Bazaar, Chandigarh 160002",
    "registration_date": "2011-02-12"
  },
  "E015": {
    "id": "E015",
    "name": "Suncrest Manufacturing Co",
    "industry_code": "NIC-2013",
    "industry_class": "manufacturing",
    "directors": [
      "D282"
    ],
    "address": "9 Residency Road, Indore 452001",
    "registration_date": "2023-03-05"
  },
  "E016": {
    "id": "E016",
    "name": "Highbank Fabricators Co",
    "industry_code": "NIC-2610",
    "industry_class": "manufacturing",
    "directors": [
      "D205"
    ],
    "address": "70 Avinashi Road, Chennai 600002",
    "registration_date": "2022-04-23"
  },
  "E017": {
    "id": "E017",
    "name": "Marigold Advisory Co",
    "industry_code": "NIC-8299",
    "industry_class": "services",
    "directors": [
      "D284"
    ],
    "address": "32 Electronic City, Bengaluru 560066",
    "registration_date": "2012-06-01"
  },
  "E018": {
    "id": "E018",
    "name": "Redstone Manufacturing Pvt Ltd",
    "industry_code": "NIC-2610",
    "industry_class": "manufacturing",
    "directors": [
      "D37"
    ],
    "address": "81 MG Road, Coimbatore 641018",
    "registration_date": "2014-02-02"
  },
  "E019": {
    "id": "E019",
    "name": "Ironclad Impex Ltd",
    "industry_code": "NIC-4620",
    "industry_class": "trading",
    "directors": [
      "D125"
    ],
    "address": "17 Avinashi Road, Pune 411001",
    "registration_date": "2025-10-19"
  },
  "E020": {
    "id": "E020",
    "name": "Trueform Logistics Pvt Ltd",
    "industry_code": "NIC-5210",
    "industry_class": "distribution",
    "directors": [
      "D374"
    ],
    "address": "85 Sector 18, Bengaluru 560066",
    "registration_date": "2016-07-14"
  },
  "E021": {
    "id": "E021",
    "name": "Kaveri Manufacturing Co",
    "industry_code": "NIC-1392",
    "industry_class": "manufacturing",
    "directors": [
      "D230"
    ],
    "address": "44 Anna Salai, Coimbatore 641018",
    "registration_date": "2014-04-07"
  },
  "E022": {
    "id": "E022",
    "name": "Sapphire Industries Co",
    "industry_code": "NIC-2410",
    "industry_class": "manufacturing",
    "directors": [
      "D334"
    ],
    "address": "10 Sadar Bazaar, Chennai 600002",
    "registration_date": "2023-09-04"
  },
  "E023": {
    "id": "E023",
    "name": "Vertex Consultants Ltd",
    "industry_code": "NIC-7020",
    "industry_class": "services",
    "directors": [
      "D31"
    ],
    "address": "53 Sadar Bazaar, Bengaluru 560100",
    "registration_date": "2018-04-28"
  },
  "E024": {
    "id": "E024",
    "name": "Vertex Works LLP",
    "industry_code": "NIC-1392",
    "industry_class": "manufacturing",
    "directors": [
      "D339"
    ],
    "address": "59 Whitefield Main Road, Hyderabad 500081",
    "registration_date": "2017-12-24"
  },
  "E025": {
    "id": "E025",
    "name": "Deccan Logistics LLP",
    "industry_code": "NIC-5229",
    "industry_class": "distribution",
    "directors": [
      "D161"
    ],
    "address": "8 Nariman Point, Chennai 600002",
    "registration_date": "2022-09-02"
  },
  "E026": {
    "id": "E026",
    "name": "Brightline Fabricators Ltd",
    "industry_code": "NIC-1392",
    "industry_class": "manufacturing",
    "directors": [
      "D35"
    ],
    "address": "66 Anna Salai, Bengaluru 560001",
    "registration_date": "2024-03-03"
  },
  "E027": {
    "id": "E027",
    "name": "Northgate Freight Pvt Ltd",
    "industry_code": "NIC-5229",
    "industry_class": "distribution",
    "directors": [
      "D42"
    ],
    "address": "73 Electronic City, Hyderabad 500081",
    "registration_date": "2020-10-02"
  },
  "E028": {
    "id": "E028",
    "name": "Highbank Commodities LLP",
    "industry_code": "NIC-4620",
    "industry_class": "trading",
    "directors": [
      "D68"
    ],
    "address": "86 Avinashi Road, Chennai 600002",
    "registration_date": "2016-04-09"
  },
  "E029": {
    "id": "E029",
    "name": "Palmgrove Freight LLP",
    "industry_code": "NIC-4690",
    "industry_class": "distribution",
    "directors": [
      "D38"
    ],
    "address": "10 MG Road, Hyderabad 500081",
    "registration_date": "2018-10-19"
  },
  "E030": {
    "id": "E030",
    "name": "Granite Commodities Ltd",
    "industry_code": "NIC-4620",
    "industry_class": "trading",
    "directors": [
      "D81"
    ],
    "address": "45 Anna Salai, Hyderabad 500081",
    "registration_date": "2025-04-12"
  },
  "E031": {
    "id": "E031",
    "name": "Palmgrove Trading LLP",
    "industry_code": "NIC-4662",
    "industry_class": "trading",
    "directors": [
      "D55"
    ],
    "address": "85 Anna Salai, Hyderabad 500081",
    "registration_date": "2025-03-09"
  },
  "E032": {
    "id": "E032",
    "name": "Deccan Supply Chain LLP",
    "industry_code": "NIC-5229",
    "industry_class": "distribution",
    "directors": [
      "D136"
    ],
    "address": "27 Avinashi Road, Chandigarh 160002",
    "registration_date": "2016-04-22"
  },
  "E033": {
    "id": "E033",
    "name": "Granite Advisory Ltd",
    "industry_code": "NIC-8299",
    "industry_class": "services",
    "directors": [
      "D247"
    ],
    "address": "26 Nariman Point, Indore 452001",
    "registration_date": "2021-09-19"
  },
  "E034": {
    "id": "E034",
    "name": "Kaveri Distribution LLP",
    "industry_code": "NIC-5210",
    "industry_class": "distribution",
    "directors": [
      "D47"
    ],
    "address": "21 Whitefield Main Road, Bengaluru 560066",
    "registration_date": "2018-09-05"
  },
  "E035": {
    "id": "E035",
    "name": "Novapoint Commodities Pvt Ltd",
    "industry_code": "NIC-4620",
    "industry_class": "trading",
    "directors": [
      "D42"
    ],
    "address": "7 Sector 18, Mumbai 400070",
    "registration_date": "2019-06-08"
  },
  "E036": {
    "id": "E036",
    "name": "Redstone Distribution LLP",
    "industry_code": "NIC-4690",
    "industry_class": "distribution",
    "directors": [
      "D71"
    ],
    "address": "13 Avinashi Road, Hyderabad 500081",
    "registration_date": "2021-06-26"
  },
  "E037": {
    "id": "E037",
    "name": "Crestline Works Ltd",
    "industry_code": "NIC-2410",
    "industry_class": "manufacturing",
    "directors": [
      "D132"
    ],
    "address": "61 Sadar Bazaar, Gurugram 122015",
    "registration_date": "2020-01-03"
  },
  "E038": {
    "id": "E038",
    "name": "Deccan Impex Pvt Ltd",
    "industry_code": "NIC-4662",
    "industry_class": "trading",
    "directors": [
      "D215"
    ],
    "address": "37 Electronic City, Gurugram 122015",
    "registration_date": "2015-02-02"
  },
  "E039": {
    "id": "E039",
    "name": "Nilgiri Consultants Co",
    "industry_code": "NIC-6202",
    "industry_class": "services",
    "directors": [
      "D368"
    ],
    "address": "69 MG Road, Chandigarh 160002",
    "registration_date": "2021-09-19"
  },
  "E040": {
    "id": "E040",
    "name": "Brightline Business Services Ltd",
    "industry_code": "NIC-6202",
    "industry_class": "services",
    "directors": [
      "D22"
    ],
    "address": "59 MG Road, Bengaluru 560066",
    "registration_date": "2015-04-02"
  },
  "E041": {
    "id": "E041",
    "name": "Palmgrove Freight Co",
    "industry_code": "NIC-4690",
    "industry_class": "distribution",
    "directors": [
      "D336"
    ],
    "address": "5 Industrial Area Phase II, Chennai 600032",
    "registration_date": "2014-05-12"
  },
  "E042": {
    "id": "E042",
    "name": "Ironclad Distribution LLP",
    "industry_code": "NIC-4690",
    "industry_class": "distribution",
    "directors": [
      "D255"
    ],
    "address": "52 Avinashi Road, Mumbai 400070",
    "registration_date": "2018-07-11"
  },
  "E043": {
    "id": "E043",
    "name": "Marigold Solutions Pvt Ltd",
    "industry_code": "NIC-6202",
    "industry_class": "services",
    "directors": [
      "D280"
    ],
    "address": "55 Anna Salai, Coimbatore 641018",
    "registration_date": "2017-10-27"
  },
  "E044": {
    "id": "E044",
    "name": "Falcon Distribution Pvt Ltd",
    "industry_code": "NIC-5229",
    "industry_class": "distribution",
    "directors": [
      "D219"
    ],
    "address": "85 Whitefield Main Road, Mumbai 400021",
    "registration_date": "2015-08-20"
  },
  "E045": {
    "id": "E045",
    "name": "Novapoint Commodities Co",
    "industry_code": "NIC-4662",
    "industry_class": "trading",
    "directors": [
      "D39"
    ],
    "address": "46 Nariman Point, Bengaluru 560001",
    "registration_date": "2017-05-21"
  },
  "E046": {
    "id": "E046",
    "name": "Amber Industries Co",
    "industry_code": "NIC-2410",
    "industry_class": "manufacturing",
    "directors": [
      "D70"
    ],
    "address": "79 Whitefield Main Road, Chennai 600002",
    "registration_date": "2022-08-07"
  },
  "E047": {
    "id": "E047",
    "name": "Novapoint Components Co",
    "industry_code": "NIC-2410",
    "industry_class": "manufacturing",
    "directors": [
      "D282"
    ],
    "address": "88 Hinjewadi Phase I, Bengaluru 560066",
    "registration_date": "2021-06-23"
  },
  "E048": {
    "id": "E048",
    "name": "Palmgrove Logistics Ltd",
    "industry_code": "NIC-4690",
    "industry_class": "distribution",
    "directors": [
      "D122"
    ],
    "address": "47 Residency Road, Gurugram 122015",
    "registration_date": "2014-02-07"
  },
  "E049": {
    "id": "E049",
    "name": "Meridian Solutions LLP",
    "industry_code": "NIC-7020",
    "industry_class": "services",
    "directors": [
      "D204"
    ],
    "address": "71 Marine Drive, Pune 411057",
    "registration_date": "2020-02-03"
  },
  "E050": {
    "id": "E050",
    "name": "Global Logistics LLP",
    "industry_code": "NIC-4690",
    "industry_class": "distribution",
    "directors": [
      "D129"
    ],
    "address": "29 Hinjewadi Phase I, Hyderabad 500081",
    "registration_date": "2019-05-28"
  },
  "E051": {
    "id": "E051",
    "name": "Ironclad Traders LLP",
    "industry_code": "NIC-4669",
    "industry_class": "trading",
    "directors": [
      "D298"
    ],
    "address": "69 Anna Salai, Chandigarh 160002",
    "registration_date": "2019-11-06"
  },
  "E052": {
    "id": "E052",
    "name": "Global Commodities Pvt Ltd",
    "industry_code": "NIC-4669",
    "industry_class": "trading",
    "directors": [
      "D136"
    ],
    "address": "4 Anna Salai, Indore 452001",
    "registration_date": "2011-11-25"
  },
  "E053": {
    "id": "E053",
    "name": "Trueform Trading Co",
    "industry_code": "NIC-4620",
    "industry_class": "trading",
    "directors": [
      "D126"
    ],
    "address": "81 Residency Road, Hyderabad 500081",
    "registration_date": "2015-11-10"
  },
  "E054": {
    "id": "E054",
    "name": "Palmgrove Advisory Pvt Ltd",
    "industry_code": "NIC-7020",
    "industry_class": "services",
    "directors": [
      "D105"
    ],
    "address": "8 Marine Drive, Coimbatore 641018",
    "registration_date": "2018-07-16"
  },
  "E055": {
    "id": "E055",
    "name": "Deccan Supply Chain LLP",
    "industry_code": "NIC-5229",
    "industry_class": "distribution",
    "directors": [
      "D55"
    ],
    "address": "45 Sector 18, Coimbatore 641018",
    "registration_date": "2013-06-17"
  },
  "E056": {
    "id": "E056",
    "name": "Northgate Freight Pvt Ltd",
    "industry_code": "NIC-5210",
    "industry_class": "distribution",
    "directors": [
      "D197"
    ],
    "address": "58 Electronic City, Chennai 600032",
    "registration_date": "2013-02-02"
  },
  "E057": {
    "id": "E057",
    "name": "Horizon Industries LLP",
    "industry_code": "NIC-1392",
    "industry_class": "manufacturing",
    "directors": [
      "D349"
    ],
    "address": "50 Residency Road, Bengaluru 560066",
    "registration_date": "2018-09-09"
  },
  "E058": {
    "id": "E058",
    "name": "Wavelength Manufacturing Co",
    "industry_code": "NIC-1392",
    "industry_class": "manufacturing",
    "directors": [
      "D261"
    ],
    "address": "44 Residency Road, Mumbai 400021",
    "registration_date": "2016-03-07"
  },
  "E059": {
    "id": "E059",
    "name": "Granite Consultants Pvt Ltd",
    "industry_code": "NIC-7020",
    "industry_class": "services",
    "directors": [
      "D77"
    ],
    "address": "18 Avinashi Road, Bengaluru 560001",
    "registration_date": "2016-08-17"
  },
  "E060": {
    "id": "E060",
    "name": "Falcon Commodities Ltd",
    "industry_code": "NIC-4620",
    "industry_class": "trading",
    "directors": [
      "D260"
    ],
    "address": "79 Avinashi Road, Mumbai 400070",
    "registration_date": "2024-05-19"
  }
};
const INVOICES = {
  "I0001": {
    "invoice_id": "I0001",
    "from": "E032",
    "to": "E009",
    "value": 16932722,
    "hs_code": "49011000",
    "invoice_date": "2026-01-10",
    "discounting_date": "2026-01-15"
  },
  "I0002": {
    "invoice_id": "I0002",
    "from": "E022",
    "to": "E023",
    "value": 40217838,
    "hs_code": "26011100",
    "invoice_date": "2026-02-22",
    "discounting_date": "2026-04-01"
  },
  "I0003": {
    "invoice_id": "I0003",
    "from": "E001",
    "to": "E023",
    "value": 25507235,
    "hs_code": "84571000",
    "invoice_date": "2026-02-03",
    "discounting_date": "2026-03-15"
  },
  "I0004": {
    "invoice_id": "I0004",
    "from": "E010",
    "to": "E001",
    "value": 48705681,
    "hs_code": "74031100",
    "invoice_date": "2025-11-11",
    "discounting_date": "2025-12-06"
  },
  "I0005": {
    "invoice_id": "I0005",
    "from": "E016",
    "to": "E025",
    "value": 94645150,
    "hs_code": "39012000",
    "invoice_date": "2026-02-13",
    "discounting_date": "2026-03-27"
  },
  "I0006": {
    "invoice_id": "I0006",
    "from": "E016",
    "to": "E011",
    "value": 60488316,
    "hs_code": "39012000",
    "invoice_date": "2026-01-25",
    "discounting_date": "2026-02-23"
  },
  "I0007": {
    "invoice_id": "I0007",
    "from": "E018",
    "to": "E007",
    "value": 65316026,
    "hs_code": "39012000",
    "invoice_date": "2026-03-01",
    "discounting_date": "2026-03-18"
  },
  "I0008": {
    "invoice_id": "I0008",
    "from": "E030",
    "to": "E012",
    "value": 33667381,
    "hs_code": "10063000",
    "invoice_date": "2025-12-20",
    "discounting_date": "2026-01-17"
  },
  "I0009": {
    "invoice_id": "I0009",
    "from": "E018",
    "to": "E014",
    "value": 57889740,
    "hs_code": "85176200",
    "invoice_date": "2026-02-11",
    "discounting_date": "2026-03-20"
  },
  "I0010": {
    "invoice_id": "I0010",
    "from": "E002",
    "to": "E014",
    "value": 30280545,
    "hs_code": "72081000",
    "invoice_date": "2026-01-07",
    "discounting_date": "2026-01-12"
  },
  "I0011": {
    "invoice_id": "I0011",
    "from": "E028",
    "to": "E025",
    "value": 70944216,
    "hs_code": "27101990",
    "invoice_date": "2026-03-11",
    "discounting_date": "2026-03-21"
  },
  "I0012": {
    "invoice_id": "I0012",
    "from": "E013",
    "to": "E030",
    "value": 2569921,
    "hs_code": "39012000",
    "invoice_date": "2026-03-18",
    "discounting_date": "2026-05-02"
  },
  "I0013": {
    "invoice_id": "I0013",
    "from": "E024",
    "to": "E025",
    "value": 52195157,
    "hs_code": "94036000",
    "invoice_date": "2025-12-02",
    "discounting_date": "2025-12-24"
  },
  "I0014": {
    "invoice_id": "I0014",
    "from": "E020",
    "to": "E015",
    "value": 66619754,
    "hs_code": "49011000",
    "invoice_date": "2026-03-22",
    "discounting_date": "2026-04-02"
  },
  "I0015": {
    "invoice_id": "I0015",
    "from": "E027",
    "to": "E016",
    "value": 29747022,
    "hs_code": "84571000",
    "invoice_date": "2026-01-17",
    "discounting_date": "2026-02-14"
  },
  "I0016": {
    "invoice_id": "I0016",
    "from": "E001",
    "to": "E010",
    "value": 58795148,
    "hs_code": "39012000",
    "invoice_date": "2026-01-22",
    "discounting_date": "2026-02-23"
  },
  "I0017": {
    "invoice_id": "I0017",
    "from": "E029",
    "to": "E021",
    "value": 79184989,
    "hs_code": "49011000",
    "invoice_date": "2025-12-14",
    "discounting_date": "2026-01-28"
  },
  "I0018": {
    "invoice_id": "I0018",
    "from": "E019",
    "to": "E025",
    "value": 17639956,
    "hs_code": "74031100",
    "invoice_date": "2025-12-31",
    "discounting_date": "2026-01-22"
  },
  "I0019": {
    "invoice_id": "I0019",
    "from": "E013",
    "to": "E002",
    "value": 43465756,
    "hs_code": "26011100",
    "invoice_date": "2025-11-19",
    "discounting_date": "2025-12-21"
  },
  "I0020": {
    "invoice_id": "I0020",
    "from": "E013",
    "to": "E027",
    "value": 77235477,
    "hs_code": "72081000",
    "invoice_date": "2025-12-08",
    "discounting_date": "2026-01-21"
  },
  "I0021": {
    "invoice_id": "I0021",
    "from": "E007",
    "to": "E008",
    "value": 79086079,
    "hs_code": "72081000",
    "invoice_date": "2026-03-13",
    "discounting_date": "2026-04-14"
  },
  "I0022": {
    "invoice_id": "I0022",
    "from": "E016",
    "to": "E006",
    "value": 32027661,
    "hs_code": "94036000",
    "invoice_date": "2026-02-27",
    "discounting_date": "2026-04-13"
  },
  "I0023": {
    "invoice_id": "I0023",
    "from": "E021",
    "to": "E018",
    "value": 89902530,
    "hs_code": "39012000",
    "invoice_date": "2026-03-21",
    "discounting_date": "2026-04-21"
  },
  "I0024": {
    "invoice_id": "I0024",
    "from": "E031",
    "to": "E012",
    "value": 47188161,
    "hs_code": "74031100",
    "invoice_date": "2026-03-14",
    "discounting_date": "2026-04-17"
  },
  "I0025": {
    "invoice_id": "I0025",
    "from": "E018",
    "to": "E020",
    "value": 99283231,
    "hs_code": "72081000",
    "invoice_date": "2026-01-21",
    "discounting_date": "2026-02-27"
  },
  "I0026": {
    "invoice_id": "I0026",
    "from": "E009",
    "to": "E016",
    "value": 20171677,
    "hs_code": null,
    "invoice_date": "2025-11-17",
    "discounting_date": "2025-12-16"
  },
  "I0027": {
    "invoice_id": "I0027",
    "from": "E022",
    "to": "E027",
    "value": 11303463,
    "hs_code": "94036000",
    "invoice_date": "2026-02-16",
    "discounting_date": "2026-03-15"
  },
  "I0028": {
    "invoice_id": "I0028",
    "from": "E002",
    "to": "E031",
    "value": 48945753,
    "hs_code": "10063000",
    "invoice_date": "2025-11-02",
    "discounting_date": "2025-11-27"
  },
  "I0029": {
    "invoice_id": "I0029",
    "from": "E025",
    "to": "E029",
    "value": 21159182,
    "hs_code": "49011000",
    "invoice_date": "2026-03-20",
    "discounting_date": "2026-04-30"
  },
  "I0030": {
    "invoice_id": "I0030",
    "from": "E032",
    "to": "E017",
    "value": 70930840,
    "hs_code": "84571000",
    "invoice_date": "2026-01-26",
    "discounting_date": "2026-03-12"
  },
  "I0031": {
    "invoice_id": "I0031",
    "from": "E026",
    "to": "E029",
    "value": 23838632,
    "hs_code": "26011100",
    "invoice_date": "2026-03-17",
    "discounting_date": "2026-03-21"
  },
  "I0032": {
    "invoice_id": "I0032",
    "from": "E002",
    "to": "E016",
    "value": 53174713,
    "hs_code": "10063000",
    "invoice_date": "2025-12-17",
    "discounting_date": "2025-12-23"
  },
  "I0033": {
    "invoice_id": "I0033",
    "from": "E025",
    "to": "E031",
    "value": 19712652,
    "hs_code": "39012000",
    "invoice_date": "2026-02-06",
    "discounting_date": "2026-02-26"
  },
  "I0034": {
    "invoice_id": "I0034",
    "from": "E017",
    "to": "E029",
    "value": 85103166,
    "hs_code": null,
    "invoice_date": "2025-11-14",
    "discounting_date": "2025-12-09"
  },
  "I0035": {
    "invoice_id": "I0035",
    "from": "E005",
    "to": "E001",
    "value": 7643842,
    "hs_code": "84571000",
    "invoice_date": "2025-12-22",
    "discounting_date": "2025-12-26"
  },
  "I0036": {
    "invoice_id": "I0036",
    "from": "E010",
    "to": "E018",
    "value": 68366640,
    "hs_code": "10063000",
    "invoice_date": "2025-12-26",
    "discounting_date": "2026-01-27"
  },
  "I0037": {
    "invoice_id": "I0037",
    "from": "E024",
    "to": "E007",
    "value": 29806141,
    "hs_code": "72081000",
    "invoice_date": "2025-11-28",
    "discounting_date": "2026-01-07"
  },
  "I0038": {
    "invoice_id": "I0038",
    "from": "E020",
    "to": "E030",
    "value": 122941841,
    "hs_code": "84571000",
    "invoice_date": "2025-12-21",
    "discounting_date": "2025-12-28"
  },
  "I0039": {
    "invoice_id": "I0039",
    "from": "E016",
    "to": "E019",
    "value": 64301279,
    "hs_code": "85176200",
    "invoice_date": "2026-03-25",
    "discounting_date": "2026-03-30"
  },
  "I0040": {
    "invoice_id": "I0040",
    "from": "E028",
    "to": "E009",
    "value": 82458160,
    "hs_code": "27101990",
    "invoice_date": "2025-11-04",
    "discounting_date": "2025-12-03"
  },
  "I0041": {
    "invoice_id": "I0041",
    "from": "E007",
    "to": "E025",
    "value": 35512876,
    "hs_code": "10063000",
    "invoice_date": "2026-02-20",
    "discounting_date": "2026-03-06"
  },
  "I0042": {
    "invoice_id": "I0042",
    "from": "E031",
    "to": "E020",
    "value": 24056189,
    "hs_code": "27101990",
    "invoice_date": "2025-11-23",
    "discounting_date": "2025-12-13"
  },
  "I0043": {
    "invoice_id": "I0043",
    "from": "E016",
    "to": "E023",
    "value": 59411007,
    "hs_code": "39012000",
    "invoice_date": "2026-03-07",
    "discounting_date": "2026-03-30"
  },
  "I0044": {
    "invoice_id": "I0044",
    "from": "E032",
    "to": "E017",
    "value": 52730277,
    "hs_code": "49011000",
    "invoice_date": "2026-01-10",
    "discounting_date": "2026-02-17"
  },
  "I0045": {
    "invoice_id": "I0045",
    "from": "E013",
    "to": "E030",
    "value": 78457894,
    "hs_code": "26011100",
    "invoice_date": "2026-01-01",
    "discounting_date": "2026-02-03"
  },
  "I0046": {
    "invoice_id": "I0046",
    "from": "E029",
    "to": "E003",
    "value": 93130035,
    "hs_code": "84571000",
    "invoice_date": "2026-01-02",
    "discounting_date": "2026-01-24"
  },
  "I0047": {
    "invoice_id": "I0047",
    "from": "E024",
    "to": "E032",
    "value": 54641861,
    "hs_code": "85176200",
    "invoice_date": "2026-03-21",
    "discounting_date": "2026-04-14"
  },
  "I0048": {
    "invoice_id": "I0048",
    "from": "E030",
    "to": "E020",
    "value": 84274070,
    "hs_code": "72081000",
    "invoice_date": "2025-12-20",
    "discounting_date": "2026-01-12"
  },
  "I0049": {
    "invoice_id": "I0049",
    "from": "E012",
    "to": "E023",
    "value": 52157070,
    "hs_code": "84571000",
    "invoice_date": "2026-03-31",
    "discounting_date": "2026-05-06"
  },
  "I0050": {
    "invoice_id": "I0050",
    "from": "E019",
    "to": "E031",
    "value": 71326148,
    "hs_code": "10063000",
    "invoice_date": "2026-02-01",
    "discounting_date": "2026-02-15"
  },
  "I0051": {
    "invoice_id": "I0051",
    "from": "E001",
    "to": "E011",
    "value": 8095617,
    "hs_code": "39012000",
    "invoice_date": "2025-11-14",
    "discounting_date": "2025-12-22"
  },
  "I0052": {
    "invoice_id": "I0052",
    "from": "E009",
    "to": "E029",
    "value": 100973640,
    "hs_code": null,
    "invoice_date": "2026-03-27",
    "discounting_date": "2026-04-17"
  },
  "I0053": {
    "invoice_id": "I0053",
    "from": "E031",
    "to": "E005",
    "value": 78494117,
    "hs_code": "72081000",
    "invoice_date": "2026-03-03",
    "discounting_date": "2026-03-13"
  },
  "I0054": {
    "invoice_id": "I0054",
    "from": "E026",
    "to": "E001",
    "value": 24150021,
    "hs_code": "72081000",
    "invoice_date": "2026-03-25",
    "discounting_date": "2026-04-16"
  },
  "I0055": {
    "invoice_id": "I0055",
    "from": "E016",
    "to": "E030",
    "value": 64082904,
    "hs_code": "26011100",
    "invoice_date": "2026-02-06",
    "discounting_date": "2026-03-09"
  },
  "I0056": {
    "invoice_id": "I0056",
    "from": "E020",
    "to": "E029",
    "value": 98071917,
    "hs_code": "84571000",
    "invoice_date": "2025-11-16",
    "discounting_date": "2025-12-28"
  },
  "I0057": {
    "invoice_id": "I0057",
    "from": "E007",
    "to": "E008",
    "value": 32874063,
    "hs_code": "74031100",
    "invoice_date": "2025-11-21",
    "discounting_date": "2025-12-04"
  },
  "I0058": {
    "invoice_id": "I0058",
    "from": "E012",
    "to": "E008",
    "value": 53403007,
    "hs_code": "49011000",
    "invoice_date": "2026-03-01",
    "discounting_date": "2026-03-22"
  },
  "I0059": {
    "invoice_id": "I0059",
    "from": "E015",
    "to": "E019",
    "value": 70899137,
    "hs_code": "94036000",
    "invoice_date": "2025-12-30",
    "discounting_date": "2026-01-18"
  },
  "I0060": {
    "invoice_id": "I0060",
    "from": "E013",
    "to": "E032",
    "value": 37949407,
    "hs_code": "72081000",
    "invoice_date": "2026-01-08",
    "discounting_date": "2026-01-20"
  },
  "I0061": {
    "invoice_id": "I0061",
    "from": "E004",
    "to": "E019",
    "value": 96761430,
    "hs_code": "26011100",
    "invoice_date": "2026-02-21",
    "discounting_date": "2026-03-03"
  },
  "I0062": {
    "invoice_id": "I0062",
    "from": "E020",
    "to": "E014",
    "value": 97589062,
    "hs_code": "84571000",
    "invoice_date": "2026-02-21",
    "discounting_date": "2026-03-01"
  },
  "I0063": {
    "invoice_id": "I0063",
    "from": "E003",
    "to": "E027",
    "value": 98268296,
    "hs_code": "84571000",
    "invoice_date": "2025-12-29",
    "discounting_date": "2026-02-06"
  },
  "I0064": {
    "invoice_id": "I0064",
    "from": "E002",
    "to": "E030",
    "value": 50648445,
    "hs_code": "27101990",
    "invoice_date": "2025-12-15",
    "discounting_date": "2026-01-17"
  },
  "I0065": {
    "invoice_id": "I0065",
    "from": "E018",
    "to": "E030",
    "value": 85035182,
    "hs_code": "26011100",
    "invoice_date": "2026-03-01",
    "discounting_date": "2026-03-26"
  },
  "I0066": {
    "invoice_id": "I0066",
    "from": "E022",
    "to": "E007",
    "value": 26320543,
    "hs_code": "26011100",
    "invoice_date": "2026-03-07",
    "discounting_date": "2026-03-28"
  },
  "I0067": {
    "invoice_id": "I0067",
    "from": "E003",
    "to": "E028",
    "value": 103807836,
    "hs_code": "49011000",
    "invoice_date": "2026-02-12",
    "discounting_date": "2026-03-19"
  },
  "I0068": {
    "invoice_id": "I0068",
    "from": "E030",
    "to": "E012",
    "value": 95439735,
    "hs_code": "27101990",
    "invoice_date": "2026-03-08",
    "discounting_date": "2026-04-20"
  },
  "I0069": {
    "invoice_id": "I0069",
    "from": "E004",
    "to": "E008",
    "value": 46254186,
    "hs_code": "72081000",
    "invoice_date": "2026-03-05",
    "discounting_date": "2026-03-15"
  },
  "I0070": {
    "invoice_id": "I0070",
    "from": "E016",
    "to": "E020",
    "value": 55978875,
    "hs_code": "39012000",
    "invoice_date": "2026-02-13",
    "discounting_date": "2026-02-21"
  },
  "I0071": {
    "invoice_id": "I0071",
    "from": "E008",
    "to": "E003",
    "value": 53177285,
    "hs_code": "10063000",
    "invoice_date": "2026-01-14",
    "discounting_date": "2026-02-18"
  },
  "I0072": {
    "invoice_id": "I0072",
    "from": "E027",
    "to": "E032",
    "value": 112159236,
    "hs_code": "49011000",
    "invoice_date": "2025-12-08",
    "discounting_date": "2026-01-04"
  },
  "I0073": {
    "invoice_id": "I0073",
    "from": "E009",
    "to": "E023",
    "value": 92186165,
    "hs_code": null,
    "invoice_date": "2026-03-10",
    "discounting_date": "2026-03-30"
  },
  "I0074": {
    "invoice_id": "I0074",
    "from": "E019",
    "to": "E023",
    "value": 120930545,
    "hs_code": "27101990",
    "invoice_date": "2026-03-06",
    "discounting_date": "2026-03-18"
  },
  "I0075": {
    "invoice_id": "I0075",
    "from": "E031",
    "to": "E032",
    "value": 80273443,
    "hs_code": "74031100",
    "invoice_date": "2026-01-22",
    "discounting_date": "2026-02-06"
  },
  "I0076": {
    "invoice_id": "I0076",
    "from": "E025",
    "to": "E017",
    "value": 39548391,
    "hs_code": "39012000",
    "invoice_date": "2026-03-02",
    "discounting_date": "2026-03-29"
  },
  "I0077": {
    "invoice_id": "I0077",
    "from": "E010",
    "to": "E001",
    "value": 67641361,
    "hs_code": "27101990",
    "invoice_date": "2026-01-24",
    "discounting_date": "2026-02-02"
  },
  "I0078": {
    "invoice_id": "I0078",
    "from": "E007",
    "to": "E029",
    "value": 31439592,
    "hs_code": "74031100",
    "invoice_date": "2026-02-13",
    "discounting_date": "2026-03-29"
  },
  "I0079": {
    "invoice_id": "I0079",
    "from": "E005",
    "to": "E019",
    "value": 92203262,
    "hs_code": "49011000",
    "invoice_date": "2026-02-10",
    "discounting_date": "2026-03-26"
  },
  "I0080": {
    "invoice_id": "I0080",
    "from": "E022",
    "to": "E021",
    "value": 65768839,
    "hs_code": "72081000",
    "invoice_date": "2026-03-05",
    "discounting_date": "2026-04-11"
  },
  "I0081": {
    "invoice_id": "I0081",
    "from": "E005",
    "to": "E023",
    "value": 98077236,
    "hs_code": "49011000",
    "invoice_date": "2025-11-24",
    "discounting_date": "2025-12-24"
  },
  "I0082": {
    "invoice_id": "I0082",
    "from": "E007",
    "to": "E020",
    "value": 27878671,
    "hs_code": "10063000",
    "invoice_date": "2025-11-15",
    "discounting_date": "2025-12-06"
  },
  "I0083": {
    "invoice_id": "I0083",
    "from": "E024",
    "to": "E012",
    "value": 82996546,
    "hs_code": "39012000",
    "invoice_date": "2025-12-17",
    "discounting_date": "2025-12-30"
  },
  "I0084": {
    "invoice_id": "I0084",
    "from": "E006",
    "to": "E027",
    "value": 36816867,
    "hs_code": "39012000",
    "invoice_date": "2026-03-30",
    "discounting_date": "2026-04-11"
  },
  "I0085": {
    "invoice_id": "I0085",
    "from": "E030",
    "to": "E017",
    "value": 100627925,
    "hs_code": "74031100",
    "invoice_date": "2026-02-28",
    "discounting_date": "2026-03-21"
  },
  "I0086": {
    "invoice_id": "I0086",
    "from": "E005",
    "to": "E028",
    "value": 92449408,
    "hs_code": "39012000",
    "invoice_date": "2026-02-17",
    "discounting_date": "2026-03-08"
  },
  "I0087": {
    "invoice_id": "I0087",
    "from": "E020",
    "to": "E017",
    "value": 29867274,
    "hs_code": "39012000",
    "invoice_date": "2026-02-06",
    "discounting_date": "2026-03-17"
  },
  "I0088": {
    "invoice_id": "I0088",
    "from": "E019",
    "to": "E008",
    "value": 114847359,
    "hs_code": "72081000",
    "invoice_date": "2026-02-10",
    "discounting_date": "2026-03-02"
  },
  "I0089": {
    "invoice_id": "I0089",
    "from": "E004",
    "to": "E021",
    "value": 48702844,
    "hs_code": "85176200",
    "invoice_date": "2025-12-29",
    "discounting_date": "2026-02-08"
  },
  "I0090": {
    "invoice_id": "I0090",
    "from": "E015",
    "to": "E020",
    "value": 78321488,
    "hs_code": "26011100",
    "invoice_date": "2025-11-11",
    "discounting_date": "2025-12-03"
  },
  "I0091": {
    "invoice_id": "I0091",
    "from": "E003",
    "to": "E008",
    "value": 65510456,
    "hs_code": "49011000",
    "invoice_date": "2026-01-23",
    "discounting_date": "2026-02-21"
  },
  "I0092": {
    "invoice_id": "I0092",
    "from": "E013",
    "to": "E028",
    "value": 84263562,
    "hs_code": "85176200",
    "invoice_date": "2026-01-09",
    "discounting_date": "2026-01-22"
  },
  "I0093": {
    "invoice_id": "I0093",
    "from": "E031",
    "to": "E008",
    "value": 86365017,
    "hs_code": "74031100",
    "invoice_date": "2026-02-28",
    "discounting_date": "2026-03-07"
  },
  "I0094": {
    "invoice_id": "I0094",
    "from": "E015",
    "to": "E026",
    "value": 82838596,
    "hs_code": "72081000",
    "invoice_date": "2026-03-23",
    "discounting_date": "2026-04-18"
  },
  "I0095": {
    "invoice_id": "I0095",
    "from": "E026",
    "to": "E007",
    "value": 93087149,
    "hs_code": "26011100",
    "invoice_date": "2026-01-07",
    "discounting_date": "2026-02-16"
  },
  "I0096": {
    "invoice_id": "I0096",
    "from": "E024",
    "to": "E010",
    "value": 68871306,
    "hs_code": "94036000",
    "invoice_date": "2026-03-24",
    "discounting_date": "2026-04-16"
  },
  "I0097": {
    "invoice_id": "I0097",
    "from": "E015",
    "to": "E029",
    "value": 78601176,
    "hs_code": "72081000",
    "invoice_date": "2025-11-30",
    "discounting_date": "2025-12-11"
  },
  "I0098": {
    "invoice_id": "I0098",
    "from": "E003",
    "to": "E031",
    "value": 56869830,
    "hs_code": "39012000",
    "invoice_date": "2026-03-18",
    "discounting_date": "2026-03-29"
  },
  "I0099": {
    "invoice_id": "I0099",
    "from": "E030",
    "to": "E032",
    "value": 99275859,
    "hs_code": "72081000",
    "invoice_date": "2025-12-10",
    "discounting_date": "2026-01-08"
  },
  "I0100": {
    "invoice_id": "I0100",
    "from": "E032",
    "to": "E014",
    "value": 117945293,
    "hs_code": "39012000",
    "invoice_date": "2025-12-26",
    "discounting_date": "2026-01-26"
  },
  "I0101": {
    "invoice_id": "I0101",
    "from": "E016",
    "to": "E006",
    "value": 61623811,
    "hs_code": "26011100",
    "invoice_date": "2026-01-31",
    "discounting_date": "2026-02-06"
  },
  "I0102": {
    "invoice_id": "I0102",
    "from": "E018",
    "to": "E007",
    "value": 73038452,
    "hs_code": "94036000",
    "invoice_date": "2025-12-25",
    "discounting_date": "2026-02-07"
  },
  "I0103": {
    "invoice_id": "I0103",
    "from": "E002",
    "to": "E015",
    "value": 54235013,
    "hs_code": "72081000",
    "invoice_date": "2026-03-25",
    "discounting_date": "2026-04-10"
  },
  "I0104": {
    "invoice_id": "I0104",
    "from": "E014",
    "to": "E012",
    "value": 142109183,
    "hs_code": "39012000",
    "invoice_date": "2025-11-01",
    "discounting_date": "2025-11-21"
  },
  "I0105": {
    "invoice_id": "I0105",
    "from": "E009",
    "to": "E008",
    "value": 97482987,
    "hs_code": null,
    "invoice_date": "2025-11-07",
    "discounting_date": "2025-11-18"
  },
  "I0106": {
    "invoice_id": "I0106",
    "from": "E023",
    "to": "E012",
    "value": 103290650,
    "hs_code": null,
    "invoice_date": "2026-01-07",
    "discounting_date": "2026-01-13"
  },
  "I0107": {
    "invoice_id": "I0107",
    "from": "E027",
    "to": "E007",
    "value": 41958528,
    "hs_code": "84571000",
    "invoice_date": "2026-02-01",
    "discounting_date": "2026-03-08"
  },
  "I0108": {
    "invoice_id": "I0108",
    "from": "E007",
    "to": "E012",
    "value": 50159263,
    "hs_code": "27101990",
    "invoice_date": "2026-03-14",
    "discounting_date": "2026-04-05"
  },
  "I0109": {
    "invoice_id": "I0109",
    "from": "E002",
    "to": "E018",
    "value": 49344704,
    "hs_code": "27101990",
    "invoice_date": "2025-11-28",
    "discounting_date": "2026-01-01"
  },
  "I0110": {
    "invoice_id": "I0110",
    "from": "E005",
    "to": "E027",
    "value": 83449956,
    "hs_code": "84571000",
    "invoice_date": "2026-01-10",
    "discounting_date": "2026-02-21"
  },
  "I0111": {
    "invoice_id": "I0111",
    "from": "E021",
    "to": "E019",
    "value": 56062341,
    "hs_code": "72081000",
    "invoice_date": "2026-02-19",
    "discounting_date": "2026-02-28"
  },
  "I0112": {
    "invoice_id": "I0112",
    "from": "E014",
    "to": "E012",
    "value": 131837635,
    "hs_code": "26011100",
    "invoice_date": "2026-02-25",
    "discounting_date": "2026-03-25"
  },
  "I0113": {
    "invoice_id": "I0113",
    "from": "E007",
    "to": "E025",
    "value": 47197478,
    "hs_code": "72081000",
    "invoice_date": "2025-12-10",
    "discounting_date": "2026-01-12"
  },
  "I0114": {
    "invoice_id": "I0114",
    "from": "E006",
    "to": "E011",
    "value": 65895135,
    "hs_code": "94036000",
    "invoice_date": "2026-02-04",
    "discounting_date": "2026-02-15"
  },
  "I0115": {
    "invoice_id": "I0115",
    "from": "E004",
    "to": "E032",
    "value": 86359380,
    "hs_code": "85176200",
    "invoice_date": "2025-12-02",
    "discounting_date": "2025-12-31"
  },
  "I0116": {
    "invoice_id": "I0116",
    "from": "E028",
    "to": "E030",
    "value": 104796883,
    "hs_code": "72081000",
    "invoice_date": "2026-01-19",
    "discounting_date": "2026-02-13"
  },
  "I0117": {
    "invoice_id": "I0117",
    "from": "E014",
    "to": "E031",
    "value": 143828973,
    "hs_code": "85176200",
    "invoice_date": "2026-01-29",
    "discounting_date": "2026-03-08"
  },
  "I0118": {
    "invoice_id": "I0118",
    "from": "E008",
    "to": "E028",
    "value": 118095206,
    "hs_code": "72081000",
    "invoice_date": "2026-03-24",
    "discounting_date": "2026-05-05"
  },
  "I0119": {
    "invoice_id": "I0119",
    "from": "E018",
    "to": "E019",
    "value": 60906538,
    "hs_code": "39012000",
    "invoice_date": "2026-01-29",
    "discounting_date": "2026-02-01"
  },
  "I0120": {
    "invoice_id": "I0120",
    "from": "E010",
    "to": "E027",
    "value": 74269089,
    "hs_code": "74031100",
    "invoice_date": "2025-11-08",
    "discounting_date": "2025-11-16"
  },
  "I0121": {
    "invoice_id": "I0121",
    "from": "E025",
    "to": "E028",
    "value": 53050466,
    "hs_code": "84571000",
    "invoice_date": "2026-01-23",
    "discounting_date": "2026-03-03"
  },
  "I0122": {
    "invoice_id": "I0122",
    "from": "E006",
    "to": "E013",
    "value": 74003244,
    "hs_code": "85176200",
    "invoice_date": "2025-11-13",
    "discounting_date": "2025-11-21"
  },
  "I0123": {
    "invoice_id": "I0123",
    "from": "E029",
    "to": "E018",
    "value": 89042300,
    "hs_code": "49011000",
    "invoice_date": "2025-12-26",
    "discounting_date": "2026-01-30"
  },
  "I0124": {
    "invoice_id": "I0124",
    "from": "E023",
    "to": "E019",
    "value": 113317145,
    "hs_code": null,
    "invoice_date": "2026-01-18",
    "discounting_date": "2026-01-23"
  },
  "I0125": {
    "invoice_id": "I0125",
    "from": "E026",
    "to": "E004",
    "value": 90367350,
    "hs_code": "85176200",
    "invoice_date": "2025-12-25",
    "discounting_date": "2026-01-05"
  },
  "I0126": {
    "invoice_id": "I0126",
    "from": "E019",
    "to": "E001",
    "value": 135912903,
    "hs_code": "27101990",
    "invoice_date": "2025-12-15",
    "discounting_date": "2025-12-26"
  },
  "I0127": {
    "invoice_id": "I0127",
    "from": "E015",
    "to": "E025",
    "value": 61253795,
    "hs_code": "72081000",
    "invoice_date": "2025-11-11",
    "discounting_date": "2025-12-11"
  },
  "I0128": {
    "invoice_id": "I0128",
    "from": "E030",
    "to": "E031",
    "value": 122104280,
    "hs_code": "27101990",
    "invoice_date": "2026-03-27",
    "discounting_date": "2026-04-24"
  },
  "I0129": {
    "invoice_id": "I0129",
    "from": "E019",
    "to": "E004",
    "value": 122878237,
    "hs_code": "72081000",
    "invoice_date": "2026-02-26",
    "discounting_date": "2026-03-24"
  },
  "I0130": {
    "invoice_id": "I0130",
    "from": "E028",
    "to": "E007",
    "value": 61950968,
    "hs_code": "27101990",
    "invoice_date": "2026-03-15",
    "discounting_date": "2026-03-23"
  },
  "I0131": {
    "invoice_id": "I0131",
    "from": "E020",
    "to": "E013",
    "value": 94441896,
    "hs_code": "84571000",
    "invoice_date": "2025-11-20",
    "discounting_date": "2025-12-25"
  },
  "I0132": {
    "invoice_id": "I0132",
    "from": "E008",
    "to": "E012",
    "value": 109202386,
    "hs_code": "72081000",
    "invoice_date": "2025-12-08",
    "discounting_date": "2025-12-26"
  },
  "I0133": {
    "invoice_id": "I0133",
    "from": "E010",
    "to": "E005",
    "value": 82786275,
    "hs_code": "27101990",
    "invoice_date": "2025-11-20",
    "discounting_date": "2025-12-04"
  },
  "I0134": {
    "invoice_id": "I0134",
    "from": "E030",
    "to": "E031",
    "value": 119445501,
    "hs_code": "10063000",
    "invoice_date": "2026-03-25",
    "discounting_date": "2026-05-08"
  },
  "I0135": {
    "invoice_id": "I0135",
    "from": "E021",
    "to": "E007",
    "value": 55445344,
    "hs_code": "94036000",
    "invoice_date": "2026-01-17",
    "discounting_date": "2026-02-06"
  },
  "I0136": {
    "invoice_id": "I0136",
    "from": "E004",
    "to": "E007",
    "value": 140369769,
    "hs_code": "85176200",
    "invoice_date": "2025-11-10",
    "discounting_date": "2025-11-16"
  },
  "I0137": {
    "invoice_id": "I0137",
    "from": "E019",
    "to": "E006",
    "value": 127696693,
    "hs_code": "72081000",
    "invoice_date": "2026-03-29",
    "discounting_date": "2026-05-06"
  },
  "I0138": {
    "invoice_id": "I0138",
    "from": "E029",
    "to": "E012",
    "value": 92042068,
    "hs_code": "49011000",
    "invoice_date": "2026-03-09",
    "discounting_date": "2026-03-21"
  },
  "I0139": {
    "invoice_id": "I0139",
    "from": "E029",
    "to": "E017",
    "value": 90462863,
    "hs_code": "49011000",
    "invoice_date": "2025-12-15",
    "discounting_date": "2025-12-20"
  },
  "I0140": {
    "invoice_id": "I0140",
    "from": "E029",
    "to": "E005",
    "value": 88392555,
    "hs_code": "39012000",
    "invoice_date": "2026-01-12",
    "discounting_date": "2026-02-08"
  },
  "I0141": {
    "invoice_id": "I0141",
    "from": "E019",
    "to": "E007",
    "value": 23154815,
    "hs_code": null,
    "invoice_date": "2025-12-14",
    "discounting_date": "2025-12-22"
  },
  "I0142": {
    "invoice_id": "I0142",
    "from": "E007",
    "to": "E003",
    "value": 22966287,
    "hs_code": "39012000",
    "invoice_date": "2025-12-16",
    "discounting_date": "2025-12-24"
  },
  "I0143": {
    "invoice_id": "I0143",
    "from": "E003",
    "to": "E022",
    "value": 23314076,
    "hs_code": "39012000",
    "invoice_date": "2025-12-20",
    "discounting_date": "2025-12-24"
  },
  "I0144": {
    "invoice_id": "I0144",
    "from": "E022",
    "to": "E009",
    "value": 23047551,
    "hs_code": "39012000",
    "invoice_date": "2025-12-24",
    "discounting_date": "2025-12-28"
  },
  "I0145": {
    "invoice_id": "I0145",
    "from": "E009",
    "to": "E019",
    "value": 23665866,
    "hs_code": "39012000",
    "invoice_date": "2025-12-28",
    "discounting_date": "2026-01-05"
  },
  "I0146": {
    "invoice_id": "I0146",
    "from": "E033",
    "to": "E034",
    "value": 58683548,
    "hs_code": "74031100",
    "invoice_date": "2025-11-05",
    "discounting_date": "2025-11-08"
  },
  "I0147": {
    "invoice_id": "I0147",
    "from": "E034",
    "to": "E035",
    "value": 57224489,
    "hs_code": "74031100",
    "invoice_date": "2025-11-08",
    "discounting_date": "2025-11-10"
  },
  "I0148": {
    "invoice_id": "I0148",
    "from": "E035",
    "to": "E036",
    "value": 57375843,
    "hs_code": "74031100",
    "invoice_date": "2025-11-09",
    "discounting_date": "2025-11-16"
  },
  "I0149": {
    "invoice_id": "I0149",
    "from": "E036",
    "to": "E037",
    "value": 55804437,
    "hs_code": "74031100",
    "invoice_date": "2025-11-13",
    "discounting_date": "2025-11-19"
  },
  "I0150": {
    "invoice_id": "I0150",
    "from": "E037",
    "to": "E038",
    "value": 54184687,
    "hs_code": "74031100",
    "invoice_date": "2025-11-14",
    "discounting_date": "2025-11-20"
  },
  "I0151": {
    "invoice_id": "I0151",
    "from": "E038",
    "to": "E039",
    "value": 54695446,
    "hs_code": "74031100",
    "invoice_date": "2025-11-15",
    "discounting_date": "2025-11-21"
  },
  "I0152": {
    "invoice_id": "I0152",
    "from": "E040",
    "to": "E041",
    "value": 58056130,
    "hs_code": null,
    "invoice_date": "2026-02-04",
    "discounting_date": "2026-02-12"
  },
  "I0153": {
    "invoice_id": "I0153",
    "from": "E041",
    "to": "E042",
    "value": 56548644,
    "hs_code": "39012000",
    "invoice_date": "2026-02-07",
    "discounting_date": "2026-02-13"
  },
  "I0154": {
    "invoice_id": "I0154",
    "from": "E042",
    "to": "E043",
    "value": 56776799,
    "hs_code": "39012000",
    "invoice_date": "2026-02-09",
    "discounting_date": "2026-02-17"
  },
  "I0155": {
    "invoice_id": "I0155",
    "from": "E043",
    "to": "E044",
    "value": 56340798,
    "hs_code": "39012000",
    "invoice_date": "2026-02-10",
    "discounting_date": "2026-02-13"
  },
  "I0156": {
    "invoice_id": "I0156",
    "from": "E044",
    "to": "E045",
    "value": 55996107,
    "hs_code": "39012000",
    "invoice_date": "2026-02-13",
    "discounting_date": "2026-02-17"
  },
  "I0157": {
    "invoice_id": "I0157",
    "from": "E045",
    "to": "E040",
    "value": 54403286,
    "hs_code": "39012000",
    "invoice_date": "2026-02-15",
    "discounting_date": "2026-02-23"
  },
  "I0158": {
    "invoice_id": "I0158",
    "from": "E046",
    "to": "E047",
    "value": 67315196,
    "hs_code": "10063000",
    "invoice_date": "2026-03-16",
    "discounting_date": "2026-03-19"
  },
  "I0159": {
    "invoice_id": "I0159",
    "from": "E047",
    "to": "E048",
    "value": 67890089,
    "hs_code": "10063000",
    "invoice_date": "2026-03-20",
    "discounting_date": "2026-03-28"
  },
  "I0160": {
    "invoice_id": "I0160",
    "from": "E048",
    "to": "E049",
    "value": 67256734,
    "hs_code": "10063000",
    "invoice_date": "2026-03-22",
    "discounting_date": "2026-03-25"
  },
  "I0161": {
    "invoice_id": "I0161",
    "from": "E049",
    "to": "E046",
    "value": 68914123,
    "hs_code": "10063000",
    "invoice_date": "2026-03-23",
    "discounting_date": "2026-03-25"
  },
  "I0162": {
    "invoice_id": "I0162",
    "from": "E050",
    "to": "E051",
    "value": 59214275,
    "hs_code": "39012000",
    "invoice_date": "2026-01-06",
    "discounting_date": "2026-01-10"
  },
  "I0163": {
    "invoice_id": "I0163",
    "from": "E051",
    "to": "E052",
    "value": 59208112,
    "hs_code": "39012000",
    "invoice_date": "2026-01-10",
    "discounting_date": "2026-01-18"
  },
  "I0164": {
    "invoice_id": "I0164",
    "from": "E052",
    "to": "E053",
    "value": 59198769,
    "hs_code": "39012000",
    "invoice_date": "2026-01-11",
    "discounting_date": "2026-01-18"
  },
  "I0165": {
    "invoice_id": "I0165",
    "from": "E053",
    "to": "E054",
    "value": 60856405,
    "hs_code": null,
    "invoice_date": "2026-01-13",
    "discounting_date": "2026-01-19"
  },
  "I0166": {
    "invoice_id": "I0166",
    "from": "E054",
    "to": "E055",
    "value": 60058052,
    "hs_code": "39012000",
    "invoice_date": "2026-01-17",
    "discounting_date": "2026-01-22"
  },
  "I0167": {
    "invoice_id": "I0167",
    "from": "E055",
    "to": "E056",
    "value": 61309081,
    "hs_code": "39012000",
    "invoice_date": "2026-01-21",
    "discounting_date": "2026-01-24"
  },
  "I0168": {
    "invoice_id": "I0168",
    "from": "E056",
    "to": "E050",
    "value": 62145979,
    "hs_code": null,
    "invoice_date": "2026-01-25",
    "discounting_date": "2026-01-31"
  },
  "I0169": {
    "invoice_id": "I0169",
    "from": "E057",
    "to": "E058",
    "value": 73338794,
    "hs_code": "74031100",
    "invoice_date": "2026-03-07",
    "discounting_date": "2026-03-13"
  },
  "I0170": {
    "invoice_id": "I0170",
    "from": "E058",
    "to": "E059",
    "value": 71620926,
    "hs_code": "74031100",
    "invoice_date": "2026-03-11",
    "discounting_date": "2026-03-16"
  },
  "I0171": {
    "invoice_id": "I0171",
    "from": "E059",
    "to": "E060",
    "value": 72589201,
    "hs_code": "74031100",
    "invoice_date": "2026-03-12",
    "discounting_date": "2026-03-20"
  },
  "I0172": {
    "invoice_id": "I0172",
    "from": "E060",
    "to": "E057",
    "value": 73266854,
    "hs_code": "74031100",
    "invoice_date": "2026-03-14",
    "discounting_date": "2026-03-15"
  }
};
