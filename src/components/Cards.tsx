import React from 'react';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface CardProps {
  image: string;
  title: string;
  rating: number;
  price: string;
}

const Card: React.FC<CardProps> = ({ image, title, rating, price }) => {
  const { addItem } = useCart();

  const handleBuyClick = () => {
    // Convert price string to number (remove $ and convert to float)
    const priceNumber = parseFloat(price.replace('$', ''));
    
    addItem({
      id: title, // Using title as ID since we don't have a proper ID
      name: title,
      price: priceNumber,
      quantity: 1,
      image: image
    });
    
    toast.success('Added to cart!');
  };

  return (
    <div className="w-full h-full p-4 overflow-hidden text-white flex flex-col items-center gap-4">
      <motion.div 
        className="bg-[#050505] p-4 rounded-lg w-full h-full flex flex-col items-center"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <motion.img 
          src={image} 
          alt={title} 
          className="w-full h-full rounded-[21px] object-cover mb-4"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />
        <h1 className="text-[20px] font-bold mb-2 flex justify-end w-full">{title}</h1>
        <hr className="w-full mb-2" />
        <div className="w-full my-2">
          {[...Array(5)].map((_, i) => (
            <motion.span 
              key={i} 
              className={i < rating ? 'text-[#B6BBFF] w-4 h-4' : 'text-[#7F88F4]'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              ★
            </motion.span>
          ))}
        </div>
        <div className="text-[#00FF66] text-lg relative bottom-9 w-full flex justify-end">{price}</div>
        <motion.button 
          className="text-[20px] font-black bg-[#5E3FC6] w-[93px] h-[43px] rounded-md hover:bg-[#4A32A0] transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBuyClick}
        >
          شراء
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Card; 