import { Navigate } from 'react-router-dom';
import { type ReactNode } from 'react'; // ← importar ReactNode

const ProtectedRoute = ({ children }: { children: ReactNode }) => { // ← usar ReactNode
  const token = localStorage.getItem('tacna_access_token');

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;