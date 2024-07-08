// src/components/CardSlider.tsx

import React from 'react';
import Slider from 'react-slick';
import Card from './Cards';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface CardSliderProps {
  cards: Array<{
    image: string;
    title: string;
    rating: number;
    price: string;
  }>;
}

const CardSlider: React.FC<CardSliderProps> = ({ cards }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Slider {...settings}>
        {cards.map((card, index) => (
          <div key={index} className="px-2">
            <Card
              image={card.image}
              title={card.title}
              rating={card.rating}
              price={card.price}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardSlider;
