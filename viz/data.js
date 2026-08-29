const SCORED = {
  "schema_version": 1,
  "source_dataset": "entities",
  "count": 50,
  "rings": [
    {
      "ring_id": "R13712",
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
        "externality": 0.22
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.38,
      "expected_loss": 309828732,
      "evidence": {
        "value": "Net position score: 0.49",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.32",
        "externality": "Externality score: 0.22",
        "industry": "Flagged cross-industry trades: Entity E023 (NIC-7020) received HS 49011000; Entity E008 (NIC-4662) received HS 72081000; Entity E028 (NIC-4620) received HS 72081000; Entity E030 (NIC-4620) received HS 72081000; Entity E020 (NIC-5210) received HS 72081000; Entity E029 (NIC-4690) received HS 84571000; Entity E005 (NIC-4690) received HS 39012000"
      }
    },
    {
      "ring_id": "R13711",
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
      "expected_loss": 278773287,
      "evidence": {
        "value": "Net position score: 0.59",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.19",
        "externality": "Externality score: 0.22",
        "industry": "Flagged cross-industry trades: Entity E023 (NIC-7020) received HS 49011000; Entity E008 (NIC-4662) received HS 72081000; Entity E028 (NIC-4620) received HS 72081000; Entity E030 (NIC-4620) received HS 72081000; Entity E017 (NIC-8299) received HS 74031100; Entity E005 (NIC-4690) received HS 39012000"
      }
    },
    {
      "ring_id": "R14934",
      "canonical_key": "E005|E028|E030|E020|E013|E015|E019|E031",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E028",
        "E030",
        "E020",
        "E013",
        "E015",
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
          "to": "E015",
          "invoice_id": "I0171",
          "value": 73313556,
          "hs_code": "72081000",
          "invoice_date": "2026-01-15",
          "discounting_date": "2026-01-20"
        },
        {
          "hop_type": "invoice",
          "from": "E015",
          "to": "E019",
          "invoice_id": "I0059",
          "value": 70899137,
          "hs_code": "94036000",
          "invoice_date": "2025-12-30",
          "discounting_date": "2026-01-18"
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
        "value": 0.42,
        "product": null,
        "timing": 0.36,
        "externality": 0.25
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.37,
      "expected_loss": 245911635,
      "evidence": {
        "value": "Net position score: 0.42",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.36",
        "externality": "Externality score: 0.25",
        "industry": "Flagged cross-industry trades: Entity E028 (NIC-4620) received HS 39012000; Entity E030 (NIC-4620) received HS 72081000; Entity E020 (NIC-5210) received HS 72081000; Entity E013 (NIC-1392) received HS 84571000; Entity E015 (NIC-2013) received HS 72081000; Entity E019 (NIC-4620) received HS 94036000; Entity E031 (NIC-4662) received HS 10063000; Entity E005 (NIC-4690) received HS 72081000"
      }
    },
    {
      "ring_id": "R22301",
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
        "externality": 0.27
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.39,
      "expected_loss": 242421392,
      "evidence": {
        "value": "Net position score: 0.54",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.29",
        "externality": "Externality score: 0.27",
        "industry": "Flagged cross-industry trades: Entity E018 (NIC-2610) received HS 49011000; Entity E030 (NIC-4620) received HS 26011100; Entity E020 (NIC-5210) received HS 72081000; Entity E013 (NIC-1392) received HS 84571000; Entity E028 (NIC-4620) received HS 85176200; Entity E009 (NIC-6202) received HS 27101990"
      }
    },
    {
      "ring_id": "R12079",
      "canonical_key": "E004|E012|E018|E028|E029|E020|E024",
      "closure_type": "transaction",
      "entities": [
        "E004",
        "E012",
        "E018",
        "E028",
        "E029",
        "E020",
        "E024"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E004",
          "to": "E012",
          "invoice_id": "I0167",
          "value": 63507551,
          "hs_code": "39012000",
          "invoice_date": "2026-01-05",
          "discounting_date": "2026-01-13"
        },
        {
          "hop_type": "invoice",
          "from": "E012",
          "to": "E018",
          "invoice_id": "I0168",
          "value": 63075616,
          "hs_code": "39012000",
          "invoice_date": "2026-01-07",
          "discounting_date": "2026-01-15"
        },
        {
          "hop_type": "invoice",
          "from": "E018",
          "to": "E028",
          "invoice_id": "I0162",
          "value": 64491283,
          "hs_code": "39012000",
          "invoice_date": "2025-12-21",
          "discounting_date": "2025-12-22"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E029",
          "invoice_id": "I0163",
          "value": 62726051,
          "hs_code": "39012000",
          "invoice_date": "2025-12-23",
          "discounting_date": "2025-12-24"
        },
        {
          "hop_type": "invoice",
          "from": "E029",
          "to": "E020",
          "invoice_id": "I0164",
          "value": 62011259,
          "hs_code": "39012000",
          "invoice_date": "2025-12-27",
          "discounting_date": "2026-01-04"
        },
        {
          "hop_type": "invoice",
          "from": "E020",
          "to": "E024",
          "invoice_id": "I0165",
          "value": 62953672,
          "hs_code": "39012000",
          "invoice_date": "2025-12-29",
          "discounting_date": "2026-01-03"
        },
        {
          "hop_type": "invoice",
          "from": "E024",
          "to": "E004",
          "invoice_id": "I0166",
          "value": 64014472,
          "hs_code": "39012000",
          "invoice_date": "2026-01-01",
          "discounting_date": "2026-01-06"
        }
      ],
      "scores": {
        "value": 0.9,
        "product": null,
        "timing": 0.42,
        "externality": 0.17
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.54,
      "expected_loss": 240589100,
      "evidence": {
        "value": "Net position score: 0.90",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.42",
        "externality": "Externality score: 0.17",
        "industry": "Flagged cross-industry trades: Entity E012 (NIC-5229) received HS 39012000; Entity E018 (NIC-2610) received HS 39012000; Entity E028 (NIC-4620) received HS 39012000; Entity E029 (NIC-4690) received HS 39012000; Entity E020 (NIC-5210) received HS 39012000; Entity E024 (NIC-1392) received HS 39012000; Entity E004 (NIC-2610) received HS 39012000"
      }
    },
    {
      "ring_id": "R10042",
      "canonical_key": "E003|E028|E030|E020|E013|E015|E029",
      "closure_type": "transaction",
      "entities": [
        "E003",
        "E028",
        "E030",
        "E020",
        "E013",
        "E015",
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
          "to": "E015",
          "invoice_id": "I0171",
          "value": 73313556,
          "hs_code": "72081000",
          "invoice_date": "2026-01-15",
          "discounting_date": "2026-01-20"
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
          "to": "E003",
          "invoice_id": "I0046",
          "value": 93130035,
          "hs_code": "84571000",
          "invoice_date": "2026-01-02",
          "discounting_date": "2026-01-24"
        }
      ],
      "scores": {
        "value": 0.42,
        "product": null,
        "timing": 0.37,
        "externality": 0.27
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.38,
      "expected_loss": 237448230,
      "evidence": {
        "value": "Net position score: 0.42",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.37",
        "externality": "Externality score: 0.27",
        "industry": "Flagged cross-industry trades: Entity E028 (NIC-4620) received HS 49011000; Entity E030 (NIC-4620) received HS 72081000; Entity E020 (NIC-5210) received HS 72081000; Entity E013 (NIC-1392) received HS 84571000; Entity E015 (NIC-2013) received HS 72081000; Entity E029 (NIC-4690) received HS 72081000; Entity E003 (NIC-5210) received HS 84571000"
      }
    },
    {
      "ring_id": "R13713",
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
      "expected_loss": 233959145,
      "evidence": {
        "value": "Net position score: 0.38",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.25",
        "externality": "Externality score: 0.27",
        "industry": "Flagged cross-industry trades: Entity E023 (NIC-7020) received HS 49011000; Entity E008 (NIC-4662) received HS 72081000; Entity E028 (NIC-4620) received HS 72081000; Entity E030 (NIC-4620) received HS 72081000; Entity E031 (NIC-4662) received HS 10063000; Entity E005 (NIC-4690) received HS 72081000"
      }
    },
    {
      "ring_id": "R14939",
      "canonical_key": "E005|E028|E030|E020|E013|E015|E029",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E028",
        "E030",
        "E020",
        "E013",
        "E015",
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
          "to": "E015",
          "invoice_id": "I0171",
          "value": 73313556,
          "hs_code": "72081000",
          "invoice_date": "2026-01-15",
          "discounting_date": "2026-01-20"
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
        "value": 0.41,
        "product": null,
        "timing": 0.4,
        "externality": 0.25
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.38,
      "expected_loss": 232683679,
      "evidence": {
        "value": "Net position score: 0.41",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.40",
        "externality": "Externality score: 0.25",
        "industry": "Flagged cross-industry trades: Entity E028 (NIC-4620) received HS 39012000; Entity E030 (NIC-4620) received HS 72081000; Entity E020 (NIC-5210) received HS 72081000; Entity E013 (NIC-1392) received HS 84571000; Entity E015 (NIC-2013) received HS 72081000; Entity E029 (NIC-4690) received HS 72081000; Entity E005 (NIC-4690) received HS 39012000"
      }
    },
    {
      "ring_id": "R17425",
      "canonical_key": "E007|E012|E018|E030|E020|E013|E015|E026",
      "closure_type": "transaction",
      "entities": [
        "E007",
        "E012",
        "E018",
        "E030",
        "E020",
        "E013",
        "E015",
        "E026"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E007",
          "to": "E012",
          "invoice_id": "I0108",
          "value": 50159263,
          "hs_code": "27101990",
          "invoice_date": "2026-03-14",
          "discounting_date": "2026-04-05"
        },
        {
          "hop_type": "invoice",
          "from": "E012",
          "to": "E018",
          "invoice_id": "I0168",
          "value": 63075616,
          "hs_code": "39012000",
          "invoice_date": "2026-01-07",
          "discounting_date": "2026-01-15"
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
          "to": "E015",
          "invoice_id": "I0171",
          "value": 73313556,
          "hs_code": "72081000",
          "invoice_date": "2026-01-15",
          "discounting_date": "2026-01-20"
        },
        {
          "hop_type": "invoice",
          "from": "E015",
          "to": "E026",
          "invoice_id": "I0155",
          "value": 60274604,
          "hs_code": "72081000",
          "invoice_date": "2025-11-09",
          "discounting_date": "2025-11-10"
        },
        {
          "hop_type": "invoice",
          "from": "E026",
          "to": "E007",
          "invoice_id": "I0095",
          "value": 93087149,
          "hs_code": "26011100",
          "invoice_date": "2026-01-07",
          "discounting_date": "2026-02-16"
        }
      ],
      "scores": {
        "value": 0.18,
        "product": 1.0,
        "timing": 0.37,
        "externality": 0.26
      },
      "abstained": [],
      "aggregate": 0.37,
      "expected_loss": 226025209,
      "evidence": {
        "value": "Net position score: 0.18",
        "product": "HS code consistency: 1.00",
        "timing": "Regularity score: 0.37",
        "externality": "Externality score: 0.26",
        "industry": "Flagged cross-industry trades: Entity E012 (NIC-5229) received HS 27101990; Entity E018 (NIC-2610) received HS 39012000; Entity E030 (NIC-4620) received HS 26011100; Entity E020 (NIC-5210) received HS 72081000; Entity E013 (NIC-1392) received HS 84571000; Entity E015 (NIC-2013) received HS 72081000; Entity E026 (NIC-1392) received HS 72081000; Entity E007 (NIC-4662) received HS 26011100"
      }
    },
    {
      "ring_id": "R22178",
      "canonical_key": "E009|E029|E012|E018|E030|E020|E013|E028",
      "closure_type": "transaction",
      "entities": [
        "E009",
        "E029",
        "E012",
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
          "to": "E012",
          "invoice_id": "I0138",
          "value": 92042068,
          "hs_code": "49011000",
          "invoice_date": "2026-03-09",
          "discounting_date": "2026-03-21"
        },
        {
          "hop_type": "invoice",
          "from": "E012",
          "to": "E018",
          "invoice_id": "I0168",
          "value": 63075616,
          "hs_code": "39012000",
          "invoice_date": "2026-01-07",
          "discounting_date": "2026-01-15"
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
        "value": 0.37,
        "product": null,
        "timing": 0.27,
        "externality": 0.28
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.32,
      "expected_loss": 219834945,
      "evidence": {
        "value": "Net position score: 0.37",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.27",
        "externality": "Externality score: 0.28",
        "industry": "Flagged cross-industry trades: Entity E012 (NIC-5229) received HS 49011000; Entity E018 (NIC-2610) received HS 39012000; Entity E030 (NIC-4620) received HS 26011100; Entity E020 (NIC-5210) received HS 72081000; Entity E013 (NIC-1392) received HS 84571000; Entity E028 (NIC-4620) received HS 85176200; Entity E009 (NIC-6202) received HS 27101990"
      }
    },
    {
      "ring_id": "R22432",
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
        "externality": 0.23
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.35,
      "expected_loss": 219646243,
      "evidence": {
        "value": "Net position score: 0.44",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.29",
        "externality": "Externality score: 0.23",
        "industry": "Flagged cross-industry trades: Entity E021 (NIC-1392) received HS 49011000; Entity E018 (NIC-2610) received HS 39012000; Entity E020 (NIC-5210) received HS 72081000; Entity E013 (NIC-1392) received HS 84571000; Entity E028 (NIC-4620) received HS 85176200; Entity E009 (NIC-6202) received HS 27101990"
      }
    },
    {
      "ring_id": "R14938",
      "canonical_key": "E005|E028|E030|E020|E013|E015|E026|E031",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E028",
        "E030",
        "E020",
        "E013",
        "E015",
        "E026",
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
          "to": "E015",
          "invoice_id": "I0171",
          "value": 73313556,
          "hs_code": "72081000",
          "invoice_date": "2026-01-15",
          "discounting_date": "2026-01-20"
        },
        {
          "hop_type": "invoice",
          "from": "E015",
          "to": "E026",
          "invoice_id": "I0155",
          "value": 60274604,
          "hs_code": "72081000",
          "invoice_date": "2025-11-09",
          "discounting_date": "2025-11-10"
        },
        {
          "hop_type": "invoice",
          "from": "E026",
          "to": "E031",
          "invoice_id": "I0156",
          "value": 60777119,
          "hs_code": "72081000",
          "invoice_date": "2025-11-13",
          "discounting_date": "2025-11-15"
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
        "value": 0.33,
        "product": 1.0,
        "timing": 0.11,
        "externality": 0.28
      },
      "abstained": [],
      "aggregate": 0.34,
      "expected_loss": 219509422,
      "evidence": {
        "value": "Net position score: 0.33",
        "product": "HS code consistency: 1.00",
        "timing": "Regularity score: 0.11",
        "externality": "Externality score: 0.28",
        "industry": "Flagged cross-industry trades: Entity E028 (NIC-4620) received HS 39012000; Entity E030 (NIC-4620) received HS 72081000; Entity E020 (NIC-5210) received HS 72081000; Entity E013 (NIC-1392) received HS 84571000; Entity E015 (NIC-2013) received HS 72081000; Entity E026 (NIC-1392) received HS 72081000; Entity E031 (NIC-4662) received HS 72081000; Entity E005 (NIC-4690) received HS 72081000"
      }
    },
    {
      "ring_id": "R13601",
      "canonical_key": "E005|E023|E019|E006|E011|E013|E015|E029",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E023",
        "E019",
        "E006",
        "E011",
        "E013",
        "E015",
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
          "to": "E011",
          "invoice_id": "I0114",
          "value": 65895135,
          "hs_code": "94036000",
          "invoice_date": "2026-02-04",
          "discounting_date": "2026-02-15"
        },
        {
          "hop_type": "invoice",
          "from": "E011",
          "to": "E013",
          "invoice_id": "I0170",
          "value": 74078402,
          "hs_code": "72081000",
          "invoice_date": "2026-01-12",
          "discounting_date": "2026-01-18"
        },
        {
          "hop_type": "invoice",
          "from": "E013",
          "to": "E015",
          "invoice_id": "I0171",
          "value": 73313556,
          "hs_code": "72081000",
          "invoice_date": "2026-01-15",
          "discounting_date": "2026-01-20"
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
        "value": 0.31,
        "product": 0.5,
        "timing": 0.18,
        "externality": 0.22
      },
      "abstained": [],
      "aggregate": 0.3,
      "expected_loss": 218241285,
      "evidence": {
        "value": "Net position score: 0.31",
        "product": "HS code consistency: 0.50",
        "timing": "Regularity score: 0.18",
        "externality": "Externality score: 0.22",
        "industry": "Flagged cross-industry trades: Entity E023 (NIC-7020) received HS 49011000; Entity E006 (NIC-2610) received HS 72081000; Entity E011 (NIC-1392) received HS 94036000; Entity E013 (NIC-1392) received HS 72081000; Entity E015 (NIC-2013) received HS 72081000; Entity E029 (NIC-4690) received HS 72081000; Entity E005 (NIC-4690) received HS 39012000"
      }
    },
    {
      "ring_id": "R13698",
      "canonical_key": "E005|E023|E019|E008|E012|E018|E020|E029",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E023",
        "E019",
        "E008",
        "E012",
        "E018",
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
          "to": "E012",
          "invoice_id": "I0132",
          "value": 109202386,
          "hs_code": "72081000",
          "invoice_date": "2025-12-08",
          "discounting_date": "2025-12-26"
        },
        {
          "hop_type": "invoice",
          "from": "E012",
          "to": "E018",
          "invoice_id": "I0168",
          "value": 63075616,
          "hs_code": "39012000",
          "invoice_date": "2026-01-07",
          "discounting_date": "2026-01-15"
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
        }
      ],
      "scores": {
        "value": 0.34,
        "product": null,
        "timing": 0.21,
        "externality": 0.25
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.28,
      "expected_loss": 218061264,
      "evidence": {
        "value": "Net position score: 0.34",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.21",
        "externality": "Externality score: 0.25",
        "industry": "Flagged cross-industry trades: Entity E023 (NIC-7020) received HS 49011000; Entity E008 (NIC-4662) received HS 72081000; Entity E012 (NIC-5229) received HS 72081000; Entity E018 (NIC-2610) received HS 39012000; Entity E020 (NIC-5210) received HS 72081000; Entity E029 (NIC-4690) received HS 84571000; Entity E005 (NIC-4690) received HS 39012000"
      }
    },
    {
      "ring_id": "R14976",
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
        "externality": 0.26
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.32,
      "expected_loss": 217345545,
      "evidence": {
        "value": "Net position score: 0.32",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.35",
        "externality": "Externality score: 0.26",
        "industry": "Flagged cross-industry trades: Entity E028 (NIC-4620) received HS 39012000; Entity E030 (NIC-4620) received HS 72081000; Entity E020 (NIC-5210) received HS 72081000; Entity E029 (NIC-4690) received HS 84571000; Entity E018 (NIC-2610) received HS 49011000; Entity E019 (NIC-4620) received HS 39012000; Entity E031 (NIC-4662) received HS 10063000; Entity E005 (NIC-4690) received HS 72081000"
      }
    },
    {
      "ring_id": "R20880",
      "canonical_key": "E008|E028|E030|E020|E013|E015|E026|E031",
      "closure_type": "transaction",
      "entities": [
        "E008",
        "E028",
        "E030",
        "E020",
        "E013",
        "E015",
        "E026",
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
          "to": "E015",
          "invoice_id": "I0171",
          "value": 73313556,
          "hs_code": "72081000",
          "invoice_date": "2026-01-15",
          "discounting_date": "2026-01-20"
        },
        {
          "hop_type": "invoice",
          "from": "E015",
          "to": "E026",
          "invoice_id": "I0155",
          "value": 60274604,
          "hs_code": "72081000",
          "invoice_date": "2025-11-09",
          "discounting_date": "2025-11-10"
        },
        {
          "hop_type": "invoice",
          "from": "E026",
          "to": "E031",
          "invoice_id": "I0156",
          "value": 60777119,
          "hs_code": "72081000",
          "invoice_date": "2025-11-13",
          "discounting_date": "2025-11-15"
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
        "value": 0.26,
        "product": 1.0,
        "timing": 0.09,
        "externality": 0.27
      },
      "abstained": [],
      "aggregate": 0.3,
      "expected_loss": 206245099,
      "evidence": {
        "value": "Net position score: 0.26",
        "product": "HS code consistency: 1.00",
        "timing": "Regularity score: 0.09",
        "externality": "Externality score: 0.27",
        "industry": "Flagged cross-industry trades: Entity E028 (NIC-4620) received HS 72081000; Entity E030 (NIC-4620) received HS 72081000; Entity E020 (NIC-5210) received HS 72081000; Entity E013 (NIC-1392) received HS 84571000; Entity E015 (NIC-2013) received HS 72081000; Entity E026 (NIC-1392) received HS 72081000; Entity E031 (NIC-4662) received HS 72081000; Entity E008 (NIC-4662) received HS 74031100"
      }
    },
    {
      "ring_id": "R20878",
      "canonical_key": "E008|E028|E030|E020|E013|E015|E019|E031",
      "closure_type": "transaction",
      "entities": [
        "E008",
        "E028",
        "E030",
        "E020",
        "E013",
        "E015",
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
          "to": "E015",
          "invoice_id": "I0171",
          "value": 73313556,
          "hs_code": "72081000",
          "invoice_date": "2026-01-15",
          "discounting_date": "2026-01-20"
        },
        {
          "hop_type": "invoice",
          "from": "E015",
          "to": "E019",
          "invoice_id": "I0059",
          "value": 70899137,
          "hs_code": "94036000",
          "invoice_date": "2025-12-30",
          "discounting_date": "2026-01-18"
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
        "value": 0.34,
        "product": null,
        "timing": 0.26,
        "externality": 0.24
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.29,
      "expected_loss": 205850277,
      "evidence": {
        "value": "Net position score: 0.34",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.26",
        "externality": "Externality score: 0.24",
        "industry": "Flagged cross-industry trades: Entity E028 (NIC-4620) received HS 72081000; Entity E030 (NIC-4620) received HS 72081000; Entity E020 (NIC-5210) received HS 72081000; Entity E013 (NIC-1392) received HS 84571000; Entity E015 (NIC-2013) received HS 72081000; Entity E019 (NIC-4620) received HS 94036000; Entity E031 (NIC-4662) received HS 10063000; Entity E008 (NIC-4662) received HS 74031100"
      }
    },
    {
      "ring_id": "R22306",
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
        "externality": 0.27
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.33,
      "expected_loss": 204837483,
      "evidence": {
        "value": "Net position score: 0.36",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.31",
        "externality": "Externality score: 0.27",
        "industry": "Flagged cross-industry trades: Entity E018 (NIC-2610) received HS 49011000; Entity E030 (NIC-4620) received HS 26011100; Entity E020 (NIC-5210) received HS 72081000; Entity E015 (NIC-2013) received HS 49011000; Entity E025 (NIC-5229) received HS 72081000; Entity E028 (NIC-4620) received HS 84571000; Entity E009 (NIC-6202) received HS 27101990"
      }
    },
    {
      "ring_id": "R20869",
      "canonical_key": "E008|E028|E030|E017|E029|E020|E015|E019",
      "closure_type": "transaction",
      "entities": [
        "E008",
        "E028",
        "E030",
        "E017",
        "E029",
        "E020",
        "E015",
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
          "to": "E020",
          "invoice_id": "I0164",
          "value": 62011259,
          "hs_code": "39012000",
          "invoice_date": "2025-12-27",
          "discounting_date": "2026-01-04"
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
          "to": "E019",
          "invoice_id": "I0059",
          "value": 70899137,
          "hs_code": "94036000",
          "invoice_date": "2025-12-30",
          "discounting_date": "2026-01-18"
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
        "value": 0.36,
        "product": null,
        "timing": 0.23,
        "externality": 0.21
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.28,
      "expected_loss": 204420605,
      "evidence": {
        "value": "Net position score: 0.36",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.23",
        "externality": "Externality score: 0.21",
        "industry": "Flagged cross-industry trades: Entity E028 (NIC-4620) received HS 72081000; Entity E030 (NIC-4620) received HS 72081000; Entity E017 (NIC-8299) received HS 74031100; Entity E020 (NIC-5210) received HS 39012000; Entity E015 (NIC-2013) received HS 49011000; Entity E019 (NIC-4620) received HS 94036000; Entity E008 (NIC-4662) received HS 72081000"
      }
    },
    {
      "ring_id": "R19677",
      "canonical_key": "E007|E029|E021|E018|E020|E013|E015|E026",
      "closure_type": "transaction",
      "entities": [
        "E007",
        "E029",
        "E021",
        "E018",
        "E020",
        "E013",
        "E015",
        "E026"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E007",
          "to": "E029",
          "invoice_id": "I0078",
          "value": 31439592,
          "hs_code": "74031100",
          "invoice_date": "2026-02-13",
          "discounting_date": "2026-03-29"
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
          "to": "E015",
          "invoice_id": "I0171",
          "value": 73313556,
          "hs_code": "72081000",
          "invoice_date": "2026-01-15",
          "discounting_date": "2026-01-20"
        },
        {
          "hop_type": "invoice",
          "from": "E015",
          "to": "E026",
          "invoice_id": "I0155",
          "value": 60274604,
          "hs_code": "72081000",
          "invoice_date": "2025-11-09",
          "discounting_date": "2025-11-10"
        },
        {
          "hop_type": "invoice",
          "from": "E026",
          "to": "E007",
          "invoice_id": "I0095",
          "value": 93087149,
          "hs_code": "26011100",
          "invoice_date": "2026-01-07",
          "discounting_date": "2026-02-16"
        }
      ],
      "scores": {
        "value": 0.12,
        "product": 1.0,
        "timing": 0.38,
        "externality": 0.3
      },
      "abstained": [],
      "aggregate": 0.33,
      "expected_loss": 202362157,
      "evidence": {
        "value": "Net position score: 0.12",
        "product": "HS code consistency: 1.00",
        "timing": "Regularity score: 0.38",
        "externality": "Externality score: 0.30",
        "industry": "Flagged cross-industry trades: Entity E029 (NIC-4690) received HS 74031100; Entity E021 (NIC-1392) received HS 49011000; Entity E018 (NIC-2610) received HS 39012000; Entity E020 (NIC-5210) received HS 72081000; Entity E013 (NIC-1392) received HS 84571000; Entity E015 (NIC-2013) received HS 72081000; Entity E026 (NIC-1392) received HS 72081000; Entity E007 (NIC-4662) received HS 26011100"
      }
    },
    {
      "ring_id": "R2816",
      "canonical_key": "E002|E015|E026|E031|E023|E008",
      "closure_type": "transaction",
      "entities": [
        "E002",
        "E015",
        "E026",
        "E031",
        "E023",
        "E008"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E002",
          "to": "E015",
          "invoice_id": "I0154",
          "value": 61238597,
          "hs_code": "72081000",
          "invoice_date": "2025-11-08",
          "discounting_date": "2025-11-10"
        },
        {
          "hop_type": "invoice",
          "from": "E015",
          "to": "E026",
          "invoice_id": "I0155",
          "value": 60274604,
          "hs_code": "72081000",
          "invoice_date": "2025-11-09",
          "discounting_date": "2025-11-10"
        },
        {
          "hop_type": "invoice",
          "from": "E026",
          "to": "E031",
          "invoice_id": "I0156",
          "value": 60777119,
          "hs_code": "72081000",
          "invoice_date": "2025-11-13",
          "discounting_date": "2025-11-15"
        },
        {
          "hop_type": "invoice",
          "from": "E031",
          "to": "E023",
          "invoice_id": "I0157",
          "value": 62254538,
          "hs_code": "72081000",
          "invoice_date": "2025-11-14",
          "discounting_date": "2025-11-18"
        },
        {
          "hop_type": "invoice",
          "from": "E023",
          "to": "E008",
          "invoice_id": "I0158",
          "value": 61474882,
          "hs_code": "72081000",
          "invoice_date": "2025-11-15",
          "discounting_date": "2025-11-21"
        },
        {
          "hop_type": "invoice",
          "from": "E008",
          "to": "E002",
          "invoice_id": "I0153",
          "value": 60414896,
          "hs_code": "72081000",
          "invoice_date": "2025-11-04",
          "discounting_date": "2025-11-07"
        }
      ],
      "scores": {
        "value": 0.9,
        "product": null,
        "timing": 0.44,
        "externality": 0.17
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.55,
      "expected_loss": 201586539,
      "evidence": {
        "value": "Net position score: 0.90",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.44",
        "externality": "Externality score: 0.17",
        "industry": "Flagged cross-industry trades: Entity E015 (NIC-2013) received HS 72081000; Entity E026 (NIC-1392) received HS 72081000; Entity E031 (NIC-4662) received HS 72081000; Entity E023 (NIC-7020) received HS 72081000; Entity E008 (NIC-4662) received HS 72081000; Entity E002 (NIC-4662) received HS 72081000"
      }
    },
    {
      "ring_id": "R22462",
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
        "externality": 0.29
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.29,
      "expected_loss": 201293437,
      "evidence": {
        "value": "Net position score: 0.47",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.14",
        "externality": "Externality score: 0.29",
        "industry": "Flagged cross-industry trades: Entity E021 (NIC-1392) received HS 49011000; Entity E018 (NIC-2610) received HS 39012000; Entity E030 (NIC-4620) received HS 26011100; Entity E020 (NIC-5210) received HS 72081000; Entity E013 (NIC-1392) received HS 84571000; Entity E028 (NIC-4620) received HS 85176200; Entity E009 (NIC-6202) received HS 27101990"
      }
    },
    {
      "ring_id": "R19927",
      "canonical_key": "E008|E012|E018|E028|E030|E032|E014|E031",
      "closure_type": "transaction",
      "entities": [
        "E008",
        "E012",
        "E018",
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
          "to": "E012",
          "invoice_id": "I0132",
          "value": 109202386,
          "hs_code": "72081000",
          "invoice_date": "2025-12-08",
          "discounting_date": "2025-12-26"
        },
        {
          "hop_type": "invoice",
          "from": "E012",
          "to": "E018",
          "invoice_id": "I0168",
          "value": 63075616,
          "hs_code": "39012000",
          "invoice_date": "2026-01-07",
          "discounting_date": "2026-01-15"
        },
        {
          "hop_type": "invoice",
          "from": "E018",
          "to": "E028",
          "invoice_id": "I0162",
          "value": 64491283,
          "hs_code": "39012000",
          "invoice_date": "2025-12-21",
          "discounting_date": "2025-12-22"
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
        "value": 0.16,
        "product": null,
        "timing": 0.44,
        "externality": 0.33
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.25,
      "expected_loss": 199055133,
      "evidence": {
        "value": "Net position score: 0.16",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.44",
        "externality": "Externality score: 0.33",
        "industry": "Flagged cross-industry trades: Entity E012 (NIC-5229) received HS 72081000; Entity E018 (NIC-2610) received HS 39012000; Entity E028 (NIC-4620) received HS 39012000; Entity E030 (NIC-4620) received HS 72081000; Entity E032 (NIC-5229) received HS 72081000; Entity E014 (NIC-2610) received HS 39012000; Entity E031 (NIC-4662) received HS 85176200; Entity E008 (NIC-4662) received HS 74031100"
      }
    },
    {
      "ring_id": "R13699",
      "canonical_key": "E005|E023|E019|E008|E012|E018|E028|E029",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E023",
        "E019",
        "E008",
        "E012",
        "E018",
        "E028",
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
          "to": "E012",
          "invoice_id": "I0132",
          "value": 109202386,
          "hs_code": "72081000",
          "invoice_date": "2025-12-08",
          "discounting_date": "2025-12-26"
        },
        {
          "hop_type": "invoice",
          "from": "E012",
          "to": "E018",
          "invoice_id": "I0168",
          "value": 63075616,
          "hs_code": "39012000",
          "invoice_date": "2026-01-07",
          "discounting_date": "2026-01-15"
        },
        {
          "hop_type": "invoice",
          "from": "E018",
          "to": "E028",
          "invoice_id": "I0162",
          "value": 64491283,
          "hs_code": "39012000",
          "invoice_date": "2025-12-21",
          "discounting_date": "2025-12-22"
        },
        {
          "hop_type": "invoice",
          "from": "E028",
          "to": "E029",
          "invoice_id": "I0163",
          "value": 62726051,
          "hs_code": "39012000",
          "invoice_date": "2025-12-23",
          "discounting_date": "2025-12-24"
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
        "value": 0.37,
        "product": null,
        "timing": 0.18,
        "externality": 0.27
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.28,
      "expected_loss": 196391493,
      "evidence": {
        "value": "Net position score: 0.37",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.18",
        "externality": "Externality score: 0.27",
        "industry": "Flagged cross-industry trades: Entity E023 (NIC-7020) received HS 49011000; Entity E008 (NIC-4662) received HS 72081000; Entity E012 (NIC-5229) received HS 72081000; Entity E018 (NIC-2610) received HS 39012000; Entity E028 (NIC-4620) received HS 39012000; Entity E029 (NIC-4690) received HS 39012000; Entity E005 (NIC-4690) received HS 39012000"
      }
    },
    {
      "ring_id": "R19454",
      "canonical_key": "E007|E029|E018|E030|E020|E013|E015|E026",
      "closure_type": "transaction",
      "entities": [
        "E007",
        "E029",
        "E018",
        "E030",
        "E020",
        "E013",
        "E015",
        "E026"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E007",
          "to": "E029",
          "invoice_id": "I0078",
          "value": 31439592,
          "hs_code": "74031100",
          "invoice_date": "2026-02-13",
          "discounting_date": "2026-03-29"
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
          "to": "E015",
          "invoice_id": "I0171",
          "value": 73313556,
          "hs_code": "72081000",
          "invoice_date": "2026-01-15",
          "discounting_date": "2026-01-20"
        },
        {
          "hop_type": "invoice",
          "from": "E015",
          "to": "E026",
          "invoice_id": "I0155",
          "value": 60274604,
          "hs_code": "72081000",
          "invoice_date": "2025-11-09",
          "discounting_date": "2025-11-10"
        },
        {
          "hop_type": "invoice",
          "from": "E026",
          "to": "E007",
          "invoice_id": "I0095",
          "value": 93087149,
          "hs_code": "26011100",
          "invoice_date": "2026-01-07",
          "discounting_date": "2026-02-16"
        }
      ],
      "scores": {
        "value": 0.11,
        "product": 1.0,
        "timing": 0.37,
        "externality": 0.29
      },
      "abstained": [],
      "aggregate": 0.32,
      "expected_loss": 195613774,
      "evidence": {
        "value": "Net position score: 0.11",
        "product": "HS code consistency: 1.00",
        "timing": "Regularity score: 0.37",
        "externality": "Externality score: 0.29",
        "industry": "Flagged cross-industry trades: Entity E029 (NIC-4690) received HS 74031100; Entity E018 (NIC-2610) received HS 49011000; Entity E030 (NIC-4620) received HS 26011100; Entity E020 (NIC-5210) received HS 72081000; Entity E013 (NIC-1392) received HS 84571000; Entity E015 (NIC-2013) received HS 72081000; Entity E026 (NIC-1392) received HS 72081000; Entity E007 (NIC-4662) received HS 26011100"
      }
    },
    {
      "ring_id": "R23395",
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
        "externality": 0.33
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.28,
      "expected_loss": 195612566,
      "evidence": {
        "value": "Net position score: 0.28",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.25",
        "externality": "Externality score: 0.33",
        "industry": "Flagged cross-industry trades: Entity E028 (NIC-4620) received HS 85176200; Entity E030 (NIC-4620) received HS 72081000; Entity E032 (NIC-5229) received HS 72081000; Entity E017 (NIC-8299) received HS 49011000; Entity E018 (NIC-2610) received HS 49011000; Entity E020 (NIC-5210) received HS 72081000; Entity E013 (NIC-1392) received HS 84571000"
      }
    },
    {
      "ring_id": "R275",
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
        "externality": 0.27
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.25,
      "expected_loss": 193309260,
      "evidence": {
        "value": "Net position score: 0.21",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.32",
        "externality": "Externality score: 0.27",
        "industry": "Flagged cross-industry trades: Entity E010 (NIC-4662) received HS 39012000; Entity E018 (NIC-2610) received HS 10063000; Entity E020 (NIC-5210) received HS 72081000; Entity E029 (NIC-4690) received HS 84571000; Entity E005 (NIC-4690) received HS 39012000; Entity E023 (NIC-7020) received HS 49011000; Entity E001 (NIC-5229) received HS 27101990"
      }
    },
    {
      "ring_id": "R22223",
      "canonical_key": "E009|E029|E018|E020|E013|E015|E025|E028",
      "closure_type": "transaction",
      "entities": [
        "E009",
        "E029",
        "E018",
        "E020",
        "E013",
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
          "to": "E015",
          "invoice_id": "I0171",
          "value": 73313556,
          "hs_code": "72081000",
          "invoice_date": "2026-01-15",
          "discounting_date": "2026-01-20"
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
        "value": 0.31,
        "product": null,
        "timing": 0.29,
        "externality": 0.27
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.29,
      "expected_loss": 192710187,
      "evidence": {
        "value": "Net position score: 0.31",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.29",
        "externality": "Externality score: 0.27",
        "industry": "Flagged cross-industry trades: Entity E018 (NIC-2610) received HS 49011000; Entity E020 (NIC-5210) received HS 72081000; Entity E013 (NIC-1392) received HS 84571000; Entity E015 (NIC-2013) received HS 72081000; Entity E025 (NIC-5229) received HS 72081000; Entity E028 (NIC-4620) received HS 84571000; Entity E009 (NIC-6202) received HS 27101990"
      }
    },
    {
      "ring_id": "R10114",
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
        "externality": 0.18
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.4,
      "expected_loss": 192500247,
      "evidence": {
        "value": "Net position score: 0.50",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.40",
        "externality": "Externality score: 0.18",
        "industry": "Flagged cross-industry trades: Entity E028 (NIC-4620) received HS 49011000; Entity E030 (NIC-4620) received HS 72081000; Entity E020 (NIC-5210) received HS 72081000; Entity E029 (NIC-4690) received HS 84571000; Entity E003 (NIC-5210) received HS 84571000"
      }
    },
    {
      "ring_id": "R12785",
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
        "externality": 0.24
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.3,
      "expected_loss": 192161041,
      "evidence": {
        "value": "Net position score: 0.24",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.45",
        "externality": "Externality score: 0.24",
        "industry": "Flagged cross-industry trades: Entity E032 (NIC-5229) received HS 85176200; Entity E017 (NIC-8299) received HS 49011000; Entity E005 (NIC-4690) received HS 39012000; Entity E023 (NIC-7020) received HS 49011000; Entity E004 (NIC-2610) received HS 72081000"
      }
    },
    {
      "ring_id": "R23428",
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
        "externality": 0.29
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.31,
      "expected_loss": 191853851,
      "evidence": {
        "value": "Net position score: 0.41",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.21",
        "externality": "Externality score: 0.29",
        "industry": "Flagged cross-industry trades: Entity E030 (NIC-4620) received HS 26011100; Entity E017 (NIC-8299) received HS 74031100; Entity E021 (NIC-1392) received HS 49011000; Entity E018 (NIC-2610) received HS 39012000; Entity E020 (NIC-5210) received HS 72081000; Entity E013 (NIC-1392) received HS 84571000"
      }
    },
    {
      "ring_id": "R15055",
      "canonical_key": "E006|E011|E013|E015|E029|E018|E020|E014",
      "closure_type": "transaction",
      "entities": [
        "E006",
        "E011",
        "E013",
        "E015",
        "E029",
        "E018",
        "E020",
        "E014"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E006",
          "to": "E011",
          "invoice_id": "I0114",
          "value": 65895135,
          "hs_code": "94036000",
          "invoice_date": "2026-02-04",
          "discounting_date": "2026-02-15"
        },
        {
          "hop_type": "invoice",
          "from": "E011",
          "to": "E013",
          "invoice_id": "I0170",
          "value": 74078402,
          "hs_code": "72081000",
          "invoice_date": "2026-01-12",
          "discounting_date": "2026-01-18"
        },
        {
          "hop_type": "invoice",
          "from": "E013",
          "to": "E015",
          "invoice_id": "I0171",
          "value": 73313556,
          "hs_code": "72081000",
          "invoice_date": "2026-01-15",
          "discounting_date": "2026-01-20"
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
          "to": "E006",
          "invoice_id": "I0159",
          "value": 50068152,
          "hs_code": "72081000",
          "invoice_date": "2025-11-22",
          "discounting_date": "2025-11-23"
        }
      ],
      "scores": {
        "value": 0.35,
        "product": 0.5,
        "timing": 0.15,
        "externality": 0.24
      },
      "abstained": [],
      "aggregate": 0.31,
      "expected_loss": 191617174,
      "evidence": {
        "value": "Net position score: 0.35",
        "product": "HS code consistency: 0.50",
        "timing": "Regularity score: 0.15",
        "externality": "Externality score: 0.24",
        "industry": "Flagged cross-industry trades: Entity E011 (NIC-1392) received HS 94036000; Entity E013 (NIC-1392) received HS 72081000; Entity E015 (NIC-2013) received HS 72081000; Entity E029 (NIC-4690) received HS 72081000; Entity E018 (NIC-2610) received HS 49011000; Entity E020 (NIC-5210) received HS 72081000; Entity E014 (NIC-2610) received HS 84571000; Entity E006 (NIC-2610) received HS 72081000"
      }
    },
    {
      "ring_id": "R19872",
      "canonical_key": "E008|E012|E018|E020|E030|E032|E014|E031",
      "closure_type": "transaction",
      "entities": [
        "E008",
        "E012",
        "E018",
        "E020",
        "E030",
        "E032",
        "E014",
        "E031"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E008",
          "to": "E012",
          "invoice_id": "I0132",
          "value": 109202386,
          "hs_code": "72081000",
          "invoice_date": "2025-12-08",
          "discounting_date": "2025-12-26"
        },
        {
          "hop_type": "invoice",
          "from": "E012",
          "to": "E018",
          "invoice_id": "I0168",
          "value": 63075616,
          "hs_code": "39012000",
          "invoice_date": "2026-01-07",
          "discounting_date": "2026-01-15"
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
        "value": 0.13,
        "product": null,
        "timing": 0.39,
        "externality": 0.35
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.22,
      "expected_loss": 189081569,
      "evidence": {
        "value": "Net position score: 0.13",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.39",
        "externality": "Externality score: 0.35",
        "industry": "Flagged cross-industry trades: Entity E012 (NIC-5229) received HS 72081000; Entity E018 (NIC-2610) received HS 39012000; Entity E020 (NIC-5210) received HS 72081000; Entity E030 (NIC-4620) received HS 84571000; Entity E032 (NIC-5229) received HS 72081000; Entity E014 (NIC-2610) received HS 39012000; Entity E031 (NIC-4662) received HS 85176200; Entity E008 (NIC-4662) received HS 74031100"
      }
    },
    {
      "ring_id": "R6898",
      "canonical_key": "E003|E008|E028|E030|E020|E013|E015|E029",
      "closure_type": "transaction",
      "entities": [
        "E003",
        "E008",
        "E028",
        "E030",
        "E020",
        "E013",
        "E015",
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
          "to": "E015",
          "invoice_id": "I0171",
          "value": 73313556,
          "hs_code": "72081000",
          "invoice_date": "2026-01-15",
          "discounting_date": "2026-01-20"
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
        "timing": 0.34,
        "externality": 0.27
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.26,
      "expected_loss": 185943661,
      "evidence": {
        "value": "Net position score: 0.21",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.34",
        "externality": "Externality score: 0.27",
        "industry": "Flagged cross-industry trades: Entity E008 (NIC-4662) received HS 49011000; Entity E028 (NIC-4620) received HS 72081000; Entity E030 (NIC-4620) received HS 72081000; Entity E020 (NIC-5210) received HS 72081000; Entity E013 (NIC-1392) received HS 84571000; Entity E015 (NIC-2013) received HS 72081000; Entity E029 (NIC-4690) received HS 72081000; Entity E003 (NIC-5210) received HS 84571000"
      }
    },
    {
      "ring_id": "R22226",
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
        "externality": 0.2
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.34,
      "expected_loss": 184479349,
      "evidence": {
        "value": "Net position score: 0.50",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.23",
        "externality": "Externality score: 0.20",
        "industry": "Flagged cross-industry trades: Entity E018 (NIC-2610) received HS 49011000; Entity E020 (NIC-5210) received HS 72081000; Entity E013 (NIC-1392) received HS 84571000; Entity E028 (NIC-4620) received HS 85176200; Entity E009 (NIC-6202) received HS 27101990"
      }
    },
    {
      "ring_id": "R13613",
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
        "externality": 0.24
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.24,
      "expected_loss": 183655427,
      "evidence": {
        "value": "Net position score: 0.31",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.17",
        "externality": "Externality score: 0.24",
        "industry": "Flagged cross-industry trades: Entity E023 (NIC-7020) received HS 49011000; Entity E006 (NIC-2610) received HS 72081000; Entity E013 (NIC-1392) received HS 85176200; Entity E028 (NIC-4620) received HS 85176200; Entity E009 (NIC-6202) received HS 27101990; Entity E005 (NIC-4690) received HS 39012000"
      }
    },
    {
      "ring_id": "R21031",
      "canonical_key": "E008|E028|E030|E032|E014|E031|E023|E019",
      "closure_type": "transaction",
      "entities": [
        "E008",
        "E028",
        "E030",
        "E032",
        "E014",
        "E031",
        "E023",
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
          "to": "E023",
          "invoice_id": "I0157",
          "value": 62254538,
          "hs_code": "72081000",
          "invoice_date": "2025-11-14",
          "discounting_date": "2025-11-18"
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
        }
      ],
      "scores": {
        "value": 0.22,
        "product": null,
        "timing": 0.19,
        "externality": 0.25
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.21,
      "expected_loss": 182875165,
      "evidence": {
        "value": "Net position score: 0.22",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.19",
        "externality": "Externality score: 0.25",
        "industry": "Flagged cross-industry trades: Entity E028 (NIC-4620) received HS 72081000; Entity E030 (NIC-4620) received HS 72081000; Entity E032 (NIC-5229) received HS 72081000; Entity E014 (NIC-2610) received HS 39012000; Entity E031 (NIC-4662) received HS 85176200; Entity E023 (NIC-7020) received HS 72081000; Entity E008 (NIC-4662) received HS 72081000"
      }
    },
    {
      "ring_id": "R13700",
      "canonical_key": "E005|E023|E019|E008|E012|E018|E030|E031",
      "closure_type": "transaction",
      "entities": [
        "E005",
        "E023",
        "E019",
        "E008",
        "E012",
        "E018",
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
          "to": "E012",
          "invoice_id": "I0132",
          "value": 109202386,
          "hs_code": "72081000",
          "invoice_date": "2025-12-08",
          "discounting_date": "2025-12-26"
        },
        {
          "hop_type": "invoice",
          "from": "E012",
          "to": "E018",
          "invoice_id": "I0168",
          "value": 63075616,
          "hs_code": "39012000",
          "invoice_date": "2026-01-07",
          "discounting_date": "2026-01-15"
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
        "value": 0.21,
        "product": null,
        "timing": 0.25,
        "externality": 0.3
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.23,
      "expected_loss": 182679096,
      "evidence": {
        "value": "Net position score: 0.21",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.25",
        "externality": "Externality score: 0.30",
        "industry": "Flagged cross-industry trades: Entity E023 (NIC-7020) received HS 49011000; Entity E008 (NIC-4662) received HS 72081000; Entity E012 (NIC-5229) received HS 72081000; Entity E018 (NIC-2610) received HS 39012000; Entity E030 (NIC-4620) received HS 26011100; Entity E031 (NIC-4662) received HS 10063000; Entity E005 (NIC-4690) received HS 72081000"
      }
    },
    {
      "ring_id": "R15008",
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
        "externality": 0.22
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.29,
      "expected_loss": 181520443,
      "evidence": {
        "value": "Net position score: 0.23",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.44",
        "externality": "Externality score: 0.22",
        "industry": "Flagged cross-industry trades: Entity E028 (NIC-4620) received HS 39012000; Entity E030 (NIC-4620) received HS 72081000; Entity E032 (NIC-5229) received HS 72081000; Entity E014 (NIC-2610) received HS 39012000; Entity E031 (NIC-4662) received HS 85176200; Entity E005 (NIC-4690) received HS 72081000"
      }
    },
    {
      "ring_id": "R14977",
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
        "externality": 0.22
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.27,
      "expected_loss": 181516314,
      "evidence": {
        "value": "Net position score: 0.29",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.28",
        "externality": "Externality score: 0.22",
        "industry": "Flagged cross-industry trades: Entity E028 (NIC-4620) received HS 39012000; Entity E030 (NIC-4620) received HS 72081000; Entity E020 (NIC-5210) received HS 72081000; Entity E029 (NIC-4690) received HS 84571000; Entity E021 (NIC-1392) received HS 49011000; Entity E019 (NIC-4620) received HS 72081000; Entity E031 (NIC-4662) received HS 10063000; Entity E005 (NIC-4690) received HS 72081000"
      }
    },
    {
      "ring_id": "R13618",
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
        "externality": 0.19
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.24,
      "expected_loss": 181120161,
      "evidence": {
        "value": "Net position score: 0.30",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.18",
        "externality": "Externality score: 0.19",
        "industry": "Flagged cross-industry trades: Entity E023 (NIC-7020) received HS 49011000; Entity E006 (NIC-2610) received HS 72081000; Entity E013 (NIC-1392) received HS 85176200; Entity E030 (NIC-4620) received HS 26011100; Entity E017 (NIC-8299) received HS 74031100; Entity E005 (NIC-4690) received HS 39012000"
      }
    },
    {
      "ring_id": "R20876",
      "canonical_key": "E008|E028|E030|E020|E013|E015|E019",
      "closure_type": "transaction",
      "entities": [
        "E008",
        "E028",
        "E030",
        "E020",
        "E013",
        "E015",
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
          "to": "E015",
          "invoice_id": "I0171",
          "value": 73313556,
          "hs_code": "72081000",
          "invoice_date": "2026-01-15",
          "discounting_date": "2026-01-20"
        },
        {
          "hop_type": "invoice",
          "from": "E015",
          "to": "E019",
          "invoice_id": "I0059",
          "value": 70899137,
          "hs_code": "94036000",
          "invoice_date": "2025-12-30",
          "discounting_date": "2026-01-18"
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
        "value": 0.31,
        "product": null,
        "timing": 0.26,
        "externality": 0.19
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.27,
      "expected_loss": 179864916,
      "evidence": {
        "value": "Net position score: 0.31",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.26",
        "externality": "Externality score: 0.19",
        "industry": "Flagged cross-industry trades: Entity E028 (NIC-4620) received HS 72081000; Entity E030 (NIC-4620) received HS 72081000; Entity E020 (NIC-5210) received HS 72081000; Entity E013 (NIC-1392) received HS 84571000; Entity E015 (NIC-2013) received HS 72081000; Entity E019 (NIC-4620) received HS 94036000; Entity E008 (NIC-4662) received HS 72081000"
      }
    },
    {
      "ring_id": "R23277",
      "canonical_key": "E013|E015|E029|E018|E030|E020",
      "closure_type": "transaction",
      "entities": [
        "E013",
        "E015",
        "E029",
        "E018",
        "E030",
        "E020"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E013",
          "to": "E015",
          "invoice_id": "I0171",
          "value": 73313556,
          "hs_code": "72081000",
          "invoice_date": "2026-01-15",
          "discounting_date": "2026-01-20"
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
        }
      ],
      "scores": {
        "value": 0.5,
        "product": null,
        "timing": 0.25,
        "externality": 0.25
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.35,
      "expected_loss": 178948423,
      "evidence": {
        "value": "Net position score: 0.50",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.25",
        "externality": "Externality score: 0.25",
        "industry": "Flagged cross-industry trades: Entity E015 (NIC-2013) received HS 72081000; Entity E029 (NIC-4690) received HS 72081000; Entity E018 (NIC-2610) received HS 49011000; Entity E030 (NIC-4620) received HS 26011100; Entity E020 (NIC-5210) received HS 72081000; Entity E013 (NIC-1392) received HS 84571000"
      }
    },
    {
      "ring_id": "R13519",
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
      "expected_loss": 178588799,
      "evidence": {
        "value": "Net position score: 0.19",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.33",
        "externality": "Externality score: 0.24",
        "industry": "Flagged cross-industry trades: Entity E023 (NIC-7020) received HS 49011000; Entity E008 (NIC-4662) received HS 49011000; Entity E028 (NIC-4620) received HS 72081000; Entity E030 (NIC-4620) received HS 72081000; Entity E020 (NIC-5210) received HS 72081000; Entity E029 (NIC-4690) received HS 84571000; Entity E005 (NIC-4690) received HS 39012000"
      }
    },
    {
      "ring_id": "R22597",
      "canonical_key": "E011|E013|E015|E029|E018|E020|E030|E016",
      "closure_type": "transaction",
      "entities": [
        "E011",
        "E013",
        "E015",
        "E029",
        "E018",
        "E020",
        "E030",
        "E016"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E011",
          "to": "E013",
          "invoice_id": "I0170",
          "value": 74078402,
          "hs_code": "72081000",
          "invoice_date": "2026-01-12",
          "discounting_date": "2026-01-18"
        },
        {
          "hop_type": "invoice",
          "from": "E013",
          "to": "E015",
          "invoice_id": "I0171",
          "value": 73313556,
          "hs_code": "72081000",
          "invoice_date": "2026-01-15",
          "discounting_date": "2026-01-20"
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
          "to": "E016",
          "invoice_id": "I0146",
          "value": 20749826,
          "hs_code": "72081000",
          "invoice_date": "2026-01-07",
          "discounting_date": "2026-01-09"
        },
        {
          "hop_type": "invoice",
          "from": "E016",
          "to": "E011",
          "invoice_id": "I0006",
          "value": 60488316,
          "hs_code": "39012000",
          "invoice_date": "2026-01-25",
          "discounting_date": "2026-02-23"
        }
      ],
      "scores": {
        "value": 0.11,
        "product": 1.0,
        "timing": 0.26,
        "externality": 0.27
      },
      "abstained": [],
      "aggregate": 0.29,
      "expected_loss": 178309394,
      "evidence": {
        "value": "Net position score: 0.11",
        "product": "HS code consistency: 1.00",
        "timing": "Regularity score: 0.26",
        "externality": "Externality score: 0.27",
        "industry": "Flagged cross-industry trades: Entity E013 (NIC-1392) received HS 72081000; Entity E015 (NIC-2013) received HS 72081000; Entity E029 (NIC-4690) received HS 72081000; Entity E018 (NIC-2610) received HS 49011000; Entity E020 (NIC-5210) received HS 72081000; Entity E030 (NIC-4620) received HS 84571000; Entity E016 (NIC-2610) received HS 72081000; Entity E011 (NIC-1392) received HS 39012000"
      }
    },
    {
      "ring_id": "R15047",
      "canonical_key": "E006|E011|E013|E015|E026|E031|E023|E019",
      "closure_type": "transaction",
      "entities": [
        "E006",
        "E011",
        "E013",
        "E015",
        "E026",
        "E031",
        "E023",
        "E019"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E006",
          "to": "E011",
          "invoice_id": "I0114",
          "value": 65895135,
          "hs_code": "94036000",
          "invoice_date": "2026-02-04",
          "discounting_date": "2026-02-15"
        },
        {
          "hop_type": "invoice",
          "from": "E011",
          "to": "E013",
          "invoice_id": "I0170",
          "value": 74078402,
          "hs_code": "72081000",
          "invoice_date": "2026-01-12",
          "discounting_date": "2026-01-18"
        },
        {
          "hop_type": "invoice",
          "from": "E013",
          "to": "E015",
          "invoice_id": "I0171",
          "value": 73313556,
          "hs_code": "72081000",
          "invoice_date": "2026-01-15",
          "discounting_date": "2026-01-20"
        },
        {
          "hop_type": "invoice",
          "from": "E015",
          "to": "E026",
          "invoice_id": "I0155",
          "value": 60274604,
          "hs_code": "72081000",
          "invoice_date": "2025-11-09",
          "discounting_date": "2025-11-10"
        },
        {
          "hop_type": "invoice",
          "from": "E026",
          "to": "E031",
          "invoice_id": "I0156",
          "value": 60777119,
          "hs_code": "72081000",
          "invoice_date": "2025-11-13",
          "discounting_date": "2025-11-15"
        },
        {
          "hop_type": "invoice",
          "from": "E031",
          "to": "E023",
          "invoice_id": "I0157",
          "value": 62254538,
          "hs_code": "72081000",
          "invoice_date": "2025-11-14",
          "discounting_date": "2025-11-18"
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
        }
      ],
      "scores": {
        "value": 0.21,
        "product": 0.67,
        "timing": 0.16,
        "externality": 0.22
      },
      "abstained": [],
      "aggregate": 0.28,
      "expected_loss": 178143767,
      "evidence": {
        "value": "Net position score: 0.21",
        "product": "HS code consistency: 0.67",
        "timing": "Regularity score: 0.16",
        "externality": "Externality score: 0.22",
        "industry": "Flagged cross-industry trades: Entity E011 (NIC-1392) received HS 94036000; Entity E013 (NIC-1392) received HS 72081000; Entity E015 (NIC-2013) received HS 72081000; Entity E026 (NIC-1392) received HS 72081000; Entity E031 (NIC-4662) received HS 72081000; Entity E023 (NIC-7020) received HS 72081000; Entity E006 (NIC-2610) received HS 72081000"
      }
    },
    {
      "ring_id": "R11602",
      "canonical_key": "E004|E007|E025|E028|E029|E005|E023|E019",
      "closure_type": "transaction",
      "entities": [
        "E004",
        "E007",
        "E025",
        "E028",
        "E029",
        "E005",
        "E023",
        "E019"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E004",
          "to": "E007",
          "invoice_id": "I0136",
          "value": 140369769,
          "hs_code": "85176200",
          "invoice_date": "2025-11-10",
          "discounting_date": "2025-11-16"
        },
        {
          "hop_type": "invoice",
          "from": "E007",
          "to": "E025",
          "invoice_id": "I0113",
          "value": 47197478,
          "hs_code": "72081000",
          "invoice_date": "2025-12-10",
          "discounting_date": "2026-01-12"
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
          "to": "E029",
          "invoice_id": "I0163",
          "value": 62726051,
          "hs_code": "39012000",
          "invoice_date": "2025-12-23",
          "discounting_date": "2025-12-24"
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
        "value": 0.18,
        "product": null,
        "timing": 0.38,
        "externality": 0.25
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.25,
      "expected_loss": 178103029,
      "evidence": {
        "value": "Net position score: 0.18",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.38",
        "externality": "Externality score: 0.25",
        "industry": "Flagged cross-industry trades: Entity E007 (NIC-4662) received HS 85176200; Entity E025 (NIC-5229) received HS 72081000; Entity E028 (NIC-4620) received HS 84571000; Entity E029 (NIC-4690) received HS 39012000; Entity E005 (NIC-4690) received HS 39012000; Entity E023 (NIC-7020) received HS 49011000; Entity E004 (NIC-2610) received HS 72081000"
      }
    },
    {
      "ring_id": "R2855",
      "canonical_key": "E002|E015|E029|E003|E028|E030|E020|E013",
      "closure_type": "transaction",
      "entities": [
        "E002",
        "E015",
        "E029",
        "E003",
        "E028",
        "E030",
        "E020",
        "E013"
      ],
      "hops": [
        {
          "hop_type": "invoice",
          "from": "E002",
          "to": "E015",
          "invoice_id": "I0154",
          "value": 61238597,
          "hs_code": "72081000",
          "invoice_date": "2025-11-08",
          "discounting_date": "2025-11-10"
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
          "to": "E003",
          "invoice_id": "I0046",
          "value": 93130035,
          "hs_code": "84571000",
          "invoice_date": "2026-01-02",
          "discounting_date": "2026-01-24"
        },
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
          "to": "E002",
          "invoice_id": "I0019",
          "value": 43465756,
          "hs_code": "26011100",
          "invoice_date": "2025-11-19",
          "discounting_date": "2025-12-21"
        }
      ],
      "scores": {
        "value": 0.24,
        "product": null,
        "timing": 0.31,
        "externality": 0.3
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.27,
      "expected_loss": 178061109,
      "evidence": {
        "value": "Net position score: 0.24",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.31",
        "externality": "Externality score: 0.30",
        "industry": "Flagged cross-industry trades: Entity E015 (NIC-2013) received HS 72081000; Entity E029 (NIC-4690) received HS 72081000; Entity E003 (NIC-5210) received HS 84571000; Entity E028 (NIC-4620) received HS 49011000; Entity E030 (NIC-4620) received HS 72081000; Entity E020 (NIC-5210) received HS 72081000; Entity E013 (NIC-1392) received HS 84571000; Entity E002 (NIC-4662) received HS 26011100"
      }
    },
    {
      "ring_id": "R22056",
      "canonical_key": "E009|E023|E012|E018|E030|E020|E013|E028",
      "closure_type": "transaction",
      "entities": [
        "E009",
        "E023",
        "E012",
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
          "to": "E023",
          "invoice_id": "I0073",
          "value": 92186165,
          "hs_code": null,
          "invoice_date": "2026-03-10",
          "discounting_date": "2026-03-30"
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
          "to": "E018",
          "invoice_id": "I0168",
          "value": 63075616,
          "hs_code": "39012000",
          "invoice_date": "2026-01-07",
          "discounting_date": "2026-01-15"
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
        "value": 0.36,
        "product": null,
        "timing": 0.17,
        "externality": 0.24
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.26,
      "expected_loss": 177065111,
      "evidence": {
        "value": "Net position score: 0.36",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.17",
        "externality": "Externality score: 0.24",
        "industry": "Flagged cross-industry trades: Entity E018 (NIC-2610) received HS 39012000; Entity E030 (NIC-4620) received HS 26011100; Entity E020 (NIC-5210) received HS 72081000; Entity E013 (NIC-1392) received HS 84571000; Entity E028 (NIC-4620) received HS 85176200; Entity E009 (NIC-6202) received HS 27101990"
      }
    },
    {
      "ring_id": "R8916",
      "canonical_key": "E003|E027|E032|E014|E012|E018|E020|E029",
      "closure_type": "transaction",
      "entities": [
        "E003",
        "E027",
        "E032",
        "E014",
        "E012",
        "E018",
        "E020",
        "E029"
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
          "to": "E012",
          "invoice_id": "I0104",
          "value": 142109183,
          "hs_code": "39012000",
          "invoice_date": "2025-11-01",
          "discounting_date": "2025-11-21"
        },
        {
          "hop_type": "invoice",
          "from": "E012",
          "to": "E018",
          "invoice_id": "I0168",
          "value": 63075616,
          "hs_code": "39012000",
          "invoice_date": "2026-01-07",
          "discounting_date": "2026-01-15"
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
          "to": "E003",
          "invoice_id": "I0046",
          "value": 93130035,
          "hs_code": "84571000",
          "invoice_date": "2026-01-02",
          "discounting_date": "2026-01-24"
        }
      ],
      "scores": {
        "value": 0.25,
        "product": null,
        "timing": 0.16,
        "externality": 0.25
      },
      "abstained": [
        "product"
      ],
      "aggregate": 0.21,
      "expected_loss": 176365872,
      "evidence": {
        "value": "Net position score: 0.25",
        "product": "Abstained (insufficient HS codes or suppressed by commodity classification)",
        "timing": "Regularity score: 0.16",
        "externality": "Externality score: 0.25",
        "industry": "Flagged cross-industry trades: Entity E027 (NIC-5229) received HS 84571000; Entity E032 (NIC-5229) received HS 49011000; Entity E014 (NIC-2610) received HS 39012000; Entity E012 (NIC-5229) received HS 39012000; Entity E018 (NIC-2610) received HS 39012000; Entity E020 (NIC-5210) received HS 72081000; Entity E029 (NIC-4690) received HS 84571000; Entity E003 (NIC-5210) received HS 84571000"
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
      "from": "E030",
      "to": "E016"
    },
    {
      "from": "E016",
      "to": "E021"
    },
    {
      "from": "E021",
      "to": "E032"
    },
    {
      "from": "E017",
      "to": "E009"
    },
    {
      "from": "E009",
      "to": "E010"
    },
    {
      "from": "E010",
      "to": "E030"
    },
    {
      "from": "E008",
      "to": "E002"
    },
    {
      "from": "E026",
      "to": "E031"
    },
    {
      "from": "E031",
      "to": "E023"
    },
    {
      "from": "E023",
      "to": "E008"
    },
    {
      "from": "E014",
      "to": "E006"
    },
    {
      "from": "E006",
      "to": "E025"
    },
    {
      "from": "E025",
      "to": "E027"
    },
    {
      "from": "E018",
      "to": "E028"
    },
    {
      "from": "E028",
      "to": "E029"
    },
    {
      "from": "E029",
      "to": "E020"
    },
    {
      "from": "E020",
      "to": "E024"
    },
    {
      "from": "E024",
      "to": "E004"
    },
    {
      "from": "E004",
      "to": "E012"
    },
    {
      "from": "E012",
      "to": "E018"
    },
    {
      "from": "E011",
      "to": "E013"
    },
    {
      "from": "E013",
      "to": "E015"
    },
    {
      "from": "E015",
      "to": "E001"
    }
  ]
};
