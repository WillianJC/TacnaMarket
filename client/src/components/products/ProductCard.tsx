interface Product {
  name: string;
  price: number;
  imageUrl: string;
}

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
      {/* IMAGEN DESDE AMAZON S3 */}
      <img 
        src={product.imageUrl} 
        alt={product.name} 
        className="w-full h-40 object-cover"
        onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150'; }} 
      />
      
      <div className="p-4">
        <h3 className="font-bold text-gray-800">{product.name}</h3>
        <p className="text-blue-600 font-bold mt-2">S/ {product.price}</p>
        <button className="w-full mt-3 bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition-colors">
          Agregar
        </button>
      </div>
    </div>
  );
};