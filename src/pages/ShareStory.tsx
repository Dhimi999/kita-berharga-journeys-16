
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send } from 'lucide-react';

const ShareStory = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    contactPreference: 'email', // default to email
    storyBrief: '',
    agreeToPublish: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ 
        ...prev, 
        [name]: (e.target as HTMLInputElement).checked 
      }));
    } else {
      setFormData(prev => ({ 
        ...prev, 
        [name]: value 
      }));
    }
  };

  const handleContactPreferenceChange = (preference: string) => {
    setFormData(prev => ({
      ...prev,
      contactPreference: preference
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Insert the story submission into the database
      const { error } = await supabase
        .from('story_submissions')
        .insert([{
          full_name: formData.fullName,
          email: formData.email,
          whatsapp: formData.whatsapp,
          contact_preference: formData.contactPreference,
          story_brief: formData.storyBrief,
          agree_to_publish: formData.agreeToPublish
        }]);

      if (error) throw error;

      toast({
        title: "Cerita Berhasil Dikirim!",
        description: "Terima kasih telah berbagi cerita Anda. Tim kami akan meninjau dan menghubungi Anda segera.",
      });

      // Redirect back to contact page after successful submission
      setTimeout(() => {
        navigate('/contact');
      }, 2000);

    } catch (error) {
      console.error('Error submitting story:', error);
      toast({
        title: "Gagal Mengirim Cerita",
        description: "Terjadi kesalahan saat mengirim cerita Anda. Silakan coba lagi nanti.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center gap-2"
          onClick={() => navigate('/contact')}
        >
          <ArrowLeft size={16} />
          Kembali ke Kontak
        </Button>

        <div className="max-w-3xl mx-auto">
          <Card className="shadow-md">
            <CardHeader className="text-center bg-gradient-to-r from-kb-mint/30 to-kb-peach/30 rounded-t-lg">
              <CardTitle className="text-2xl md:text-3xl font-bold">
                Bagikan Cerita Inspiratif Anda
              </CardTitle>
              <CardDescription className="mt-2 text-muted-foreground">
                Kami percaya setiap cerita memiliki kekuatan untuk menginspirasi dan memotivasi orang lain.
                Bagikan cerita Anda dan jadilah bagian dari perubahan positif.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="grid gap-1">
                    <label htmlFor="fullName" className="text-sm font-medium">
                      Nama Lengkap
                    </label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-1">
                    <label htmlFor="email" className="text-sm font-medium">
                      Alamat Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-1">
                    <label htmlFor="whatsapp" className="text-sm font-medium">
                      No. WhatsApp
                    </label>
                    <Input
                      id="whatsapp"
                      name="whatsapp"
                      type="tel"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-1">
                    <label className="text-sm font-medium">
                      Berkenan dihubungi melalui:
                    </label>
                    <div className="flex gap-4 mt-1">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="contactPreference"
                          value="email"
                          checked={formData.contactPreference === 'email'}
                          onChange={() => handleContactPreferenceChange('email')}
                          className="h-4 w-4 text-primary"
                        />
                        <span>Email</span>
                      </label>
                      
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="contactPreference"
                          value="whatsapp"
                          checked={formData.contactPreference === 'whatsapp'}
                          onChange={() => handleContactPreferenceChange('whatsapp')}
                          className="h-4 w-4 text-primary"
                        />
                        <span>WhatsApp</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="grid gap-1">
                    <label htmlFor="storyBrief" className="text-sm font-medium">
                      Cerita apa yang ingin Anda bagikan (singkat saja)
                    </label>
                    <Textarea
                      id="storyBrief"
                      name="storyBrief"
                      value={formData.storyBrief}
                      onChange={handleChange}
                      rows={5}
                      required
                      placeholder="Ceritakan secara singkat tentang pengalaman inspiratif Anda..."
                    />
                  </div>
                  
                  <div className="flex items-start space-x-2 mt-4">
                    <input
                      type="checkbox"
                      id="agreeToPublish"
                      name="agreeToPublish"
                      checked={formData.agreeToPublish}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 text-primary rounded"
                      required
                    />
                    <label htmlFor="agreeToPublish" className="text-sm">
                      Jika kisah saya diterima, saya setuju untuk mempublikasikannya pada halaman website Kita Berharga.
                    </label>
                  </div>
                </div>
              
                <CardFooter className="flex justify-end pt-6 px-0">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
                  >
                    {isSubmitting ? 'Mengirim...' : 'Kirim Cerita'}
                    <Send size={16} />
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShareStory;
