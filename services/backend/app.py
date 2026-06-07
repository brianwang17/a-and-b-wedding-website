import json
import os
from pathlib import Path
from flask import Flask, request, jsonify
from flask_cors import CORS
from loguru import logger

app = Flask(__name__)
CORS(app)

INVITATION_CODE = os.environ.get("INVITATION_CODE", "password")
DATA_DIR = Path(__file__).parent / "data"
DATA_DIR.mkdir(exist_ok=True)
RSVP_FILE = DATA_DIR / "rsvps.json"


def _load_rsvps() -> list:
    if RSVP_FILE.exists():
        return json.loads(RSVP_FILE.read_text())
    return []


def _save_rsvps(rsvps: list) -> None:
    RSVP_FILE.write_text(json.dumps(rsvps, indent=2))


@app.route("/")
def index():
    return jsonify({"status": "ok"})


@app.route("/api/verify-code", methods=["POST"])
def verify_code():
    data = request.get_json(silent=True) or {}
    code = (data.get("code") or "").strip().upper()
    valid = code == INVITATION_CODE.upper()
    if valid:
        logger.info("Code accepted from {ip}", ip=request.remote_addr)
    else:
        logger.warning(
            "Invalid code attempt from {ip}: {code!r}", ip=request.remote_addr, code=code)
    return jsonify({"valid": valid})


@app.route("/api/rsvp", methods=["POST"])
def submit_rsvp():
    data = request.get_json(silent=True) or {}
    name = (data.get("name") or "").strip()
    if not name:
        logger.warning(
            "RSVP rejected — missing name from {ip}", ip=request.remote_addr)
        return jsonify({"error": "name required"}), 400

    rsvps = _load_rsvps()

    existing = next(
        (r for r in rsvps if r["name"].lower() == name.lower()), None)
    entry = {
        "name": name,
        "attending": data.get("attending"),
        "plusOne": data.get("plusOne"),
        "meal": data.get("meal"),
        "songRequest": data.get("songRequest"),
    }
    if existing:
        existing.update(entry)
        logger.info("RSVP updated for {name!r} (attending={attending})",
                    name=name, attending=entry["attending"])
    else:
        rsvps.append(entry)
        logger.info("RSVP received from {name!r} (attending={attending})",
                    name=name, attending=entry["attending"])

    _save_rsvps(rsvps)
    return jsonify({"ok": True})


@app.route("/api/rsvps", methods=["GET"])
def list_rsvps():
    rsvps = _load_rsvps()
    logger.info("Admin listed {count} RSVPs", count=len(rsvps))
    return jsonify(rsvps)
