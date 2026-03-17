import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { supabase } from "./lib/supabase";
import { insertPostSchema, updatePostSchema, insertProfileSchema } from "@shared/schema";
import { z } from "zod";
import type { User } from "@supabase/supabase-js";

interface AuthRequest extends Request {
  user: User;
}

const ALLOWED_CONTENT_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5MB

function parsePagination(limitStr: unknown, offsetStr: unknown) {
  const limit = Math.min(Math.max(parseInt(String(limitStr)) || 10, 1), 100);
  const offset = Math.max(parseInt(String(offsetStr)) || 0, 0);
  return { limit, offset };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Middleware to verify Supabase auth token
  const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.slice(7);
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    (req as AuthRequest).user = user;
    next();
  };

  // Get all published posts (public endpoint)
  app.get("/api/posts", async (req, res) => {
    try {
      const { category, limit, offset } = req.query;
      const pg = parsePagination(limit, offset);
      const posts = await storage.getPosts({
        published: true,
        category: category as string | undefined,
        ...pg,
      });
      res.json({ posts });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  // Get posts by category (public endpoint) — registered BEFORE /api/posts/:id to avoid conflict
  app.get("/api/posts/category/:category", async (req, res) => {
    try {
      const { limit, offset } = req.query;
      const pg = parsePagination(limit, offset);
      const posts = await storage.getPosts({
        published: true,
        category: req.params.category,
        ...pg,
      });
      res.json({ posts });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  // Get single post by ID (public endpoint)
  app.get("/api/posts/:id", async (req, res) => {
    try {
      const post = await storage.getPost(req.params.id);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json({ post });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch post" });
    }
  });

  // Get user's own posts (authenticated)
  app.get("/api/my/posts", authenticateUser, async (req, res) => {
    try {
      const { limit, offset } = req.query;
      const pg = parsePagination(limit, offset);
      const posts = await storage.getPosts({
        authorId: (req as AuthRequest).user.id,
        ...pg,
      });
      res.json({ posts });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  // Create new post (authenticated)
  app.post("/api/posts", authenticateUser, async (req, res) => {
    try {
      const validatedData = insertPostSchema.parse(req.body);
      const post = await storage.createPost({
        ...validatedData,
        author_id: (req as AuthRequest).user.id,
      });
      res.status(201).json({ post });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid post data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create post" });
    }
  });

  // Update post (authenticated, author only)
  app.put("/api/posts/:id", authenticateUser, async (req, res) => {
    try {
      const existingPost = await storage.getPost(req.params.id);
      if (!existingPost) {
        return res.status(404).json({ error: "Post not found" });
      }
      if (existingPost.author_id !== (req as AuthRequest).user.id) {
        return res.status(403).json({ error: "Not authorized to update this post" });
      }

      const validatedData = updatePostSchema.parse(req.body);
      const post = await storage.updatePost(req.params.id, validatedData);
      res.json({ post });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid post data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update post" });
    }
  });

  // Delete post (authenticated, author only)
  app.delete("/api/posts/:id", authenticateUser, async (req, res) => {
    try {
      const existingPost = await storage.getPost(req.params.id);
      if (!existingPost) {
        return res.status(404).json({ error: "Post not found" });
      }
      if (existingPost.author_id !== (req as AuthRequest).user.id) {
        return res.status(403).json({ error: "Not authorized to delete this post" });
      }

      const success = await storage.deletePost(req.params.id);
      if (success) {
        res.json({ message: "Post deleted successfully" });
      } else {
        res.status(500).json({ error: "Failed to delete post" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete post" });
    }
  });

  // Get user profile (public endpoint)
  app.get("/api/profiles/:id", async (req, res) => {
    try {
      const profile = await storage.getProfile(req.params.id);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.json({ profile });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  // Get current user profile (authenticated)
  app.get("/api/me", authenticateUser, async (req, res) => {
    try {
      const profile = await storage.getProfile((req as AuthRequest).user.id);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.json({ profile });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  // Update user profile (authenticated)
  app.put("/api/me", authenticateUser, async (req, res) => {
    try {
      const validatedData = insertProfileSchema.partial().parse(req.body);
      const profile = await storage.updateProfile((req as AuthRequest).user.id, validatedData);
      res.json({ profile });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid profile data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update profile" });
    }
  });

  // Upload image endpoint (authenticated)
  app.post("/api/upload/:bucket", authenticateUser, async (req, res) => {
    try {
      const { bucket } = req.params;
      const { fileName, fileData, contentType } = req.body;

      if (!['post-images', 'avatars'].includes(bucket)) {
        return res.status(400).json({ error: "Invalid bucket" });
      }

      if (!ALLOWED_CONTENT_TYPES.includes(contentType)) {
        return res.status(400).json({ error: "Invalid file type. Allowed: JPEG, PNG, WebP, GIF" });
      }

      const buffer = Buffer.from(fileData, 'base64');
      if (buffer.length > MAX_UPLOAD_BYTES) {
        return res.status(400).json({ error: "File too large. Maximum size is 5MB" });
      }

      // Sanitize filename to prevent path traversal
      const safeName = String(fileName).replace(/[^a-zA-Z0-9._-]/g, '_');
      const filePath = bucket === 'avatars'
        ? `${(req as AuthRequest).user.id}/${safeName}`
        : `${(req as AuthRequest).user.id}/${Date.now()}-${safeName}`;

      const { error } = await supabase.storage
        .from(bucket)
        .upload(filePath, buffer, {
          contentType,
          upsert: bucket === 'avatars',
        });

      if (error) {
        return res.status(500).json({ error: "Upload failed" });
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      res.json({ url: publicUrl, path: filePath });
    } catch (error) {
      res.status(500).json({ error: "Upload failed" });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}
