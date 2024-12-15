// src/components/Card.tsx

import React from 'react';

interface CardProps {
  image: string;
  title: string;
  rating: number;
  price: string;
}

const Card: React.FC<CardProps> = ({ image, title, rating, price }) => {
  return (
    <div className=" w-full h-full p-4 overflow-hidden text-white flex flex-col items-center gap-4">
      <div className="bg-[#050505] p-4 rounded-lg w-full h-full flex flex-col items-center">
        <img src={image} alt={title} className="w-full h-full rounded-[21px] object-cover mb-4" />
        <h1 className="text-[20px] font-bold mb-2 flex justify-end w-full">{title}</h1>
        <hr className="w-full mb-2" />
        <div className=" w-full my-2">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < rating ? 'text-[#B6BBFF] w-4 h-4' : 'text-[#7F88F4]'}>★</span>
          ))}
        </div>
        <div className="text-[#00FF66] text-lg relative bottom-9 w-full flex justify-end">{price}</div>
        <button className="text-[20px] font-black bg-[#5E3FC6] w-[93px] h-[43px] rounded-md">شراء</button>
      </div>
    </div>
  );
};

export default Card;
