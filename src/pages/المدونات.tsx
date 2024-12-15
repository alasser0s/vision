import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Dummy data - replace with your actual data
  useEffect(() => {
    setArticles([
      {
        id: 1,
        title: 'Getting Started with React',
        excerpt: 'Learn the basics of React and start building your first application...',
        author: 'John Doe',
        date: '2024-03-15',
        readTime: '5 min',
        image: '/blog1.jpg',
        category: 'React'
      },
      // Add more articles...
    ]);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
        <p className="text-white/80 max-w-2xl mx-auto">
          Discover the latest articles, tutorials, and insights from our team
        </p>
      </motion.div>

      {/* Categories */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {['all', 'React', 'JavaScript', 'CSS', 'TypeScript'].map(category => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'border border-white/20 text-white/80 hover:bg-white/5'
            } transition-colors`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Articles Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {articles
          .filter(article => selectedCategory === 'all' || article.category === selectedCategory)
          .map(article => (
            <motion.article
              key={article.id}
              variants={item}
              className="rounded-xl border border-white/20 overflow-hidden hover:shadow-lg transition-shadow backdrop-blur-sm bg-white/10"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                  <span className="flex items-center gap-1">
                    <FiCalendar className="inline" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock className="inline" />
                    {article.readTime}
                  </span>
                </div>
                <h2 className="text-xl font-semibold mb-3">{article.title}</h2>
                <p className="text-white/80 mb-4">{article.excerpt}</p>
                <div className="flex items-center gap-2">
                  <FiUser className="text-white/60" />
                  <span className="text-sm text-white/80">{article.author}</span>
                </div>
              </div>
            </motion.article>
          ))}
      </motion.div>
    </div>
  );
};

export default Articles;
