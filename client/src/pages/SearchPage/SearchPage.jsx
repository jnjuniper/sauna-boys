import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const location = useLocation();

  // Extract search term from the URL when the component mounts or when URL changes
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query") || "";
    setSearchTerm(query);
    
    if (query) {
      fetchProducts(query);
    }
  }, [location.search]);

  // Fetch products based on the search term
  const fetchProducts = async (term) => {
    try {
      const response = await fetch(`/api/products?search=${term}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Update search term when input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts(searchTerm);
  };

  return (
    <div className="search-page">
      <main>
        <section className="search-container">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search for products..."
            />
            <button type="submit">Search</button>
          </form>

          {products.length > 0 ? (
            <div className="product-list">
              {products.map((product) => (
                <div className="product-card" key={product.id}>
                  <img src={product.image} alt={product.productName} />
                  <h3>{product.productName}</h3>
                  <p>{product.brand}</p>
                  <p>${product.price}</p>
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
