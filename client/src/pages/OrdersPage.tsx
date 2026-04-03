import Sidenav from '../components/layout/Sidenav';
import { useState, useEffect } from 'react';
import './OrdersPage.css';

interface OrderStep {
  label: string;
  done: boolean;
  timestamp?: string;
}

interface OrderDetails {
  id: number;
  status: string;
  estimatedTime: string;
  steps: OrderStep[];
}

export default function OrdersPage() {
  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    // TODO: conectar a backend cuando exista la API /orders
    setOrder({
      id: 12,
      status: 'En camino',
      estimatedTime: '20 mins',
      steps: [
        { label: 'Pedido confirmado', done: true, timestamp: '10:00' },
        { label: 'Preparando en cocina', done: true, timestamp: '10:05' },
        { label: 'Repartidor en ruta', done: true, timestamp: '10:10' },
        { label: 'Entrega próxima', done: false },
      ],
    });
  }, []);

  if (!order) {
    return (
      <div className="orders-page">
        <Sidenav />
        <main className="orders-page__main">
          <p>Cargando pedidos...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <Sidenav />

      <main className="orders-page__main">
        <section className="pedidos-section">
          <div className="pedidos-header">
            <h2>Pedidos</h2>
            <p>Tus pedidos llegarán lo más pronto posible.</p>
          </div>

          <div className="tracking-container">
            <div className="tracking-info">
              <div className="order-badge">PEDIDO #{order.id}</div>
              <p className="estimated-time"><strong>TIEMPO ESTIMADO:</strong> {order.estimatedTime}</p>
              <p className="order-status">Estado: {order.status}</p>

              <div className="timeline">
                {order.steps.map((step, index) => (
                  <div
                    key={step.label}
                    className={`timeline-step ${step.done ? 'completed' : ''} ${!step.done && index === order.steps.findIndex((s) => !s.done) ? 'active' : ''}`}
                  >
                    <div className="dot" />
                    <p>
                      {step.label}
                      {step.timestamp && <span className="step-time"> · {step.timestamp}</span>}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="map-placeholder">MAPA (próximamente)</div>
          </div>
        </section>
      </main>
    </div>
  );
}
