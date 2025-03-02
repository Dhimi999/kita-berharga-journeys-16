
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Banner Hero with Added Padding */}
      <section className="py-16 md:py-24 pt-32 bg-gradient-to-r from-kb-mint/30 to-kb-blue/20">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-3 py-1 bg-kb-blue rounded-full text-sm font-medium mb-4">
            Tentang Kami
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Cerita Kami
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Menghubungkan dan menginspirasi melalui cerita yang bermakna
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Perjalanan Kami
              </h2>
              <div className="space-y-4">
                <p>
                  Kita Berharga dimulai sebagai proyek kecil pada tahun 2024 dengan misi sederhana: menciptakan ruang 
                  di mana setiap orang dapat berbagi dan menemukan kisah-kisah inspiratif yang mengubah perspektif dan 
                  membawa harapan.
                </p>
                <p>
                  Platform ini lahir dari keyakinan bahwa setiap orang memiliki cerita berharga yang layak 
                  didengar, dan bahwa dengan membagikan cerita-cerita tersebut, kita dapat menginspirasi, 
                  memberdayakan, dan mengingatkan bahwa kita semua berharga.
                </p>
                <p>
                  Sejak awal, fokus kami adalah menciptakan komunitas yang inklusif, di mana semua orang—tanpa 
                  memandang latar belakang, usia, atau pengalaman—dapat menemukan suara mereka dan membagikan 
                  cerita yang bermakna.
                </p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31" 
                alt="Perjalanan Kita Berharga" 
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gradient-to-r from-kb-yellow/20 to-kb-peach/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-kb-peach rounded-full text-sm font-medium mb-4">
              Tim Kami
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Bertemu dengan Pendiri Kita Berharga
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Di balik platform ini ada seorang individu yang berdedikasi untuk membawa cerita inspiratif 
              ke lebih banyak orang
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-40 h-40 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src="https://i.pinimg.com/736x/3a/13/13/3a1313432020bccd45fa715c2f1d2a1c.jpg" 
                    alt="Dhimas Rizky Handoko" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Dhimas Rizky Handoko</h3>
                  <p className="text-primary font-medium mb-4">Pengembang Tunggal "Kita Berharga"</p>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Sejak masa sekolah, Dhimas selalu menaruh minat mendalam pada kisah-kisah yang menginspirasi. 
                      Ia percaya bahwa setiap orang menyimpan cerita berharga yang layak didengar dan dibagikan. 
                      Ketertarikannya pada hidup manusia tumbuh seiring keinginannya untuk menciptakan ruang aman 
                      bagi siapa pun yang ingin berbagi pengalaman hidup.
                    </p>
                    <p>
                      Di "Kita Berharga," Dhimas ingin memperkuat tekad untuk menyoroti sisi kemanusiaan di balik 
                      setiap cerita. Melalui platform ini, ia berupaya mewujudkan ruang yang ramah dan inklusif, 
                      di mana setiap orang dapat menemukan inspirasi serta semangat baru.
                    </p>
                    <p className="italic">
                      "Melalui 'Kita Berharga,' saya berharap dapat mendorong lebih banyak orang untuk berani 
                      berbagi cerita mereka, karena saya yakin kisah kita semua dapat menjadi sumber kekuatan, 
                      harapan, dan kebahagiaan."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Misi & Nilai Kami
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-kb-mint/10 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Misi</h3>
                <p className="text-muted-foreground">
                  Menyediakan platform yang aman dan inklusif untuk membagikan dan menemukan cerita 
                  inspiratif yang dapat memberikan harapan, mengubah perspektif, dan mengingatkan 
                  bahwa setiap orang berharga.
                </p>
              </div>
              
              <div className="bg-kb-blue/10 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Nilai-nilai</h3>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Ketulusan dan Kejujuran</li>
                  <li>• Empati dan Pengertian</li>
                  <li>• Inklusivitas dan Penerimaan</li>
                  <li>• Keberanian dan Keaslian</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-kb-peach/40 to-kb-mint/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Jadilah Bagian dari Perjalanan Kami
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Kami mengundang Anda untuk bergabung dengan komunitas Kita Berharga dan menjadi bagian dari 
            perjalanan menginspirasi ini. Bagikan cerita Anda atau temukan inspirasi dari cerita orang lain.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/stories" 
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium transition-all hover:shadow-md"
            >
              Jelajahi Cerita
            </Link>
            <Link 
              to="/contact" 
              className="inline-flex items-center px-6 py-3 bg-white text-foreground border border-input rounded-full font-medium transition-all hover:shadow-md"
            >
              Hubungi Kami
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
