import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';

const FruitCard = ({
  fruit,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105">
    <div className="relative">
      <img src={fruit.image} alt={fruit.name} className="w-full h-48 object-cover" />
      {fruit.originalPrice &&
        <span className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">Sale</span>
      }
      <button
        onClick={() => onToggleWishlist(fruit)}
        className={`absolute top-4 right-4 p-2 rounded-full transition-colors duration-200 ${
          isWishlisted ? 'bg-red-500 text-white scale-110' : 'bg-gray-200 text-gray-600'
        }`}
        aria-label={`Add ${fruit.name} to wishlist`}
      >
        <Heart className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} />
      </button>
    </div>
    <div className="p-6">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xl font-bold text-gray-800">{fruit.name}</h4>
        <span className="text-sm text-green-600 font-medium">{fruit.freshness}</span>
      </div>
      <p className="text-gray-600 mb-3">{fruit.description}</p>
      <div className="flex items-center mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < Math.floor(fruit.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
        ))}
        <span className="text-sm text-gray-600 ml-2">{fruit.rating} ({fruit.reviews} reviews)</span>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-2xl font-bold text-green-600">${fruit.price}</span>
          {fruit.originalPrice && (
            <span className="text-lg text-gray-500 line-through ml-2">${fruit.originalPrice}</span>
          )}
        </div>
        <span className="text-gray-500">{fruit.weight}</span>
      </div>
      <button
        onClick={() => onAddToCart(fruit)}
        className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
        aria-label={`Add ${fruit.name} to cart`}
      >
        <ShoppingCart className="w-5 h-5" />
        <span>Add to Cart</span>
      </button>
    </div>
  </div>
);

export default FruitCard;
