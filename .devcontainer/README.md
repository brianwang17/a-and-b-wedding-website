# Dev Container

The dev container gives every contributor an identical, pre-configured development environment with no local setup beyond Docker and VS Code.

## How it works

VS Code reads `devcontainer.json` and uses `docker-compose.yaml` at the repo root to build and start the `devcontainer` service. The image is defined in `Dockerfile`.

```
devcontainer.json  ──►  docker-compose.yaml  ──►  Dockerfile
      │
      ├─ VS Code extensions to install
      ├─ Port forwards (5000, 5173)
      ├─ Named volume mounts
      └─ postCreateCommand (installs deps)
```

## Dockerfile

Based on `mcr.microsoft.com/devcontainers/python:3.11-bullseye`. It installs:

| Tool | Version | Purpose |
|---|---|---|
| Node.js (via nvm) | 24.15.0 | Frontend runtime |
| Yarn (via corepack) | 4.15.0 | Frontend package manager |
| Poetry | 2.4.1 | Backend package manager |

Frontend and backend dependencies are pre-installed during the image build to speed up container startup.

## Named Volumes

Two Docker named volumes keep installed dependencies off the local filesystem:

| Volume | Mounted at | Why |
|---|---|---|
| `project-frontend-node_modules` | `services/frontend/node_modules` | Avoids cross-OS symlink/binary issues with node_modules |
| `project-backend-venv` | `services/backend/.venv` | Keeps the Poetry virtualenv inside the container |

The `postCreateCommand` runs `chown` to give the `vscode` user ownership of both volumes, then re-runs `yarn install` and `poetry install` to ensure lockfile changes are always applied after a rebuild.

## Forwarded Ports

| Port | Service |
|---|---|
| `5173` | Vite dev server (React frontend) |
| `5000` | Flask dev server (backend API) |

VS Code shows a notification when either port becomes available.

## VS Code Customizations

### Extensions installed automatically

| Extension | Purpose |
|---|---|
| `ms-python.python` + `ms-python.vscode-pylance` | Python language support |
| `esbenp.prettier-vscode` + `rvest.vs-code-prettier-eslint` | Auto-formatting on save |
| `streetsidesoftware.code-spell-checker` | Spell checking across all files |
| `eamodio.gitlens` | Git authorship and history in the editor |
| `PKief.material-icon-theme` | File icons |
| `ms-azuretools.vscode-docker` | Docker file editing and container management |
| `aaron-bond.better-comments` | Colour-coded comment annotations |
| `njpwerner.autodocstring` | Python docstring generation |
| `tamasfe.even-better-toml` | TOML (pyproject.toml) support |
| `anthropic.claude-code` | Claude Code AI assistant |

### Settings

- `editor.defaultFormatter`: Prettier
- `editor.formatOnSave`: enabled

## Rebuilding the container

If you change `Dockerfile`, `devcontainer.json`, or `docker-compose.yaml`, rebuild via the command palette:

```
Dev Containers: Rebuild Container
```

Dependencies will reinstall automatically via `postCreateCommand`.
