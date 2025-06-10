# Langley Foodie - Vercel Deployment Guide

## Prerequisites

1. **GitHub Repository**: Your project should be pushed to GitHub (langley-foodie)
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **Supabase Project**: You'll need a Supabase project with these credentials:
   - SUPABASE_URL
   - SUPABASE_SERVICE_ROLE_KEY
   - SUPABASE_ANON_KEY

## Deployment Steps

### 1. Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Connect your GitHub account if not already connected
4. Find and select your `langley-foodie` repository
5. Click "Import"

### 2. Configure Environment Variables

In the Vercel project settings, add these environment variables:

```
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_ANON_KEY=your_anonymous_key
NODE_ENV=production
```

**To get your Supabase credentials:**

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Settings → API
4. Copy the URL and keys

### 3. Deploy

1. Click "Deploy" in Vercel
2. Vercel will automatically:
   - Run `npm install`
   - Run `npm run vercel-build` (which runs the build script)
   - Deploy your application

### 4. Verify Deployment

After deployment:

1. Visit your Vercel URL
2. Test the health endpoint: `https://your-app.vercel.app/api/health`
3. Test the main application functionality

## Project Structure (Vercel-optimized)

```
langley-foodie/
├── api/
│   └── index.js           # Vercel serverless function entry point
├── client/                # React frontend
├── server/                # Express backend
├── dist/                  # Build output
│   ├── public/           # Static frontend files
│   ├── index.js          # Compiled backend
│   └── routes.js         # Compiled routes
├── vercel.json           # Vercel configuration
└── package.json          # With vercel-build script
```

## How It Works

1. **Build Process**: `npm run build` compiles both frontend (Vite) and backend (esbuild)
2. **Serverless Function**: The `api/index.js` file wraps your Express app for Vercel
3. **Routing**:
   - `/api/*` routes go to the serverless function
   - All other routes serve the React app or are handled by Express

## Troubleshooting

### Build Errors

- Ensure all dependencies are in `package.json`
- Check that TypeScript compiles without errors locally

### Runtime Errors

- Verify environment variables are set correctly in Vercel
- Check the Vercel function logs for detailed error messages

### Database Issues

- Ensure Supabase credentials are correct
- Verify your Supabase project is active

## Local Development vs Production

- **Local**: Uses `npm run dev` with Vite dev server
- **Production**: Uses serverless functions with static file serving

## Automatic Deployments

Once connected, Vercel will automatically deploy:

- On every push to the `main` branch
- You can configure branch-based deployments in Vercel settings

## Custom Domain (Optional)

To add a custom domain:

1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions
