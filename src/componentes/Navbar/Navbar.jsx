import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, List, PlusCircle} from "lucide-react";
// import { List, PlusCircle, ShoppingCart } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Default profile image
  const profileImage = "https://robohash.org/sandeep"; // Replace with your actual default image

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-red-500">
          🍔 <Link to="/">E-commerce</Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/list" className="text-gray-700 hover:text-red-500 flex ">
              <List size={20} className="mr-2  mt-1" />
              List items
            </Link>
          </li>
          <li>
            <Link to="/add" className="text-gray-700 hover:text-red-500 flex">
              <PlusCircle size={20} className="mr-2  mt-1" /> Add Item
            </Link>
          </li>
          <li>
            <Link to="/order" className="text-gray-700 hover:text-red-500 flex ">
              <ShoppingCart size={20} className="mr-2  mt-1" /> Orders
            </Link>
          </li>
        </ul>

        {/* Cart, Profile & Login */}
        <div className="hidden md:flex space-x-4 items-center">
          {/* Profile Image with Default Image */}
          <Link to="/profile">
            <img
              src={profileImage}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-red-500"
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden  bg-white shadow-md absolute top-16 right-0 w-40 h-full w-22 p-4 space-y-4">
          <li className="hover:bg-gray-200 w-full rounded-md">
            <Link to="/list" className="text-gray-700 hover:text-red-500 ml-2 flex ">
              <List size={20} className="mr-2 mt-1" />
              List items
            </Link>
          </li>
          <li className="hover:bg-gray-200 w-full rounded-md">
            <Link to="/add" className="text-gray-700 hover:text-red-500 ml-2 flex">
              <PlusCircle size={20} className="mr-2 mt-1" />
              Add items
            </Link>
          </li>
          <li className="hover:bg-gray-200 w-full rounded-md">
            <Link to="/order" className="text-gray-700 hover:text-red-500 ml-2 flex">
              <ShoppingCart size={20} className="mr-2 mt-1" />
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="flex items-center space-x-2 text-gray-700 hover:text-red-500"
            >
              <img
                src={profileImage}
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-gray-300"
              />
              <span className="hover:bg-gray-200 w-full rounded-md">
                Profile
              </span>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
