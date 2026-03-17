import express from 'express';
import { createClient } from '@supabase/supabase-js';

function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '';

export async function createApp() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // CORS — restrict to configured origin in production
  app.use((req, res, next) => {
    const origin = req.headers.origin || '';
    const allowed =
      process.env.NODE_ENV !== 'production' || origin === ALLOWED_ORIGIN;
    if (allowed && origin) {
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Vary', 'Origin');
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  // Auth middleware
  const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }
    try {
      const token = authHeader.slice(7);
      const supabase = getSupabaseClient();
      const { data: { user }, error } = await supabase.auth.getUser(token);
      if (error || !user) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      req.user = user;
      next();
    } catch {
      return res.status(500).json({ error: 'Authentication failed' });
    }
  };

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      supabaseConfigured: !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
    });
  });

  // Get all published posts
  app.get('/api/posts', async (req, res) => {
    try {
      const supabase = getSupabaseClient();
      const { category } = req.query;
      const limit = Math.min(Math.max(parseInt(String(req.query.limit)) || 10, 1), 100);
      const offset = Math.max(parseInt(String(req.query.offset)) || 0, 0);

      let query = supabase
        .from('posts')
        .select('*, author:profiles(*)')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (category) query = query.eq('category', category);

      const { data, error } = await query;
      if (error) throw error;
      res.json({ posts: data });
    } catch {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  });

  // Get single post by ID
  app.get('/api/posts/:id', async (req, res) => {
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('posts')
        .select('*, author:profiles(*)')
        .eq('id', req.params.id)
        .single();

      if (error || !data) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json({ post: data });
    } catch {
      res.status(500).json({ error: 'Failed to fetch post' });
    }
  });

  // Get current user profile (authenticated)
  app.get('/api/me', authenticateUser, async (req, res) => {
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', req.user.id)
        .single();

      if (error || !data) {
        return res.status(404).json({ error: 'Profile not found' });
      }
      res.json({ profile: data });
    } catch {
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  });

  // Catch-all for undefined API routes
  app.use('/api/*', (req, res) => {
    res.status(404).json({ error: 'API endpoint not found' });
  });

  // Serve React app for all other routes (handled by Vercel static output)
  app.get('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });

  return app;
}

export default createApp;
