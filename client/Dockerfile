# 1. Etapa de Build
FROM oven/bun:latest AS build
WORKDIR /app


COPY package.json bun.lock* ./ 

RUN bun install
COPY . .
RUN bun run build

# 2. Etapa de Producción
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]