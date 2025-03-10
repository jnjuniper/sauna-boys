import { useEffect, useState } from "react";
import { Link } from "react-router";

function AdminProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <div className="w-full bg-blue-600 text-white p-6 text-2xl font-bold">
        Administration
      </div>

      <div className="flex flex-1">
        <div className="w-1/8 bg-gray-400 text-white p-6">
          <h2 className="text-xl font-medium">Produkter</h2>
        </div>

        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-4 w-4/5 mx-auto">
            <h2 className="text-3xl font-semibold">Produkter</h2>
            <Link
              to="/admin/products/new"
              className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            >
              Ny produkt
            </Link>
          </div>

          <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4 w-4/5 mx-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border p-2">Namn</th>
                  <th className="border p-2">SKU</th>
                  <th className="border p-2">Pris</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.sku} className="border-t">
                    <td className="border p-2">{product.productName}</td>
                    <td className="border p-2">{product.sku}</td>
                    <td className="border p-2">{product.price} kr</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProductList;
