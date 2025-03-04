
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
        ALLOWED_TAGS: ['p', 'br', 'b', 'strong', 'i', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ol', 'ul', 'li', 'a', 'blockquote', 'pre', 'code', 'img', 'span', 'div', 'table', 'tr', 'td', 'th', 'thead', 'tbody', 'caption'],
        ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'target', 'style', 'title', 'width', 'height', 'id'],
      });
      
      contentRef.current.innerHTML = sanitizedContent;
      
      // Add default styling to content elements for better readability
      const addDefaultStyles = () => {
        if (!contentRef.current) return;
        
        // Add styles to paragraphs
        const paragraphs = contentRef.current.querySelectorAll('p');
        paragraphs.forEach(p => {
          if (!p.getAttribute('style')) {
            p.style.marginBottom = '1.5rem';
            p.style.lineHeight = '1.8';
          }
        });
        
        // Add styles to links
        const links = contentRef.current.querySelectorAll('a');
        links.forEach(a => {
          if (!a.getAttribute('style')) {
            a.style.color = '#166534'; // green-800
            a.style.textDecoration = 'underline';
          }
          // Make sure links open in new tab for security
          if (!a.getAttribute('target')) {
            a.setAttribute('target', '_blank');
            a.setAttribute('rel', 'noopener noreferrer');
          }
        });
        
        // Add styles to blockquotes
        const blockquotes = contentRef.current.querySelectorAll('blockquote');
        blockquotes.forEach(quote => {
          if (!quote.getAttribute('style')) {
            quote.style.borderLeft = '4px solid #d1d5db';
            quote.style.paddingLeft = '1rem';
            quote.style.fontStyle = 'italic';
            quote.style.margin = '1.5rem 0';
            quote.style.color = '#4b5563';
          }
        });
        
        // Add styles to images
        const images = contentRef.current.querySelectorAll('img');
        images.forEach(img => {
          if (!img.getAttribute('style')) {
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
            img.style.borderRadius = '0.375rem';
            img.style.marginTop = '1rem';
            img.style.marginBottom = '1rem';
          }
          // Add alt text if missing
          if (!img.getAttribute('alt')) {
            img.setAttribute('alt', 'Story image');
          }
        });
      };
      
      // Apply default styles
      addDefaultStyles();
    }
  }, [content]);

  return (
    <div className="prose prose-lg max-w-none mb-12 px-0 sm:px-2 md:px-4 lg:px-6">
      <div ref={contentRef} className="story-content"></div>
    </div>
  );
};
