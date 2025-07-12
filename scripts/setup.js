#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Setting up Auth Starter Kit...\n');

// Check if .env exists, if not copy from .env.example
if (!fs.existsSync('.env')) {
  console.log('📄 Creating .env file from .env.example...');
  fs.copyFileSync('.env.example', '.env');
  console.log('✅ .env file created. Please update it with your configuration.\n');
} else {
  console.log('✅ .env file already exists.\n');
}

// Install dependencies
console.log('📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully.\n');
} catch (error) {
  console.error('❌ Failed to install dependencies:', error.message);
  process.exit(1);
}

// Generate Prisma client
console.log('🗄️  Generating Prisma client...');
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated successfully.\n');
} catch (error) {
  console.error('❌ Failed to generate Prisma client:', error.message);
  console.log('💡 Make sure your DATABASE_URL is configured in .env\n');
}

console.log('🎉 Setup complete!\n');
console.log('Next steps:');
console.log('1. Update your .env file with your database URL and other settings');
console.log('2. Run "npm run db:push" to create your database schema');
console.log('3. Run "npm run dev" to start the development servers');
console.log('\nHappy coding! 🚀');