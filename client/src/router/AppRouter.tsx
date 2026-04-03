import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import DashboardPage from '../pages/DashboardPage';
import CartPage from '../pages/CartPage';
import ProtectedRoute from './ProtectedRoute';
import DashHomePage from '../pages/DashHomePage';
import OrdersPage from '../pages/OrdersPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirige "/" directo al login */}
        <Route path="/" element={<Navigate to="/auth" replace />} />

        {/* Ruta pública */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Rutas protegidas */}
        <Route path="/dash/products" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        {/* Ruta para el home del dashboard */}
        <Route path="/dash/home" element={
          <ProtectedRoute>
            <DashHomePage />
          </ProtectedRoute>
        } />

        <Route path="/dash/cart" element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        } />

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