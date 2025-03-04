
import { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';

interface StoryContentProps {
  content: string;
}

export const StoryContent = ({ content }: StoryContentProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize DOMPurify to allow certain HTML tags but sanitize dangerous ones
    if (contentRef.current) {
      // Safety measure: even though we trust our database, we still sanitize content
      // to prevent XSS attacks if someone malicious gets access to our database
      const sanitizedContent = DOMPurify.sanitize(content, {
        ALLOWED_TAGS: ['p', 'br', 'b', 'strong', 'i', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ol', 'ul', 'li', 'a', 'blockquote', 'pre', 'code', 'img'],
        ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'target'],
      });
      
      contentRef.current.innerHTML = sanitizedContent;
    }
  }, [content]);

  return (
    <div className="prose prose-lg max-w-none mb-12 px-0 sm:px-2 md:px-4 lg:px-6">
      <div ref={contentRef} className="story-content"></div>
    </div>
  );
};
