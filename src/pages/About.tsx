
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Banner Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-kb-mint/30 to-kb-blue/20">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-3 py-1 bg-kb-blue rounded-full text-sm font-medium mb-4">
            Tentang Kami
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Cerita Di Balik Kita Berharga
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Platform yang didedikasikan untuk berbagi cerita inspiratif dan pengalaman hidup
            dari berbagai individu dan komunitas.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Kisah Awal Mula
              </h2>
              <p className="text-muted-foreground mb-4">
                Kita Berharga berawal dari sebuah ide sederhana: menciptakan ruang aman di mana setiap orang
                dapat berbagi cerita inspiratif dan pengalaman hidup mereka. Kami percaya bahwa setiap orang
                memiliki cerita yang layak dibagikan dan didengar.
              </p>
              <p className="text-muted-foreground mb-4">
                Didirikan pada tahun 2022, platform kami telah berkembang menjadi komunitas yang saling mendukung,
                di mana cerita-cerita pribadi menjadi sumber inspirasi dan pembelajaran bagi banyak orang.
              </p>
              <p className="text-muted-foreground mb-6">
                Setiap minggu, kami menerima puluhan cerita baru yang kemudian kami kurasi dan bagikan
                kepada komunitas. Cerita-cerita ini mencakup berbagai tema kehidupan, mulai dari
                pengembangan diri, keluarga, hingga perjuangan menghadapi tantangan hidup.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1516321497487-e288fb19713f"
                  alt="Tim Kita Berharga"
                  className="w-full h-auto rounded-xl shadow-lg"
                  loading="lazy"
                />
                <div className="absolute -bottom-5 -left-5 glass p-4 rounded-lg shadow-md max-w-xs hidden md:block">
                  <p className="text-sm font-medium">
                    "Setiap cerita memiliki kekuatan untuk mengubah perspektif dan menginspirasi perubahan."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-kb-mint/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Visi & Misi Kami
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Membangun komunitas yang saling mendukung melalui kekuatan berbagi cerita
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-kb-peach/50 flex items-center justify-center rounded-full mb-4">
                <span className="text-secondary-foreground font-bold text-lg">V</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Visi</h3>
              <p className="text-muted-foreground mb-4">
                Menciptakan dunia di mana setiap individu menyadari nilai dan potensi diri mereka melalui
                kekuatan cerita dan berbagi pengalaman.
              </p>
              <p className="text-muted-foreground">
                Kami membayangkan komunitas global tanpa batas di mana orang-orang dari berbagai latar belakang
                dapat terhubung, belajar, dan bertumbuh bersama melalui cerita inspiratif.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-kb-blue/50 flex items-center justify-center rounded-full mb-4">
                <span className="text-accent-foreground font-bold text-lg">M</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Misi</h3>
              <p className="text-muted-foreground mb-4">
                Memfasilitasi platform yang aman dan inklusif untuk berbagi dan menemukan cerita
                inspiratif yang dapat membantu orang lain dalam perjalanan kehidupan mereka.
              </p>
              <p className="text-muted-foreground">
                Mendorong budaya saling mendengarkan, menghormati, dan menghargai keragaman
                pengalaman hidup sebagai sumber kekayaan bersama.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Tim Kami
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dibalik platform Kita Berharga terdapat tim yang berdedikasi untuk menyediakan pengalaman terbaik bagi komunitas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                  alt="Anisa Rahman"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Anisa Rahman</h3>
              <p className="text-primary font-medium mb-3">Founder & CEO</p>
              <p className="text-muted-foreground text-sm">
                Memiliki visi untuk menciptakan platform yang menghubungkan orang melalui cerita inspiratif.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a"
                  alt="Budi Santoso"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Budi Santoso</h3>
              <p className="text-primary font-medium mb-3">Content Director</p>
              <p className="text-muted-foreground text-sm">
                Mengkurasi cerita inspiratif dari berbagai kontributor untuk menjaga kualitas konten.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
                  alt="Citra Dewi"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Citra Dewi</h3>
              <p className="text-primary font-medium mb-3">Community Manager</p>
              <p className="text-muted-foreground text-sm">
                Membangun dan menjaga hubungan dengan komunitas pembaca dan kontributor cerita.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-kb-blue/20 to-kb-mint/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Jadilah Bagian dari Perjalanan Kami
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Apakah Anda memiliki cerita inspiratif untuk dibagikan? Atau ingin bergabung dengan komunitas kami?
            Kami selalu terbuka untuk mendengar dari Anda.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium transition-all hover:shadow-lg"
            >
              Hubungi Kami
              <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link
              to="/stories"
              className="inline-flex items-center justify-center px-6 py-3 bg-white border border-primary text-primary rounded-full font-medium transition-all hover:shadow-lg"
            >
              Jelajahi Cerita
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
