import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">CarbonQapture</h1>
          </div>
          <nav className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
              About Us
            </Link>
            <Link to="/results" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
              Results
            </Link>
            <Link to="/vision" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
              Our Vision
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;