#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file');
  process.exit(1);
}

// Create Supabase client with service role
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function setupDatabase() {
  try {
    console.log('🚀 Setting up Supabase database schema...');

    // Read the schema file
    const schemaPath = join(__dirname, '..', 'supabase-schema.sql');
    const schema = readFileSync(schemaPath, 'utf8');

    // Split the schema into individual statements
    const statements = schema
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    console.log(`📄 Found ${statements.length} SQL statements to execute`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + ';';
      console.log(`⏳ Executing statement ${i + 1}/${statements.length}...`);
      
      const { error } = await supabase.rpc('execute_sql', { 
        sql: statement 
      });

      if (error) {
        console.error(`❌ Error executing statement ${i + 1}:`, error.message);
        console.error('Statement:', statement);
        // Continue with other statements
      } else {
        console.log(`✅ Statement ${i + 1} executed successfully`);
      }
    }

    console.log('🎉 Database setup completed!');
    console.log('\n📝 Next steps:');
    console.log('1. Create your first user account through the auth system');
    console.log('2. Start creating blog posts');
    console.log('3. Upload images to your storage buckets');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

setupDatabase(); 