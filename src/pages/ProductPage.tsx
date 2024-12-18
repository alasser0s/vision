import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import laptop from '../assets/Desktop - 2.png';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  specs?: Record<string, string>;
}

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Simulated API call - replace with your actual API
        const mockProduct = {
          id: Number(id),
          name: "Gaming Laptop XPS 15",
          price: 1299.99,
          description: "High-performance gaming laptop with RTX 3080, 32GB RAM, and 1TB SSD",
          image: laptop,
          specs: {
            "Processor": "Intel Core i9-11900H",
            "RAM": "32GB DDR4",
            "Storage": "1TB NVMe SSD",
            "Graphics": "NVIDIA RTX 3080",
            "Display": "15.6\" 4K OLED"
          }
        };
        setProduct(mockProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image
      });
      toast.success('Added to cart!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#38363B] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#38363B] flex items-center justify-center text-white">
        Product not found
      </div>
    );
  }

  return (
    <div className="bg-[#38363B] min-h-screen pt-32 pb-16 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="bg-white/10 rounded-lg p-4">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-[400px] object-cover rounded-lg"
              />
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <p className="text-3xl font-bold text-blue-400">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-300 text-lg">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-lg">Quantity:</span>
              <div className="flex items-center border border-white/20 rounded-lg">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 py-2 hover:bg-white/10"
                >
                  -
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-4 py-2 hover:bg-white/10"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button 
              onClick={handleAddToCart}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </motion.button>

            {/* Specifications */}
            {product.specs && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Specifications</h2>
                <div className="bg-white/10 rounded-lg p-6">
                  <dl className="space-y-4">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <dt className="font-medium text-gray-300">{key}</dt>
                        <dd className="text-white">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage; 