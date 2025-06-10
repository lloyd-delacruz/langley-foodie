import { createApp } from './server.js';

let app = null;

export default async function handler(req, res) {
  try {
    // Initialize app only once
    if (!app) {
      app = await createApp();
    }
    
    // Handle the request
    return app(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ 
      error: 'Internal server error', 
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
} 