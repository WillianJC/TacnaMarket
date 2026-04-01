# ── Stage 1: build ───────────────────────────────────────────────────────────
FROM oven/bun:1-alpine AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
# Avoid Bun's script runner here; `bun run build` can hang on `nest build`.
RUN bun x tsc -p tsconfig.build.json

# ── Stage 2: production ───────────────────────────────────────────────────────
FROM oven/bun:1-alpine AS production

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

COPY --from=builder /app/dist ./dist

EXPOSE 3001

CMD ["bun", "dist/main"]
