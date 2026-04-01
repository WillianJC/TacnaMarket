# 1. Etapa de Build (Corregido el nombre de la imagen)
FROM oven/bun:latest AS build
WORKDIR /app

# Nota: Asegúrate de que tu archivo se llame bun.lockb o bun.lock
# Si usas el estándar de bun es bun.lockb
COPY package.json bun.lockb ./ 
RUN bun install
COPY . .
RUN bun run build

# 2. Etapa de Producción (Nginx)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]