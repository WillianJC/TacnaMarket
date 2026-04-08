import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Sidenav from '../components/layout/Sidenav';
import PaymentCarousel from '../components/PaymentCarousel';
import './CartPage.css';

// Configuración de API automática: Detecta si estás en tu PC o en AWS
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();
  
  // Estados
  const [customerEmail, setCustomerEmail] = useState('');
  const [showPaymentCarousel, setShowPaymentCarousel] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (cart.length === 0 || isProcessing) return;

    if (!customerEmail) {
      alert('Por favor, ingresa un correo para enviarte el recibo.');
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch(`${BASE_URL}/orders/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: customerEmail,
          cart: cart,
          total: totalPrice,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert(`¡Compra exitosa! Recibo enviado a: ${customerEmail}`);
        clearCart();
        navigate('/dash/products');
      } else {
        throw new Error(result.message || 'Error al procesar');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Error de conexión. Verifica que el servidor esté activo.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="cart-page">
      {showPaymentCarousel && <PaymentCarousel onClose={() => setShowPaymentCarousel(false)} />}
      <Sidenav />

      <main className="cart-page__main">
        <header className="cart-page__header">
          <h1 className="cart-page__title">Tu Carrito</h1>
          <button onClick={() => navigate('/dash/products')} className="cart-page__back-btn">
            Volver a Comprar
          </button>
        </header>

        <section className="cart-page__content">
          {cart.length === 0 ? (
            <div className="cart-page__empty">
              <p className="cart-page__empty-message">Tu carrito está vacío.</p>
            </div>
          ) : (
            <>
              {/* Tabla de Productos */}
              <table className="cart-page__table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div className="cart-page__item">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            className="cart-page__item-img"
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/50?text=Sin+Imagen'; }}
                          />
                          <span className="cart-page__item-name">{item.name}</span>
                        </div>
                      </td>
                      <td>
                        <span className="cart-page__item-price">S/ {parseFloat(item.price).toFixed(2)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* MÉTODOS DE PAGO */}
              <div className="cart-page__payment-section" style={{ marginTop: '30px' }}>
                <h2 className="cart-page__payment-title">Métodos de Pago</h2>
                <button
                  className="cart-page__payment-btn"
                  onClick={() => setShowPaymentCarousel(true)}
                  style={{ background: '#8c2a8d', color: 'white', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', border: 'none' }}
                >
                  Ver QR de Yape/Plin
                </button>
              </div>

              {/* --- SECCIÓN DE CORREO CON ESTILO Y ESPACIADO --- */}
              <div 
                className="cart-page__email-section" 
                style={{ 
                  marginTop: '25px', 
                  padding: '20px', 
                  background: '#f4f7f6', 
                  borderRadius: '10px',
                  border: '1px solid #e0e0e0' 
                }}
              >
                <label 
                  htmlFor="email" 
                  style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#2c3e50' }}
                >
                   ¿A dónde enviamos tu recibo?
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="ejemplo@correo.com"
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    borderRadius: '6px', 
                    border: '1px solid #ccc',
                    fontSize: '16px',
                    boxSizing: 'border-box' // Evita que se salga del contenedor
                  }}
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  required
                />
              </div>

              {/* FOOTER TOTALES */}
              <div className="cart-page__footer" style={{ marginTop: '30px' }}>
                <h2 className="cart-page__total">
                  Total a pagar: <span className="cart-page__total-amount">S/ {totalPrice.toFixed(2)}</span>
                </h2>
                <div className="cart-page__actions">
                  <button onClick={clearCart} className="cart-page__btn cart-page__btn-clear" disabled={isProcessing}>
                    Vaciar Carrito
                  </button>
                  <button 
                    onClick={handleCheckout} 
                    className="cart-page__btn cart-page__btn-checkout"
                    style={{ background: isProcessing ? '#ccc' : '#27ae60' }}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Enviando...' : 'Finalizar Pedido'}
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}