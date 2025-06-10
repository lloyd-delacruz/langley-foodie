import { pgTable, text, uuid, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Profiles table (extends auth.users)
export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(),
  email: text("email").notNull().unique(),
  full_name: text("full_name"),
  avatar_url: text("avatar_url"),
  created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// Posts table for blog content
export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  featured_image: text("featured_image"),
  category: text("category", { 
    enum: ['langley-bites', 'travels', 'mom-life', 'reels'] 
  }).notNull(),
  published: boolean("published").default(false),
  author_id: uuid("author_id").notNull().references(() => profiles.id, { onDelete: 'cascade' }),
  created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// Zod schemas for validation
export const insertProfileSchema = createInsertSchema(profiles).pick({
  email: true,
  full_name: true,
  avatar_url: true,
});

export const insertPostSchema = createInsertSchema(posts).pick({
  title: true,
  content: true,
  excerpt: true,
  featured_image: true,
  category: true,
  published: true,
});

export const updatePostSchema = insertPostSchema.partial();

export const selectProfileSchema = createSelectSchema(profiles);
export const selectPostSchema = createSelectSchema(posts);

// TypeScript types
export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = z.infer<typeof selectProfileSchema>;
export type InsertPost = z.infer<typeof insertPostSchema>;
export type UpdatePost = z.infer<typeof updatePostSchema>;
export type Post = z.infer<typeof selectPostSchema>;

// Extended post type with author info
export type PostWithAuthor = Post & {
  author: Profile;
};
