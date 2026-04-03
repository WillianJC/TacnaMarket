import { useCart } from '../context/CartContext';
import Sidenav from '../components/layout/Sidenav';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

export default function CartPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  // --- Nueva función para conectar con NestJS ---
  const handleCheckout = async () => {
    if (cart.length === 0) return;

    // Preparamos el paquete de datos
    const orderData = {
      email: "des4rrollad0r@gmail.com", // Aquí puedes poner tu correo para probar
      cart: cart,
      total: totalPrice,
    };

    try {
      // Usamos el puerto 3001 quee tienes en tu .env de NestJS
      const response = await fetch('http://localhost:3001/orders/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        alert('¡Gracias por tu compra en Tacna Market! Revisa tu correo para la confirmación.');
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
              <p className="cart-page__empty-message">Tu carrito está vacío. ¡Llénalo de productos frescos!</p>
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
                    onClick={handleCheckout} // <--- Ahora llama a nuestra función async
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