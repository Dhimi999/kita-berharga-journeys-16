
export interface Story {
  id: string;
  title: string;
  author: string;
  content: string;
  excerpt?: string;
  date?: string;
  category: string;
  likes: number;
  comments: any[];
  header_image?: string;
  featured?: boolean;
  imageUrl?: string;
}

export interface Comment {
  name: string;
  email: string;
  content: string;
  date: string;
}

export interface Admin {
  id: string;
  username: string;
  email: string;
  role?: string;
  created_at?: string;
}
