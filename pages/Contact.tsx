
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactInfo = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <div className="flex items-start space-x-4">
    <div className="mt-1 bg-primary/10 p-3 rounded-full">
      {icon}
    </div>
    <div>
      <h3 className="font-medium text-lg">{title}</h3>
      <div className="mt-1 text-muted-foreground">
        {children}
      </div>
    </div>
  </div>
);

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Pesan Terkirim!",
      description: "Terima kasih telah menghubungi kami. Kami akan segera merespons.",
    });

    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 font-serif">Hubungi Kami</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Kami selalu terbuka untuk saran, pertanyaan, atau hanya untuk mengobrol. Jangan ragu untuk menghubungi kami.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-6">Kirim Pesan</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Nama</label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nama lengkap Anda"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alamat@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Pesan</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tulis pesan Anda di sini..."
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
              </Button>
            </form>
          </div>

          <div className="mt-8 lg:mt-0">
            <h2 className="text-2xl font-bold mb-6">Informasi Kontak</h2>
            <div className="space-y-6 bg-muted/30 p-6 rounded-xl">
              <ContactInfo 
                icon={<Mail className="h-6 w-6 text-primary" />} 
                title="Email"
              >
                <p>kitaberharga.id@gmail.com</p>
                <p>support@kitaberharga.my.id</p>
              </ContactInfo>

              <ContactInfo 
                icon={<Phone className="h-6 w-6 text-primary" />} 
                title="Telepon"
              >
                <p>+62881036592711 (WhatsApp)</p>
                <p>+6281235015278 (Telepon)</p>
              </ContactInfo>

              <ContactInfo 
                icon={<MapPin className="h-6 w-6 text-primary" />} 
                title="Alamat"
              >
                <p>Jember, Jawa Timur, Indonesia</p>
              </ContactInfo>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Jam Operasional</h3>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-muted-foreground">Senin - Jumat:</div>
                  <div>08:00 - 17:00 WIB</div>
                  
                  <div className="text-muted-foreground">Sabtu:</div>
                  <div>09:00 - 15:00 WIB</div>
                  
                  <div className="text-muted-foreground">Minggu:</div>
                  <div>Tutup</div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-primary/10 rounded-lg">
              <p className="text-sm">
                <strong>Catatan:</strong> Untuk pertanyaan tentang cerita atau kerjasama, Anda bisa menghubungi kami melalui email dengan subjek "Kerjasama" atau "Cerita Saya".
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
