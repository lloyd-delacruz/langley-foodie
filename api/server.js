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

  // Catch-all for React router (non-API routes)
  app.get('*', (req, res) => {
    // Return a simple HTML page for non-API routes
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Langley Foodie</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            padding: 40px; 
            text-align: center; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .container { 
            max-width: 600px; 
            background: rgba(255,255,255,0.1);
            padding: 2rem;
            border-radius: 20px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
          }
          .success { color: #4ade80; }
          .info { 
            color: #e2e8f0; 
            margin-top: 2rem;
          }
          ul { 
            text-align: left; 
            background: rgba(255,255,255,0.1);
            padding: 1rem;
            border-radius: 10px;
            list-style: none;
          }
          li { 
            margin: 0.5rem 0;
            padding: 0.5rem;
            background: rgba(255,255,255,0.1);
            border-radius: 5px;
          }
          .badge {
            display: inline-block;
            background: #22c55e;
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 15px;
            font-size: 0.875rem;
            margin-left: 0.5rem;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="success">🎉 Langley Foodie is Live!</h1>
          <p>Your application has been successfully deployed to Vercel.</p>
          <span class="badge">API Working</span>
          <div class="info">
            <h3>Available API Endpoints:</h3>
            <ul>
              <li><strong>GET /api/health</strong> - Health check</li>
              <li><strong>GET /api/posts</strong> - Get all posts</li>
              <li><strong>GET /api/posts/:id</strong> - Get specific post</li>
              <li><strong>GET /api/me</strong> - Get user profile</li>
            </ul>
          </div>
          <p><small>React frontend will be integrated once the build process is complete.</small></p>
        </div>
      </body>
      </html>
    `);
  });

  return app;
}

export default createApp; 