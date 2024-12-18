import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { motion } from 'framer-motion';

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      <div className='min-h-screen flex flex-col items-center justify-center mt-12 md:mt-20 lg:mt-24'>
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 md:p-8'
        >
          {col.map((colu, index) => (
            <motion.div 
              key={index}
              variants={item}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className='p-4 md:p-8'
            >
              <div className='relative w-full h-auto overflow-hidden rounded-lg shadow-lg bg-[#1a1a1a] transform transition-all duration-300 hover:shadow-xl'>
                <motion.a 
                  href={colu.url} 
                  className='block overflow-hidden'
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img 
                    src={colu.img} 
                    alt={colu.alt} 
                    className='object-cover w-full h-[200px] md:h-[300px] lg:h-[400px]'
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
                <div className='p-4'>
                  <motion.h1 
                    className='mt-2 text-white text-lg md:text-xl font-semibold'
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {colu.content}
                  </motion.h1>
                  <motion.p 
                    className='mt-2 text-gray-300'
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {colu.paragraph}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className='hiddencolu hidden w-full'>
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 md:p-8'
          >
            {hcol.map((hcolu, index) => (
              <motion.div 
                key={index}
                variants={item}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className='p-4 md:p-8'
              >
                <div className='relative w-full h-auto overflow-hidden rounded-lg shadow-lg bg-[#1a1a1a] transform transition-all duration-300 hover:shadow-xl'>
                  <motion.a 
                    href={hcolu.url} 
                    className='block overflow-hidden'
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.img 
                      src={hcolu.img} 
                      alt={hcolu.alt} 
                      className='object-cover w-full h-[200px] md:h-[300px] lg:h-[400px]'
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                  <div className='p-4'>
                    <motion.h1 
                      className='mt-2 text-white text-lg md:text-xl font-semibold'
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {hcolu.content}
                    </motion.h1>
                    <motion.p 
                      className='mt-2 text-gray-300'
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {hcolu.paragraph}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className='relative mt-12'>
          <hr className='absolute top-9 left-1/2 transform -translate-x-1/2 w-full md:w-[700px] border-gray-300' />
          <motion.button
            onClick={toggleExpand}
            className='arrow-button bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700 transition duration-300 mt-4'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isExpanded ? '▲' : '▼'}
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default Main; 