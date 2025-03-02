
import { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedStories from '../components/FeaturedStories';
import QuotesSection from '../components/QuotesSection';
import LoadingScreen from '../components/LoadingScreen';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Share2, MessageCircle } from 'lucide-react';

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Pre-load all components in the background
    const preloadContent = () => {
      // After everything is loaded, hide loading screen
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    };
    
    // Start preloading
    preloadContent();
    
    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Return both the loading screen and the actual content
  // The content div will be hidden until loading is complete
  return (
    <>
      {isLoading && <LoadingScreen />}
      
      <div className={`min-h-screen ${isLoading ? 'hidden' : ''}`}>
        <HeroSection />
        
        {/* Quotes Section */}
        <QuotesSection />

        <FeaturedStories />

        {/* About Section */}
        <section className="py-16 bg-kb-mint/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="order-2 lg:order-1 animate-slide-in">
                <span className="inline-block px-3 py-1 bg-kb-blue rounded-full text-sm font-medium mb-4">
                  Tentang Kami
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 font-serif">
                  Membangun Komunitas Yang Saling Menguatkan
                </h2>
                <p className="text-muted-foreground mb-6">
                  Kita Berharga adalah platform yang didedikasikan untuk berbagi cerita inspiratif dan 
                  pengalaman hidup dari berbagai individu. Kami percaya bahwa setiap cerita punya 
                  kekuatan untuk menginspirasi, mengubah perspektif, dan mengingatkan kita semua bahwa 
                  kita berharga apa adanya.
                </p>
                <p className="text-muted-foreground mb-8">
                  Bergabunglah dengan komunitas kami untuk membaca cerita-cerita inspiratif atau 
                  berbagi cerita Anda sendiri untuk menginspirasi orang lain.
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center text-primary font-medium hover:underline"
                >
                  Selengkapnya tentang Kita Berharga
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
              <div className="order-1 lg:order-2 animate-scale-in">
                <div className="relative">
                  <div className="w-full h-64 sm:h-96 rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1501854140801-50d01698950b" 
                      alt="Komunitas Kita Berharga" 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute -bottom-5 -right-5 glass p-4 rounded-lg shadow-md max-w-xs">
                    <p className="text-sm font-medium">
                      "Setiap orang memiliki cerita yang layak dibagikan dan didengar."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 bg-kb-yellow rounded-full text-sm font-medium mb-4">
                Fitur Utama
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-serif">
                Bagaimana Kita Berharga Bekerja
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Platform kami dirancang untuk memudahkan proses berbagi dan menemukan cerita inspiratif
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-kb-blue/20 flex items-center justify-center rounded-full mb-4">
                  <Heart size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Cerita Inspiratif</h3>
                <p className="text-muted-foreground">
                  Baca berbagai cerita inspiratif dari orang-orang dengan latar belakang berbeda yang dapat memberikan perspektif baru.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-kb-peach/30 flex items-center justify-center rounded-full mb-4">
                  <Share2 size={24} className="text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Bagikan Ceritamu</h3>
                <p className="text-muted-foreground">
                  Bagikan cerita inspiratif Anda untuk menginspirasi orang lain dan berkontribusi pada komunitas yang saling menguatkan.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-kb-mint/30 flex items-center justify-center rounded-full mb-4">
                  <MessageCircle size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Interaksi Komunitas</h3>
                <p className="text-muted-foreground">
                  Berikan dukungan melalui likes dan komentar untuk menghargai keberanian berbagi cerita inspiratif.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-kb-mint/40 to-kb-blue/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 font-serif">
              Punya Cerita Inspiratif untuk Dibagikan?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Bagikan cerita Anda dan jadilah bagian dari komunitas yang saling menginspirasi. 
              Cerita Anda mungkin adalah jawaban yang dicari seseorang saat ini.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium transition-all hover:shadow-lg"
            >
              Bagikan Ceritamu Sekarang
              <Heart size={18} className="ml-2" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Index;
