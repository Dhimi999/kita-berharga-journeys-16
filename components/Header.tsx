
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Scroll to top when location changes
    window.scrollTo(0, 0);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 backdrop-blur-md py-4'
    }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo - Improved visibility */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-primary-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-sm">
              Kita Berharga
            </span>
          </Link>

          {/* Desktop Navigation - Improved contrast and spacing */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link 
              to="/" 
              className={`font-medium text-base tracking-wide hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 ${
                isActive('/') ? 'text-primary font-semibold after:scale-x-100 after:origin-bottom-left' : 'text-gray-800'
              }`}
            >
              Beranda
            </Link>
            <Link 
              to="/stories" 
              className={`font-medium text-base tracking-wide hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 ${
                isActive('/stories') ? 'text-primary font-semibold after:scale-x-100 after:origin-bottom-left' : 'text-gray-800'
              }`}
            >
              Cerita
            </Link>
            <Link 
              to="/about" 
              className={`font-medium text-base tracking-wide hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 ${
                isActive('/about') ? 'text-primary font-semibold after:scale-x-100 after:origin-bottom-left' : 'text-gray-800'
              }`}
            >
              Tentang
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium text-base tracking-wide hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100 ${
                isActive('/contact') ? 'text-primary font-semibold after:scale-x-100 after:origin-bottom-left' : 'text-gray-800'
              }`}
            >
              Kontak
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-primary focus:outline-none p-2 rounded-full bg-muted/40 hover:bg-muted/60 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Navigation - Improved contrast */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 mt-3 animate-fade-in">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={`font-medium text-base px-4 py-3 rounded-md transition-colors ${
                  isActive('/') ? 'bg-primary/15 text-primary font-semibold' : 'text-gray-800 hover:bg-muted/50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Beranda
              </Link>
              <Link 
                to="/stories" 
                className={`font-medium text-base px-4 py-3 rounded-md transition-colors ${
                  isActive('/stories') ? 'bg-primary/15 text-primary font-semibold' : 'text-gray-800 hover:bg-muted/50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Cerita
              </Link>
              <Link 
                to="/about" 
                className={`font-medium text-base px-4 py-3 rounded-md transition-colors ${
                  isActive('/about') ? 'bg-primary/15 text-primary font-semibold' : 'text-gray-800 hover:bg-muted/50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Tentang
              </Link>
              <Link 
                to="/contact" 
                className={`font-medium text-base px-4 py-3 rounded-md transition-colors ${
                  isActive('/contact') ? 'bg-primary/15 text-primary font-semibold' : 'text-gray-800 hover:bg-muted/50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Kontak
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
