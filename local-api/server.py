#!/usr/bin/env python3
"""PhyTwin local compute API — zero third-party deps."""

from __future__ import annotations

import json
import math
import os
import socket
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

HOST = os.environ.get("PHYTWIN_HOST", "127.0.0.1")
PORT = int(os.environ.get("PHYTWIN_PORT", "8787"))
API_KEY = os.environ.get("PHYTWIN_API_KEY", "phytwin-dev")
WORKER = os.environ.get("PHYTWIN_WORKER", socket.gethostname())


def compute(payload: dict) -> dict:
    a = float(payload.get("a", 0))
    b = float(payload.get("b", 0))
    mode = str(payload.get("mode", "sum"))

    if mode == "sum":
        value = a + b
    elif mode == "product":
        value = a * b
    elif mode == "hypot":
        value = math.hypot(a, b)
    else:
        raise ValueError(f"unknown mode: {mode}")

    return {
        "ok": True,
        "mode": mode,
        "inputs": {"a": a, "b": b},
        "result": value,
        "worker": WORKER,
    }


class Handler(BaseHTTPRequestHandler):
    def _cors(self) -> None:
        origin = self.headers.get("Origin", "*")
        self.send_header("Access-Control-Allow-Origin", origin)
        self.send_header("Access-Control-Allow-Headers", "Content-Type, X-API-Key")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Vary", "Origin")

    def _json(self, code: int, data: dict) -> None:
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self._cors()
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self) -> None:  # noqa: N802
        self.send_response(204)
        self._cors()
        self.end_headers()

    def do_GET(self) -> None:  # noqa: N802
        if self.path in ("/", "/health"):
            self._json(200, {"ok": True, "service": "phytwin-local-api", "worker": WORKER})
            return
        self._json(404, {"error": "not found"})

    def do_POST(self) -> None:  # noqa: N802
        if self.path != "/v1/compute":
            self._json(404, {"error": "not found"})
            return

        key = self.headers.get("X-API-Key", "")
        if key != API_KEY:
            self._json(401, {"error": "invalid api key"})
            return

        length = int(self.headers.get("Content-Length", "0"))
        raw = self.rfile.read(length) if length else b"{}"
        started = time.perf_counter()
        try:
            payload = json.loads(raw.decode("utf-8") or "{}")
            data = compute(payload)
            data["elapsed_ms"] = round((time.perf_counter() - started) * 1000, 2)
            self._json(200, data)
        except Exception as exc:  # noqa: BLE001
            self._json(400, {"error": str(exc)})

    def log_message(self, fmt: str, *args) -> None:
        print(f"[phytwin-api] {self.address_string()} - {fmt % args}")


def main() -> None:
    server = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f"PhyTwin local API on http://{HOST}:{PORT}")
    print(f"Health:  GET  /health")
    print(f"Compute: POST /v1/compute  (X-API-Key: {API_KEY})")
    server.serve_forever()


if __name__ == "__main__":
    main()
