
export interface Friend {
  id: string;
  name: string;
  username: string;
  bio: string;
  imageUrl: string;
  stats: {
    views: string;
    likes: string;
  };
  role: string;
  location: string;
  skills: string[];
  projects: number;
}

export interface Category {
  id: string;
  label: string;
  active?: boolean;
}
