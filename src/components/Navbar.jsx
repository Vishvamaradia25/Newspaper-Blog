import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import LanguageSwitcher from "./LanguageSwitcher";
import articles from "../data/articles";

const categories = ["General","Business", "Entertainment","Health", "Science", "Sports", "Technology",];

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    if (searchTerm.trim() === "") return;
    const matchingArticle = articles.find(
      (article) =>
        article.title.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.title.hi &&
          article.title.hi.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    if (matchingArticle) {
      navigate(`/article/${matchingArticle.id}`);
      setSearchTerm("");
      setMenuOpen(false);
    } else {
      alert("No matching article found.");
    }
  };

  return (
    <nav
      className={`p-4 flex justify-between items-center sticky top-0 z-50 shadow-md ${
        darkMode ? "bg-gray-800 text-white" : "bg-red-700 text-white"
      }`}
    >
     
      <img
         src="/assets/logo.png" alt="Newspaper Blog Logo" className="h-10 w-auto max-w-[140px] object-contain transform scale-[1.6]"/>
    
      <div className="relative flex-1 mx-4 max-w-xs">
        <input
          type="text"
          placeholder="Search article..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 pr-10 text-sm rounded-md text-black outline-none w-full"
        />
        <button
          onClick={handleSearchClick}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        >
          <FiSearch className="text-gray-500 text-lg cursor-pointer" />
        </button>
      </div>

      <div className="flex items-center space-x-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
          {categories.map((category) => (
            <Link
              key={category}
              to={`/category/${category.toLowerCase()}`}
              className="hover:underline"
            >
              {category}
            </Link>
          ))}
        </div>
        <div className="hidden md:block">
          <LanguageSwitcher />
        </div>
         {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-600 text-white"
        >
          {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>

        {/* Mobile Menu toggle*/}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-red-800 text-white p-4 space-y-2 md:hidden">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block">
            Home
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              to={`/category/${category.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="block"
            >
              {category}
            </Link>
          ))}
          <LanguageSwitcher />
      </div>
      )}
    </nav>
  );
};

export default Navbar;


