import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Heart } from 'lucide-react';
import { fetchStoryById, addCommentToStory, likeStory } from '@/services/storyService';

// Import the new components
import { StoryHeader } from '@/components/story/StoryHeader';
import { StoryContent } from '@/components/story/StoryContent';
import { StoryActions } from '@/components/story/StoryActions';
import { CommentsSection } from '@/components/story/CommentsSection';
import { LoadingState } from '@/components/story/LoadingState';
import { ErrorState } from '@/components/story/ErrorState';

const StoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [story, setStory] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStory = async () => {
      if (!id) return;

      setIsLoading(true);
      setError(null);
      
      try {
        const fetchedStory = await fetchStoryById(id);
        if (fetchedStory) {
          setStory(fetchedStory);
        } else {
          setError('Cerita tidak ditemukan');
        }
      } catch (err) {
        console.error('Failed to fetch story:', err);
        setError('Gagal memuat cerita. Silakan coba lagi nanti.');
      } finally {
        setIsLoading(false);
      }
    };

    loadStory();
  }, [id]);

  const handleCommentSubmit = async (name: string, email: string, content: string) => {
    if (!id) return;
    
    const newComment = {
      name,
      email,
      content,
      date: new Date().toISOString(),
    };
    
    try {
      const updatedStory = await addCommentToStory(id, newComment);
      
      if (updatedStory) {
        setStory(updatedStory);
        toast({
          title: "Komentar terkirim",
          description: "Terima kasih atas tanggapan Anda!",
        });
      }
    } catch (err) {
      console.error('Failed to add comment:', err);
      toast({
        title: "Gagal mengirim komentar",
        description: "Mohon coba lagi nanti",
        variant: "destructive"
      });
    }
  };

  const handleLike = async () => {
    if (!id) return;
    
    try {
      const updatedStory = await likeStory(id);
      if (updatedStory) {
        setStory(updatedStory);
        toast({
          title: "Cerita disukai",
          description: "Terima kasih atas dukungan Anda!",
        });
      }
    } catch (err) {
      console.error('Failed to like story:', err);
      toast({
        title: "Gagal menyukai cerita",
        description: "Mohon coba lagi nanti",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    const daysIndonesian = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const monthsIndonesian = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    try {
      const date = new Date(dateString);
      
      if (isNaN(date.getTime())) return '';
      
      const day = daysIndonesian[date.getDay()];
      const dayOfMonth = date.getDate();
      const month = monthsIndonesian[date.getMonth()];
      const year = date.getFullYear();
      
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      
      return `${day}, ${dayOfMonth} ${month} ${year} ${hours}:${minutes} ${ampm}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  const scrollToComments = () => {
    document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !story) {
    return <ErrorState error={error || 'Cerita tidak ditemukan'} />;
  }

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <StoryHeader
          title={story.title}
          author={story.author}
          date={story.date}
          category={story.category}
          headerImage={story.header_image}
          likes={story.likes}
          formatDate={formatDate}
        />
        
        <StoryContent content={story.content} />
        
        <StoryActions 
          likes={story.likes} 
          commentCount={story.comments?.length || 0}
          onLike={handleLike}
          scrollToComments={scrollToComments}
        />
        
        <CommentsSection
          comments={story.comments || []}
          formatDate={formatDate}
          onSubmitComment={handleCommentSubmit}
        />
      </div>
    </div>
  );
};

export default StoryDetail;
