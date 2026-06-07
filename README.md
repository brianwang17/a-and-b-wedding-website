# Brian & Allison — Wedding Website

Source code for our wedding website. Guests receive an invitation code, authenticate through a gate page, and land on the main site with event details, our story, FAQs, RSVP, and a gallery.

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite 8, Tailwind CSS v4 |
| Backend | Python 3.11, Flask 3, Poetry |
| Dev environment | VS Code Dev Container, Docker Compose |
| Production | Frontend → nginx, Backend → Gunicorn |

## Project Structure

```
.
├── .devcontainer/          # Dev container image + VS Code config
├── .vscode/                # VS Code tasks (auto-starts servers)
├── services/
│   ├── frontend/           # React app (Vite dev server on :5173)
│   └── backend/            # Flask API (dev server on :5000)
└── docker-compose.yaml     # Orchestrates devcontainer + prod service images
```

## Getting Started

The project is built to run entirely inside a VS Code Dev Container — no local Python or Node setup required.

**Prerequisites:** Docker Desktop and the VS Code [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension.

1. Clone the repo and open the folder in VS Code.
2. When prompted, click **Reopen in Container** (or run `Dev Containers: Reopen in Container` from the command palette).
3. The container builds and both servers start automatically.
4. Open `http://localhost:5173` in your browser.

Both servers hot-reload on file save.

## Environment Variables

| Variable | Service | Default | Description |
|---|---|---|---|
| `INVITATION_CODE` | backend | `password` | Code guests enter on the gate page |
| `VITE_INVITATION_CODE` | frontend | `password` | Client-side fallback (used if API is unreachable) |

Set these in a `.env` file or your container environment — never commit real values.

## Production Build

The `docker-compose.yaml` includes `flask-backend` and `react-frontend` services under the `prod` profile:

```bash
docker compose --profile prod up --build
```

The frontend compiles to a static bundle served by nginx on port 80. The backend runs under Gunicorn on port 5000.

## Sub-directory Docs

- [.devcontainer/](.devcontainer/README.md) — container image, ports, VS Code extensions
- [.vscode/](.vscode/README.md) — automated tasks
- [services/backend/](services/backend/README.md) — API endpoints, logging, dependencies
- [services/frontend/](services/frontend/README.md) — component structure, scripts, styling
