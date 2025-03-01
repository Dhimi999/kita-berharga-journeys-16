
import { CommentForm } from './CommentForm';
import { CommentList } from './CommentList';

interface CommentsSectionProps {
  comments: any[];
  formatDate: (dateString: string) => string;
  onSubmitComment: (name: string, email: string, content: string) => Promise<void>;
}

export const CommentsSection = ({ 
  comments, 
  formatDate, 
  onSubmitComment 
}: CommentsSectionProps) => {
  return (
    <div id="comments-section" className="scroll-mt-24">
      <h3 className="text-2xl font-bold mb-6 font-serif">Komentar ({comments?.length || 0})</h3>
      
      <CommentForm onSubmit={onSubmitComment} />
      <CommentList comments={comments} formatDate={formatDate} />
    </div>
  );
};
