import { useCart } from '../context/CartContext';
import Sidenav from '../components/layout/Sidenav';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

export default function CartPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="cart-page">
      <Sidenav />

      <main className="cart-page__main">
        <header className="cart-page__header">
          <h1 className="cart-page__title">Tu Carrito</h1>
          <button
            onClick={() => navigate('/dashboard')}
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
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/50'; }}
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
                    onClick={() => alert('¡Gracias por tu compra en Tacna Market!')}
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