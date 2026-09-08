FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Vite bakes VITE_* vars into the bundle at build time, so this has to be
# passed as a build-arg (docker-compose build.args), not a runtime env var.
ARG VITE_BACKEND_URL=http://localhost:3000
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

RUN npm run build

FROM nginx:alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
