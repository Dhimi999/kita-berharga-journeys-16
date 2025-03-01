
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CategoryFilter from '../components/CategoryFilter';
import StoryCard from '../components/StoryCard';
import { Search } from 'lucide-react';
import { fetchAllStories } from '@/services/storyService';
import { Story } from '@/types/supabase';

const Stories = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStories, setFilteredStories] = useState<Story[]>([]);
  const [allStories, setAllStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = new URLSearchParams(location.search);
  const categoryFilter = params.get('category') || 'all';

  useEffect(() => {
    const loadStories = async () => {
      setIsLoading(true);
      try {
        const fetchedStories = await fetchAllStories();
        setAllStories(fetchedStories);
      } catch (error) {
        console.error("Failed to load stories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStories();
  }, []);

  useEffect(() => {
    let results = [...allStories];
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      results = results.filter(story => 
        story.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(story =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (story.excerpt && story.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
        story.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredStories(results);
  }, [categoryFilter, searchTerm, allStories]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchTerm) {
      params.set('search', searchTerm);
    } else {
      params.delete('search');
    }
    
    navigate({
      pathname: location.pathname,
      search: params.toString()
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="py-12 md:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-serif">Jelajahi Cerita</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 px-4">
            Temukan berbagai cerita inspiratif yang dapat memberikan perspektif baru dan menginspirasi perjalanan hidup Anda.
          </p>
          
          {/* Search Form */}
          <form 
            onSubmit={handleSearch}
            className="relative max-w-md mx-auto mb-12"
          >
            <input
              type="text"
              placeholder="Cari cerita atau penulis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-12 py-3 rounded-full border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary"
            >
              <Search size={18} />
            </button>
          </form>
          
          {/* Category Filter */}
          <CategoryFilter />
        </div>

        {/* Stories Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div 
                key={item} 
                className="h-80 bg-muted/30 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : filteredStories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => (
              <StoryCard
                key={story.id}
                id={story.id}
                title={story.title}
                excerpt={story.excerpt || ""}
                author={story.author}
                date={story.date || ""}
                category={story.category}
                imageUrl={story.header_image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"}
                likes={story.likes}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold mb-4">Tidak Ada Cerita Ditemukan</h3>
            <p className="text-muted-foreground mb-6">
              Maaf, tidak ada cerita yang sesuai dengan filter pencarian Anda. Coba ubah filter atau istilah pencarian.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                navigate('/stories');
              }}
              className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium transition-all hover:shadow-md"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stories;
