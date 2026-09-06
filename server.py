import http.server
import json
import os
import re
import socket
import sys
from pathlib import Path

# jsonschema is already in requirements.txt
try:
    import jsonschema
    _HAS_SCHEMA = True
except ImportError:
    _HAS_SCHEMA = False

# pyexasol is a LOCAL-ONLY, optional dependency — never added to requirements.txt.
# /api/audit only works against a local Exasol Personal Local Starter Kit
# instance; it is unreachable (and pointless) from the Vercel deployment,
# so it degrades to a clear 503 rather than a crash when unavailable.
# See exasol/README.md.
try:
    import pyexasol
    _HAS_EXASOL = True
except ImportError:
    _HAS_EXASOL = False

# Pipeline imports — same pure functions used by build_data.py
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from graph.run import find_candidate_rings
from scoring.scoring import score_ring

# ---------------------------------------------------------------------------
# Exasol audit-trail config — local dev only
# ---------------------------------------------------------------------------
_EXASOL_CRED_PATH = Path.home() / ".exasol-starter-kit" / "credentials" / "nano_sys_password"
_EXASOL_DSN = "127.0.0.1:8563"
_EXASOL_USER = "sys"
_EXASOL_SCHEMA = "STARTER_KIT"
_EXASOL_TABLE = "CIRCE_AUDIT_LOG"
_AUDIT_ACTIONS = {"flagged", "escalated", "override_documented"}
_RING_ID_RE = re.compile(r"^[A-Z0-9]{1,20}$")


def _exasol_password():
    return _EXASOL_CRED_PATH.read_text(encoding="utf-8").strip()


def _exasol_connect():
    return pyexasol.connect(
        dsn=_EXASOL_DSN, user=_EXASOL_USER, password=_exasol_password(),
        schema=_EXASOL_SCHEMA, encryption=True, websocket_sslopt={"cert_reqs": 0},
    )


