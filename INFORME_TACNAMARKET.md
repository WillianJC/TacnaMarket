# INFORME COMPLETO DEL PROYECTO TACNAMARKET

## 1. RESUMEN EJECUTIVO

TacnaMarket es una plataforma de comercio electrónico full-stack creada para la venta de productos de primera necesidad (supermercado/Grocery Delivery).

**Contribuidores:**
- @WillianJC - Willian Candia
- @1546329G - Gandy Humiri
- @Joege2502 - Jorge Osores

---

## 2. TECNOLOGÍAS UTILIZADAS

### FRONTEND (Client)

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 19.2.4 | Framework principal de UI |
| TypeScript | ~5.9.3 | Tipado estático |
| Vite | 8.0.1 | Build tool y servidor de desarrollo |
| React Router DOM | 7.13.2 | Enrutamiento de páginas |
| @heroicons/react | 2.2.0 | Biblioteca de iconos |
| styled-components | 6.1.8 | Estilos CSS-in-JS |
| canvas-confetti | 1.9.4 | Efecto de confeti |
| ESLint | 9.39.4 | Linting de código |

### BACKEND (Server)

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| NestJS | 11.0.1 | Framework backend |
| TypeScript | 5.7.3 | Tipado estático |
| TypeORM | 0.3.28 | ORM para base de datos |
| Passport | 0.7.0 | Autenticación |
| passport-jwt | 4.0.1 | JWT authentication |
| passport-local | 1.0.0 | Local authentication |
| bcryptjs | 3.0.3 | Hash de contraseñas |
| class-validator | 0.15.1 | Validación de DTOs |
| @nestjs/jwt | 11.0.2 | Manejo de JWT |
| @nestjs/typeorm | 11.0.0 | Integración TypeORM |
| pg | 8.20.0 | Driver PostgreSQL |
| mysql2 | 3.20.0 | Driver MySQL |
| nodemailer | 8.0.4 | Envío de correos |
| @nestjs-modules/mailer | 2.3.4 | Módulo de correo para NestJS |
| resend | 6.10.0 | API de correo transaccional |
| @aws-sdk/client-s3 | 3.1023.0 | Cliente S3 para imágenes |

### HERRAMIENTAS DE DESARROLLO

| Herramienta | Propósito |
|-------------|-----------|
| Bun | Runtime y package manager |
| Docker | Contenedores |
| Docker Compose | Orquestación de servicios |
| ESLint | Linting |
| Prettier | Formateo de código |
| Jest | Testing |
| Bruno | Testing de API |

---

## 3. ESTRUCTURA DE ARCHIVOS DETALLADA

### RAÍZ DEL PROYECTO

| Archivo | Descripción |
|---------|-------------|
| package.json | Configuración principal del monorepo |
| docker-compose.yml | Define 2 servicios: server (puerto 3001) y client (puerto 4173) |
| README.md | Documentación oficial del proyecto |
| .prettierrc | Configuración de Prettier |
| .gitignore | Archivos ignorados por Git |
| bun.lock | Lockfile de Bun |
| .github/workflows/build.yml | CI/CD: Instala dependencias y hace build |

---

### SERVER (Backend - NestJS)

#### Archivos de Configuración
- package.json - Dependencias del servidor
- tsconfig.json - Configuración TypeScript
- nest-cli.json - Configuración NestJS CLI
- Dockerfile - Imagen Docker del servidor

#### Scripts SQL (server/db/)
- 01_create_tables.sql - Creación de tablas
- 02_seed.sql - Datos iniciales
- 04_seed_products.sql - Datos de productos

#### Código Fuente (server/src/)

**Módulo Principal:**
- main.ts - Punto de entrada. Configura CORS, ValidationPipe
- app.module.ts - Módulo raíz. Configura TypeORM

**Módulo de Usuario (server/src/user/):**
- entities/user.entity.ts - Entidad User (id UUID, username, name, password, address, role)
- user.service.ts - CRUD completo con bcrypt
- user.controller.ts - Endpoints: GET/POST/PATCH/DELETE /user
- user.module.ts - Módulo NestJS
- dto/create-user.dto.ts - DTO para crear usuario
- dto/update-user.dto.ts - DTO para actualizar usuario

**Módulo de Autenticación (server/src/auth/):**
- auth.service.ts - Lógica de autenticación, validateUser, register, login
- auth.controller.ts - Endpoints: POST /auth/register, POST /auth/login, GET /auth/profile
- auth.module.ts - Configura Passport, JWT
- dto/register.dto.ts - DTO registro
- dto/login.dto.ts - DTO login
- strategies/local.strategy.ts - Estrategia Passport local
- strategies/jwt.strategy.ts - Estrategia Passport JWT
- guards/local-auth.guard.ts - Guard autenticación local
- guards/jwt-auth.guard.ts - Guard JWT

