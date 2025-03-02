
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ErrorStateProps {
  error: string;
}

export const ErrorState = ({ error }: ErrorStateProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-2xl font-bold mb-4">Oops! {error}</h2>
        <p className="text-muted-foreground mb-8">
          Kami tidak dapat menemukan cerita yang Anda cari.
        </p>
        <Button onClick={() => navigate('/stories')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Daftar Cerita
        </Button>
      </div>
    </div>
  );
};
