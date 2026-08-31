import json
import os
import sys
from http.server import BaseHTTPRequestHandler

# Add repository root to sys.path so graph and scoring modules import cleanly
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

# Load invoice schema once at startup
_SCHEMA_PATH = os.path.join(ROOT_DIR, "contract", "invoice.schema.json")
_INVOICE_SCHEMA = None
if os.path.exists(_SCHEMA_PATH):
    try:
        with open(_SCHEMA_PATH, "r", encoding="utf-8") as _f:
            _INVOICE_SCHEMA = json.load(_f)
    except Exception:
        pass


def _load_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def _entities_map(path):
    data = _load_json(path)
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


def _invoices_list(path):
    data = _load_json(path)
    return data.get("invoices", data if isinstance(data, list) else [])


def _validate_invoices(invoices):
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


class handler(BaseHTTPRequestHandler):
    """Vercel Serverless Function Handler for /api endpoints."""

    def _send_json(self, status, data):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        clean_path = self.path.split("?")[0]
        if clean_path in ("/api/health", "/health", "/api", "/"):
            self._send_json(200, {"status": "ok", "service": "circe-api"})
            return
        self._send_json(404, {"error": "Endpoint not found"})

    def do_POST(self):
        clean_path = self.path.split("?")[0]
        if clean_path not in ("/api/rescore", "/rescore"):
            self._send_json(404, {"error": "Endpoint not found"})
            return

        length = int(self.headers.get("Content-Length", 0))
        raw = self.rfile.read(length)
        try:
            body = json.loads(raw.decode("utf-8"))
        except json.JSONDecodeError as e:
            self._send_json(400, {"error": "Invalid JSON: " + str(e)})
            return

        investigator_invoices = body.get("investigator_invoices", [])
        if not isinstance(investigator_invoices, list):
            self._send_json(400, {"error": "investigator_invoices must be an array"})
            return

        errors = _validate_invoices(investigator_invoices)
        if errors:
            self._send_json(400, {"error": "Schema validation failed", "details": errors})
            return

        entities_path = os.path.join(ROOT_DIR, "data", "entities.json")
        invoices_path = os.path.join(ROOT_DIR, "data", "invoices.json")

        try:
            entities = _entities_map(entities_path)
            base_invoices = _invoices_list(invoices_path)
        except Exception as e:
            self._send_json(500, {"error": "Failed to load base data: " + str(e)})
            return

        merged_invoices = list(base_invoices) + list(investigator_invoices)
        entities_list = list(entities.values())

        try:
            candidate_rings = find_candidate_rings(entities_list, merged_invoices, max_depth=8)
            scored = [score_ring(r, merged_invoices, entities) for r in candidate_rings]
            scored.sort(key=lambda r: r.get("expected_loss", 0), reverse=True)
            top50 = scored[:50]
        except Exception as e:
            self._send_json(500, {"error": "Pipeline error: " + str(e)})
            return

        high_risk = [r for r in top50 if (r.get("aggregate") or 0) >= 0.70]
        response = {
            "rings": top50,
            "total_candidate_count": len(candidate_rings),
            "high_risk_count": len(high_risk),
            "schema_version": 1,
            "source": "live_rescore",
        }
        self._send_json(200, response)

    def log_message(self, fmt, *args):
        # Silent logger for serverless execution
        pass


# Top-level exports for Vercel
app = handler
application = handler
