#!/usr/bin/env bash
# Expose the local Circe stack (server.py + live Exasol) on a temporary public
# HTTPS URL for the demo video / judging window.
#
# Only the app server (server.py) is tunneled. Exasol stays bound to localhost
# and is never reachable from outside this machine.
#
# Usage:  ./exasol/expose.sh [port]     (default port 8000)
set -euo pipefail

PORT="${1:-8000}"
URL="http://localhost:${PORT}"

# A tunnel to a dead port is useless — confirm the stack is actually up first.
health="$(curl -fsS "${URL}/api/health" 2>/dev/null || true)"
if [ -z "$health" ]; then
  echo "No response from ${URL}/api/health — start the stack first:" >&2
  echo "  1. ./exakit start          (in the starter kit checkout)" >&2
  echo "  2. python server.py ${PORT}   (in this repo)" >&2
  exit 1
fi
echo "Local stack up: ${health}"
echo

if command -v cloudflared >/dev/null 2>&1; then
  echo "Starting cloudflared quick tunnel (no account needed)..."
  exec cloudflared tunnel --url "${URL}"
elif command -v ngrok >/dev/null 2>&1; then
  echo "cloudflared not found; falling back to ngrok..."
  exec ngrok http "${PORT}"
else
  echo "Install one of:" >&2
  echo "  cloudflared  https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/" >&2
  echo "  ngrok        https://ngrok.com/download" >&2
  exit 1
fi
