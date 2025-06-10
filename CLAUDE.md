# CLAUDE.md - Development Context & Commands

## Project Overview
**Langley Foodie** is a modern food blog and lifestyle website built with React, TypeScript, and Supabase. It features food reviews, travel experiences, mom life content, and creative reels.

## Architecture
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Backend**: Express.js + Supabase (PostgreSQL)
- **Database**: Supabase PostgreSQL with Row Level Security
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage for images
- **Deployment**: Development on localhost:3000

## Key Technologies
- **UI Framework**: React 18 with hooks and functional components
- **Type Safety**: TypeScript throughout
- **Styling**: Tailwind CSS with tropical theme
- **Components**: shadcn/ui for consistent design system
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query for server state
- **Animations**: Framer Motion for smooth transitions
- **Database ORM**: Drizzle ORM with Supabase
- **Build Tool**: Vite for fast development and builds

## Project Structure
```
langley-foodie/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── features/      # Feature-based components (domain-driven)
│   │   │   ├── about/     # About page components
│   │   │   ├── blog/      # Blog and content components
│   │   │   ├── contact/   # Contact form components
│   │   │   ├── home/      # Homepage hero and features
│   │   │   ├── mom-life/  # Mom life content section
│   │   │   ├── reels/     # Video/reel content
│   │   │   └── travel/    # Travel gallery components
│   │   ├── components/ui/ # Shared UI components (shadcn/ui)
│   │   ├── layouts/       # Layout components (Navigation, Footer, MainLayout)
│   │   ├── pages/         # Page route components
│   │   ├── contexts/      # React contexts (Auth, etc.)
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities (Supabase client, utils)
├── server/                # Backend Express application
│   ├── lib/              # Server utilities (Supabase config)
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Database layer
│   ├── vite.ts          # Vite development integration
│   └── index.ts         # Server entry point
├── shared/               # Shared schemas and types
├── supabase/            # Supabase local development
└── scripts/             # Setup and utility scripts
```

## Essential Commands

### Development Setup
```bash
# Install dependencies
npm install

# Start Supabase local development
supabase start

# Setup database schema
npm run setup-supabase

# Start development server (both frontend and backend)
npm run dev
# OR use the convenience script
./start-dev.sh
```

### Development Workflow
```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Database operations
npm run db:push          # Push schema changes
npm run db:generate      # Generate migrations

# Build for production
npm run build

# Preview production build
npm run preview
```

### Supabase Commands
```bash
# Start local Supabase
supabase start

# Stop local Supabase
supabase stop

# Reset database (careful!)
supabase db reset

# View Supabase status
supabase status

# Access Supabase Studio
# Open http://127.0.0.1:54323 in browser
```

## Environment Variables
Required in `.env` file:
```env
# Supabase Configuration
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Database
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:54322/postgres"

# Application
SESSION_SECRET="super_secret_session_key_change_this_in_production"
NODE_ENV="development"
PORT=3000
```

## Database Schema
- **profiles**: User profile data extending Supabase auth.users
- **posts**: Blog posts with categories (langley-bites, travels, mom-life, reels)
- **Storage buckets**: post-images, avatars for file uploads
- **RLS policies**: Row Level Security for data protection

## API Endpoints
- `GET /api/health` - Server health check
- `GET /api/posts` - List published posts (with pagination/filtering)
- `GET /api/posts/:id` - Get single post
- `GET /api/posts/category/:category` - Posts by category
- `POST /api/posts` - Create post (authenticated)
- `PUT /api/posts/:id` - Update post (authenticated)
- `DELETE /api/posts/:id` - Delete post (authenticated)
- `GET /api/me` - Current user profile
- `PUT /api/me` - Update user profile

## Feature Categories
1. **langley-bites** - Local Langley food discoveries and reviews
2. **travels** - Food experiences from travel adventures
3. **mom-life** - Family life, parenting, and lifestyle content
4. **reels** - Short-form video content and behind-the-scenes

## Development Notes
- **Layout Architecture**: MainLayout wraps all pages with Navigation and Footer
- **Component Organization**: Features are domain-organized, not by component type
- **Asset Management**: Static assets in `client/public/` accessible via `/filename`
- **Type Safety**: Shared schemas in `shared/schema.ts` ensure type consistency
- **Authentication**: Supabase Auth with JWT tokens
- **Responsive Design**: Mobile-first with Tailwind breakpoints

## Troubleshooting

### Common Issues
1. **Server won't start**: Check if Supabase is running (`supabase status`)
2. **Build errors**: Run `npm run type-check` to identify issues
3. **Database connection**: Verify `.env` has correct Supabase credentials
4. **Asset loading**: Ensure images are in `client/public/` and referenced as `/filename`

### Development Server Issues
- Port 3000 conflicts: Change PORT in `.env`
- Vite errors: Clear `node_modules/.vite` cache
- TypeScript errors: Run `npm run type-check`

### Database Issues
- Schema sync: Run `supabase db reset` to reset local database
- Migration errors: Check `supabase/migrations/` for issues
- RLS policies: Verify authentication in Supabase Studio

## Production Deployment
When deploying to production:
1. Create production Supabase project
2. Update environment variables with production URLs
3. Run `npm run build`
4. Deploy built files from `dist/`
5. Set up proper domain and SSL
6. Configure Supabase Auth URLs for production domain

## Performance Optimization
- **Code Splitting**: Vite handles automatic code splitting
- **Image Optimization**: Use appropriate formats and sizes
- **Bundle Analysis**: Use `npm run build` and analyze output
- **Database Queries**: Use proper indexing and RLS policies
- **Caching**: Implement proper cache headers for static assets

---
**Last Updated**: Current as of project setup
**Maintained By**: Development Team