
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { ArrowRight, Send, PhoneCall, MapPin, Mail } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const navigate = useNavigate();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Insert the form data into the contact_messages table
      const { error } = await supabase
        .from('contact_messages')
        .insert([{
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }]);
      
      if (error) throw error;
      
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
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Gagal Mengirim Pesan",
        description: "Terjadi kesalahan saat mengirim pesan Anda. Silakan coba lagi nanti.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShareStory = () => {
    navigate('/share-story');
  };

  return (
    <div className="min-h-screen">
      {/* Banner Hero with added padding */}
      <section className="py-16 md:py-24 pt-32 lg:pt-36 xl:pt-40 bg-gradient-to-r from-kb-peach/30 to-kb-mint/20">
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
                {/* Bagian Telepon */}
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-kb-mint/30 flex items-center justify-center rounded-full mr-4">
                    <PhoneCall size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Telepon</h3>
                    {/* WhatsApp */}
                    <a
                      href="https://wa.me/62881036592711"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground block"
                    >
                      WhatsApp: +62 881 0365 92711
                    </a>
                    {/* Telepon Biasa */}
                    <a
                      href="tel:+6281235015278"
                      className="text-muted-foreground block"
                    >
                      Telepon: +62 812 3501 5278
                    </a>
                  </div>
                </div>
                
                {/* Bagian Email */}
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-kb-peach/30 flex items-center justify-center rounded-full mr-4">
                    <Mail size={20} className="text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Email</h3>
                    <a
                      href="mailto:kitaberharga.idn@gmail.com"
                      className="text-muted-foreground block"
                    >
                      kitaberharga.idn@gmail.com
                    </a>
                    <a
                      href="mailto:support@kitaberharga.my.id"
                      className="text-muted-foreground block"
                    >
                      support@kitaberharga.my.id
                    </a>
                  </div>
                </div>
                
                {/* Bagian Lokasi */}
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-kb-blue/30 flex items-center justify-center rounded-full mr-4">
                    <MapPin size={20} className="text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Lokasi</h3>
                    <p className="text-muted-foreground">
                      Jember, Jawa Timur, Indonesia
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 p-6 bg-kb-yellow/20 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Punya Cerita Inspiratif?</h3>
                <p className="text-muted-foreground mb-4">
                  Kami selalu mencari cerita inspiratif untuk dibagikan dengan komunitas kami. 
                  Anda bisa mengisi form berikut untuk membagikan cerita Anda.
                </p>
                <Button 
                  onClick={handleShareStory}
                  className="inline-flex items-center text-primary-foreground font-medium bg-primary hover:bg-primary/90"
                >
                  Bagikan Cerita Anda
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section with embedded Google Maps */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="rounded-xl overflow-hidden h-96 shadow-sm">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3795.0623950575655!2d113.69967497482268!3d-8.169132791861788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd6943a42369d8f%3A0x8bd003425ec58c76!2sAlun-Alun%20Jember!5e1!3m2!1sen!2sid!4v1740909648131!5m2!1sen!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Kita Berharga"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
