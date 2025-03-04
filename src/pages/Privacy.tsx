
import React, { useEffect } from 'react';

const Privacy = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 font-serif">Kebijakan Privasi</h1>
          
          <div className="prose max-w-none">
            <p className="mb-6">
              Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat Anda menggunakan layanan kami.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Informasi yang Kami Kumpulkan</h2>
            <p>
              Kami mungkin mengumpulkan informasi pribadi seperti nama, alamat email, dan nomor telepon saat Anda mendaftar atau menggunakan layanan kami. Kami juga dapat mengumpulkan informasi non-pribadi seperti data penggunaan dan preferensi.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">2. Penggunaan Informasi</h2>
            <p>
              Kami menggunakan informasi yang dikumpulkan untuk menyediakan, memelihara, dan meningkatkan layanan kami, serta untuk berkomunikasi dengan Anda. Kami tidak akan menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga tanpa persetujuan Anda.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">3. Keamanan Data</h2>
            <p>
              Kami mengambil langkah-langkah yang wajar untuk melindungi informasi pribadi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah. Namun, tidak ada metode transmisi atau penyimpanan elektronik yang 100% aman.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">4. Cookie dan Teknologi Pelacakan</h2>
            <p>
              Kami mungkin menggunakan cookie dan teknologi pelacakan serupa untuk meningkatkan pengalaman Anda dan mengumpulkan informasi tentang bagaimana Anda berinteraksi dengan layanan kami.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">5. Perubahan Kebijakan</h2>
            <p>
              Kami berhak untuk memperbarui kebijakan privasi ini kapan saja. Kami akan memberi tahu Anda tentang perubahan dengan memposting kebijakan yang direvisi di situs kami.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">6. Kontak</h2>
            <p>
              Jika Anda memiliki pertanyaan tentang kebijakan privasi kami, silakan hubungi kami di:
              <br />
              Email: privacy@kitaberharga.id
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
