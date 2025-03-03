import "./App.css";
import Header from "./components/Header/Header.jsx";
import InfoGrid from "./components/InfoGrid/InfoGrid.jsx";
import ProductGrid from "./components/ProductGrid/ProductGrid.jsx";
import SearchPage from "./pages/SearchPage/SearchPage.jsx";
import Hero from "./components/Hero/Hero.jsx";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import ResponsiveFooter from "./components/Footer/ResponsiveFooter";

function App() {
  const location = useLocation();

  return (
    <>
      <Header
        onSearch={(searchTerm) =>
          (window.location.href = `/search?query=${searchTerm}`)
        }
      />

      {/* Render Hero only on the homepage */}
      {location.pathname === "/" && <Hero />}

      <main>
        <Routes>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/" element={<ProductGrid />} />
        </Routes>
      </main>

      <InfoGrid />
      <ResponsiveFooter />
    </>
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
