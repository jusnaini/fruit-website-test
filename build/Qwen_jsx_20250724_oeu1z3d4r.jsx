import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, User, Heart, Star, Plus, Minus, X } from 'lucide-react';

const App = () => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Mock fruit data
  const fruits = [
    {
      id: 1,
      name: 'Organic Apples',
      price: 2.99,
      originalPrice: 3.99,
      category: 'apples',
      image: 'https://placehold.co/300x300/ff6b6b/ffffff?text=Apples',
      rating: 4.8,
      reviews: 124,
      description: 'Crisp and juicy organic apples from local farms',
      weight: '1 lb',
      freshness: 'Fresh'
    },
    {
      id: 2,
      name: 'Bananas',
      price: 1.49,
      category: 'bananas',
      image: 'https://placehold.co/300x300/f9ca24/ffffff?text=Bananas',
      rating: 4.6,
      reviews: 89,
      description: 'Sweet and ripe bananas perfect for snacking',
      weight: '1 lb',
      freshness: 'Very Fresh'
    },
    {
      id: 3,
      name: 'Strawberries',
      price: 4.99,
      originalPrice: 5.99,
      category: 'berries',
      image: 'https://placehold.co/300x300/ff4757/ffffff?text=Strawberries',
      rating: 4.9,
      reviews: 203,
      description: 'Fresh organic strawberries, sweet and juicy',
      weight: '16 oz',
      freshness: 'Premium'
    },
    {
      id: 4,
      name: 'Oranges',
      price: 3.49,
      category: 'citrus',
      image: 'https://placehold.co/300x300/ffa502/ffffff?text=Oranges',
      rating: 4.7,
      reviews: 156,
      description: 'Juicy and vitamin-rich oranges',
      weight: '1 lb',
      freshness: 'Fresh'
    },
    {
      id: 5,
      name: 'Grapes',
      price: 3.99,
      category: 'berries',
      image: 'https://placehold.co/300x300/74b9ff/ffffff?text=Grapes',
      rating: 4.5,
      reviews: 98,
      description: 'Sweet seedless grapes, perfect for snacking',
      weight: '1 lb',
      freshness: 'Very Fresh'
    },
    {
      id: 6,
      name: 'Pineapple',
      price: 5.99,
      category: 'tropical',
      image: 'https://placehold.co/300x300/ffeaa7/ffffff?text=Pineapple',
      rating: 4.8,
      reviews: 76,
      description: 'Fresh tropical pineapple, sweet and tangy',
      weight: '1 piece',
      freshness: 'Premium'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Fruits' },
    { id: 'apples', name: 'Apples' },
    { id: 'bananas', name: 'Bananas' },
    { id: 'berries', name: 'Berries' },
    { id: 'citrus', name: 'Citrus' },
    { id: 'tropical', name: 'Tropical' }
  ];

  // Filter fruits based on category and search term
  const filteredFruits = fruits.filter(fruit => {
    const matchesCategory = selectedCategory === 'all' || fruit.category === selectedCategory;
    const matchesSearch = fruit.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Add to cart function
  const addToCart = (fruit) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === fruit.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === fruit.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...fruit, quantity: 1 }];
    });
  };

  // Remove from cart function
  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  // Update quantity in cart
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(id);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
    );
  };

  // Add to wishlist
  const toggleWishlist = (fruit) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === fruit.id);
      if (exists) {
        return prev.filter(item => item.id !== fruit.id);
      }
      return [...prev, fruit];
    });
  };

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-green-600">FreshFruit</h1>
              <div className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-green-600 transition-colors">Home</a>
                <a href="#" className="text-gray-700 hover:text-green-600 transition-colors">Shop</a>
                <a href="#" className="text-gray-700 hover:text-green-600 transition-colors">About</a>
                <a href="#" className="text-gray-700 hover:text-green-600 transition-colors">Contact</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search fruits..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <button className="p-2 text-gray-600 hover:text-green-600 transition-colors">
                <User className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-600 hover:text-green-600 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Fresh Fruits Delivered to Your Door</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Premium quality fruits sourced directly from local farms. Healthy, delicious, and sustainable.</p>
          <button className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors">
            Shop Now
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">Shop by Category</h3>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-green-100 shadow-md'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFruits.map(fruit => (
              <div key={fruit.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img 
                    src={fruit.image} 
                    alt={fruit.name}
                    className="w-full h-48 object-cover"
                  />
                  {fruit.originalPrice && (
                    <span className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                      Sale
                    </span>
                  )}
                  <button
                    onClick={() => toggleWishlist(fruit)}
                    className={`absolute top-4 right-4 p-2 rounded-full ${
                      wishlist.find(item => item.id === fruit.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
                    } transition-colors`}
                  >
                    <Heart className="w-4 h-4" fill={wishlist.find(item => item.id === fruit.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xl font-bold text-gray-800">{fruit.name}</h4>
                    <span className="text-sm text-green-600 font-medium">{fruit.freshness}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{fruit.description}</p>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(fruit.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {fruit.rating} ({fruit.reviews} reviews)
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      {fruit.originalPrice ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-green-600">${fruit.price}</span>
                          <span className="text-lg text-gray-500 line-through">${fruit.originalPrice}</span>
                        </div>
                      ) : (
                        <span className="text-2xl font-bold text-green-600">${fruit.price}</span>
                      )}
                    </div>
                    <span className="text-gray-500">{fruit.weight}</span>
                  </div>
                  
                  <button
                    onClick={() => addToCart(fruit)}
                    className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shopping Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold">Shopping Cart</h3>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
              ) : (
                <>
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center space-x-4 py-4 border-b">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-green-600 font-bold">${item.price}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="border-t p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-green-600">${totalPrice.toFixed(2)}</span>
                </div>
                <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
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
    </div>
  );
};

export default App;