import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StoryHeaderProps {
  title: string;
  author: string;
  date: string;
  category: string;
  headerImage?: string;
  likes: number;
  formatDate: (dateString: string) => string;
}

export const StoryHeader = ({
  title,
  author,
  date,
  category,
  headerImage,
  likes,
  formatDate
}: StoryHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="mb-10">
      <Button 
        variant="ghost"
        onClick={() => navigate('/stories')}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Kembali ke Daftar Cerita
      </Button>
      
      {headerImage && (
        <div className="mb-8 rounded-xl overflow-hidden shadow-md">
          <img 
            src={headerImage} 
            alt={title} 
            className="w-full h-[30vh] md:h-[50vh] object-cover animate-image-reveal"
            loading="lazy"
          />
        </div>
      )}
      
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 font-serif">{title}</h1>
      
      <div className="flex flex-wrap items-center gap-4 mb-6 text-muted-foreground">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary-foreground mr-2">
            {author.charAt(0)}
          </div>
          <span className="font-medium text-foreground">{author}</span>
        </div>
        
        {date && (
          <div className="text-sm md:text-base font-medium">
            {formatDate(date)}
          </div>
        )}
        
        <div className="flex items-center">
          <Heart size={18} className="mr-1 text-red-500" />
          <span>{likes || 0}</span>
        </div>
      </div>
      
      <div className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-kb-mint text-primary-foreground">
        {category}
      </div>
    </div>
  );
};
