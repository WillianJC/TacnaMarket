
FROM oven-sh/bun:latest AS build
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install
COPY . .
RUN bun run build

FROM nginx:alpine
# Copiamos los archivos de la carpeta 'dist' que genera Vite
COPY --from=build /app/dist /usr/share/nginx/html
# Exponemos el puerto 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]