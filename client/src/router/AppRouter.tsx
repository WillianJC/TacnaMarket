import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AuthPage from '../pages/AuthPage'
import DashboardPage from '../pages/DashboardPage'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
