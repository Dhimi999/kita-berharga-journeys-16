import { Comment, Story } from '@/types/supabase';

// Helper function to transform the story data from Supabase format to our Story type
export const transformStoryData = (data: any): Story => {
  let comments: Comment[] = [];
  
  // Handle comments which might be in different formats
  if (data.comments) {
    try {
      if (typeof data.comments === 'string') {
        // If comments is a JSON string, parse it
        const parsedComments = JSON.parse(data.comments);
        if (Array.isArray(parsedComments)) {
          comments = parsedComments.map(comment => {
            if (typeof comment === 'string') {
              return { 
                name: 'Anonymous', 
                email: 'anonymous@example.com', 
                content: comment, 
                date: new Date().toISOString(),
                // Legacy properties
                text: comment,
                author: 'Anonymous'
              };
            } else {
              // Convert legacy format to new format
              return {
                name: comment.author || comment.name || 'Anonymous',
                email: comment.email || 'anonymous@example.com',
                content: comment.text || comment.content || '',
                date: comment.date || new Date().toISOString(),
                // Keep legacy properties for backward compatibility
                text: comment.text || comment.content || '',
                author: comment.author || comment.name || 'Anonymous'
              };
            }
          });
        }
      } else if (Array.isArray(data.comments)) {
        // If comments is already an array
        comments = data.comments.map(comment => {
          if (typeof comment === 'string') {
            return { 
              name: 'Anonymous', 
              email: 'anonymous@example.com', 
              content: comment, 
              date: new Date().toISOString(),
              // Legacy properties
              text: comment,
              author: 'Anonymous'
            };
          } else {
            // Convert legacy format to new format
            return {
              name: comment.author || comment.name || 'Anonymous',
              email: comment.email || 'anonymous@example.com',
              content: comment.text || comment.content || '',
              date: comment.date || new Date().toISOString(),
              // Keep legacy properties for backward compatibility
              text: comment.text || comment.content || '',
              author: comment.author || comment.name || 'Anonymous'
            };
          }
        });
      }
    } catch (error) {
      console.error("Error parsing comments:", error);
      // Set comments to empty array if parsing fails
      comments = [];
    }
  }

  // Transform the story data
  return {
    id: data.id || Math.random().toString(36).substring(2),
    title: data.title || 'Untitled Story',
    content: data.content || '',
    author: data.author || 'Anonymous',
    date: data.date || new Date().toISOString(),
    category: data.category || 'Uncategorized',
    excerpt: data.excerpt || data.content?.substring(0, 150) + '...' || '',
    header_image: data.header_image || null,
    likes: data.likes || 0,
    comments: comments,
    tags: data.tags || []
  };
};
