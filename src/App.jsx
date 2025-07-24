import React, { useState } from 'react';
import Header from './components/Header';
import CategoryList from './components/CategoryList';
import FruitCard from './components/FruitCard';
import CartSidebar from './components/CartSidebar';
import Footer from './components/Footer';

import fruitsData from './data/fruits';
import categoriesData from './data/categories';

const App = () => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Filter fruits based on category and search term
  const filteredFruits = fruitsData.filter(fruit => {
    const matchesCategory = selectedCategory === 'all' || fruit.category === selectedCategory;
    const matchesSearch = fruit.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Add to cart function
  const addToCart = (fruit) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === fruit.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === fruit.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...fruit, quantity: 1 }];
    });
  };

  // Remove from cart
  const removeFromCart = (fruitId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== fruitId));
  };

  // Update cart item quantity
  const updateQuantity = (fruitId, quantity) => {
    if (quantity < 1) {
      removeFromCart(fruitId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === fruitId ? { ...item, quantity } : item
      )
    );
  };

  // Wishlist toggle
  const toggleWishlist = (fruit) => {
    setWishlist(prev =>
      prev.find(item => item.id === fruit.id)
        ? prev.filter(item => item.id !== fruit.id)
        : [...prev, fruit]
    );
  };

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 font-nunito">
      <Header
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onCartClick={() => setIsCartOpen(true)}
      />

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
          <CategoryList
            categories={categoriesData}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFruits.map(fruit => (
              <FruitCard
                key={fruit.id}
                fruit={fruit}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                isWishlisted={wishlist.some(item => item.id === fruit.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Shopping Cart Sidebar */}
      <CartSidebar
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        totalPrice={totalPrice}
      />

      <Footer />
    </div>
  );
};

export default App;