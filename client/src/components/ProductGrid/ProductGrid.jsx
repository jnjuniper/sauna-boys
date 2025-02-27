import { useState, useEffect } from "react";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data.slice(0, 8))) // Limit to 8 products
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4 shadow-md">
          <img
            src={product.image || "https://via.placeholder.com/150"}
            alt={product.name}
            className="w-full h-40 object-cover mb-2 rounded-md"
          />
          <h2 className="text-lg font-semibold">{product.productName}</h2>
          <p className="text-sm text-gray-600">{product.brand}</p>
          <p className="text-lg font-bold">{product.price} SEK :-</p>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
