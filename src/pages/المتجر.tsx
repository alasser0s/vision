import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiFilter, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import laptop from '../assets/Desktop - 2.png';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

// Redux store configuration
const persistConfig = {
  key: 'root',
  storage,
};

const initialState = {
  // Add your initial state here
};

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

const Store: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Price filters
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [selectedMinPrice, setSelectedMinPrice] = useState<number>(0);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(2000);

  // Dummy data with actual images
  useEffect(() => {
    const initialProducts: Product[] = [
      { id: 1, name: 'Gaming Laptop XPS 15', price: 1299.99, category: 'laptops', image: laptop },
      { id: 2, name: 'Gaming Laptop XPS 13', price: 999.99, category: 'laptops', image: laptop },
      { id: 3, name: 'Gaming Laptop XPS 17', price: 1599.99, category: 'laptops', image: laptop },
      { id: 4, name: 'Gaming Desktop Pro', price: 1899.99, category: 'desktops', image: laptop },
      { id: 5, name: 'Gaming Desktop Elite', price: 2199.99, category: 'desktops', image: laptop },
    ];

    setProducts(initialProducts);
  }, []);

  // Once products load, determine categories and price range
  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
      setCategories(['all', ...uniqueCategories]);

      const prices = products.map(p => p.price);
      const minP = Math.min(...prices);
      const maxP = Math.max(...prices);

      setMinPrice(minP);
      setMaxPrice(maxP);
      setSelectedMinPrice(minP);
      setSelectedMaxPrice(maxP);
    }
  }, [products]);

  // Filter logic
  useEffect(() => {
    let result = [...products];

    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by selected price range
    result = result.filter(product => 
      product.price >= selectedMinPrice && product.price <= selectedMaxPrice
    );

    setFilteredProducts(result);
  }, [products, selectedCategory, searchQuery, selectedMinPrice, selectedMaxPrice]);

  return (
    <div className="min-h-screen p-4 md:p-8 text-white">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Our Store</h1>
        <p className="text-white/80">Discover amazing products curated just for you</p>
      </motion.div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/20 focus:ring-2 focus:ring-blue-400 bg-white/10 text-white placeholder:text-white/60"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          <FiFilter />
          Filters
        </motion.button>
      </div>

      {/* Filter Panel */}
      <motion.div
        initial={false}
        animate={{ height: isFilterOpen ? 'auto' : 0 }}
        className="overflow-hidden mb-8"
      >
        <div className="flex flex-wrap gap-4 p-4 rounded-lg border border-white/20 backdrop-blur-sm bg-white/10">
          {/* Category Filters */}
          <div className="flex gap-4 flex-wrap">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'border border-white/20 text-white/80 hover:bg-white/5'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Price Filter */}
          <div className="flex items-center gap-4 flex-wrap w-full mt-4">
            <div>
              <label className="text-white/80 block mb-1" htmlFor="minPriceInput">Min Price</label>
              <input
                id="minPriceInput"
                type="number"
                min={minPrice}
                max={maxPrice}
                value={selectedMinPrice}
                onChange={(e) => setSelectedMinPrice(Number(e.target.value))}
                className="w-24 px-2 py-1 rounded-lg border border-white/20 bg-white/10 text-white"
              />
            </div>
            <div>
              <label className="text-white/80 block mb-1" htmlFor="maxPriceInput">Max Price</label>
              <input
                id="maxPriceInput"
                type="number"
                min={minPrice}
                max={maxPrice}
                value={selectedMaxPrice}
                onChange={(e) => setSelectedMaxPrice(Number(e.target.value))}
                className="w-24 px-2 py-1 rounded-lg border border-white/20 bg-white/10 text-white"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center text-white/70">
          <p>No products match your search, category, or price range.</p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          layout
        >
          {filteredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-xl border border-white/20 overflow-hidden hover:shadow-lg transition-shadow backdrop-blur-sm bg-white/10"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-blue-400 font-bold">${product.price.toFixed(2)}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Store; 