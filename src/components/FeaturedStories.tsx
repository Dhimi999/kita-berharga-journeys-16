
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import StoryCard from './StoryCard';
import { getFeaturedStories } from '../services/storyService';
import { Story } from '../types/supabase';

const FeaturedStories = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadStories = async () => {
      setLoading(true);
      try {
        // Updated to use getFeaturedStories instead of fetchFeaturedStories
        const fetchedStories = await getFeaturedStories(5);
        if (fetchedStories.length > 0) {
          // Create a new array with the first story marked as featured
          const storiesWithFeatured = fetchedStories.map((story, index) => ({
            ...story,
            featured: index === 0 // Only the first story is featured
          }));
          setStories(storiesWithFeatured);
        }
      } catch (error) {
        console.error('Failed to load featured stories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStories();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef} 
      className={`py-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="inline-block px-3 py-1 bg-kb-peach rounded-full text-sm font-medium mb-4">
              Cerita Pilihan
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Cerita Yang Menginspirasi</h2>
          </div>
          <Link 
            to="/stories"
            className="mt-4 md:mt-0 text-primary font-medium hover:underline"
          >
            Lihat Semua Cerita
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-80 bg-muted/30 rounded-xl animate-pulse"></div>
            ))}
          </div>
        ) : stories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <StoryCard
                key={story.id}
                id={story.id}
                title={story.title}
                excerpt={story.excerpt || ''}
                author={story.author}
                date={story.date || ''}
                category={story.category}
                imageUrl={story.header_image || ''}
                likes={story.likes}
                featured={story.featured}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium">Belum ada cerita tersedia</h3>
            <p className="text-muted-foreground mt-2">Kami akan segera menambahkan cerita inspiratif</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedStories;
