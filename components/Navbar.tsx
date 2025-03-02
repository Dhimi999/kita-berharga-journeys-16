
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3 shadow-sm' : 'bg-transparent py-5'
      }`}
    >
      <div className="container px-4 mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="font-serif text-2xl font-semibold tracking-tight">
            Kita <span className="text-primary">Berharga</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/' 
                ? 'text-primary font-semibold' 
                : 'text-foreground hover:text-primary'
            }`}
          >
            Beranda
          </Link>
          <Link
            to="/stories"
            className={`text-sm font-medium transition-colors ${
              location.pathname.startsWith('/stories') 
                ? 'text-primary font-semibold' 
                : 'text-foreground hover:text-primary'
            }`}
          >
            Cerita
          </Link>
          <Link
            to="/about"
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/about' 
                ? 'text-primary font-semibold' 
                : 'text-foreground hover:text-primary'
            }`}
          >
            Tentang Kami
          </Link>
          <Link
            to="/contact"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium transition-all hover:shadow-md"
          >
            Share Your Story
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-foreground p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container px-4 mx-auto glass py-4 mt-2 rounded-lg">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                location.pathname === '/' 
                  ? 'bg-primary/20 text-primary font-semibold' 
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              Beranda
            </Link>
            <Link
              to="/stories"
              className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                location.pathname.startsWith('/stories') 
                  ? 'bg-primary/20 text-primary font-semibold' 
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              Cerita
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                location.pathname === '/about' 
                  ? 'bg-primary/20 text-primary font-semibold' 
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              Tentang Kami
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium transition-all hover:shadow-md text-center"
            >
              Share Your Story
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
