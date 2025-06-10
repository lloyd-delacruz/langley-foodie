// This is a simplified server for Vercel deployment
import express from 'express';
import { createServer } from 'http';

export async function createApp() {
  const app = express();
  
  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      message: 'Langley Foodie API is running on Vercel',
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV || 'production'
    });
  });

  // Basic API routes - add your routes here
  app.get('/api/posts', async (req, res) => {
    try {
      // Placeholder - replace with actual database calls
      res.json({ 
        posts: [],
        message: 'Posts endpoint working - connect to database'
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  });

  app.get('/api/me', async (req, res) => {
    try {
      res.json({ 
        profile: null,
        message: 'Profile endpoint working - connect to database'
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
      method: req.method
    });
  });

  return app;
}

export default createApp; 