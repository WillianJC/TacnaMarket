import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti'; // Importamos el confeti
import Sidenav from '../components/layout/Sidenav';
import './OrdersPage.css';

const STEPS = [
  { id: 1, text: "Tu repartidor está llegando al local de pedidos", time: 20 },
  { id: 2, text: "Tu repartidor está esperando tu orden", time: 15 },
  { id: 3, text: "Tu repartidor está en dirección a tu destino", time: 10 },
  { id: 4, text: "Tu repartidor llegó a tu destino", time: 0 },
];

export default function OrdersPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(STEPS[0].time);
  const [arrived, setArrived] = useState(false);

  useEffect(() => {
    // Simulación acelerada: cada 5 segundos cambia de paso
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < STEPS.length - 1) {
          const nextStep = prev + 1;
          setTimeLeft(STEPS[nextStep].time);
          
          // Si es el último paso
          if (nextStep === STEPS.length - 1) {
            setArrived(true);
            confetti({
              particleCount: 150,
              spread: 70,
              origin: { y: 0.6 }
            });
          }
          return nextStep;
        }
        return prev;
      });
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="orders-layout">
      <Sidenav />
      <main className="orders-main">
        <header className="orders-header">
          <h1>Pedidos</h1>
          <p className="orders-subtitle">Tus pedidos llegarán lo más pronto posible.</p>
          <hr />
        </header>

        <section className="orders-content">
          <div className="status-container">
            <div className="order-info-card">
              <span className="repartidor-tag">CHAMO Nº12</span>
              <p className="time-est">
                {arrived ? <strong>¡EL REPARTIDOR LLEGÓ! 🏁</strong> : <>TIEMPO ESTIMADO: <strong>{timeLeft} mins</strong></>}
              </p>
            </div>

            <div className="steps-list">
              {STEPS.map((step, index) => (
                <div key={step.id} className={`step-item ${index <= currentStep ? 'active' : ''}`}>
                  <div className="step-dot"></div>
                  <p className="step-text">{step.text}</p>
                  {index < STEPS.length - 1 && <div className="step-line"></div>}
                </div>
              ))}
            </div>
            {arrived && <div className="buen-provecho">¡Buen provecho! 🍽️</div>}
          </div>

          <div className="map-container">
  {/* El iframe de Google Maps */}
  <iframe 
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.136450682281!2d-70.2526435!3d-18.0076936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915acf60060936bb%3A0x6e7886a11756293d!2sCancha%20Sint%C3%A9ticas%20TOP%20GOL!5e0!3m2!1ses-419!2spe!4v1712567890123!5m2!1ses-419!2spe" 
    width="100%" 
    height="100%" 
    style={{ border: 0 }} 
    allowFullScreen={true} 
    loading="lazy" 
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>

  {/* Tu motito animada encima del mapa */}
<div className={`moto-delivery ${arrived ? 'stopped' : 'moving'}`}>
  <img src="/moto_icon.png" alt="moto de reparto" />
</div>
  
  <p className="map-text">MAPS - Tacna Market Delivery</p>
</div>
        </section>
      </main>
    </div>
  );
}