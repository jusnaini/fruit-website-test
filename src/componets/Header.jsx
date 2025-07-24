import React from 'react';
import { ShoppingCart, Search, User } from 'lucide-react';

const Header = ({
  cartCount,
  searchTerm,
  setSearchTerm,
  onCartClick,
}) => (
  <header className="bg-white shadow-lg sticky top-0 z-40">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
      <h1 className="text-2xl font-bold text-green-600 font-nunito">FreshFruit</h1>
      <nav className="hidden md:flex space-x-6">
        <a href="#" className="text-gray-700 hover:text-green-600 transition-colors">Home</a>
        <a href="#" className="text-gray-700 hover:text-green-600 transition-colors">Shop</a>
        <a href="#" className="text-gray-700 hover:text-green-600 transition-colors">About</a>
        <a href="#" className="text-gray-700 hover:text-green-600 transition-colors">Contact</a>
      </nav>
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search fruits..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            aria-label="Search fruits"
          />
        </div>
        <button className="p-2 text-gray-600 hover:text-green-600 transition-colors">
          <User className="w-5 h-5" />
        </button>
        <button onClick={onCartClick} className="relative p-2 text-gray-600 hover:text-green-600 transition-colors" aria-label="Open cart">
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  </header>
);

export default Header;
