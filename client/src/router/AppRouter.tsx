import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AuthPage from '../pages/AuthPage'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
