import { useEffect, useState } from 'react';
import './PaymentCarousel.css';

export default function PaymentCarousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    '/yape-1.png',
    '/yape-2.jpeg',
    '/yape-3.jpeg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="payment-carousel">
      <div className="payment-carousel__container">
        <h2 className="payment-carousel__title">Métodos de Pago - Yape</h2>
        <div className="payment-carousel__image-wrapper">
          <img
            src={images[currentImageIndex]}
            alt={`Método de pago ${currentImageIndex + 1}`}
            className="payment-carousel__image"
          />
        </div>
        <div className="payment-carousel__indicators">
          {images.map((_, index) => (
            <span
              key={index}
              className={`payment-carousel__indicator ${
                index === currentImageIndex ? 'active' : ''
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
