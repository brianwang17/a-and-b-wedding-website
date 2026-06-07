# Backend — Flask API

Python 3.11 + Flask 3 REST API. Handles invitation code verification and RSVP submission/storage.

## Stack

| Package | Version | Purpose |
|---|---|---|
| `flask` | ^3.1 | Web framework |
| `flask-cors` | ^5.0 | Cross-origin requests from the frontend |
| `loguru` | ^0.7 | Structured request logging |
| `gunicorn` | ^26.0 | Production WSGI server |
| `poetry` | 2.4.1 | Dependency and virtualenv management |

## Running locally

The dev server starts automatically via the VS Code task, but you can also run it manually:

```bash
cd services/backend
WERKZEUG_RELOADER_TYPE=stat poetry run flask run --host=0.0.0.0 --debug
```

The server listens on `http://localhost:5000`.

> `WERKZEUG_RELOADER_TYPE=stat` is required in WSL2 — without it, Flask won't detect file changes and auto-reload.

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `INVITATION_CODE` | `password` | The code guests must enter on the gate page |
| `FLASK_ENV` | — | Set to `development` to enable debug mode |

## API Endpoints

### `POST /api/verify-code`

Validates the invitation code submitted on the gate page.

**Request body:**
```json
{ "code": "YOURCODE" }
```

**Response:**
```json
{ "valid": true }
```

Comparison is case-insensitive. Returns `{ "valid": false }` for an incorrect code — never a 4xx, to avoid leaking information.

---

### `POST /api/rsvp`

Submits or updates a guest's RSVP. If a record with the same name already exists, it is updated in place.

**Request body:**
```json
{
  "name": "Brian Wang",
  "attending": true,
  "plusOne": false,
  "meal": "chicken",
  "songRequest": "September - Earth Wind & Fire"
}
```

**Response:**
```json
{ "ok": true }
```

---

### `GET /api/rsvps`

Returns all RSVP entries. Intended for admin use only — add authentication before exposing this in production.

**Response:**
```json
[
  {
    "name": "Brian Wang",
    "attending": true,
    "plusOne": false,
    "meal": "chicken",
    "songRequest": "September - Earth Wind & Fire"
  }
]
```

## Data Storage

RSVPs are persisted to `data/rsvps.json` as a flat JSON array. The `data/` directory is created automatically on startup if it doesn't exist. This file is gitignored — do not commit guest data.

## Logging

Loguru is used for all request logging. Output is colorized by level and includes timestamps automatically.

| Event | Level |
|---|---|
| Code accepted | `INFO` |
| Invalid code attempt (includes the code tried) | `WARNING` |
| RSVP received | `INFO` |
| RSVP updated (repeat submission) | `INFO` |
| RSVP rejected — missing name | `WARNING` |
| Admin listed RSVPs | `INFO` |

Example output:
```
2026-06-07 12:00:01.234 | INFO     | app:verify_code:38 - Code accepted from 172.18.0.1
2026-06-07 12:01:10.891 | INFO     | app:submit_rsvp:71 - RSVP received from 'Brian Wang' (attending=True)
```

## Production

The backend Dockerfile uses a multi-stage build:

- **`flask-backend-dev`** — Poetry + Flask dev server (`flask run`)
- **`flask-backend-prod`** — installs only main dependencies, runs under Gunicorn

```bash
# Build and run the prod image standalone
docker build --target flask-backend-prod -t wedding-backend .
docker run -p 5000:5000 -e INVITATION_CODE=YOURCODE wedding-backend
```

## Adding dependencies

```bash
poetry add <package>        # runtime dependency
poetry add --group dev <package>  # dev-only dependency
```

Commit both `pyproject.toml` and `poetry.lock`.
