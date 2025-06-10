# 🍽️ Langley Foodie

A modern, responsive food blog showcasing culinary adventures, travel experiences, mom life, and creative reels from Langley and beyond.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [UI Components](#ui-components)
- [Features Overview](#features-overview)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Food Blog** - Share recipes, restaurant reviews, and culinary adventures
- **Travel Gallery** - Showcase food discoveries from around the world
- **Mom Life** - Balance family life with foodie passions
- **Creative Reels** - Short-form content and behind-the-scenes moments
- **Contact & About** - Connect with the community
- **Responsive Design** - Beautiful on all devices
- **Modern Architecture** - Feature-based component organization

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Wouter** - Lightweight routing for React
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **Framer Motion** - Smooth animations and transitions
- **React Query** - Data fetching and state management

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe server development
- **Supabase** - Backend-as-a-Service with PostgreSQL database
- **Drizzle ORM** - Type-safe database ORM

### Development Tools

- **ESBuild** - Fast JavaScript bundler
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
langley-foodie/
├── client/                 # Frontend application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── features/      # Feature-based components
│   │   │   ├── about/     # About page components
│   │   │   ├── blog/      # Blog-related components
│   │   │   ├── contact/   # Contact form components
│   │   │   ├── home/      # Homepage components
│   │   │   ├── mom-life/  # Mom life section
│   │   │   ├── reels/     # Reels/video content
│   │   │   └── travel/    # Travel gallery
│   │   ├── layouts/       # Layout components
│   │   │   ├── MainLayout.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Footer.tsx
│   │   ├── pages/         # Page components
│   │   ├── components/    # Shared UI components
│   │   │   └── ui/        # shadcn/ui components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and configurations
│   └── index.html
├── server/                # Backend application
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Database layer
│   └── vite.ts           # Vite integration
├── shared/               # Shared types and schemas
└── docs/                # Documentation
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd langley-foodie
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory with your Supabase credentials:

   ```env
   # Supabase Configuration
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # Database URL (same as Supabase connection string)
   DATABASE_URL=your_supabase_database_url

   # Application
   NODE_ENV=development
   PORT=3000
   ```

   **To get your Supabase credentials:**

   - Go to your [Supabase Dashboard](https://supabase.com/dashboard)
   - Select your "langley-foodie-travels" project
   - Go to Settings → API
   - Copy the Project URL and API keys

4. **Set up the database schema**

   You can apply the schema in several ways:

   **Option A: Using the setup script (Recommended)**

   ```bash
   npm run setup-supabase
   ```

   **Option B: Using Supabase SQL Editor**

   - Copy the contents of `supabase-schema.sql`
   - Paste and run in your Supabase project's SQL Editor

   **Option C: Using Supabase CLI**

   ```bash
   # If you have Supabase CLI installed
   supabase db reset
   ```

### Development

**Start the development server:**

```bash
# Using npm
npm run dev

# Or using the provided script
./start-dev.sh
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run linting
- `npm run db:push` - Push database schema
- `npm run db:generate` - Generate database migrations
- `npm run clean` - Clean build artifacts
- `npm run setup` - Install dependencies and set up database

## 🔌 API Endpoints

The backend provides the following REST API endpoints:

### Public Endpoints

- `GET /api/posts` - Get all published posts (with pagination and category filtering)
- `GET /api/posts/:id` - Get a single post by ID
- `GET /api/posts/category/:category` - Get posts by category
- `GET /api/profiles/:id` - Get user profile by ID
- `GET /api/health` - Health check endpoint

### Authenticated Endpoints

- `GET /api/me` - Get current user profile
- `PUT /api/me` - Update current user profile
- `GET /api/my/posts` - Get current user's posts
- `POST /api/posts` - Create a new post
- `PUT /api/posts/:id` - Update a post (author only)
- `DELETE /api/posts/:id` - Delete a post (author only)
- `POST /api/upload/:bucket` - Upload images to Supabase storage

### Categories

Posts can be categorized as:

- `langley-bites` - Local food discoveries
- `travels` - Food experiences from travels
- `mom-life` - Family and mom life content
- `reels` - Short-form video content

## 🎨 UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) for consistent, accessible UI components:

- Navigation menus and dropdowns
- Cards for content display
- Forms with validation
- Buttons and interactive elements
- Toast notifications
- Tooltips and modals

## 📱 Features Overview

### Home Page

- Hero section with featured content
- Feature grid showcasing different sections
- Modern, responsive design

### Blog Sections

- **Langley Bites** - Local food discoveries
- **Travels** - Food experiences from around the world
- **Mom Life** - Balancing family and food passion

### Interactive Elements

- **Reels** - Short-form video content
- **Contact** - Community engagement
- **About** - Personal story and background

## 🔧 Configuration

### Tailwind CSS

The project uses Tailwind CSS with custom configurations for:

- Tropical theme colors
- Custom animations
- Responsive breakpoints
- Typography scales

### Vite Configuration

- Path aliases for clean imports (`@/`, `@shared/`, `@assets/`)
- Development server optimization
- Build optimization for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- Built with [React](https://reactjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)

---

Made with ❤️ for food lovers everywhere
