
import './App.css'
import Header from './components/Header/Header.jsx'
import InfoGrid from './components/InfoGrid/InfoGrid.jsx'
import ProductGrid from './components/ProductGrid/ProductGrid.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'

function App() {
  

  return (
    <BrowserRouter>
    <Header />
    <main>
      <ProductGrid />
      <Routes>
        <Route />
      </Routes>
      <Routes>
        <InfoGrid />
      </Routes>
    </main>
    </BrowserRouter>
  )
}

export default App
