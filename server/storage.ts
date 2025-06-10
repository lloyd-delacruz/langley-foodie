import { supabase } from './lib/supabase';
import type { 
  Profile, 
  InsertProfile, 
  Post, 
  InsertPost, 
  UpdatePost,
  PostWithAuthor 
} from '@shared/schema';

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // Profile operations
  getProfile(id: string): Promise<Profile | null>;
  getProfileByEmail(email: string): Promise<Profile | null>;
  createProfile(profile: InsertProfile & { id: string }): Promise<Profile>;
  updateProfile(id: string, updates: Partial<InsertProfile>): Promise<Profile>;

  // Post operations
  getPosts(options?: { 
    published?: boolean; 
    category?: string; 
    authorId?: string;
    limit?: number;
    offset?: number;
  }): Promise<PostWithAuthor[]>;
  getPost(id: string): Promise<PostWithAuthor | null>;
  createPost(post: InsertPost & { author_id: string }): Promise<Post>;
  updatePost(id: string, updates: UpdatePost): Promise<Post>;
  deletePost(id: string): Promise<boolean>;
  getPostsByAuthor(authorId: string): Promise<PostWithAuthor[]>;
}

export class SupabaseStorage implements IStorage {
  // Profile operations
  async getProfile(id: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return data as Profile;
  }

  async getProfileByEmail(email: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) return null;
    return data as Profile;
  }

  async createProfile(profile: InsertProfile & { id: string }): Promise<Profile> {
    const { data, error } = await supabase
      .from('profiles')
      .insert(profile)
      .select()
      .single();

    if (error) throw new Error(`Failed to create profile: ${error.message}`);
    return data as Profile;
  }

  async updateProfile(id: string, updates: Partial<InsertProfile>): Promise<Profile> {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update profile: ${error.message}`);
    return data as Profile;
  }

  // Post operations
  async getPosts(options: { 
    published?: boolean; 
    category?: string; 
    authorId?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<PostWithAuthor[]> {
    const { published, category, authorId, limit = 10, offset = 0 } = options;

    let query = supabase
      .from('posts')
      .select(`
        *,
        author:profiles(*)
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (published !== undefined) {
      query = query.eq('published', published);
    }

    if (category) {
      query = query.eq('category', category);
    }

    if (authorId) {
      query = query.eq('author_id', authorId);
    }

    const { data, error } = await query;

    if (error) throw new Error(`Failed to fetch posts: ${error.message}`);
    return data as PostWithAuthor[];
  }

  async getPost(id: string): Promise<PostWithAuthor | null> {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:profiles(*)
      `)
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return data as PostWithAuthor;
  }

  async createPost(post: InsertPost & { author_id: string }): Promise<Post> {
    const { data, error } = await supabase
      .from('posts')
      .insert(post)
      .select()
      .single();

    if (error) throw new Error(`Failed to create post: ${error.message}`);
    return data as Post;
  }

  async updatePost(id: string, updates: UpdatePost): Promise<Post> {
    const { data, error } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update post: ${error.message}`);
    return data as Post;
  }

  async deletePost(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    return !error;
  }

  async getPostsByAuthor(authorId: string): Promise<PostWithAuthor[]> {
    return this.getPosts({ authorId });
  }
}

export const storage = new SupabaseStorage();
