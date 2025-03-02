import { createClient } from '@supabase/supabase-js';
import { Comment, Story } from '@/types/supabase';
import { transformStoryData } from './transformers/storyTransformer';
import { fetchAllStories, fetchStoryById, getFeaturedStories } from './api/storyApi';
import { getCategories } from './api/categoryApi';
import { likeStory, addCommentToStory, addComment } from './api/interactionApi';

// For backward compatibility
export const fetchFeaturedStories = getFeaturedStories;

// Re-export everything
export {
  transformStoryData,
  fetchAllStories,
  fetchStoryById,
  getFeaturedStories,
  getCategories,
  likeStory,
  addCommentToStory,
  addComment
};

// This function is used directly in several places, so keep it here for now
// and re-export it from the mock data service
export { getDummyStories } from './mock/dummyStories';
