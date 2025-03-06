import { useState, useEffect } from "react";
import {Heart} from "lucide-react";
import { useNavigate } from 'react-router';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data.slice(0, 8))) // Limit to 8 products
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleProductClick = (productSlug) => {
    navigate(`/product/${productSlug}`); // Navigate to ProductDetails page with product slug
  };

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4 text-center">
      {products.map((product) => (
        <div
          key={product.slug}
          className="border rounded-lg p-4 shadow-md cursor-pointer"
          onClick={() => handleProductClick(product.slug)} // Handle click to navigate
        >
          <img
            src={product.image || 'https://via.placeholder.com/150'}
            alt={product.name}
            className="w-full h-48 object-cover mb-2 rounded-md"
          />
          <Heart className="cursor-pointer transition-transform duration-200 hover:scale-110 mb-1 ml-auto" />
          <h2 className="text-lg font-semibold text-left">{product.productName}</h2>
          <p className="text-lg font-bold text-right">{product.price} SEK :-</p>
          <p className="text-sm text-gray-600 text-left">{product.brand}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
