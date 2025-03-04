import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Tutup menu saat berpindah halaman
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Tangani event scroll untuk mengubah style header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full", isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5")}>
      <div className="container mx-auto px-4 md:px-6 py-6 flex items-center justify-between">
        {/* Logo dengan font asli */}
        <Link to="/" className="text-2xl md:text-3xl font-serif font-bold tracking-tight">
          Kita Berharga
        </Link>
        
        {/* Navigasi Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" exact>Beranda</NavLink>
          <NavLink to="/stories">Cerita</NavLink>
          <NavLink to="/about">Tentang</NavLink>
          <NavLink to="/contact">Kontak</NavLink>
        </nav>
        
        {/* Tombol "Share Your Story" untuk desktop */}
        <Link to="/contact" className="hidden md:flex items-center rounded-full bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-800">
          Share Your Story
        </Link>
        
        {/* Tombol menu untuk mobile */}
        <button className="md:hidden flex items-center justify-center text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu dengan transisi */}
      <div className={cn("md:hidden absolute top-full left-0 right-0 bg-white shadow-md transition-all duration-300 ease-in-out overflow-hidden", isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0")}>
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <NavLink to="/" exact className="py-2 text-lg">Beranda</NavLink>
          <NavLink to="/stories" className="py-2 text-lg">Cerita</NavLink>
          <NavLink to="/about" className="py-2 text-lg">Tentang</NavLink>
          <NavLink to="/contact" className="py-2 text-lg">Kontak</NavLink>
          <Link to="/contact" className="rounded-full bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-green-800 mt-4">
            Share Your Story
          </Link>
        </div>
      </div>
    </header>;
};
interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  exact?: boolean;
}
const NavLink = ({
  to,
  children,
  className,
  exact = false
}: NavLinkProps) => {
  const location = useLocation();
  const isActive = exact ? location.pathname === to : location.pathname.startsWith(to) && !(to === '/' && location.pathname !== '/');
  return <Link to={to} className={cn("relative font-medium transition-colors", isActive ? "text-green-600" : "text-gray-800 hover:text-green-600", className)}>
      {children}
    </Link>;
};
export default Header;