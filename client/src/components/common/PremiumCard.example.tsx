import PremiumCard from './PremiumCard';

/**
 * Ejemplo de uso del componente PremiumCard
 *
 * Este componente es una tarjeta premium reutilizable con efectos de hover vistosos
 * y paleta de colores adaptada al proyecto TacnaMarket.
 *
 * Props disponibles:
 * - badge?: string (por defecto 'NEW') - Etiqueta en la esquina superior
 * - title: string - Título del producto/oferta
 * - description: string - Descripción corta
 * - price: string - Precio a mostrar (ej: "S/ 49.99")
 * - imageGradient?: string - Gradiente del área de imagen (por defecto verde)
 * - onButtonClick?: () => void - Callback cuando se hace click en el botón
 */

export const PremiumCardExample = () => {
  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      {/* Ejemplo básico */}
      <PremiumCard
        title="Producto Premium"
        description="Descripción del producto"
        price="S/ 49.99"
        onButtonClick={() => console.log('Agregado al carrito')}
      />

      {/* Ejemplo con badge personalizado */}
      <PremiumCard
        badge="OFERTA"
        title="Frutas Frescas"
        description="Frutas de temporada"
        price="S/ 19.99"
        imageGradient="linear-gradient(45deg, #ff6b35, #ff8c42)"
        onButtonClick={() => alert('¡Oferta agregada!')}
      />

      {/* Ejemplo con gradiente verde (por defecto) */}
      <PremiumCard
        badge="HOT"
        title="Verduras Premium"
        description="Verduras seleccionadas"
        price="S/ 29.99"
        onButtonClick={() => console.log('Verdura agregada')}
      />
    </div>
  );
};

export default PremiumCard;
