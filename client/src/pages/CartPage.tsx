import { useCart } from '../context/CartContext';
import Sidenav from '../components/layout/Sidenav';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="dashboard" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidenav />
      
      <main className="dashboard__main" style={{ flex: 1, padding: '40px', backgroundColor: '#f4f7fe' }}>
        <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}> Tu Carrito pe</h1>
          <button 
            onClick={() => navigate('/dashboard')}
            style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer' }}
          >
            Volver a Comprar
          </button>
        </header>

        <section style={{ background: 'white', padding: '20px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ fontSize: '1.2rem', color: '#666' }}>Tu carrito está vacío. ¡Llénalo de frutas frescas!</p>
            </div>
          ) : (
            <>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left', color: '#888' }}>
                    <th style={{ padding: '10px' }}>Producto</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #f9f9f9' }}>
                      <td style={{ padding: '15px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <img src={item.imageUrl} alt={item.name} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                        <span style={{ fontWeight: '600' }}>{item.name}</span>
                      </td>
                      <td style={{ fontWeight: 'bold', color: '#3b82f6' }}>S/ {parseFloat(item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ marginTop: '30px', borderTop: '2px solid #eee', paddingTop: '20px', textAlign: 'right' }}>
                <h2 style={{ fontSize: '1.5rem' }}>Total a pagar: <span style={{ color: '#22c55e' }}>S/ {totalPrice.toFixed(2)}</span></h2>
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
                  <button 
                    onClick={clearCart}
                    style={{ background: '#ef4444', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '10px', cursor: 'pointer' }}
                  >
                    Vaciar Carrito
                  </button>
                  <button 
                    style={{ background: '#22c55e', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}
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