import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load environment variables
config();

// Enhanced error checking with helpful messages
function validateEnvironment() {
  const missing = [];
  
  if (!process.env.SUPABASE_URL) missing.push('SUPABASE_URL');
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) missing.push('SUPABASE_SERVICE_ROLE_KEY');
  
  if (missing.length > 0) {
    console.error(`❌ Missing required Supabase environment variables: ${missing.join(', ')}`);
    console.error(`📝 Please create a .env file in your project root with:`);
    console.error(`   SUPABASE_URL=your_project_url`);
    console.error(`   SUPABASE_SERVICE_ROLE_KEY=your_service_key`);
    console.error(`   SUPABASE_ANON_KEY=your_anon_key`);
    console.error(`🔗 Get these from: https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api`);
    throw new Error(`Missing Supabase environment variables: ${missing.join(', ')}`);
  }
  
  console.log(`✅ Supabase environment variables loaded`);
}

// Validate before creating client
validateEnvironment();

// Create Supabase client with service role key for server-side operations
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Create Supabase client for client-side operations (with anon key)
export const createSupabaseClient = () => {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    throw new Error('Missing Supabase environment variables for client');
  }
  
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );
}; 