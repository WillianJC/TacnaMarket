import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // 1. Importar hooks de navegación
import {
  ShoppingBagIcon,
  ShoppingCartIcon,
  ClipboardDocumentListIcon,
  ArrowLeftStartOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import viteLogo from '../../assets/vite.svg';
import './Sidenav.css';

interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string; // 2. Agregamos el path (la ruta) a la interfaz
}

const navItems: NavItem[] = [
  { label: 'Productos', icon: ShoppingBagIcon, path: '/dashboard' },
  { label: 'Carrito', icon: ShoppingCartIcon, path: '/cart' },
  { label: 'Pedidos', icon: ClipboardDocumentListIcon, path: '/orders' },
];

export default function Sidenav() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // 3. Inicializar el navegador
  const location = useLocation(); // Para saber en qué página estamos (opcional)

  return (
    <aside className={`sidenav${collapsed ? ' sidenav--collapsed' : ''}`}>
      {/* Botón de colapsar */}
      <button className="sidenav__toggle" onClick={() => setCollapsed((c) => !c)}>
        {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </button>

      {/* Logo */}
      <div className="sidenav__logo" onClick={() => navigate('/dashboard')} style={{cursor: 'pointer'}}>
        <img src={viteLogo} alt="Logo" />
        {!collapsed && <span>TacnaMarket</span>}
      </div>

      {/* Nav items con funcionalidad de CLIC */}
      <nav className="sidenav__nav">
        {navItems.map(({ label, icon: Icon, path }) => (
          <div 
            key={label} 
            className={`sidenav__item ${location.pathname === path ? 'active' : ''}`}
            onClick={() => navigate(path)} // 4. AQUÍ SE HACE LA REDIRECCIÓN
            style={{ cursor: 'pointer' }}
          >
            <Icon className="sidenav__item-icon" />
            {!collapsed && <span className="sidenav__item-label">{label}</span>}
          </div>
        ))}
      </nav>

      {/* Footer / Cerrar Sesión */}
      <div className="sidenav__footer">
        <div 
          className="sidenav__item sidenav__item--signout" 
          onClick={() => {
            localStorage.removeItem('tacna_access_token'); // misma clave que AuthForm
            navigate('/auth');
        }}
        >
          <ArrowLeftStartOnRectangleIcon className="sidenav__item-icon" />
          {!collapsed && <span className="sidenav__item-label">Cerrar sesión</span>}
        </div>
      </div>
    </aside>
  );
}