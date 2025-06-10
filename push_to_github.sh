#!/bin/bash

# Navigate to the project directory
cd "/Users/lloyd.vince1985gmail.com/Desktop/WebsiteProjects/Langley-Foodie"

# Add all files to git
echo "Adding all files to git..."
git add .

# Check status
echo "Current git status:"
git status --short

# Commit with a descriptive message
echo "Committing files..."
git commit -m "Initial commit - Langley Foodie full-stack application

- Added React frontend with modern UI components
- Added Express.js backend with API routes
- Added Supabase integration for database and storage
- Added authentication and real-time features
- Added responsive design with Tailwind CSS
- Added TypeScript configuration
- Added development scripts and configuration files"

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main

echo "Successfully pushed to GitHub!" 