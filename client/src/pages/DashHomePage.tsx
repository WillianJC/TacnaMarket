import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidenav from '../components/layout/Sidenav';
import { getProfile } from '../services/authService';
import './DashHomePage.css';

// Definimos las tarjetas con las rutas de tus nuevas imágenes
const cards = [
  {
    title: 'Ver productos disponibles',
    img: '/productos.png',
    path: '/dash/products',
  },
  {
  title: 'Vea sus pedidos en curso',
  img: '/pedidos.png',
  path: '/dash/orders', // Cambiado de /dash/home a /dash/orders
  },
  {
    title: 'Vea su carrito de compras',
    img: '/carrito.png',
    path: '/dash/cart',
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
          {cards.map(({ title, img, path }) => (
            <div
              key={title}
              className="dash-home__card"
              onClick={() => navigate(path)}
              style={{ cursor: 'pointer' }} // Para que sepa que es clickable
            >
              <h3 className="dash-home__card-title">{title}</h3>
              <div className="dash-home__card-img">
                <img 
                  src={img} 
                  alt={title} 
                  className="dash-home__card-image-file"
                  />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}