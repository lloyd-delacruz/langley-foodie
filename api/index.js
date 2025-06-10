import { createApp } from './server.js';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let app = null;

export default async function handler(req, res) {
  try {
    if (!app) {
      app = await createApp();
      
      // Static file serving for React app
      const publicPath = join(__dirname, '..', 'dist', 'public');
      const indexPath = join(publicPath, 'index.html');
      
      // Serve static files
      if (existsSync(publicPath)) {
        app.use(express.static(publicPath));
      }
      
      // Catch-all for React router (non-API routes)
      app.get('*', (request, response) => {
        if (request.path.startsWith('/api/')) {
          return response.status(404).json({ error: 'API endpoint not found' });
        }
        
        if (existsSync(indexPath)) {
          response.sendFile(indexPath);
        } else {
          response.status(200).send(`
            <!DOCTYPE html>
            <html>
            <head>
              <title>Langley Foodie</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 40px; text-align: center; }
                .container { max-width: 600px; margin: 0 auto; }
                .success { color: #28a745; }
                .info { color: #17a2b8; }
              </style>
            </head>
            <body>
              <div class="container">
                <h1 class="success">🎉 Langley Foodie is Live!</h1>
                <p>Your application has been successfully deployed to Vercel.</p>
                <div class="info">
                  <h3>Available API Endpoints:</h3>
                  <ul style="text-align: left;">
                    <li><strong>GET /api/health</strong> - Health check</li>
                    <li><strong>GET /api/posts</strong> - Get all posts</li>
                    <li><strong>GET /api/posts/:id</strong> - Get specific post</li>
                    <li><strong>GET /api/me</strong> - Get user profile</li>
                  </ul>
                </div>
                <p><small>React app will be served here once the frontend build is complete.</small></p>
              </div>
            </body>
            </html>
          `);
        }
      });
    }
    
    return app(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ 
      error: 'Handler initialization failed', 
      message: error.message 
    });
  }
} 