// Simplified Vercel-compatible server
import express from 'express';

export async function createApp() {
  const app = express();
  
  // Basic middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // CORS for development
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      message: 'Langley Foodie API is running on Vercel',
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV || 'production',
      supabaseConfigured: !!(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY)
    });
  });

  // Mock data for demo
  const mockPosts = [
    {
      id: '1',
      title: 'Best Coffee Shops in Langley',
      content: 'Discover the hidden gems of Langley\'s coffee scene...',
      category: 'coffee',
      published: true,
      created_at: new Date().toISOString(),
      author_id: 'demo-user'
    },
    {
      id: '2', 
      title: 'Top Restaurants for Date Night',
      content: 'Romantic dining spots perfect for your next date...',
      category: 'restaurants',
      published: true,
      created_at: new Date().toISOString(),
      author_id: 'demo-user'
    }
  ];

  // API Routes
  app.get('/api/posts', (req, res) => {
    try {
      const { category, limit = 10 } = req.query;
      let posts = mockPosts;
      
      if (category) {
        posts = posts.filter(post => post.category === category);
      }
      
      posts = posts.slice(0, parseInt(limit));
      
      res.json({ posts });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  });

  app.get('/api/posts/:id', (req, res) => {
    try {
      const post = mockPosts.find(p => p.id === req.params.id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json({ post });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch post' });
    }
  });

  app.get('/api/me', (req, res) => {
    try {
      res.json({ 
        profile: {
          id: 'demo-user',
          username: 'foodie_demo',
          email: 'demo@example.com',
          bio: 'Food enthusiast and local explorer'
        },
        message: 'Demo profile - authentication not implemented yet'
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  });

  // Catch-all for undefined API routes
  app.use('/api/*', (req, res) => {
    res.status(404).json({ 
      error: 'API endpoint not found',
      path: req.path,
      method: req.method,
      availableEndpoints: [
        'GET /api/health',
        'GET /api/posts',
        'GET /api/posts/:id',
        'GET /api/me'
      ]
    });
  });

  return app;
}

export default createApp; 