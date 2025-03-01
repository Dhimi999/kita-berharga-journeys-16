
import { Button } from '@/components/ui/button';
import { Heart, Share2, MessageCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface StoryActionsProps {
  likes: number;
  commentCount: number;
  onLike: () => Promise<void>;
  scrollToComments: () => void;
}

export const StoryActions = ({ 
  likes, 
  commentCount, 
  onLike, 
  scrollToComments
}: StoryActionsProps) => {
  const { toast } = useToast();

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link disalin",
      description: "Link cerita telah disalin ke clipboard",
    });
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 py-6 border-t border-b border-border mb-12">
      <Button variant="ghost" onClick={onLike} className="flex items-center">
        <Heart size={20} className="mr-2 text-red-500" />
        <span>Suka ({likes || 0})</span>
      </Button>
      
      <Button variant="ghost" onClick={handleShare} className="flex items-center">
        <Share2 size={20} className="mr-2" />
        <span>Bagikan</span>
      </Button>
      
      <Button variant="ghost" onClick={scrollToComments} className="flex items-center">
        <MessageCircle size={20} className="mr-2" />
        <span>Komentar ({commentCount})</span>
      </Button>
    </div>
  );
};
