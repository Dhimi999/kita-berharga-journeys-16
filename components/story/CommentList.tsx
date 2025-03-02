
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle } from 'lucide-react';

interface CommentListProps {
  comments: any[];
  formatDate: (dateString: string) => string;
}

export const CommentList = ({ comments, formatDate }: CommentListProps) => {
  if (!comments || comments.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground bg-gray-50 rounded-lg">
        <MessageCircle className="mx-auto h-10 w-10 mb-2 opacity-30" />
        <p>Belum ada komentar untuk cerita ini.</p>
        <p>Jadilah yang pertama berbagi tanggapan!</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {comments.map((comment: any, index: number) => (
        <div key={index} className="p-4 rounded-lg border border-border bg-white shadow-sm">
          <div className="flex items-center mb-3">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {comment.name?.substring(0, 2).toUpperCase() || "UN"}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{comment.name}</div>
              <div className="text-sm text-muted-foreground">
                {formatDate(comment.date)}
              </div>
            </div>
          </div>
          <p className="text-foreground">{comment.content}</p>
        </div>
      ))}
    </div>
  );
};
