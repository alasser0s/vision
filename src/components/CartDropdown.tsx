import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, X, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CartDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ isOpen, onClose }) => {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const [showPayment, setShowPayment] = useState(false);

  const handleProceedToPayment = () => {
    setShowPayment(true);
  };

  const handleBackToCart = () => {
    setShowPayment(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed right-4 top-20 w-96 bg-white rounded-lg shadow-2xl z-50"
        >
          <div className="px-4 py-3 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              {showPayment ? 'Payment' : 'Shopping Cart'}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-gray-200 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {!showPayment ? (
            // Cart View
            <>
              {items.length === 0 ? (
                <div className="px-4 py-8 text-center text-gray-500">
                  Your cart is empty
                </div>
              ) : (
                <>
                  <div className="max-h-96 overflow-auto px-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-4 py-4 border-b"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{item.name}</h4>
                          <p className="text-gray-600">${item.price.toFixed(2)}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>

                  <div className="px-4 py-4 border-t bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium text-gray-600">Total:</span>
                      <span className="font-semibold text-gray-800">${totalPrice.toFixed(2)}</span>
                    </div>
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={handleProceedToPayment}
                    >
                      Proceed to Payment
                    </Button>
                  </div>
                </>
              )}
            </>
          ) : (
            // Payment View
            <div className="p-4">
              <Button
                variant="ghost"
                className="mb-4 text-sm"
                onClick={handleBackToCart}
              >
                ← Back to Cart
              </Button>

              <div className="space-y-4">
                <div className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Credit Card</p>
                      <p className="text-sm text-gray-500">Pay with Visa, Mastercard, etc.</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <rect width="24" height="24" rx="4" fill="#0070BA"/>
                      <path d="M7 12H17M12 7V17" stroke="white" strokeWidth="2"/>
                    </svg>
                    <div>
                      <p className="font-medium">PayPal</p>
                      <p className="text-sm text-gray-500">Pay with your PayPal account</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Tax</span>
                      <span>${(totalPrice * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${(totalPrice * 1.1).toFixed(2)}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => {
                      onClose();
                      setShowPayment(false);
                    }}
                  >
                    Complete Payment
                  </Button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartDropdown;