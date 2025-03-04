
import React, { useEffect } from 'react';

const Terms = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 font-serif">Ketentuan Layanan</h1>
          
          <div className="prose max-w-none">
            <p className="mb-6">
              Selamat datang di Kita Berharga. Dengan mengakses dan menggunakan layanan kami, Anda menyetujui untuk terikat oleh ketentuan dan persyaratan berikut.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Penggunaan Layanan</h2>
            <p>
              Anda setuju untuk menggunakan layanan kami hanya untuk tujuan yang sah dan sesuai dengan ketentuan ini. Anda tidak boleh menggunakan layanan kami dengan cara yang melanggar hukum atau peraturan yang berlaku.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">2. Konten Pengguna</h2>
            <p>
              Saat Anda membagikan cerita atau konten lainnya di platform kami, Anda tetap memiliki hak atas konten tersebut. Namun, Anda memberikan kami lisensi untuk menggunakan, memodifikasi, dan mendistribusikan konten Anda di platform kami.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">3. Akurasi Informasi</h2>
            <p>
              Kami berusaha keras untuk memastikan informasi di situs kami akurat dan lengkap. Namun, kami tidak menjamin bahwa semua informasi selalu akurat, lengkap, atau terkini.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">4. Perubahan Ketentuan</h2>
            <p>
              Kami berhak untuk mengubah ketentuan layanan ini kapan saja. Perubahan akan berlaku segera setelah diposting di situs kami. Penggunaan berkelanjutan Anda atas layanan kami setelah perubahan tersebut merupakan persetujuan Anda terhadap ketentuan yang direvisi.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">5. Kontak</h2>
            <p>
              Jika Anda memiliki pertanyaan tentang ketentuan layanan kami, silakan hubungi kami di:
              <br />
              Email: info@kitaberharga.id
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
