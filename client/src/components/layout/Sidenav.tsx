import { useState } from 'react';
import {
  ShoppingBagIcon,
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
}

const navItems: NavItem[] = [
  { label: 'Productos', icon: ShoppingBagIcon },
  { label: 'Pedidos', icon: ClipboardDocumentListIcon },
];

export default function Sidenav() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidenav${collapsed ? ' sidenav--collapsed' : ''}`}>
      {/* Toggle button */}
      <button
        className="sidenav__toggle"
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? 'Expandir menú' : 'Colapsar menú'}
      >
        {collapsed ? (
          <ChevronRightIcon className="sidenav__toggle-icon" />
        ) : (
          <ChevronLeftIcon className="sidenav__toggle-icon" />
        )}
      </button>

      {/* Logo */}
      <div className="sidenav__logo">
        <img src={viteLogo} alt="TacnaMarket" className="sidenav__logo-img" />
        {!collapsed && <span className="sidenav__logo-text">TacnaMarket</span>}
      </div>

      {/* Nav items */}
      <nav className="sidenav__nav">
        {navItems.map(({ label, icon: Icon }) => (
          <a key={label} href="#" className="sidenav__item">
            <Icon className="sidenav__item-icon" />
            {!collapsed && <span className="sidenav__item-label">{label}</span>}
          </a>
        ))}
      </nav>

      {/* Signout at bottom */}
      <div className="sidenav__footer">
        <a href="#" className="sidenav__item sidenav__item--signout">
          <ArrowLeftStartOnRectangleIcon className="sidenav__item-icon" />
          {!collapsed && <span className="sidenav__item-label">Cerrar sesión</span>}
        </a>
      </div>
    </aside>
  );
}
