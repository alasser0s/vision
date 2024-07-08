import React, { useEffect, useState } from 'react';
import $ from 'jquery';

interface Columns {
  img: string;
  url: string;
  alt: string;
  content: string;
  paragraph: string;
}

interface HiddenColumns {
  img: string;
  url: string;
  alt: string;
  content: string;
  paragraph: string;
}

interface ColumnsProps {
  col: Columns[];
  hcol: HiddenColumns[];
}

const Main: React.FC<ColumnsProps> = ({ col, hcol }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      $('.hiddencolu').slideDown();
    } else {
      $('.hiddencolu').slideUp();
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className='min-h-screen flex flex-col items-center justify-center mt-12 md:mt-20 lg:mt-24'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 md:p-8'>
          {col.map((colu, index) => (
            <div key={index} className='p-4 md:p-8'>
              <div className='relative w-full h-auto overflow-hidden'>
                <a href={colu.url} className='block overflow-hidden'>
                  <img src={colu.img} alt={colu.alt} className='object-cover w-full h-[200px] md:h-[300px] lg:h-[400px]' />
                </a>
                <h1 className='mt-4 text-white text-lg md:text-xl'>{colu.content}</h1>
                <p className='mt-2 text-gray-300'>{colu.paragraph}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='hiddencolu hidden w-full'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 md:p-8'>
            {hcol.map((hcolu, index) => (
              <div key={index} className='p-4 md:p-8'>
                <div className='relative w-full h-auto overflow-hidden'>
                  <a href={hcolu.url} className='block overflow-hidden'>
                    <img src={hcolu.img} alt={hcolu.alt} className='object-cover w-full h-[200px] md:h-[300px] lg:h-[400px]' />
                  </a>
                  <h1 className='mt-4 text-white text-lg md:text-xl'>{hcolu.content}</h1>
                  <p className='mt-2 text-gray-300'>{hcolu.paragraph}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='relative mt-12'>
          <hr className='absolute top-9 left-1/2 transform -translate-x-1/2 w-full md:w-[700px] border-gray-300' />
          <button
            onClick={toggleExpand}
            className='arrow-button bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700 transition duration-300 mt-4'
          >
            {isExpanded ? '▲' : '▼'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Main;