**Módulo de Productos (server/src/product/):**
- entities/product.entity.ts - Entidad Product
- entities/category.entity.ts - Entidad Category
- entities/index.ts - Exporta Product y Category
- product.service.ts - createProduct, createCategory, getProductsByCategory, getAllCategories
- product.controller.ts - Endpoints API products
- product.module.ts - Módulo
- dto/create-product.dto.ts - DTO producto
- dto/create-category.dto.ts - DTO categoría

**Módulo de Órdenes (server/src/orders/):**
- orders.controller.ts - Endpoint: POST /orders/checkout
- orders.module.ts - Importa MailModule

**Módulo de Correo (server/src/mail/):**
- mail.module.ts - Configura RESEND_CLIENT
- mail.service.ts - Envía emails de confirmación con HTML

**Base de Datos (server/src/database/):**
- database-seeder.service.ts - Seed automático: Crea admin (admin/admin123) y 5 categorías

---

### CLIENT (Frontend - React)

#### Archivos de Configuración
- package.json - Dependencias del cliente
- tsconfig.json - Configuración TypeScript
- vite.config.ts - Configuración Vite (puerto 3000, preview 4173)
- eslint.config.js - Configuración ESLint
- Dockerfile - Imagen Docker del cliente
- nginx.conf - Configuración Nginx para producción
- index.html - HTML principal

#### Código Fuente (client/src/)

**Punto de Entrada:**
- main.tsx - Renderiza App dentro de StrictMode
- App.tsx - Componente raíz con CartProvider
- index.css - Estilos globales
- App.css - Estilos de App

**Enrutamiento (client/src/router/):**
- AppRouter.tsx - Define todas las rutas (públicas y protegidas)
- ProtectedRoute.tsx - Verifica token en localStorage

**Servicios (client/src/services/):**
- authService.ts - Funciones: login, register, getProfile

**Contextos (client/src/context/):**
- CartContext.tsx - Context API para estado global del carrito

**Páginas (client/src/pages/):**
- AuthPage.tsx - Página de login/registro
- DashboardPage.tsx - Catálogo de productos
- CartPage.tsx - Carrito de compras
- DashHomePage.tsx - Home del dashboard (3 tarjetas)
- OrdersPage.tsx - Seguimiento de pedidos simulado

**Componentes (client/src/components/):**

- auth/AuthForm.tsx - Formulario de login/registro
- auth/AuthIllustration.tsx - Imagen de Unsplash
- layout/Sidenav.tsx - Navegación lateral
- products/ProductCard.tsx - Tarjeta de producto
- products/CategorySidebar.tsx - Filtros por categoría
- common/PremiumCard.tsx - Componente de ejemplo con styled-components
- PaymentCarousel.tsx - Modal con QR de Yape

---

## 4. FUNCIONALIDADES DEL PROYECTO

### Autenticación
- Registro de usuarios (nombre, username, contraseña, dirección)
- Login con username y contraseña
- Tokens JWT en localStorage
- Rutas protegidas

### Catálogo de Productos
- Carga de categorías desde la API
- Filtrado de productos por categoría
- Productos con imagen, nombre, descripción y precio

### Carrito de Compras
- Agregar productos al carrito
- Persistencia en memoria (Context API)
- Visualización de productos, precios y total
- Checkout que envía datos al servidor
- Envío de correo de confirmación con Resend

### Métodos de Pago
- Carrusel de imágenes QR de Yape/Plin
- Información de pago en email de confirmación

### Seguimiento de Pedidos
- Simulación de pasos de entrega
- Mapa embebido de Google Maps
- Animación de moto de delivery
- Efecto confeti al completar

---

## 5. VARIABLES DE ENTORNO (ESPERADAS)

- DATABASE_URL - URL de PostgreSQL
- DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD
- JWT_SECRET - Clave secreta para JWT
- JWT_EXPIRES_IN - Tiempo de expiración del token
- RESEND_API_KEY - API key de Resend para correos
- NEST_PORT - Puerto del servidor (default 3001)
- CLIENT_PORT - Puerto del cliente (default 4173)
- VITE_API_URL - URL de la API para el cliente

---

## 6. CONTADORES

- Total archivos revisados: ~60 archivos
- Líneas de código aproximada: 3000+ líneas
- Endpoints de API: ~12 endpoints
- Páginas frontend: 5 páginas
- Componentes React: ~15 componentes

---

*Informe generado el 9 de abril de 2026*
*Proyecto: TacnaMarket*