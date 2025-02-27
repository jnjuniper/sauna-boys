import { Search, Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import {useNavigate} from 'react-router';

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="p-4 bg-white shadow-md">
      {/* Mobile Layout */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Logo */}
        <div><a href="/"><img className="pl-1 h-[50px] w-[50px]" src="/src/assets/sb,logotype.png" alt="" /></a></div>

        {/* Search Bar & Icons */}
        <div className="flex flex-col w-full md:w-auto md:flex-1 md:ml-6">  
          <form onSubmit={handleSearchSubmit} className="flex items-center space-x-4">
            <input
              type="text"
              value={searchTerm} // Bind the input value to the state
              onChange={handleSearchChange} // Handle changes in the input
              placeholder="Sök efter produkter..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-80"
            />
            <button type="submit" className="hidden">
              <Search className="w-6 h-6 cursor-pointer hover:text-blue-500" />
            </button>
            <div className="flex space-x-4 md:hidden">
              <Heart className="w-6 h-6 cursor-pointer hover:text-red-500" />
              <ShoppingBag className="w-6 h-6 cursor-pointer hover:text-green-500" />
            </div>
          </form>
        </div>

        {/* Icons for desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <Heart className="w-6 h-6 cursor-pointer hover:text-red-500" />
          <ShoppingBag className="w-6 h-6 cursor-pointer hover:text-green-500" />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-4 md:mt-2 flex flex-col md:flex-row md:space-x-6">
        <a href="#" className="hover:text-blue-600">Nyheter</a>
        <a href="#" className="hover:text-blue-600">Topplistan</a>
        <a href="#" className="hover:text-blue-600">Rea</a>
        <a href="#" className="hover:text-blue-600">Kampanjer</a>
      </nav>
    </header>
  );
};

export default Header;
