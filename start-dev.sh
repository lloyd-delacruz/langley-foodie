#!/bin/bash

# Development server for Langley Foodie
echo "🍽️ Starting Langley Foodie development server..."

cd "$(dirname "$0")"

# Check if Supabase is running
if ! curl -s http://127.0.0.1:54321/health >/dev/null 2>&1; then
    echo "🔧 Starting Supabase..."
    supabase start
fi

# Start development server
echo "🚀 Starting development server on http://localhost:3000"
NODE_ENV=development npm run dev