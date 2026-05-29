# Multi-stage Docker Build

# Base stage (used for dev and prod)
FROM node:24.15.0 AS react-frontend-base

WORKDIR /app

# DEV stage
FROM react-frontend-base AS react-frontend-dev

EXPOSE 5173

COPY package.json yarn.lock ./

RUN yarn install

CMD ["yarn", "dev", "--host"]

# PROD stage
FROM react-frontend-base AS react-frontend-prod

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM nginx:stable-alpine3.23
COPY --from=react-frontend-prod /app/dist /usr/share/nginx/html  
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]