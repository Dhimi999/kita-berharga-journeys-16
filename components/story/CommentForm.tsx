
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Send } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface CommentFormProps {
  onSubmit: (name: string, email: string, content: string) => Promise<void>;
}

export const CommentForm = ({ onSubmit }: CommentFormProps) => {
  const { toast } = useToast();
  const [comment, setComment] = useState('');
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment.trim() || !commentName.trim() || !commentEmail.trim()) {
      toast({
        title: "Input tidak lengkap",
        description: "Mohon lengkapi semua field",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(commentName, commentEmail, comment);
      setComment('');
      setCommentName('');
      setCommentEmail('');
    } catch (err) {
      console.error('Failed to add comment:', err);
      toast({
        title: "Gagal mengirim komentar",
        description: "Mohon coba lagi nanti",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input 
              placeholder="Nama Anda" 
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              required
            />
            <Input 
              type="email" 
              placeholder="Email Anda (tidak akan ditampilkan)" 
              value={commentEmail}
              onChange={(e) => setCommentEmail(e.target.value)}
              required
            />
          </div>
          <Textarea 
            placeholder="Bagikan tanggapan Anda..." 
            className="mb-4 resize-none min-h-24"
            value={comment}
            onChange={(e) => setComment(e.target.value)} 
            required
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              <Send size={16} className="mr-2" />
              {isSubmitting ? 'Mengirim...' : 'Kirim Komentar'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