def _exasol_row_to_dict(row, columns):
    return {col: (val.isoformat() if hasattr(val, "isoformat") else val)
            for col, val in zip(columns, row)}


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
        clean_path = self.path.split("?")[0]
        if clean_path in ("/api/health", "/health"):
            self._send_json(200, {"status": "ok"})
            return
        if clean_path in ("/api/audit", "/audit"):
            self._handle_audit_get()
            return
        if clean_path in ("/", ""):
            self.send_response(302)
            self.send_header("Location", "/demo/")
            self.end_headers()
            return
        super().do_GET()

    def _handle_audit_get(self):
        if not _HAS_EXASOL:
            self._send_json(503, {"error": "pyexasol not installed locally — see exasol/README.md", "available": False})
            return
        query = self.path.split("?", 1)[1] if "?" in self.path else ""
        params = dict(p.split("=", 1) for p in query.split("&") if "=" in p)
        ring_id = params.get("ring_id")
        try:
            from urllib.parse import unquote
            if ring_id:
                ring_id = unquote(ring_id)
        except Exception:
            pass

        cols = ["ID", "RING_ID", "ACTION_TYPE", "ACTOR", "ACTOR_ROLE",
                "NOTE", "AGGREGATE_AT_TIME", "CLOSURE_TYPE_AT_TIME", "CREATED_AT"]
        col_list = ", ".join('"{}"'.format(c) for c in cols)
        try:
            conn = _exasol_connect()
            try:
                if ring_id:
                    if not _RING_ID_RE.match(ring_id):
                        self._send_json(400, {"error": "invalid ring_id"})
                        return
                    sql = 'SELECT {} FROM "{}"."{}" WHERE "RING_ID" = {{ring_id}} ORDER BY "CREATED_AT" ASC'.format(
                        col_list, _EXASOL_SCHEMA, _EXASOL_TABLE)
                    rows = conn.execute(sql, {"ring_id": ring_id}).fetchall()
                else:
                    sql = 'SELECT {} FROM "{}"."{}" ORDER BY "CREATED_AT" DESC'.format(
                        col_list, _EXASOL_SCHEMA, _EXASOL_TABLE)
                    rows = conn.execute(sql).fetchall()
                self._send_json(200, {"available": True, "rows": [_exasol_row_to_dict(r, cols) for r in rows]})
            finally:
                conn.close()
        except Exception as e:
            self._send_json(503, {"error": "Exasol unreachable — is the local starter kit running? ({})".format(e), "available": False})

    def do_POST(self):
        clean_path = self.path.split("?")[0]
        if clean_path in ("/api/audit", "/audit"):
            self._handle_audit_post()
            return
        if clean_path not in ("/api/rescore", "/rescore"):
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

    def _handle_audit_post(self):
        if not _HAS_EXASOL:
            self._send_json(503, {"error": "pyexasol not installed locally — see exasol/README.md", "available": False})
            return

        length = int(self.headers.get("Content-Length", 0))
        try:
            body = json.loads(self.rfile.read(length) or b"{}")
        except json.JSONDecodeError:
            self._send_json(400, {"error": "invalid JSON body"})
            return

        ring_id = body.get("ring_id", "")
        action_type = body.get("action_type", "")
        actor = body.get("actor", "")
        actor_role = body.get("actor_role")
        note = body.get("note")
        aggregate_at_time = body.get("aggregate_at_time")
        closure_type_at_time = body.get("closure_type_at_time")

        if not _RING_ID_RE.match(ring_id or ""):
            self._send_json(400, {"error": "ring_id is required and must look like a real ring id"})
            return
        if action_type not in _AUDIT_ACTIONS:
            self._send_json(400, {"error": "action_type must be one of {}".format(sorted(_AUDIT_ACTIONS))})
            return
        if not actor:
            self._send_json(400, {"error": "actor is required"})
            return
        if action_type == "override_documented" and not note:
            self._send_json(400, {"error": "note is required when documenting an override"})
            return

        try:
            conn = _exasol_connect()
            try:
                sql = '''INSERT INTO "{}"."{}"
                    ("RING_ID","ACTION_TYPE","ACTOR","ACTOR_ROLE","NOTE","AGGREGATE_AT_TIME","CLOSURE_TYPE_AT_TIME")
                    VALUES ({{ring_id}},{{action_type}},{{actor}},{{actor_role}},{{note}},{{aggregate_at_time}},{{closure_type_at_time}})'''.format(
                    _EXASOL_SCHEMA, _EXASOL_TABLE)
                conn.execute(sql, {
                    "ring_id": ring_id, "action_type": action_type, "actor": actor,
                    "actor_role": actor_role, "note": note,
                    "aggregate_at_time": aggregate_at_time, "closure_type_at_time": closure_type_at_time,
                })
                self._send_json(201, {"status": "created", "available": True})
            finally:
                conn.close()
        except Exception as e:
            self._send_json(503, {"error": "Exasol unreachable — is the local starter kit running? ({})".format(e), "available": False})

    def log_message(self, fmt, *args):
        # Suppress API access noise; keep file-serving logs
        if args and "/api/" in str(args[0]):
            return
        super().log_message(fmt, *args)


# Top-level exports for Vercel Serverless Python runtime
handler = OuroborosHandler
app = handler
application = handler


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    try:
        DualStackHTTPServer.address_family = socket.AF_INET6
        with DualStackHTTPServer(('', port), OuroborosHandler) as httpd:
            print(f"Serving HTTP on :: port {port} (IPv4 + IPv6) ...", flush=True)
            print(f"  Static:  http://localhost:{port}/demo/", flush=True)
            print(f"  Health:  http://localhost:{port}/api/health", flush=True)
            print(f"  Rescore: POST http://localhost:{port}/api/rescore", flush=True)
            print(f"  Audit:   GET/POST http://localhost:{port}/api/audit  (local-only, needs Exasol — see exasol/README.md)", flush=True)
            httpd.serve_forever()
    except Exception:
        DualStackHTTPServer.address_family = socket.AF_INET
        with DualStackHTTPServer(('0.0.0.0', port), OuroborosHandler) as httpd:
            print(f"Serving HTTP on 0.0.0.0 port {port} ...", flush=True)
            print(f"  Static:  http://localhost:{port}/demo/", flush=True)
            print(f"  Health:  http://localhost:{port}/api/health", flush=True)
            print(f"  Rescore: POST http://localhost:{port}/api/rescore", flush=True)
            print(f"  Audit:   GET/POST http://localhost:{port}/api/audit  (local-only, needs Exasol — see exasol/README.md)", flush=True)
            httpd.serve_forever()

