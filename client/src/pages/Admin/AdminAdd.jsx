import { useState } from "react";
import "/src/pages/Admin/Admin.module.css";

function NewProduct() {
  const [formData, setFormData] = useState({
    image: "",
    productName: "",
    productDescription: "",
    brand: "",
    sku: "",
    price: ""
  });

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
        price: ""
      });
    });
  };

  return (
    <div className="bg-slate-800 p-6 h-screen">
      <h1 className="text-3xl text-white mb-4">Ny produkt</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label
            htmlFor="productName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Namn
          </label>
          <input
            type="text"
            id="productName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus-border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray 600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ange namn på produkt..."
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="productDescription"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Beskrivning
          </label>
          <input
            type="text"
            id="productDescription"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus-border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray 600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ange beskrivning av produkt..."
            name="productDescription"
            value={formData.productDescription}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Bild
          </label>
          <input
            type="text"
            id="image"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus-border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray 600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Välj bild till produkt..."
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="brand"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Märke
          </label>
          <input
            type="text"
            id="brand"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus-border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray 600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ange märke på produkt..."
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="sku"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            SKU
          </label>
          <input
            type="text"
            id="sku"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus-border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray 600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ange SKU för produkt..."
            name="sku"
            value={formData.sku}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Pris
          </label>
          <input
            type="text"
            id="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus-border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray 600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ange pris på produkt..."
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Lägg till
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewProduct;
