import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Default profile image
  const profileImage = "https://robohash.org/sandeep"; // Replace with your actual default image

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-red-500">
          🍔 <Link to="/">Food Delivery</Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/" className="text-gray-700 hover:text-red-500">
            List items
            </Link>
          </li>
          <li>
            <Link to="/menu" className="text-gray-700 hover:text-red-500">
              Add Items
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-700 hover:text-red-500">
             Order
            </Link>
          </li> 
        </ul>

        {/* Cart, Profile & Login */}
        <div className="hidden md:flex space-x-4 items-center">
          {/* Cart */}
          <button className="relative">
            <ShoppingCart className="text-gray-700 hover:text-red-500" size={24} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              2
            </span>
          </button>

          {/* Profile Image with Default Image */}
          <Link to="/profile">
            <img
              src= {profileImage} 
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-red-500"
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-white shadow-md absolute top-16 left-0 w-full p-4 space-y-4">
         <li>
            <Link to="/" className="text-gray-700 hover:text-red-500">
            List items
            </Link>
          </li>
          <li>
            <Link to="/menu" className="text-gray-700 hover:text-red-500">
              Add Items
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-700 hover:text-red-500">
             Order
            </Link>
          </li> 
          <li>
            <Link to="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-red-500">
              <img
                src={profileImage}
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-gray-300"
              />
              <span>Profile</span>
            </Link>
          </li>
         
        </ul>
      )}
    </nav>
  );
}
