import { useEffect, useState } from 'react';
import './PaymentCarousel.css';

interface PaymentCarouselProps {
  onClose: () => void;
}

export default function PaymentCarousel({ onClose }: PaymentCarouselProps) {
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

  // Cerrar al presionar Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Cerrar al hacer click fuera del contenedor
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="payment-carousel" onClick={handleBackdropClick}>
      <div className="payment-carousel__container">
        <button
          className="payment-carousel__close-btn"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ✕
        </button>
        <h2 className="payment-carousel__title">Métodos de Pago - Yape</h2>
        <div className="payment-carousel__image-wrapper">
          <img
            src={images[currentImageIndex]}
            alt={`Método de pago ${currentImageIndex + 1}`}
            className="payment-carousel__image"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300?text=Método+de+Pago'; }}
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
        <p className="payment-carousel__description">
          Escaneá el código QR para realizar el pago.
        </p>
      </div>
    </div>
  );
}
