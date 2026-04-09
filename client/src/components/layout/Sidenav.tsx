import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  TruckIcon,
  ArrowLeftStartOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import './Sidenav.css';

interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

const navItems: NavItem[] = [
  { label: 'Inicio', icon: HomeIcon, path: '/dash/home' },
  { label: 'Productos', icon: ShoppingBagIcon, path: '/dash/products' },
  { label: 'Carrito', icon: ShoppingCartIcon, path: '/dash/cart' },
  { label: 'Pedidos', icon: TruckIcon, path: '/dash/orders' },
];

export default function Sidenav() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = window.innerWidth <= 768;

  return (
    <aside className={`sidenav${collapsed ? ' sidenav--collapsed' : ''}`}>
      {/* Botón de colapsar — solo en desktop */}
      {!isMobile && (
        <button className="sidenav__toggle" onClick={() => setCollapsed((c) => !c)}>
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </button>
      )}

      {/* Logo */}
      <div className="sidenav__logo" onClick={() => navigate('/dash/home')} style={{cursor: 'pointer'}}>
        <img src="/favicon.ico" width={130} height={130} className="sidenav__logo-img" alt="TacnaMarket Logo" />
      </div>

      {/* Nav items */}
      <nav className="sidenav__nav">
        {navItems.map(({ label, icon: Icon, path }) => (
          <div 
            key={label} 
            className={`sidenav__item ${location.pathname === path ? 'active' : ''}`}
            onClick={() => navigate(path)}
            style={{ cursor: 'pointer' }}
          >
            <Icon className="sidenav__item-icon" />
            {/* En desktop: ocultar si collapsed. En móvil: siempre visible via CSS */}
            {(!collapsed || isMobile) && <span className="sidenav__item-label">{label}</span>}
          </div>
        ))}
      </nav>

      {/* Footer / Cerrar Sesión — solo desktop */}
      <div className="sidenav__footer">
        <div 
          className="sidenav__item sidenav__item--signout" 
          onClick={() => {
            localStorage.removeItem('tacna_access_token');
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