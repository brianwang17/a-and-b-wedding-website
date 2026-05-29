# Multi-stage Docker Build

# Base stage (used for dev and prod)
FROM python:3.11-slim-bullseye AS flask-backend-base

WORKDIR /app

EXPOSE 5000

# DEV stage
FROM flask-backend-base AS flask-backend-dev

# Keep python from buffering stdout/stderr (crucial for container logs)
ENV PYTHONUNBUFFERED=1

# Set env vars for Poetry
ENV POETRY_VERSION=2.4.1 \
    POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_CREATE=false

ENV PATH="$POETRY_HOME/bin:$PATH"

# Install system dependencies needed for installing Poetry
RUN apt-get update && apt-get install --no-install-recommends -y curl

# Download and execute the Poetry installer using the available Python environment
RUN curl -sSL https://install.python-poetry.org | python3 -
    
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

COPY pyproject.toml poetry.lock ./

RUN poetry install --no-interaction --no-ansi

CMD ["poetry", "run", "flask", "run", "--host=0.0.0.0", "--port=5000", "--debug"]

# PROD stage
FROM flask-backend-base AS flask-backend-prod

COPY pyproject.toml poetry.lock ./

RUN poetry install --no-interaction --no-ansi --only main

COPY . .

CMD [ "poetry", "run", "gunicorn", "-b", "0.0.0.0:5000", "app:app" ]
