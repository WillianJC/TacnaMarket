import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  totalPrice: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => setCart((prev) => [...prev, product]);
  
  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((acc, item) => acc + parseFloat(item.price), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, totalPrice, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de CartProvider');
  return context;
};