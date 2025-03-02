
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { ArrowRight, Send, PhoneCall, MapPin, Mail } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulasi pengiriman form
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Pesan Terkirim!",
        description: "Terima kasih telah menghubungi kami. Tim kami akan segera merespons pesan Anda.",
      });
      
      // Reset form setelah berhasil
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      {/* Banner Hero */}
      <section className="py-24 bg-gradient-to-r from-kb-peach/30 to-kb-mint/20">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-3 py-1 bg-kb-peach/50 rounded-full text-sm font-medium mb-4">
            Hubungi Kami
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Mari Terhubung
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Apakah Anda memiliki cerita inspiratif untuk dibagikan atau ingin berkolaborasi dengan kami?
            Kami sangat menantikan kabar dari Anda!
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Kirim Pesan
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subjek
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium transition-all hover:shadow-lg disabled:opacity-70"
                >
                  {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
                  <Send size={18} className="ml-2" />
                </button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Informasi Kontak
              </h2>
              <p className="text-muted-foreground mb-8">
                Anda juga dapat menghubungi kami langsung melalui informasi kontak di bawah ini
                atau mengunjungi kantor kami selama jam kerja.
              </p>
              
			<div className="space-y-6">
				<div className="flex items-start">
					<div className="w-10 h-10 bg-kb-mint/30 flex items-center justify-center rounded-full mr-4">
						<PhoneCall size={20} className="text-primary" />
					</div>
					<div>
						<h3 className="text-lg font-medium mb-1">Telepon</h3>
						<div className="space-y-1">
							<a
								href="https://wa.me/62881036592711"
								target="_blank"
								rel="noopener noreferrer"
								className="text-muted-foreground block"
							>
								WhatsApp: +62 881 0365 92711
							</a>
							<a
								href="tel:+628199483292"
								className="text-muted-foreground block"
							>
								Telefon: +62 819 9483 292
							</a>
						</div>
					</div>
				</div>
				
				<div className="flex items-start">
					<div className="w-10 h-10 bg-kb-peach/30 flex items-center justify-center rounded-full mr-4">
						<Mail size={20} className="text-secondary-foreground" />
					</div>
					<div>
						<h3 className="text-lg font-medium mb-1">Email</h3>
						<div className="space-y-1">
							<a
								href="mailto:kitaberharga.id@gmail.com"
								className="text-muted-foreground block"
							>
								kitaberharga.id@gmail.com
							</a>
							<a
								href="mailto:support@kitaberharga.my.id"
								className="text-muted-foreground block"
							>
								support@kitaberharga.my.id
							</a>
						</div>
					</div>
				</div>
			</div>

                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-kb-blue/30 flex items-center justify-center rounded-full mr-4">
                    <MapPin size={20} className="text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Lokasi</h3>
                    <p className="text-muted-foreground">
                      Jember<br />
                      Jawa Timur<br />
                      Indonesia
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 p-6 bg-kb-yellow/20 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Punya Cerita Inspiratif?</h3>
                <p className="text-muted-foreground mb-4">
                  Kami selalu mencari cerita inspiratif untuk dibagikan dengan komunitas kami. 
                  Jika Anda memiliki cerita yang ingin dibagikan, hubungi kami melalui form 
                  atau email dengan subjek "Pengajuan Cerita".
                </p>
                <a 
                  href="mailto:story@kitaberharga.id?subject=Pengajuan%20Cerita"
                  className="inline-flex items-center text-primary font-medium hover:underline"
                >
                  Kirim cerita Anda ke story@kitaberharga.id
                  <ArrowRight size={16} className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="rounded-xl overflow-hidden h-96 shadow-sm">
            {/* Mock map dengan background */}
            <div className="w-full h-full bg-kb-softgray flex items-center justify-center">
              <p className="text-muted-foreground">Peta Lokasi Kantor</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
