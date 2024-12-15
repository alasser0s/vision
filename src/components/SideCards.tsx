import { type FC } from 'react';
import { Link } from 'react-router-dom';

interface Post {
  slug: string;
  images: string;
}

interface SideCardsProps {
  post: Post;
}

const SideCards: FC<SideCardsProps> = ({ post }) => {
  return (
    <div>
      <Link to={`/post/${post.slug}`}>
        <img src={post.images} alt="" className='lg:w-[166px] lg:h-[166px] object-cover' />
      </Link>
    </div>
  );
};

export default SideCards;
