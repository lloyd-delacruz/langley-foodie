#!/usr/bin/env node

import { config } from 'dotenv';

// Load environment variables
config();

console.log('🔍 Environment Variable Check\n');

const requiredVars = [
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'SUPABASE_ANON_KEY'
];

const optionalVars = [
  'NODE_ENV',
  'PORT'
];

let hasErrors = false;

console.log('📋 Required Variables:');
requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`  ✅ ${varName}: ${value.substring(0, 20)}...`);
  } else {
    console.log(`  ❌ ${varName}: MISSING`);
    hasErrors = true;
  }
});

console.log('\n📋 Optional Variables:');
optionalVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`  ✅ ${varName}: ${value}`);
  } else {
    console.log(`  ⚠️  ${varName}: not set (using default)`);
  }
});

if (hasErrors) {
  console.log('\n❌ Environment setup incomplete!');
  console.log('📝 Create a .env file in your project root with:');
  console.log('   SUPABASE_URL=your_project_url');
  console.log('   SUPABASE_SERVICE_ROLE_KEY=your_service_key');
  console.log('   SUPABASE_ANON_KEY=your_anon_key');
  console.log('🔗 Get these from: https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api');
  process.exit(1);
} else {
  console.log('\n✅ Environment setup complete!');
} 