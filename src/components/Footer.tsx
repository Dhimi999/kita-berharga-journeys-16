
import { Link } from 'react-router-dom';
import { Heart, Mail, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <Link to="/" className="inline-block mb-4">
              <span className="font-serif text-2xl font-semibold tracking-tight">
                Kita <span className="text-primary">Berharga</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Berbagi cerita inspiratif dan pengalaman hidup dari berbagai individu untuk saling menginspirasi dan menyadari bahwa kita semua berharga.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm hover:shadow-md transition-all"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm hover:shadow-md transition-all"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm hover:shadow-md transition-all"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Navigasi</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link 
                  to="/stories" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Cerita
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Kategori</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/stories?category=inspirasi" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Inspirasi
                </Link>
              </li>
              <li>
                <Link 
                  to="/stories?category=pengembangan-diri" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Pengembangan Diri
                </Link>
              </li>
              <li>
                <Link 
                  to="/stories?category=kebahagiaan" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Kebahagiaan
                </Link>
              </li>
              <li>
                <Link 
                  to="/stories?category=motivasi" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Motivasi
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-lg font-semibold mb-4">Hubungi Kami</h3>
            <p className="text-muted-foreground mb-4">
              Punya pertanyaan atau ingin berbagi cerita inspiratif Anda? Jangan ragu untuk menghubungi kami.
            </p>
            <div className="flex items-center space-x-3 mb-2">
              <Mail size={16} className="text-primary" />
              <span className="text-muted-foreground">hello@kitaberharga.id</span>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium transition-all hover:shadow-md mt-2"
            >
              Share Your Story
              <Heart size={16} className="ml-2" />
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Kita Berharga. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link 
                to="/privacy" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Kebijakan Privasi
              </Link>
              <Link 
                to="/terms" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
