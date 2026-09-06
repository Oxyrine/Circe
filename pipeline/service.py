"""pipeline/service.py: Unified service layer for detection and rescoring."""

import json
import os
import sys
from pathlib import Path

# Locate repository root
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

try:
    import jsonschema
    _HAS_SCHEMA = True
except ImportError:
    _HAS_SCHEMA = False

from graph.run import find_candidate_rings
from scoring.scoring import score_ring

_SCHEMA_PATH = os.path.join(ROOT_DIR, "contract", "invoice.schema.json")
_INVOICE_SCHEMA = None
if os.path.exists(_SCHEMA_PATH):
    try:
        with open(_SCHEMA_PATH, "r", encoding="utf-8") as _f:
            _INVOICE_SCHEMA = json.load(_f)
    except Exception:
        pass


def load_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def entities_map(path=None):
    if path is None:
        path = os.path.join(ROOT_DIR, "data", "entities.json")
    data = load_json(path)
    if isinstance(data, dict) and "entities" in data and isinstance(data["entities"], list):
        ent_list = data["entities"]
    elif isinstance(data, list):
        ent_list = data
    else:
        ent_list = []
    result = {}
    for e in ent_list:
        eid = e.get("id") or e.get("entity_id")
        if eid:
            result[eid] = e
    return result


def invoices_list(path=None):
    if path is None:
        path = os.path.join(ROOT_DIR, "data", "invoices.json")
    data = load_json(path)
    return data.get("invoices", data if isinstance(data, list) else [])


def validate_invoices(invoices):
    """Validate posted invoices against the invoice schema.
    Returns a list of error strings, or [] if valid.
    """
    if not _HAS_SCHEMA or _INVOICE_SCHEMA is None:
        return []
    wrapped = {
        "schema_version": 1,
        "source_dataset": "investigator",
        "count": len(invoices),
        "invoices": invoices,
    }
    try:
        jsonschema.validate(wrapped, _INVOICE_SCHEMA)
        return []
    except jsonschema.ValidationError as e:
        return [e.message]
    except jsonschema.SchemaError as e:
        return ["Schema error: " + e.message]


def get_active_data_source():
    """Checks whether live Exasol instance is reachable; falls back to files."""
    try:
        from exasol.connection import is_exasol_available, connect
        if is_exasol_available():
            conn = connect()
            conn.close()
            return "exasol"
    except Exception:
        pass
    return "file_fallback"


def get_all_entities(base_dir=None):
    if get_active_data_source() == "exasol":
        try:
            from exasol.repository import get_entities
            return get_entities()
        except Exception:
            pass
    root = base_dir or ROOT_DIR
    return load_json(os.path.join(root, "data", "entities.json"))


def get_all_invoices(base_dir=None):
    if get_active_data_source() == "exasol":
        try:
            from exasol.repository import get_invoices
            return get_invoices()
        except Exception:
            pass
    root = base_dir or ROOT_DIR
    return load_json(os.path.join(root, "data", "invoices.json"))


def get_scored_rings_data(base_dir=None, limit=50):
    if get_active_data_source() == "exasol":
        try:
            from exasol.repository import get_scored_rings
            return get_scored_rings(limit=limit)
        except Exception:
            pass
    root = base_dir or ROOT_DIR
    return load_json(os.path.join(root, "artifacts", "scored_rings.json"))


def run_rescore(investigator_invoices, base_dir=None, max_depth=8, limit=50):
    """Executes invoice validation, candidate ring discovery, and scoring.

    Returns:
        (status_code, response_dict)
    """
    if not isinstance(investigator_invoices, list):
        return 400, {"error": "investigator_invoices must be an array"}

    errors = validate_invoices(investigator_invoices)
    if errors:
        return 400, {"error": "Schema validation failed", "details": errors}

    root = base_dir or ROOT_DIR
    entities_path = os.path.join(root, "data", "entities.json")
    invoices_path = os.path.join(root, "data", "invoices.json")

    source_mode = get_active_data_source()
    try:
        if source_mode == "exasol":
            try:
                from exasol.repository import get_entities, get_invoices
                ent_art = get_entities()
                entities = {e["id"]: e for e in ent_art["entities"]}
                inv_art = get_invoices()
                base_invoices = inv_art["invoices"]
            except Exception:
                entities = entities_map(entities_path)
                base_invoices = invoices_list(invoices_path)
        else:
            entities = entities_map(entities_path)
            base_invoices = invoices_list(invoices_path)
    except Exception as e:
        return 500, {"error": "Failed to load base data: " + str(e)}

    merged_invoices = list(base_invoices) + list(investigator_invoices)
    entities_list = list(entities.values())

    try:
        candidate_rings = find_candidate_rings(entities_list, merged_invoices, max_depth=max_depth)
        scored = [score_ring(r, merged_invoices, entities) for r in candidate_rings]
        scored.sort(key=lambda r: r.get("expected_loss", 0), reverse=True)
        top = scored[:limit] if limit else scored
    except Exception as e:
        return 500, {"error": "Pipeline error: " + str(e)}

    high_risk = [r for r in top if (r.get("aggregate") or 0) >= 0.70]
    response = {
        "rings": top,
        "total_candidate_count": len(candidate_rings),
        "high_risk_count": len(high_risk),
        "schema_version": 1,
        "source": "exasol_live_rescore" if source_mode == "exasol" else "file_live_rescore",
    }
    return 200, response
