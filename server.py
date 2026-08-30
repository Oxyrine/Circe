import http.server
import json
import os
import socket
import sys

# jsonschema is already in requirements.txt
try:
    import jsonschema
    _HAS_SCHEMA = True
except ImportError:
    _HAS_SCHEMA = False

# Pipeline imports — same pure functions used by build_data.py
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from graph.run import find_candidate_rings
from scoring.scoring import score_ring


class DualStackHTTPServer(http.server.ThreadingHTTPServer):
    def server_bind(self):
        try:
            self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        except (AttributeError, OSError):
            pass
        super().server_bind()


# Load invoice schema once at startup
_SCHEMA_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "contract", "invoice.schema.json")
_INVOICE_SCHEMA = None
if os.path.exists(_SCHEMA_PATH):
    with open(_SCHEMA_PATH, "r", encoding="utf-8") as _f:
        _INVOICE_SCHEMA = json.load(_f)


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
    """Validate posted invoices against the invoice schema.
    Returns a list of error strings, or [] if valid.
    """
    if not _HAS_SCHEMA or _INVOICE_SCHEMA is None:
        return []
    # Build a wrapper matching the schema's top-level shape
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


class OuroborosHandler(http.server.SimpleHTTPRequestHandler):
    """Extends SimpleHTTPRequestHandler with /api/health and /api/rescore."""

    def __init__(self, *args, **kwargs):
        # Serve static files from repository root
        directory = os.path.dirname(os.path.abspath(__file__))
        super().__init__(*args, directory=directory, **kwargs)

    def _send_json(self, status, data):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        if self.path == "/api/health":
            self._send_json(200, {"status": "ok"})
            return
        if self.path in ("/", ""):
            self.send_response(302)
            self.send_header("Location", "/demo/")
            self.end_headers()
            return
        super().do_GET()

    def do_POST(self):
        if self.path != "/api/rescore":
            self.send_error(404, "Not found")
            return

        # Parse body
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

        # Schema validation — never feed unvalidated input to the detector
        errors = _validate_invoices(investigator_invoices)
        if errors:
            self._send_json(400, {"error": "Schema validation failed", "details": errors})
            return

        # Load base data
        base_dir = os.path.dirname(os.path.abspath(__file__))
        entities_path = os.path.join(base_dir, "data", "entities.json")
        invoices_path = os.path.join(base_dir, "data", "invoices.json")

        try:
            entities = _entities_map(entities_path)
            base_invoices = _invoices_list(invoices_path)
        except Exception as e:
            self._send_json(500, {"error": "Failed to load base data: " + str(e)})
            return

        # Merge investigator invoices and run detection + scoring (mirrors build_data.py --limit 50)
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

        # Return same shape as SCORED global in data.js
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
        # Suppress API access noise; keep file-serving logs
        if args and "/api/" in str(args[0]):
            return
        super().log_message(fmt, *args)


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    try:
        DualStackHTTPServer.address_family = socket.AF_INET6
        with DualStackHTTPServer(('', port), OuroborosHandler) as httpd:
            print(f"Serving HTTP on :: port {port} (IPv4 + IPv6) ...", flush=True)
            print(f"  Static:  http://localhost:{port}/demo/", flush=True)
            print(f"  Health:  http://localhost:{port}/api/health", flush=True)
            print(f"  Rescore: POST http://localhost:{port}/api/rescore", flush=True)
            httpd.serve_forever()
    except Exception:
        DualStackHTTPServer.address_family = socket.AF_INET
        with DualStackHTTPServer(('0.0.0.0', port), OuroborosHandler) as httpd:
            print(f"Serving HTTP on 0.0.0.0 port {port} ...", flush=True)
            print(f"  Static:  http://localhost:{port}/demo/", flush=True)
            print(f"  Health:  http://localhost:{port}/api/health", flush=True)
            print(f"  Rescore: POST http://localhost:{port}/api/rescore", flush=True)
            httpd.serve_forever()

