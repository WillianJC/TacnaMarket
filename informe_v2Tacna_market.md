# INFORME COMPLETO DEL PROYECTO TACNAMARKET V2

## 1. RESUMEN EJECUTIVO

TacnaMarket es una plataforma de comercio electronico full-stack creada para la venta de productos de primera necesidad (supermercado/Grocery Delivery). El proyecto fue desarrollado por un equipo de 3 personas y utiliza tecnologias modernas tanto en el frontend como en el backend.

**Contribuidores:**
- @WillianJC - Willian Candia
- @1546329G - Gandy Humiri
- @Joege2502 - Jorge Osores

**Arquitectura:**
- Server: NestJS + TypeORM + PostgreSQL (Puerto 3001)
- Client: React 19 + Vite + TypeScript (Puerto 4173)
- Contenedores: Docker + Docker Compose

---

## 2. ESTRUCTURA DEL PROYECTO

### 2.1 RAIZ DEL PROYECTO (13 archivos)

| Archivo | Descripcion |
|---------|-------------|
| package.json | Monorepo config: scripts para install y build |
| docker-compose.yml | Define servicios: server y client |
| .env | Variables de entorno del proyecto |
| .env.example | Ejemplo de variables de entorno |
| README.md | Documentacion oficial del proyecto |
| .prettierrc | Config: singleQuote, trailingComma |
| .gitignore | Ignora node_modules, dist, .env, logs |
| bun.lock | Lockfile de Bun |
| .github/workflows/build.yml | CI/CD: instala deps y hace build |
| COLORS.md | Paleta de colores del proyecto |

### 2.2 SERVER - BACKEND (NestJS)

#### Archivos de Configuracion (7 archivos)
- package.json - Dependencias: NestJS, TypeORM, Passport, JWT, Resend, AWS S3
- tsconfig.json - Config TypeScript
- tsconfig.build.json - Build TypeScript
- nest-cli.json - Config NestJS CLI
- eslint.config.mjs - Config ESLint
- Dockerfile - Imagen Docker del servidor
- .dockerignore - Ignora node_modules, dist

#### Scripts SQL (3 archivos)
- 01_create_tables.sql - Crea tabla users y funcion trigger
- 02_seed.sql - Inserta usuario admin por defecto
- 04_seed_products.sql - Inserta 5 categorias + 25 productos

#### Tests de API (Bruno) (18 archivos)
- test/api/auth/ - Register.yml, login.yml, profile.yml
- test/api/user/ - create.yml, get.yml, update.yml, delete.yml, list.yml
- test/api/Products/ - Create Category.yml, Create Product.yml, Get All Categories.yml, etc.

#### Codigo Fuente (27 archivos)

**Modulo Principal (2 archivos)**
- src/main.ts - Entry point: configura CORS, ValidationPipe
- src/app.module.ts - Modulo raiz: importa todos los modulos, configura TypeORM

**Modulo User (6 archivos)**
- user/entities/user.entity.ts - Entidad: id UUID, username, name, password, address, role
- user/user.service.ts - CRUD completo con bcrypt
- user/user.controller.ts - Endpoints REST protegidos por JWT
- user/user.module.ts - Exporta UserService
- user/dto/create-user.dto.ts - DTO para crear usuario
- user/dto/update-user.dto.ts - DTO para actualizar usuario

**Modulo Auth (9 archivos)**
- auth/auth.service.ts - validateUser, register, login. Genera JWT
- auth/auth.controller.ts - Endpoints: /auth/register, /auth/login, /auth/profile
- auth/auth.module.ts - Configura Passport y JWT
- auth/dto/register.dto.ts - DTO registro
- auth/dto/login.dto.ts - DTO login
- auth/strategies/local.strategy.ts - Passport local strategy
- auth/strategies/jwt.strategy.ts - Passport JWT strategy
- auth/guards/local-auth.guard.ts - Guard autenticacion local
- auth/guards/jwt-auth.guard.ts - Guard JWT

**Modulo Product (9 archivos)**
- product/entities/product.entity.ts - Entidad Product
- product/entities/category.entity.ts - Entidad Category
- product/entities/index.ts - Exporta Product y Category
- product/product.service.ts - createProduct, createCategory, getProductsByCategory
- product/product.controller.ts - Endpoints API products
- product/product.module.ts - Modulo
- product/dto/create-product.dto.ts - DTO producto
- product/dto/create-category.dto.ts - DTO categoria

**Modulo Orders (2 archivos)**
- orders/orders.controller.ts - Endpoint: POST /orders/checkout
- orders/orders.module.ts - Importa MailModule

**Modulo Mail (2 archivos)**
- mail/mail.service.ts - Envia email HTML con Resend
- mail.mail.module.ts - Configura RESEND_CLIENT

**Modulo Database (1 archivo)**
- database/database-seeder.service.ts - Seed automatico

### 2.3 CLIENT - FRONTEND (React)

