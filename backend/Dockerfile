FROM node:20-alpine AS builder
WORKDIR /app

# bcrypt is a native module — needs build tools to compile on alpine
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Drop devDependencies now that the build output exists
RUN npm prune --omit=dev

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/seed-data ./seed-data
COPY package*.json ./

EXPOSE 3000
CMD ["node", "dist/main"]
