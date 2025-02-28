import { useState, useEffect } from "react";
import { useLocation } from "react-router";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const location = useLocation();

 
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query") || "";
    setSearchTerm(query);
    
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

 
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts(searchTerm);
  };

  return (
    <div className="search-page">
      <main>
        <section className="search-container p-4">
          <form onSubmit={handleSearchSubmit} className="mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search for products..."
              className="border p-2 rounded w-full mb-4"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Search
            </button>
          </form>

          {products.length > 0 ? (
            <div className="product-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div className="product-card border rounded-lg p-4 shadow hover:shadow-lg" key={product.id}>
                  <img className="w-full h-48 object-contain mb-4" src={product.image} alt={product.productName} />
                  <h3 className="text-lg font-semibold">{product.productName}</h3>
                  <p className="text-black font-bold text-right">${product.price}</p>
                  <p className="text-gray-500">{product.brand}</p>
                
                </div>
              ))}
            </div>
          ) : (
            <p>No products found</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default SearchPage;
