
export interface Story {
  id: string;
  title: string;
  author: string;
  content: string;
  excerpt?: string;
  date?: string;
  category: string;
  likes: number;
  comments: Comment[];
  header_image?: string;
  featured?: boolean;
  imageUrl?: string;
  tags?: string[]; // Add tags property to fix related errors
}

export interface Comment {
  name: string;
  email: string;
  content: string;
  date: string;
  // Legacy properties for backward compatibility
  text?: string;
  author?: string;
}

export interface Admin {
  id: string;
  username: string;
  email: string;
  role?: string;
  created_at?: string;
}

// Minimal Database type for Supabase client
export interface Database {}
