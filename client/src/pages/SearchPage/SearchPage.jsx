import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router"; 
import { Heart } from "lucide-react";

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query") || "";

    if (query) {
      fetchProducts(query);
    }
  }, [location.search]);

  const fetchProducts = async (term) => {
    try {
      const response = await fetch(`/api/products?search=${term}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

 
  const handleProductClick = (productSlug) => {
    navigate(`/products/${productSlug}`); 
  };

  return (
    <div className="search-page flex-grow">
      <section className="search-container p-4">
        <div className="text-center mb-4">
          <p className="text-lg font-medium">
            {products.length > 0
              ? `Hittade ${products.length} ${
                  products.length === 1 ? "produkt" : "produkter"
                }`
              : "Inga produkter hittades"}
          </p>
        </div>

        {products.length > 0 ? (
          <div className="product-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                className="product-card border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer"
                key={product.id}
                onClick={() => handleProductClick(product.slug)}
              >
                <img
                  className="w-full h-48 object-contain mb-4"
                  src={product.image}
                  alt={product.productName}
                />
                <Heart className="cursor-pointer transition-transform duration-200 hover:scale-110 ml-auto" />
                <h3 className="text-lg font-semibold">{product.productName}</h3>
                <p className="text-black font-bold text-right">${product.price}</p>
                <p className="text-gray-500">{product.brand}</p>
              </div>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default SearchPage;