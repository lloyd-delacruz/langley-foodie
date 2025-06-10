import { createApp } from './server.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let app = null;

export default async function handler(req, res) {
  try {
    if (!app) {
      console.log('Initializing app...');
      app = await createApp();
      
      // Add static file serving for the React app
      const indexPath = join(__dirname, '..', 'dist', 'public', 'index.html');
      
      // Handle React router paths
      app.get('*', (request, response) => {
        // Don't serve index.html for API routes
        if (request.path.startsWith('/api/')) {
          return response.status(404).json({ error: 'API endpoint not found' });
        }
        
        if (existsSync(indexPath)) {
          response.sendFile(indexPath);
        } else {
          response.status(404).json({ 
            error: 'React app not found',
            indexPath,
            indexExists: existsSync(indexPath)
          });
        }
      });
      
      console.log('App initialized successfully');
    }
    
    return app(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ 
      error: 'Handler initialization failed', 
      message: error.message,
      stack: error.stack
    });
  }
} 