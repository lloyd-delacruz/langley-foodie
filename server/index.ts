import express, { type Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

// Load environment variables
config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Simple logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (req.path.startsWith("/api")) {
      log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
    }
  });
  next();
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Langley Foodie server is running',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

async function startServer() {
  try {
    log("🍽️ Starting Langley Foodie server...");
    
    // Create HTTP server
    const server = await registerRoutes(app);
    log("✅ API routes registered");

    // Error handling middleware
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      
      log(`❌ Error ${status}: ${message} - ${req.method} ${req.path}`);
      
      if (!res.headersSent) {
        res.status(status).json({ error: message });
      }
    });

    // API 404 handler (only for API routes)
    app.use('/api/*', (req, res) => {
      res.status(404).json({ error: 'API endpoint not found' });
    });

    // Setup development or production serving
    const isDev = process.env.NODE_ENV === "development";
    if (isDev) {
      log("🔧 Setting up Vite development server...");
      await setupVite(app, server);
      log("✅ Vite development server ready");
    } else {
      log("📦 Serving static files from dist...");
      serveStatic(app);
    }

    // Start listening
    const port = parseInt(process.env.PORT || "3000");
    server.listen(port, () => {
      log(`🚀 Server running on http://localhost:${port}`);
      log(`📊 Health: http://localhost:${port}/api/health`);
      log(`🎨 App: http://localhost:${port}`);
      log(`🔧 Server bound to port ${port}`);
    });

    return server;

  } catch (error: any) {
    log(`❌ Failed to start server: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  log('🛑 Received SIGTERM, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  log('🛑 Received SIGINT, shutting down gracefully');
  process.exit(0);
});

// Start the server
startServer();
