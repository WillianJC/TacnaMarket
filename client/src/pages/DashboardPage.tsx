import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importamos el navegador
import { useCart } from '../context/CartContext'; // 2. Importamos el carrito global
import Sidenav from '../components/layout/Sidenav';
import CategorySidebar from '../components/products/CategorySidebar';
import './DashboardPage.css';

// Interfaz para los productos
interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  imageUrl: string;
}

export default function DashboardPage() {
  const navigate = useNavigate(); // Inicializamos el navegador
  
  // Usamos el Carrito Global del Context en lugar de un estado local
  const { cart, addToCart, totalPrice } = useCart(); 

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Frutas');
  const [loading, setLoading] = useState<boolean>(false);

  // Cargar productos desde la API de NestJS
  const fetchProducts = useCallback(async (categoryName: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/api/products/category/${categoryName}`);
      const result = await response.json();
      setProducts(result.data || []);
    } catch (error) {
      console.error("Error al conectar con la API:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory, fetchProducts]);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  return (
    <div className="dashboard">
      {/* 1. Menú Lateral Negro */}
      <Sidenav />

      <main className="dashboard__main">
        {/* 2. Filtros de Categoría */}
        <CategorySidebar 
          onCategorySelect={handleCategoryChange} 
          activeCategory={selectedCategory} 
        />

        <section className="dashboard__content">
          
          {/* Header con el botón que AHORA SÍ funciona */}
          <header className="content__header">
            <div className="header__info">
              <h1 className="content__title">{selectedCategory.toUpperCase()}</h1>
              <p className="content__subtitle">{products.length} productos en stock</p>
            </div>

            <div className="cart-summary-bar">
              <div className="cart-info">
                <span className="cart-count">🛒 {cart.length} ítems</span>
                <span className="cart-total">Total: <strong>S/ {totalPrice.toFixed(2)}</strong></span>
              </div>
              
              {/* BOTÓN CORREGIDO: Ahora tiene el onClick para navegar */}
              <button
                className="btn-view-cart"
                onClick={() => navigate('/dash/cart')}
              >
                Ver Carrito
              </button>
            </div>
          </header>

          <div className="content__divider"></div>

          {loading ? (
            <div className="loading-state">Cargando Tacna Market...</div>
          ) : (
            <div className="product-grid">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id} className="product-card">
                    <div className="product-card__image-container">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="product-card__image"
                      />
                    </div>
                    
                    <div className="product-card__info">
                      <h3 className="product-card__name">{product.name}</h3>
                      <p className="product-card__description">{product.description}</p>
                      <div className="product-card__footer">
                        <span className="product-card__price">S/ {parseFloat(product.price).toFixed(2)}</span>
                        
                        {/* BOTÓN CORREGIDO: Usa addToCart del Context */}
                        <button 
                          className="product-card__add-btn"
                          onClick={() => addToCart(product)}
                        >
                          Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No hay productos en esta categoría.</p>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}