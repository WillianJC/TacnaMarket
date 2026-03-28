-- ============================================================
-- TacnaMarket - Seed: datos de prueba
-- NOTA: La contraseña 'admin1234' está hasheada con bcrypt (10 rounds)
-- ============================================================

INSERT INTO users (email, name, password, role)
VALUES (
  'admin@tacna-market.shop',
  'BOSS',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  'admin'
)
ON CONFLICT (email) DO NOTHING;
