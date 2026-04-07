import { useState } from 'react'; // 1. Importamos useState
import { useCart } from '../context/CartContext';
import Sidenav from '../components/layout/Sidenav';
import { useNavigate } from 'react-router-dom';
import PaymentCarousel from '../components/PaymentCarousel';
import './CartPage.css';

export default function CartPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [showPaymentCarousel, setShowPaymentCarousel] = useState(false);

  // 2. Creamos el estado para el correo del cliente
  const [customerEmail, setCustomerEmail] = useState('');

  const handleCheckout = async () => {
    if (cart.length === 0) return;



    // 3. Validación básica: que el correo no esté vacío
    if (!customerEmail) {
      alert('Por favor, ingresa un correo electrónico para enviarte el recibo.');
      return;
    }

    const orderData = {
      email: customerEmail, // <--- Ahora usamos el correo que escribió el cliente
      cart: cart,
      total: totalPrice,
    };

    try {
      // Nota: En producción cambia localhost por https://api.tacna-market.shop
      const response = await fetch('https://api.tacna-market.shop/orders/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        alert(`¡Gracias por tu compra! El recibo ha sido enviado a: ${customerEmail}`);
        clearCart();
        navigate('/dash/products');
      } else {
        alert('Error al procesar el pedido: ' + result.message);
      }
    } catch (error) {
      console.error('Error en la petición:', error);
      alert('No se pudo conectar con el servidor de Tacna Market.');
    }
  };

  return (
    <div className="cart-page">
      {showPaymentCarousel && <PaymentCarousel onClose={() => setShowPaymentCarousel(false)} />}
      <Sidenav />

      <main className="cart-page__main">
        <header className="cart-page__header">
          <h1 className="cart-page__title">Tu Carrito</h1>
          <button
            onClick={() => navigate('/dash/products')}
            className="cart-page__back-btn"
          >
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
              

              <div>
                <h2 className="cart-page__payment-title">Paganos!!</h2>
                <button
                  className="cart-page__payment-btn"
                  onClick={() => setShowPaymentCarousel(true)}
                >
                  Ver Métodos de Pago
                </button>
              </div>

              {/* --- 4. NUEVA SECCIÓN PARA EL CORREO --- */}
              <div className="cart-page__email-section">
                <label htmlFor="email" className="cart-page__email-label">
                  Enviar recibo a:
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="ejemplo@correo.com"
                  className="cart-page__email-input"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  required
                />
              </div>
              <div className="cart-page__footer">
                <h2 className="cart-page__total">
                  Total a pagar: <span className="cart-page__total-amount">S/ {totalPrice.toFixed(2)}</span>
                </h2>
                <div className="cart-page__actions">
                  <button
                    onClick={clearCart}
                    className="cart-page__btn cart-page__btn-clear"
                  >
                    Vaciar Carrito
                  </button>
                  <button
                    className="cart-page__btn cart-page__btn-checkout"
                    onClick={handleCheckout}
                  >
                    Finalizar Pedido
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