# TacnaMarket

TacnaMarket es una plataforma web de comercio digital con arquitectura full stack, enfocada en flujo de autenticacion, exploracion de productos y gestion de compras desde una interfaz moderna.

## Resumen Del Proyecto

El proyecto esta dividido en dos aplicaciones principales:

- Cliente web en React + TypeScript + Vite.
- API backend en NestJS + TypeScript + TypeORM.

La solucion incluye una estructura modular para autenticacion, usuarios, productos y ordenes, junto con configuracion para despliegue en contenedores mediante Docker Compose.

## Arquitectura

- `client/`: aplicacion frontend.
	- React 19 con enrutamiento (`react-router-dom`).
	- Componentes para autenticacion, dashboard, carrito y catalogo de productos.
	- Construccion con Vite y linting con ESLint.

- `server/`: aplicacion backend.
	- NestJS con modulos por dominio (`auth`, `user`, `product`, `orders`, `mail`).
	- Persistencia con TypeORM y soporte de motores SQL (`pg`, `mysql2`).
	- Seguridad basada en Passport (`local` y `jwt`) y uso de DTOs para validacion.

- `server/db/`: scripts SQL para creacion de tablas y datos semilla.
- `docker-compose.yml`: ejecucion coordinada de cliente y servidor.

## Funcionalidades Principales

- Registro e inicio de sesion de usuarios.
- Proteccion de rutas mediante JWT.
- Gestion de usuarios.
- Gestion de productos y categorias.
- Flujo de ordenes y carrito en frontend.
- Soporte de correo y servicios auxiliares en backend.

## Scripts Relevantes

En la raiz del repositorio:

- `bun run install-all`: instala dependencias de cliente y servidor.
- `bun run build-all`: compila cliente y servidor.
- `bun run build-client`: compila solo el cliente.
- `bun run build-server`: compila solo el servidor.

## Ejecucion Con Docker

El archivo `docker-compose.yml` define dos servicios:

- `server`: API NestJS (puerto por defecto: `3001`).
- `client`: frontend servido en contenedor (puerto por defecto: `4173`).

Tambien soporta variables de entorno como `NEST_PORT`, `CLIENT_PORT` y `VITE_API_URL`.

## Contribuidores De GitHub

<table>
	<tr>
		<td align="center" width="220">
			<a href="https://github.com/WillianJC">
				<img src="https://github.com/WillianJC.png?size=120" width="120" alt="WillianJC" />
				<br />
				<strong>@WillianJC</strong>
			</a>
			<br />
			Willian Candia
		</td>
		<td align="center" width="220">
			<a href="https://github.com/1546329G">
				<img src="https://github.com/1546329G.png?size=120" width="120" alt="1546329G" />
				<br />
				<strong>@1546329G</strong>
			</a>
			<br />
			Gandy Humiri
		</td>
		<td align="center" width="220">
			<a href="https://github.com/Joege2502">
				<img src="https://github.com/Joege2502.png?size=120" width="120" alt="Joege2502" />
				<br />
				<strong>@Joege2502</strong>
			</a>
			<br />
			Jorge Osores
		</td>
	</tr>
</table>
