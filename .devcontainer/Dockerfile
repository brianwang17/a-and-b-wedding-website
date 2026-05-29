FROM mcr.microsoft.com/devcontainers/python:3.11-bullseye

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
    && corepack prepare yarn@4.12.0 --activate

# Install Poetry
ENV POETRY_VERSION=2.4.1 \
    POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_CREATE=false

ENV PATH="$POETRY_HOME/bin:$PATH"

RUN curl -sSL https://install.python-poetry.org | python3 -