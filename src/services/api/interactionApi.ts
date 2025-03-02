
import { supabase } from './supabaseClient';
import { Comment, Story } from '@/types/supabase';
import { fetchStoryById } from './storyApi';
import { transformStoryData } from '../transformers/storyTransformer';

// Function to add a like to a story
export const likeStory = async (storyId: string): Promise<Story | null> => {
  try {
    // First fetch the story to get current like count
    const storyData = await fetchStoryById(storyId);
    if (!storyData) {
      console.error("Story not found");
      return null;
    }

    // Increment likes count
    const newLikes = (storyData.likes || 0) + 1;
    
    // Update story with new likes count
    const { data, error } = await supabase
      .from('stories')
      .update({ likes: newLikes } as any)
      .eq('id', storyId);

    if (error) {
      console.error("Error updating story likes:", error);
      return null;
    }

    // Return updated story
    return { ...storyData, likes: newLikes };
  } catch (error) {
    console.error("Failed to like story:", error);
    return null;
  }
};

// Function to add a comment to a story
export const addComment = async (
  storyId: string, 
  name: string, 
  email: string, 
  content: string
): Promise<Comment | null> => {
  try {
    // Create comment object
    const newComment: Comment = {
      name, 
      email, 
      content,
      date: new Date().toISOString(),
    };
    
    return newComment;
  } catch (error) {
    console.error("Failed to add comment:", error);
    return null;
  }
};

// Function to add a comment to a story and update it in the database
export const addCommentToStory = async (
  storyId: string, 
  name: string, 
  email: string, 
  content: string
): Promise<Story | null> => {
  try {
    // First get the current story with all existing comments
    const storyData = await fetchStoryById(storyId);
    if (!storyData) {
      console.error("Story not found");
      return null;
    }

    // Create a new comment
    const newComment: Comment = {
      name,
      email,
      content,
      date: new Date().toISOString(),
    };

    // Add the new comment to the existing comments array
    const updatedComments = [...(storyData.comments || []), newComment];
    
    // Update the story in the database with the new comments array
    const { data, error } = await supabase
      .from('stories')
      .update({ comments: updatedComments } as any)
      .eq('id', storyId);

    if (error) {
      console.error("Error updating story comments:", error);
      return null;
    }

    // Return the updated story
    return {
      ...storyData,
      comments: updatedComments,
    };
  } catch (error) {
    console.error("Failed to add comment to story:", error);
    return null;
  }
};
