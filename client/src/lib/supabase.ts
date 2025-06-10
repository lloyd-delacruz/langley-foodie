import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Auth helpers
export const signUp = async (email: string, password: string, metadata?: { full_name?: string }) => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  })
}

export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  })
}

export const signOut = async () => {
  return await supabase.auth.signOut()
}

export const getCurrentUser = () => {
  return supabase.auth.getUser()
}

export const getSession = () => {
  return supabase.auth.getSession()
}

// Auth state listener
export const onAuthStateChange = (callback: (event: string, session: any) => void) => {
  return supabase.auth.onAuthStateChange(callback)
}

// Types for your database
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          title: string
          content: string
          excerpt: string | null
          featured_image: string | null
          category: 'langley-bites' | 'travels' | 'mom-life' | 'reels'
          published: boolean
          author_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          excerpt?: string | null
          featured_image?: string | null
          category: 'langley-bites' | 'travels' | 'mom-life' | 'reels'
          published?: boolean
          author_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          excerpt?: string | null
          featured_image?: string | null
          category?: 'langley-bites' | 'travels' | 'mom-life' | 'reels'
          published?: boolean
          author_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}