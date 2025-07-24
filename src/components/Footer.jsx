import React from 'react';

const Footer = () => (
  <footer className="bg-gray-800 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-xl font-bold mb-4">FreshFruit</h4>
          <p className="text-gray-300">Delivering fresh, healthy fruits directly from farm to your table.</p>
        </div>
        <div>
          <h5 className="font-semibold mb-4">Quick Links</h5>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Shop</a></li>
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-4">Categories</h5>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-white transition-colors">Apples</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Berries</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Citrus</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Tropical</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-4">Contact Info</h5>
          <ul className="space-y-2 text-gray-300">
            <li>Email: info@freshfruit.com</li>
            <li>Phone: (555) 123-4567</li>
            <li>Address: 123 Fruit Street, CA</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
        <p>&copy; 2024 FreshFruit. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
