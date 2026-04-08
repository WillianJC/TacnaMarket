import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import DashboardPage from '../pages/DashboardPage';
import CartPage from '../pages/CartPage';
import ProtectedRoute from './ProtectedRoute';
import DashHomePage from '../pages/DashHomePage';
import OrdersPage from '../pages/OrdersPage'; // 1. Importamos la nueva página

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirige "/" directo al login */}
        <Route path="/" element={<Navigate to="/auth" replace />} />

        {/* Ruta pública */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Rutas protegidas */}
        
        {/* Ruta para ver el catálogo de productos */}
        <Route path="/dash/products" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />

        {/* Ruta para el home del dashboard (donde están las 3 tarjetas) */}
        <Route path="/dash/home" element={
          <ProtectedRoute>
            <DashHomePage />
          </ProtectedRoute>
        } />

        {/* Ruta para el carrito de compras */}
        <Route path="/dash/cart" element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        } />

        {/* 2. NUEVA RUTA: Para el seguimiento de pedidos */}
        <Route path="/dash/orders" element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        } />

        {/* Cualquier ruta desconocida → login */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </BrowserRouter>
  );
}