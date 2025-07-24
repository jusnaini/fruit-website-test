import React from 'react';

const CategoryList = ({ categories, selectedCategory, setSelectedCategory }) => (
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
        aria-label={`Show ${category.name}`}
      >
        {category.name}
      </button>
    ))}
  </div>
);

export default CategoryList;