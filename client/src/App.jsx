import './App.css';
import Header from './components/Header/Header.jsx';
import InfoGrid from './components/InfoGrid/InfoGrid.jsx';
import ProductGrid from './components/ProductGrid/ProductGrid.jsx';
import SearchPage from './pages/SearchPage/SearchPage.jsx';
import Hero from './components/Hero/Hero.jsx';
import ProductDetails from './pages/ProductDetails/ProductDetails.jsx';
import { BrowserRouter, Routes, Route, } from 'react-router';

function App() {


  return (
    <BrowserRouter>
      {/* Pass handleSearch function to Header */}
      <Header onSearch={(searchTerm) => window.location.href = `/search?query=${searchTerm}`} />
      <Hero />
      <main>
        <Routes>
          {/* Route for the search page */}
          <Route path="/search" element={<SearchPage />} />
          
          {/* Add other routes for ProductGrid, etc. */}
          <Route path="/" element={<ProductGrid />} />

          <Route path="/product/:slug" element={<ProductDetails />} />
        </Routes>
      </main>

      <InfoGrid />
    </BrowserRouter>
  );
}

export default App;
