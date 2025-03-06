import "./App.css";
import Header from "./components/Header/Header.jsx";
import InfoGrid from "./components/InfoGrid/InfoGrid.jsx";
import ProductGrid from "./components/ProductGrid/ProductGrid.jsx";
import SearchPage from "./pages/SearchPage/SearchPage.jsx";
import Hero from "./components/Hero/Hero.jsx";
import ProductDetails from './pages/ProductDetails/ProductDetails.jsx';
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import ResponsiveFooter from "./components/Footer/ResponsiveFooter";
import NewProduct from "./pages/Admin/AdminAdd.jsx";
import AdminProductList from "./pages/Admin/AdminList.jsx";

function App() {
  const location = useLocation();

  // Check if the current path is "/admin"
  const isAdminPage = location.pathname.startsWith("/admin");


  return (
    <div className="min-h-screen flex flex-col">
      {/* Render Header only if it's NOT an admin page */}
      {!isAdminPage && (
        <Header
          onSearch={(searchTerm) =>
            (window.location.href = `/search?query=${searchTerm}`)
          }
        />
      )}

      {/* Render Hero only on the homepage */}
      {!isAdminPage && location.pathname === "/" && <Hero />}

      <main className="flex-grow flex flex-col">
        <Routes>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/" element={<ProductGrid />} />
          <Route path="/admin/products/new" element={<NewProduct />} />
          <Route path="/admin/products" element={<AdminProductList />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
        </Routes>
      </main>

      {/* Render Footer only if it's NOT an admin page */}
      {!isAdminPage && (
        <>
          <InfoGrid />
          <ResponsiveFooter />
        </>
      )}
    </div>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
