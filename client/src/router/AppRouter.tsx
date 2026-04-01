import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AuthPage from '../pages/AuthPage'
import DashboardPage from '../pages/DashboardPage'
import CartPage from '../pages/CartPage'; 
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        
        {/* AGREGAMOS LA RUTA DEL CARRITO AQUÍ */}
        <Route path="/cart" element={<CartPage />} /> 

        {/* El comodín "*" siempre debe ir al final */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}