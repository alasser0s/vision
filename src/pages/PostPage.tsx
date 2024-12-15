import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SideCards from '@/components/SideCards';

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [recentPosts, setRecentPosts] = useState<any>(null);
  const [post, setPost] = useState<any>(null);
  
  console.log(postSlug);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getpost?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.message);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error: any) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPosts();
  }, [postSlug]);

  useEffect(() => {     
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch("/api/post/getpost?limit=3");
        const data = await res.json();
        if (!res.ok) {
          setError(data.message);
        }
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchRecentPosts();
  }, []);

  if (loading) return (<div className="bg-[#38363B]">loading . . .</div>);

  return (
    <div className="bg-[#38363B] flex min-h-screen flex-row-reverse">
      <aside className="relative lg:w-[566px] lg:h-[1424px] flex-shrink-0 mt-[126px] mb-[36.6px]" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <div className="relative p-4">
          {recentPosts && recentPosts.map((post : any) => (
            <SideCards key={post._id} post={post} />
          ))}
        </div>
      </aside>

      <main className="flex-grow">
        <div className="px-3 flex flex-col max-w-[714px] gap-7 min-h-screen relative mt-32 mr-[120px]">
          <div>
            <img src={post.images} alt={post.title} className=" lg:w-[714px] lg:h-[476px] object-cover relative" />
            <h1 className="text-[53.21px] mb-12 relative bottom-20">{post && post.title}</h1>
          </div >
          <div dangerouslySetInnerHTML={{ __html: post && post.content }} className="prose prose-p:text-white prose-img:lg:w-[712px] prose-img:lg:h-[476px] prose-img:object-cover lg:prose-xl prose-table:table-auto prose-th:bg-gray-700 prose-th:text-white prose-td:border prose-td:border-gray-950"></div>
        </div>
      </main>
    </div>
  );
};

export default PostPage;
