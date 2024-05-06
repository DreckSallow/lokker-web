export interface Collection {
  name: string;
  collection_id: number;
}

export interface Article {
  article_id: number;
  title: string;
  content: string;
  // order :number,
  update_at: string;
  collection_id: number;
}
export interface UserProfile {
  bio: string;
  email: string;
  profile_id: number;
  user_id: number;
  username: string
  twitter_url?: string;
  website_url?: string;
}