#### Archivos de Configuracion (10 archivos)
- package.json - Dependencias: React 19, Vite, React Router, Heroicons, styled-components
- tsconfig.json - Config TypeScript
- tsconfig.app.json - Config app
- tsconfig.node.json - Config Node
- vite.config.ts - Vite config
- eslint.config.js - Config ESLint
- Dockerfile - Imagen Docker
- nginx.conf - Config Nginx para produccion
- index.html - HTML principal
- .npmrc - Config npm

#### Codigo Fuente (31 archivos)

**Punto de Entrada (4 archivos)**
- src/main.tsx - Renderiza App en StrictMode
- src/App.tsx - Componente raiz con CartProvider
- src/App.css - Estilos globales
- src/index.css - Estilos globales

**Enrutamiento (2 archivos)**
- src/router/AppRouter.tsx - Define todas las rutas
- src/router/ProtectedRoute.tsx - Verifica token en localStorage

**Servicios (1 archivo)**
- src/services/authService.ts - login, register, getProfile

**Contextos (1 archivo)**
- src/context/CartContext.tsx - Context API del carrito

**Paginas (10 archivos)**
- src/pages/AuthPage.tsx - Login/Registro
- src/pages/DashboardPage.tsx - Catalogo de productos
- src/pages/CartPage.tsx - Carrito de compras
- src/pages/DashHomePage.tsx - Home del dashboard
- src/pages/OrdersPage.tsx - Seguimiento de pedidos
- src/pages/*.css - Estilos de paginas

**Componentes (14 archivos)**
- auth/AuthForm.tsx - Formulario login/registro
- auth/AuthIllustration.tsx - Imagen Unsplash
- layout/Sidenav.tsx - Navegacion lateral
- products/ProductCard.tsx - Tarjeta producto
- products/CategorySidebar.tsx - Filtros por categoria
- common/PremiumCard.tsx - Componente ejemplo
- PaymentCarousel.tsx - Modal QR Yape

#### Recursos Estaticos (11 archivos)
- public/favicon.ico
- public/logo.svg
- public/icons.svg
- public/hero.png
- public/moto_icon.png
- public/carrito.png
- public/pedidos.png
- public/productos.png
- public/yape-1.png
- public/yape-2.jpeg
- public/yape-3.jpeg
- public/yape-HD.png

---

## 3. TECNOLOGIAS UTILIZADAS

### FRONTEND
| Tecnologia | Version | Proposito |
|------------|---------|-----------|
| React | 19.2.4 | Framework UI |
| TypeScript | ~5.9.3 | Tipado estatico |
| Vite | 8.0.1 | Build tool |
| React Router | 7.13.2 | Enrutamiento |
| @heroicons/react | 2.2.0 | Iconos |
| styled-components | 6.1.8 | CSS-in-JS |
| canvas-confetti | 1.9.4 | Confeti |

### BACKEND
| Tecnologia | Version |
|------------|---------|
| NestJS | 11.0.1 |
| TypeORM | 0.3.28 |
| Passport | 0.7.0 |
| JWT | - |
| bcryptjs | 3.0.3 |
| PostgreSQL | - |
| Resend | 6.10.0 |
| AWS SDK S3 | 3.1023.0 |

### HERRAMIENTAS
- Bun - Runtime y package manager
- Docker - Contenedores
- Docker Compose - Orquestacion
- GitHub Actions - CI/CD

---

## 4. FUNCIONALIDADES

### Autenticacion
- Registro de usuarios (nombre, username, contrasena, direccion)
- Login con username y contrasena
- Tokens JWT en localStorage
- Rutas protegidas

### Catalogo de Productos
- Carga de categorias desde la API
- Filtrado de productos por categoria
- Productos con imagen, nombre, descripcion y precio

### Carrito de Compras
- Agregar productos al carrito
- Persistencia en memoria (Context API)
- Checkout que envia datos al servidor
- Envio de correo de confirmacion con Resend

### Metodos de Pago
- Carrusel de imagenes QR de Yape/Plin
- Informacion de pago en email de confirmacion

### Seguimiento de Pedidos
- Simulacion de pasos de entrega
- Mapa embebido de Google Maps
- Animacion de moto de delivery
- Efecto confeti al completar

---

## 5. VARIABLES DE ENTORNO

- DATABASE_URL - URL de PostgreSQL
- DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD
- JWT_SECRET - Clave secreta para JWT
- JWT_EXPIRES_IN - Tiempo de expiracion del token
- RESEND_API_KEY - API key de Resend
- NEST_PORT - Puerto del servidor (default 3001)
- CLIENT_PORT - Puerto del cliente (default 4173)
- VITE_API_URL - URL de la API para el cliente

---

## 6. RESUMEN ESTADISTICO

| Seccion | Cantidad |
|---------|----------|
| Archivos raiz | 13 |
| Archivos Server config | 7 |
| Scripts SQL | 3 |
| Tests Bruno | 18 |
| Archivos Server src | 27 |
| Archivos Client config | 10 |
| Archivos Client src | 31 |
| Archivos Client public | 12 |
| Archivos Client assets | 3 |
| TOTAL | 124 archivos |

---

*Informe generado el 9 de abril de 2026*
*Proyecto: TacnaMarket V2*