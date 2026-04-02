import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingBagIcon,
  TruckIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import Sidenav from '../components/layout/Sidenav';
import { getProfile } from '../services/authService';
import './DashHomePage.css';

const cards = [
  {
    title: 'Ver productos disponibles',
    icon: ShoppingBagIcon,
    path: '/dashboard',
  },
  {
    title: 'Vea sus pedidos en curso',
    icon: TruckIcon,
    path: '/orders',
  },
  {
    title: 'Vea su carrito de compras',
    icon: ShoppingCartIcon,
    path: '/cart',
  },
];

export default function DashHomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('tacna_access_token');
    if (token) {
      getProfile(token)
        .then((profile) => setUsername(profile.name || profile.username || 'Usuario'))
        .catch(() => setUsername('Usuario'));
    } else {
      setUsername('Usuario');
    }
  }, []);

  return (
    <div className="dash-home">
      <Sidenav />

      <main className="dash-home__main">
        <header className="dash-home__header">
          <h1 className="dash-home__title">
            Bienvenido, <span className="dash-home__username">{username || 'Usuario'}</span>
          </h1>
          <hr className="dash-home__divider" />
        </header>

        <div className="dash-home__cards">
          {cards.map(({ title, icon: Icon, path }) => (
            <div
              key={title}
              className="dash-home__card"
              onClick={() => navigate(path)}
            >
              <h3 className="dash-home__card-title">{title}</h3>
              <div className="dash-home__card-img">
                <Icon className="dash-home__card-icon" />
                <span>IMG</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
