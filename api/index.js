import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let app = null;

async function createApp() {
  if (app) return app;
  
  // Set NODE_ENV to production for Vercel
  process.env.NODE_ENV = 'production';
  
  const appInstance = express();
  appInstance.use(express.json());
  appInstance.use(express.urlencoded({ extended: false }));

  // Health check route
  appInstance.get('/api/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      message: 'Langley Foodie server is running on Vercel',
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV || 'production'
    });
  });

  try {
    // Import and register routes
    const { registerRoutes } = await import('../dist/index.js');
    await registerRoutes(appInstance);
    
    // Serve static files from dist/public
    const distPath = join(__dirname, '..', 'dist', 'public');
    if (existsSync(distPath)) {
      appInstance.use(express.static(distPath));
    }
    
    // Catch-all handler for React routes
    appInstance.get('*', (req, res) => {
      const indexPath = join(distPath, 'index.html');
      if (existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('Not found');
      }
    });
    
  } catch (error) {
    console.error('Error setting up app:', error);
  }

  app = appInstance;
  return app;
}

export default async function handler(req, res) {
  const appInstance = await createApp();
  return appInstance(req, res);
} 