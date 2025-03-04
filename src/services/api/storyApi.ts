
import { Story } from '@/types/supabase';
import { supabase } from './supabaseClient';
import { transformStoryData } from '../transformers/storyTransformer';
import { getDummyStories } from '../mock/dummyStories';

// Fetch all published stories from the database
export const fetchAllStories = async (): Promise<Story[]> => {
  try {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('status', 'published')
      .order('date', { ascending: false });  // Sort by date, newest first

    if (error) {
      console.error("Error fetching stories:", error);
      throw error;
    }

    if (!data || data.length === 0) {
      // If no stories in DB, return dummy data
      return getDummyStories();
    }

    // Transform the Supabase data to our Story type
    return data.map(transformStoryData);
  } catch (error) {
    console.error("Failed to fetch stories:", error);
    // Return dummy data in case of error
    return getDummyStories();
  }
};

// Fetch a single story by ID (only published stories)
export const fetchStoryById = async (id: string): Promise<Story | null> => {
  try {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('id', id)
      .eq('status', 'published')
      .maybeSingle();

    if (error) {
      console.error("Error fetching story:", error);
      throw error;
    }

    if (!data) {
      // If story not found in DB, return a dummy story
      const dummyStory = getDummyStories().find(s => s.id === id);
      return dummyStory || null;
    }

    // Transform the Supabase data to our Story type
    return transformStoryData(data);
  } catch (error) {
    console.error(`Failed to fetch story with ID ${id}:`, error);
    
    // Return a dummy story in case of error
    const dummyStory = getDummyStories().find(s => s.id === id);
    return dummyStory || null;
  }
};

// Get featured stories (could be based on likes, category, etc.)
export const getFeaturedStories = async (limit: number = 3): Promise<Story[]> => {
  try {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('status', 'published')
      .order('likes', { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching featured stories:", error);
      throw error;
    }

    if (!data || data.length === 0) {
      // Get dummy stories and sort by likes
      return getDummyStories()
        .sort((a, b) => (b.likes || 0) - (a.likes || 0))
        .slice(0, limit);
    }

    return data.map(transformStoryData);
  } catch (error) {
    console.error("Failed to fetch featured stories:", error);
    return getDummyStories().slice(0, limit);
  }
};
