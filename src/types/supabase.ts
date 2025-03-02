
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
  tags?: string[];
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
export interface Database {
  public: {
    Tables: {
      stories: {
        Row: {
          id: string;
          title: string;
          content: string;
          author: string;
          category: string;
          likes?: number;
          comments?: Comment[];
          header_image?: string;
          created_at?: string;
          published_at?: string;
          [key: string]: any;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          author: string;
          category: string;
          likes?: number;
          comments?: Comment[];
          header_image?: string;
          [key: string]: any;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          author?: string;
          category?: string;
          likes?: number;
          comments?: Comment[];
          header_image?: string;
          [key: string]: any;
        };
      };
      admins: {
        Row: {
          id: string;
          username: string;
          email: string;
          role?: string;
          created_at?: string;
          password: string;
          [key: string]: any;
        };
        Insert: {
          id?: string;
          username: string;
          email: string;
          role?: string;
          password: string;
          [key: string]: any;
        };
        Update: {
          id?: string;
          username?: string;
          email?: string;
          role?: string;
          password?: string;
          [key: string]: any;
        };
      };
    };
  };
}
