
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Use environment variables or fallback to empty strings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Check if URL is valid to prevent runtime errors
const isValidUrl = supabaseUrl && supabaseUrl !== 'https://your-project.supabase.co';

// Create client with proper error handling
export const supabase = isValidUrl 
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : {
      // Provide mock implementation that won't throw runtime errors
      from: () => ({
        select: () => ({
          eq: () => ({
            maybeSingle: () => Promise.resolve({ data: null, error: null }),
            order: () => Promise.resolve({ data: null, error: null }),
          }),
          order: () => Promise.resolve({ data: null, error: null }),
        }),
        update: () => ({
          eq: () => Promise.resolve({ data: null, error: null }),
        }),
      }),
    } as any;
