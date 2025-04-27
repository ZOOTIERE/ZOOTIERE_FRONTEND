import { useState, FC } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

export const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-green-600">
            Zootiere
          </Link>

          <div className="hidden md:flex justify-between items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-green-600">
              Home
            </Link>
            <Link to="/solutions" className="text-gray-600 hover:text-green-600">
              Solutions
            </Link>
            <Link to="/pricing" className="text-gray-600 hover:text-green-600">
              Pricing
            </Link>
            <Link 
              to="/login" 
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Login
            </Link>
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white pb-4">
            <Link to="/" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
              Home
            </Link>
            <Link to="/solutions" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
              Solutions
            </Link>
            <Link to="/pricing" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
              Pricing
            </Link>
            <Link 
              to="/login" 
              className="block mx-4 mt-2 bg-green-500 text-white px-4 py-2 rounded-lg text-center hover:bg-green-600"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};