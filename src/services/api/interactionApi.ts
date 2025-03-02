
import { Comment, Story } from '@/types/supabase';
import { supabase } from './supabaseClient';
import { fetchStoryById } from './storyApi';

// Like a story
export const likeStory = async (id: string): Promise<Story | null> => {
  try {
    // First, get current likes
    const { data: storyData, error: fetchError } = await supabase
      .from('stories')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (fetchError) {
      console.error("Error fetching story likes:", fetchError);
      throw fetchError;
    }
    
    // Add null check for storyData
    if (!storyData) {
      console.error("No story found with ID:", id);
      throw new Error(`Story with ID ${id} not found`);
    }
    
    const currentLikes = storyData.likes || 0;
    const newLikes = currentLikes + 1;
    
    // Update likes with proper type casting
    const { error: updateError } = await supabase
      .from('stories' as any)
      .update({ likes: newLikes } as any)
      .eq('id', id);
    
    if (updateError) {
      console.error("Error updating story likes:", updateError);
      throw updateError;
    }
    
    // Return updated story
    return fetchStoryById(id);
  } catch (error) {
    console.error(`Failed to like story with ID ${id}:`, error);
    // For demo purposes, just increment and return dummy data
    const dummyStories = (await import('../mock/dummyStories')).getDummyStories();
    const dummyStory = dummyStories.find(s => s.id === id);
    if (dummyStory) {
      dummyStory.likes += 1;
      return dummyStory;
    }
    return null;
  }
};

// Add a comment to a story
export const addCommentToStory = async (
  storyId: string, 
  comment: { name: string; email: string; content: string; date?: string }
): Promise<Story | null> => {
  try {
    // First, get current story
    const story = await fetchStoryById(storyId);
    if (!story) {
      throw new Error(`Story with ID ${storyId} not found`);
    }
    
    // Add date if not provided
    const newComment: Comment = {
      ...comment,
      date: comment.date || new Date().toISOString(),
      // Add legacy properties for backward compatibility
      text: comment.content,
      author: comment.name
    };
    
    // Add new comment to the story
    const updatedComments = [...story.comments, newComment];
    
    // Update comments in the database with proper type casting
    const { error: updateError } = await supabase
      .from('stories' as any)
      .update({ comments: updatedComments } as any)
      .eq('id', storyId);
    
    if (updateError) {
      console.error("Error updating story comments:", updateError);
      throw updateError;
    }
    
    // Return updated story
    return fetchStoryById(storyId);
  } catch (error) {
    console.error(`Failed to add comment to story with ID ${storyId}:`, error);
    
    // For demo purposes, return a modified dummy story
    const dummyStories = (await import('../mock/dummyStories')).getDummyStories();
    const dummyStory = dummyStories.find(s => s.id === storyId);
    if (dummyStory) {
      dummyStory.comments.push(comment as Comment);
      return dummyStory;
    }
    return null;
  }
};

// Legacy method for backward compatibility
export const addComment = async (
  storyId: string, 
  comment: { text: string; author: string; }
): Promise<Comment[]> => {
  try {
    // Convert legacy format to new format
    const result = await addCommentToStory(storyId, {
      name: comment.author,
      email: 'anonymous@example.com',
      content: comment.text,
      date: new Date().toISOString()
    });
    
    return result?.comments || [];
  } catch (error) {
    console.error(`Failed to add comment to story with ID ${storyId}:`, error);
    // Return empty array in case of error
    return [];
  }
};
