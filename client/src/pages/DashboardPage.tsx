import { useEffect, useState } from 'react';
import Sidenav from '../components/layout/Sidenav';
import CategorySidebar from '../components/products/CategorySidebar';
import './DashboardPage.css';

// Definimos qué forma tiene un Producto para TypeScript
interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  imageUrl: string;
}

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Frutas');
  const [loading, setLoading] = useState<boolean>(false);

  // Función para traer productos desde NestJS filtrados por categoría
 const fetchProducts = async (categoryName: string) => {
  setLoading(true);
  try {
    const response = await fetch(`http://localhost:3001/api/products/category/${categoryName}`);
    const result = await response.json();
    
    // CAMBIO AQUÍ: Antes teníamos setProducts(data), 
    // ahora debe ser setProducts(result.data) porque la API lo manda así.
    setProducts(result.data || []); 
    
  } catch (error) {
    console.error("Error al cargar productos:", error);
    setProducts([]);
  } finally {
    setLoading(false);
  }
};

  // Cargar "Frutas" por defecto al entrar a la página
  useEffect(() => {
    fetchProducts(selectedCategory);
  }, []);

  // Esta función se ejecuta cuando haces clic en el Sidebar
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    fetchProducts(category);
  };

  return (
    <div className="dashboard">
      {/* 1. Menú lateral negro principal */}
      <Sidenav />

      <main className="dashboard__main">
        {/* 2. Sidebar de categorías (Pasamos la función para que funcione el clic) */}
        <CategorySidebar onCategorySelect={handleCategoryChange} activeCategory={selectedCategory} />

        {/* 3. Panel de productos (El espacio blanco de tu dibujo) */}
        <section className="dashboard__content">
          <header className="content__header">
            <h1 className="content__title">{selectedCategory.toUpperCase()}</h1>
            <div className="content__divider"></div>
          </header>

          {loading ? (
            <div className="loading">Cargando productos de Tacna Market...</div>
          ) : (
            <div className="product-grid">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id} className="product-card">
                    {/* Imagen de S3 */}
                    <div className="product-card__image-container">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="product-card__image"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=No+Image'; }}
                      />
                    </div>
                    
                    <div className="product-card__info">
                      <h3 className="product-card__name">{product.name}</h3>
                      <p className="product-card__price">S/ {product.price}</p>
                      <button className="product-card__button">Agregar</button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-products">No hay productos en esta categoría aún.</p>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}