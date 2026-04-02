import './CategorySidebar.css';

interface CategorySidebarProps {
  onCategorySelect: (category: string) => void;
  activeCategory: string;
}

// Cambia esto en CategorySidebar.tsx
const categories = [
  'Frutas', 
  'Verduras', 
  'Productos Lácteos', // En tu DB se llama así, no 'Lácteos'
  'Bebidas',
  'Granos y Cereales',
  'Snacks y Frituras'
];

export default function CategorySidebar({ onCategorySelect, activeCategory }: CategorySidebarProps) {
  return (
    <aside className="category-sidebar">
      <h2 className="category-sidebar__title">Categorías</h2>
      <ul className="category-sidebar__list">
        {categories.map((category) => (
          <li key={category}>
            <button
              className={`category-sidebar__button ${activeCategory === category ? 'active' : ''}`}
              onClick={() => onCategorySelect(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}