import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        // Simulated API call - replace with your actual API
        const mockPost = {
          id: Number(id),
          title: "Getting Started with React",
          content: `
            <div class="prose prose-lg prose-invert">
              <p>React is a powerful JavaScript library for building user interfaces. In this comprehensive guide, we'll explore the fundamentals of React and walk through creating your first application.</p>
              
              <h2>Why Choose React?</h2>
              <p>React offers several advantages:</p>
              <ul>
                <li>Component-based architecture</li>
                <li>Virtual DOM for optimal performance</li>
                <li>Rich ecosystem and community</li>
                <li>Excellent developer tools</li>
              </ul>

              <h2>Setting Up Your Development Environment</h2>
              <p>Before we begin, make sure you have Node.js installed. Then, create a new React project using:</p>
              <pre><code>npx create-react-app my-app
cd my-app
npm start</code></pre>

              <h2>Understanding Components</h2>
              <p>Components are the building blocks of React applications. Here's a simple example:</p>
              <pre><code>function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}</code></pre>
            </div>
          `,
          author: "John Doe",
          date: "2024-03-15",
          readTime: "5 min read",
          image: "/blog-header.jpg",
          category: "React"
        };
        setPost(mockPost);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#38363B] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#38363B] flex items-center justify-center text-white">
        Post not found
      </div>
    );
  }

  return (
    <div className="bg-[#38363B] min-h-screen pt-32 pb-16">
      <article className="max-w-4xl mx-auto px-4">
        {/* Header Image */}
        <div className="rounded-xl overflow-hidden mb-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* Post Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
          
          <div className="flex items-center gap-6 text-white/60">
            <div className="flex items-center gap-2">
              <FiUser />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiClock />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div 
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="prose prose-lg prose-invert max-w-none
            prose-headings:text-white
            prose-p:text-white/80
            prose-a:text-blue-400
            prose-strong:text-white
            prose-code:text-white
            prose-pre:bg-black/30
            prose-pre:border
            prose-pre:border-white/10
            prose-pre:rounded-lg
            prose-li:text-white/80"
        />
      </article>
    </div>
  );
};

export default PostPage;
