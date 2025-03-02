import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Close menu when location changes
    setIsOpen(false);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const headerClasses = `fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
    isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
  }`;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-serif font-bold text-primary-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Kita Berharga
            </span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `font-medium hover:text-primary transition-colors ${isActive ? 'text-primary' : ''}`
              }
              end
            >
              Beranda
            </NavLink>
            <NavLink 
              to="/stories" 
              className={({ isActive }) => 
                `font-medium hover:text-primary transition-colors ${isActive ? 'text-primary' : ''}`
              }
            >
              Cerita
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `font-medium hover:text-primary transition-colors ${isActive ? 'text-primary' : ''}`
              }
            >
              Tentang
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `font-medium hover:text-primary transition-colors ${isActive ? 'text-primary' : ''}`
              }
            >
              Kontak
            </NavLink>
          </nav>

          {/* Share Story button (visible on md screens and larger) */}
          <div className="hidden md:block">
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center px-4 py-2 text-sm bg-primary text-primary-foreground rounded-full font-medium transition-all hover:shadow-md"
            >
              Bagikan Cerita
              <Heart size={16} className="ml-2" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden p-2 focus:outline-none"
            aria-label={isOpen ? "Tutup Menu" : "Buka Menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm shadow-md py-4">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-4">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `font-medium px-2 py-1 ${isActive ? 'text-primary' : ''}`
                }
                onClick={() => setIsOpen(false)}
                end
              >
                Beranda
              </NavLink>
              <NavLink 
                to="/stories" 
                className={({ isActive }) => 
                  `font-medium px-2 py-1 ${isActive ? 'text-primary' : ''}`
                }
                onClick={() => setIsOpen(false)}
              >
                Cerita
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  `font-medium px-2 py-1 ${isActive ? 'text-primary' : ''}`
                }
                onClick={() => setIsOpen(false)}
              >
                Tentang
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  `font-medium px-2 py-1 ${isActive ? 'text-primary' : ''}`
                }
                onClick={() => setIsOpen(false)}
              >
                Kontak
              </NavLink>
              
              {/* Share story button in mobile menu */}
              <div className="pt-2">
                <Link 
                  to="/contact" 
                  className="inline-flex items-center justify-center px-4 py-2 text-sm bg-primary text-primary-foreground rounded-full font-medium transition-all hover:shadow-md"
                  onClick={() => setIsOpen(false)}
                >
                  Bagikan Cerita
                  <Heart size={16} className="ml-2" />
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
