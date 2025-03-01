
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export interface StoryCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
  likes: number;
  featured?: boolean;
}

const StoryCard = ({
  id,
  title,
  excerpt,
  author,
  date,
  category,
  imageUrl,
  likes,
  featured = false,
}: StoryCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isLiked) {
      setLikeCount(prev => prev + 1);
    } else {
      setLikeCount(prev => prev - 1);
    }
    
    setIsLiked(!isLiked);
  };

  return (
    <Link 
      to={`/stories/${id}`} 
      className={`story-card block rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all ${
        featured ? 'md:col-span-2 lg:col-span-2' : ''
      }`}
    >
      <div className="relative w-full h-48 md:h-56 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="story-cover-image w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
        <div className="absolute bottom-4 left-4">
          <span className="inline-block px-2 py-1 bg-white/90 rounded-full text-xs font-medium">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg md:text-xl font-semibold mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
              {author.charAt(0)}
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium">{author}</p>
              <p className="text-xs text-gray-700">{date}</p>
            </div>
          </div>
          
          <button 
            onClick={handleLike}
            className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors"
          >
            <Heart 
              size={16} 
              className={isLiked ? 'fill-primary text-primary' : 'text-muted-foreground'} 
            />
            <span className="text-xs">{likeCount}</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default StoryCard;
