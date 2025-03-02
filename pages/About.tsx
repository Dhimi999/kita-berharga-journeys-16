
import { useEffect } from 'react';
import { Heart } from 'lucide-react';

const About = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 font-serif">Tentang Kita Berharga</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Kami membangun platform untuk cerita yang menginspirasi, memberdayakan, dan menghubungkan kita semua.
          </p>
        </div>

        {/* Mission Section */}
        <section className="py-12 bg-kb-mint/10 rounded-3xl mb-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 font-serif">Misi Kami</h2>
                <p className="text-muted-foreground mb-4">
                  Misi kami adalah menciptakan ruang aman dan inklusif untuk berbagi cerita inspiratif 
                  yang dapat mengingatkan kita semua bahwa setiap pengalaman hidup itu berharga.
                </p>
                <p className="text-muted-foreground">
                  Kami percaya bahwa ketika cerita-cerita personal dibagikan, mereka memiliki kekuatan 
                  untuk mengubah perspektif dan menghubungkan kita melalui pengalaman bersama sebagai manusia.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca" 
                  alt="Misi Kita Berharga" 
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-12 mb-16">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 font-serif text-center">Cerita Kami</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-muted-foreground mb-6">
                Kita Berharga dimulai sebagai proyek kecil pada tahun 2024 dengan tujuan sederhana: menciptakan 
                tempat di mana orang dapat menemukan inspirasi dari cerita kehidupan nyata orang lain.
              </p>
              <p className="text-muted-foreground mb-6">
                Kami menyadari bahwa di dunia yang semakin terhubung secara digital, kita sering kali kehilangan 
                koneksi manusiawi dan cerita personal yang dapat memberikan makna pada kehidupan kita.
              </p>
              <p className="text-muted-foreground">
                Platform ini lahir dari keyakinan bahwa setiap orang memiliki cerita yang layak dibagikan dan 
                bahwa berbagi pengalaman kita dapat membantu orang lain menemukan kekuatan, harapan, dan arah dalam 
                perjalanan mereka sendiri.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12 mb-16">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-10 font-serif text-center">Tim Kami</h2>
            
            <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-4">
              <div className="flex flex-col md:flex-row">
                <div className="md:flex-shrink-0">
                  <img 
                    className="h-48 w-full md:w-48 object-cover" 
                    src="https://i.pinimg.com/736x/3a/13/13/3a1313432020bccd45fa715c2f1d2a1c.jpg" 
                    alt="Dhimas Rizky Handoko"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <Heart size={20} className="text-primary mr-2" />
                    <div className="text-xl font-semibold text-gray-900">Dhimas Rizky Handoko</div>
                  </div>
                  <p className="text-sm font-medium text-primary mb-3">Pengembang Tunggal "Kita Berharga"</p>
                  <p className="text-gray-600 text-sm">
                    Sejak masa sekolah, Dhimas selalu menaruh minat mendalam pada kisah-kisah yang menginspirasi. Ia percaya bahwa setiap orang menyimpan cerita berharga yang layak didengar dan dibagikan.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="max-w-lg mx-auto bg-muted/20 rounded-xl p-6">
              <p className="text-gray-700 italic mb-4">
                "Melalui 'Kita Berharga,' saya berharap dapat mendorong lebih banyak orang untuk berani berbagi cerita mereka, karena saya yakin kisah kita semua dapat menjadi sumber kekuatan, harapan, dan kebahagiaan."
              </p>
              <p className="text-right font-medium">– Dhimas Rizky Handoko</p>
            </div>
            
            <div className="max-w-2xl mx-auto mt-8">
              <p className="text-muted-foreground">
                Di "Kita Berharga," Dhimas ingin memperkuat tekad untuk menyoroti sisi kemanusiaan di balik setiap cerita. Melalui platform ini, ia berupaya mewujudkan ruang yang ramah dan inklusif, di mana setiap orang dapat menemukan inspirasi serta semangat baru.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-12 bg-kb-blue/10 rounded-3xl mb-16">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-10 font-serif text-center">Nilai-Nilai Kami</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-kb-peach/30 flex items-center justify-center rounded-full mb-4">
                  <Heart size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Autentisitas</h3>
                <p className="text-muted-foreground">
                  Kami menghargai cerita yang jujur dan autentik, yang menampilkan keindahan dan kompleksitas pengalaman manusia.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-kb-mint/30 flex items-center justify-center rounded-full mb-4">
                  <Heart size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Empati</h3>
                <p className="text-muted-foreground">
                  Kami berusaha memahami dan menghormati perjalanan unik setiap individu, tanpa menghakimi atau meremehkan.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-kb-yellow/30 flex items-center justify-center rounded-full mb-4">
                  <Heart size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Keterhubungan</h3>
                <p className="text-muted-foreground">
                  Kami percaya bahwa berbagi cerita menciptakan jembatan pemahaman dan mengembangkan rasa kebersamaan.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
