
import { supabase } from '@/integrations/supabase/client';
import { Story } from '@/types/supabase';

/**
 * Fetch all stories from the database
 */
export const fetchAllStories = async (): Promise<Story[]> => {
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching stories:', error);
    throw new Error(error.message);
  }

  return data.map(story => transformStoryData(story));
};

/**
 * Fetch featured stories (most liked or newest)
 */
export const fetchFeaturedStories = async (limit = 3): Promise<Story[]> => {
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching featured stories:', error);
    throw new Error(error.message);
  }

  return data.map(story => transformStoryData(story));
};

/**
 * Fetch a story by ID
 */
export const fetchStoryById = async (id: string): Promise<Story | null> => {
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Story not found
    }
    console.error('Error fetching story by ID:', error);
    throw new Error(error.message);
  }

  return transformStoryData(data);
};

/**
 * Like a story
 */
export const likeStory = async (id: string): Promise<Story | null> => {
  // First get the current story
  const { data: story, error: fetchError } = await supabase
    .from('stories')
    .select('likes')
    .eq('id', id)
    .single();

  if (fetchError) {
    console.error('Error fetching story for liking:', fetchError);
    throw new Error(fetchError.message);
  }

  const currentLikes = story.likes || 0;
  const newLikes = currentLikes + 1;

  // Then update the likes
  const { data, error: updateError } = await supabase
    .from('stories')
    .update({ likes: newLikes })
    .eq('id', id)
    .select('*')
    .single();

  if (updateError) {
    console.error('Error updating story likes:', updateError);
    throw new Error(updateError.message);
  }

  return transformStoryData(data);
};

/**
 * Add a comment to a story
 */
export const addCommentToStory = async (id: string, comment: any): Promise<Story | null> => {
  // First get the current story with comments
  const { data: story, error: fetchError } = await supabase
    .from('stories')
    .select('comments')
    .eq('id', id)
    .single();

  if (fetchError) {
    console.error('Error fetching story for commenting:', fetchError);
    throw new Error(fetchError.message);
  }

  // Handle the case where comments might be null or not an array
  let currentComments = [];
  if (Array.isArray(story.comments)) {
    currentComments = story.comments;
  } else if (story.comments) {
    try {
      // Try to parse if it's a JSON string
      const parsed = JSON.parse(String(story.comments));
      if (Array.isArray(parsed)) {
        currentComments = parsed;
      }
    } catch (e) {
      // If parsing fails, start with an empty array
      console.warn('Comments field is not an array, starting fresh');
    }
  }

  // Add the new comment
  const newComments = [...currentComments, comment];

  // Then update the comments
  const { data, error: updateError } = await supabase
    .from('stories')
    .update({ comments: newComments })
    .eq('id', id)
    .select('*')
    .single();

  if (updateError) {
    console.error('Error updating story comments:', updateError);
    throw new Error(updateError.message);
  }

  return transformStoryData(data);
};

/**
 * Transform raw database story data to Story type
 */
const transformStoryData = (data: any): Story => {
  // Ensure comments is always an array
  let comments: any[] = [];

  if (data.comments) {
    if (Array.isArray(data.comments)) {
      comments = data.comments;
    } else {
      try {
        // Handle JSON parsing for different types
        if (typeof data.comments === 'string') {
          const parsed = JSON.parse(data.comments);
          if (Array.isArray(parsed)) {
            comments = parsed;
          }
        } else if (typeof data.comments === 'object') {
          // If it's already an object but not an array, try to extract array
          const commentsObj = data.comments;
          if (commentsObj && Object.keys(commentsObj).length > 0) {
            // Convert object to array if needed
            const possibleArray = Object.values(commentsObj);
            
            // Check if possibleArray exists and handle accordingly
            if (possibleArray && possibleArray.length > 0) {
              if (Array.isArray(possibleArray[0])) {
                // Handle case where the first value is itself an array
                comments = possibleArray[0] as any[];
              } else {
                // Fix for TypeScript error: Convert all values to strings or objects
                comments = possibleArray
                  .filter(item => item !== null && item !== undefined)
                  .map(item => {
                    if (typeof item === 'object') {
                      return item;
                    } else {
                      // Convert numbers, booleans, etc. to strings
                      return String(item);
                    }
                  }) as any[];
              }
            }
          }
        }
      } catch (e) {
        console.warn('Failed to parse comments JSON', e);
      }
    }
  }

  // Format the date to a more user-friendly format
  const formatSimpleDate = (dateString: string | null | undefined): string => {
    if (!dateString) return '';
    
    try {
      const monthsIndonesian = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) return '';
      
      const day = date.getDate();
      const month = monthsIndonesian[date.getMonth()];
      const year = date.getFullYear();
      
      return `${day} ${month} ${year}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  // Format the date but don't add it as a separate property
  const formattedDateString = formatSimpleDate(data.published_at || data.created_at);

  return {
    id: data.id,
    title: data.title,
    author: data.author,
    content: data.content,
    excerpt: data.content ? data.content.substring(0, 150) + '...' : '',
    date: formattedDateString, // Use the formatted date string directly here
    category: data.category,
    likes: data.likes || 0,
    comments: comments,
    header_image: data.header_image,
    imageUrl: data.header_image, // Map the header_image to imageUrl for StoryCard component
    featured: false, // Default value for featured property
  };
};
