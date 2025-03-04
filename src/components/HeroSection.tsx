import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  return <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 right-[10%] w-64 h-64 rounded-full bg-kb-mint opacity-30 blur-3xl"></div>
        <div className="absolute bottom-20 left-[5%] w-72 h-72 rounded-full bg-kb-blue opacity-20 blur-3xl"></div>
        <div className="absolute top-60 left-[15%] w-48 h-48 rounded-full bg-kb-peach opacity-20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block px-3 py-1 bg-kb-yellow rounded-full text-sm font-medium mb-6 animate-fade-in">
              Selamat Datang di Kita Berharga
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Setiap Cerita Layak <span className="text-primary">Didengar</span> dan Setiap Orang <span className="text-primary">Berharga</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              Platform yang menampung berbagai cerita inspiratif dan pengalaman hidup dari beragam individu untuk saling menguatkan dan menginspirasi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/stories" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium transition-all hover:shadow-lg">
                Jelajahi Cerita
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-white border border-border shadow-sm rounded-full font-medium transition-all hover:shadow-md">
                Bagikan Ceritamu
              </Link>
            </div>
          </div>

          <div className={`relative transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <img alt="Berbagi cerita inspiratif" loading="lazy" className="w-full h-full animate-image-reveal object-cover" src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </div>
            <div className="absolute -bottom-6 -left-2 lg:-left-6 xl:-left-6 md:-left-6 w-56 p-4 glass rounded-lg shadow-lg animate-fade-in">
              <p className="font-medium text-sm">
                "Setiap cerita yang dibagikan memberikan harapan baru bagi orang lain."
              </p>
            </div>
            <div className="absolute top-1/4 -right-2 transform -translate-y-1/2 glass rounded-lg shadow-lg p-3 animate-fade-in">
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map(star => <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;