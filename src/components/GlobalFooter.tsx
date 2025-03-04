
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const GlobalFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 pt-16 pb-8">
      <div className="container mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-serif font-bold mb-4">Kita Berharga</h3>
            <p className="text-muted-foreground mb-4">
              Platform cerita inspiratif yang menghubungkan dan memberdayakan melalui berbagi pengalaman hidup.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Navigasi</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/stories" className="text-muted-foreground hover:text-primary transition-colors">
                  Cerita
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Hukum</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Ketentuan Layanan
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Hubungi Kami</h4>
            <p className="text-muted-foreground mb-2">info@kitaberharga.id</p>
            <p className="text-muted-foreground">Jakarta, Indonesia</p>
          </div>
        </div>
        
        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {currentYear} Kita Berharga. Hak Cipta Dilindungi.
          </p>
          <div className="flex items-center">
            <span className="text-muted-foreground text-sm flex items-center">
              Dibuat dengan <Heart size={14} className="mx-1 text-red-500" /> di Indonesia
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;
