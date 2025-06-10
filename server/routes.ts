import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { supabase } from "./lib/supabase";
import { insertPostSchema, updatePostSchema, insertProfileSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Middleware to verify Supabase auth token
  const authenticateUser = async (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  };

  // Get all published posts (public endpoint)
  app.get("/api/posts", async (req, res) => {
    try {
      const { category, limit = 10, offset = 0 } = req.query;
      const posts = await storage.getPosts({
        published: true,
        category: category as string,
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
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

  // Get posts by category (public endpoint)
  app.get("/api/posts/category/:category", async (req, res) => {
    try {
      const { limit = 10, offset = 0 } = req.query;
      const posts = await storage.getPosts({
        published: true,
        category: req.params.category,
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
      });
      res.json({ posts });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  // Get user's own posts (authenticated)
  app.get("/api/my/posts", authenticateUser, async (req: any, res) => {
    try {
      const { limit = 10, offset = 0 } = req.query;
      const posts = await storage.getPosts({
        authorId: req.user.id,
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
      });
      res.json({ posts });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  // Create new post (authenticated)
  app.post("/api/posts", authenticateUser, async (req: any, res) => {
    try {
      const validatedData = insertPostSchema.parse(req.body);
      const post = await storage.createPost({
        ...validatedData,
        author_id: req.user.id,
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
  app.put("/api/posts/:id", authenticateUser, async (req: any, res) => {
    try {
      // First check if the post exists and belongs to the user
      const existingPost = await storage.getPost(req.params.id);
      if (!existingPost) {
        return res.status(404).json({ error: "Post not found" });
      }
      if (existingPost.author_id !== req.user.id) {
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
  app.delete("/api/posts/:id", authenticateUser, async (req: any, res) => {
    try {
      const existingPost = await storage.getPost(req.params.id);
      if (!existingPost) {
        return res.status(404).json({ error: "Post not found" });
      }
      if (existingPost.author_id !== req.user.id) {
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
  app.get("/api/me", authenticateUser, async (req: any, res) => {
    try {
      const profile = await storage.getProfile(req.user.id);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.json({ profile });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  // Update user profile (authenticated)
  app.put("/api/me", authenticateUser, async (req: any, res) => {
    try {
      const validatedData = insertProfileSchema.partial().parse(req.body);
      const profile = await storage.updateProfile(req.user.id, validatedData);
      res.json({ profile });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid profile data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update profile" });
    }
  });

  // Upload image endpoint (authenticated)
  app.post("/api/upload/:bucket", authenticateUser, async (req: any, res) => {
    try {
      const { bucket } = req.params;
      const { fileName, fileData, contentType } = req.body;

      if (!['post-images', 'avatars'].includes(bucket)) {
        return res.status(400).json({ error: "Invalid bucket" });
      }

      // Convert base64 to buffer
      const buffer = Buffer.from(fileData, 'base64');
      
      // Upload to Supabase storage
      const filePath = bucket === 'avatars' 
        ? `${req.user.id}/${fileName}`
        : `${req.user.id}/${Date.now()}-${fileName}`;

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, buffer, {
          contentType,
          upsert: bucket === 'avatars', // Allow overwriting avatars
        });

      if (error) {
        return res.status(500).json({ error: "Upload failed", details: error.message });
      }

      // Get public URL
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
