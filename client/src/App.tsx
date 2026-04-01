import './App.css'
import AppRouter from './router/AppRouter'
import { CartProvider } from './context/CartContext' // <-- Importa el que creaste

function App() {
  return (
    <CartProvider>
      <AppRouter />
    </CartProvider>
  )
}

export default App