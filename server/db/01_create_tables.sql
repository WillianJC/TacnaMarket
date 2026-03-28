-- ============================================================
-- TacnaMarket - Script de creación de tablas
-- Base de datos: PostgreSQL
-- ============================================================

-- Extensión para gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- Tabla: users
-- ============================================================
CREATE TYPE user_role AS ENUM ('admin', 'user');

CREATE TABLE IF NOT EXISTS users (
  id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  email       VARCHAR(255) UNIQUE NOT NULL,
  name        VARCHAR(255) NOT NULL,
  password    VARCHAR(255) NOT NULL,
  role        user_role    NOT NULL DEFAULT 'user',
  created_at  TIMESTAMP    NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- Índice en email para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
