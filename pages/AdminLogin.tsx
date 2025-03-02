
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  email: z.string().email({
    message: 'Masukkan alamat email yang valid.',
  }),
  password: z.string().min(6, {
    message: 'Password harus minimal 6 karakter.',
  }),
});

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      // First check if the admin exists in our admins table
      const { data: adminData, error: adminError } = await supabase
        .from('admins')
        .select('*')
        .eq('email', values.email)
        .single();
      
      if (adminError || !adminData) {
        toast({
          title: "Login Gagal",
          description: "Email atau password tidak valid.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Verify password (in a real app, you'd use proper password hashing)
      if (adminData.password !== values.password) {
        toast({
          title: "Login Gagal",
          description: "Email atau password tidak valid.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Set admin session (in a real app, use proper authentication)
      localStorage.setItem('adminUser', JSON.stringify({
        id: adminData.id,
        email: adminData.email,
        username: adminData.username,
        role: adminData.role
      }));
      
      toast({
        title: "Login Berhasil",
        description: "Selamat datang kembali, " + adminData.username,
      });
      
      // Redirect to admin dashboard (to be created)
      // For now, redirect to homepage
      navigate('/');
      
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal melakukan login. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Admin Login</h1>
            <p className="text-muted-foreground mt-2">
              Masuk untuk mengelola konten website
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-muted-foreground">
                            <User size={16} />
                          </span>
                          <Input
                            placeholder="email@contoh.com"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-muted-foreground">
                            <Lock size={16} />
                          </span>
                          <Input
                            type="password"
                            placeholder="••••••"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Memproses..." : "Masuk"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
