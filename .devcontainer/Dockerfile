FROM mcr.microsoft.com/devcontainers/python:3.11-bullseye as devcontainer-base

# Install NPM via NVM
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash \
    && export NVM_DIR="/usr/local/share/nvm" \
    && [ -s "$NVM_DIR/nvm.sh" ] \
    && \. "$NVM_DIR/nvm.sh" \  
    && [ -s "$NVM_DIR/bash_completion" ] \
    && \. "$NVM_DIR/bash_completion" \ 
    && nvm install 24.15.0 \
    && nvm use 24.15.0

ENV PATH="/root/.nvm/versions/node/v24.15.0/bin/:${PATH}"

# Install Yarn
RUN corepack enable \
    && corepack prepare yarn@4.15.0 --activate

# Disable Corepack download prompt
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

# Install Poetry
ENV POETRY_VERSION=2.4.1 \
    POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_CREATE=false

ENV PATH="$POETRY_HOME/bin:$PATH"

RUN curl -sSL https://install.python-poetry.org | python3 -
    
# --- Frontend deps ---
WORKDIR /workspaces/services/frontend
COPY services/frontend/package.json services/frontend/yarn.lock ./
RUN yarn install

# --- Backend deps ---
WORKDIR /workspaces/services/backend
COPY services/backend/pyproject.toml services/backend/poetry.lock ./
RUN poetry install --no-interaction --no-ansi

WORKDIR /workspaces