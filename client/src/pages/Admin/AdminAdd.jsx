import { useState } from "react";
import { useNavigate} from "react-router";

function NewProduct() {
  const [formData, setFormData] = useState({
    image: "",
    productName: "",
    productDescription: "",
    brand: "",
    sku: "",
    price: "",
  });

  const navigate = useNavigate ();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    console.log("Du ändrade värdet");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("handleSubmit() anropades");

    const product = { ...formData };

    fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }).then((resp) => {
      setFormData({
        image: "",
        productName: "",
        productDescription: "",
        brand: "",
        sku: "",
        price: "",
      });

      navigate("/admin/products")
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="w-full bg-blue-700 text-white flex items-center p-4 text-3xl font-bold">
        Administration
      </header>

      <div className="flex flex-grow">
        <aside className="w-64 bg-gray-400 text-white p-6">
          <h2 className="text-2xl font-bold mb-4">Produkter</h2>
        </aside>

        <div className="flex-1 max-w-[25%] p-10">
          <h1 className="text-3xl text-black mb-4">Ny produkt</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="productName"
                className="block mb-2 text-sm font-medium text-black"
              >
                Namn
              </label>
              <input
                type="text"
                id="productName"
                className="bg-white border-4 border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Ange namn på produkt..."
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="productDescription"
                className="block mb-2 text-sm font-medium text-black"
              >
                Beskrivning
              </label>
              <textarea
                id="productDescription"
                className="bg-white border-4 border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-32"
                placeholder="Ange beskrivning av produkt..."
                name="productDescription"
                value={formData.productDescription}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-black"
              >
                Bild
              </label>
              <input
                type="text"
                id="image"
                className="bg-white border-4 border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Välj bild till produkt..."
                name="image"
                value={formData.image}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="brand"
                className="block mb-2 text-sm font-medium text-black"
              >
                Märke
              </label>
              <input
                type="text"
                id="brand"
                className="bg-white border-4 border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Ange märke på produkt..."
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="sku"
                className="block mb-2 text-sm font-medium text-black"
              >
                SKU
              </label>
              <input
                type="text"
                id="sku"
                className="bg-white border-4 border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Ange SKU för produkt..."
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-black"
              >
                Pris
              </label>
              <input
                type="text"
                id="price"
                className="bg-white border-4 border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Ange pris på produkt..."
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex justify-start pt-4">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Lägg till
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewProduct;
