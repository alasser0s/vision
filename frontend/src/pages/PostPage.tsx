import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const PostPage = () => {
  const { postSlug } = useParams()
  const [loading, setloading] = useState(true)
  const [error, seterror] = useState(false)
  const [post, setpost] = useState<any>(null)
  console.log(postSlug);

  useEffect(() => {
    const fetchposts = async () => {
      try {
        setloading(true)
        const res = await fetch(`/api/post/getpost?slug=${postSlug}`)
        const data = await res.json()
        if (!res.ok) {
          seterror(data.message);
          setloading(false);
          return;
        }
        if (res.ok) {
          setpost(data.posts[0])
          setloading(false)
          seterror(false)
        }

      } catch (error: any) {
        seterror(true)
        setloading(false)
      }
    }
    fetchposts()
  }, [postSlug])
  if (loading) return (<div className="bg-[#38363B]">
    loading . . .</div>)
  return (
    <div className="bg-[#38363B]">
      <main className='px-3 flex flex-col max-w-[714px] gap-7 min-h-screen'>
        <div className='mt-32 ml-[120px]'>
          <div>
            <img src={post.images} alt={post.title} className='absloute w-[714px] h-[476px] object-cover ' />
            <h1 className='text-[53.21px] mb-12 relative'>{post && post.title}</h1>
          </div>
          <div>
          {
          
          post.content}
          </div>        </div></main>
    </div>
  )
}

export default PostPage
