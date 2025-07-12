#!/usr/bin/env node

import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

console.log('🗄️  Setting up database...\n');

async function setupDatabase() {
  try {
    // Check if .env exists
    if (!fs.existsSync('.env')) {
      console.log('❌ .env file not found. Please create one from .env.example');
      process.exit(1);
    }

    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) {
      console.log('❌ DATABASE_URL not found in .env file');
      console.log('💡 Please add your PostgreSQL connection string to .env');
      console.log('   Example: DATABASE_URL="postgresql://username:password@localhost:5432/saas_db"');
      process.exit(1);
    }

    console.log('📊 Database URL configured:', process.env.DATABASE_URL.replace(/:[^:@]*@/, ':****@'));

    // Test database connection
    console.log('🔌 Testing database connection...');
    try {
      await prisma.$connect();
      console.log('✅ Database connection successful\n');
    } catch (error) {
      console.error('❌ Database connection failed:', error.message);
      console.log('\n💡 Troubleshooting tips:');
      console.log('   1. Make sure PostgreSQL is running');
      console.log('   2. Check your DATABASE_URL format');
      console.log('   3. Verify database credentials');
      console.log('   4. Ensure the database exists');
      process.exit(1);
    }

    // Generate Prisma client
    console.log('🔧 Generating Prisma client...');
    try {
      execSync('npx prisma generate', { stdio: 'inherit' });
      console.log('✅ Prisma client generated\n');
    } catch (error) {
      console.error('❌ Failed to generate Prisma client:', error.message);
      process.exit(1);
    }

    // Push database schema
    console.log('📋 Pushing database schema...');
    try {
      execSync('npx prisma db push', { stdio: 'inherit' });
      console.log('✅ Database schema updated\n');
    } catch (error) {
      console.error('❌ Failed to push database schema:', error.message);
      process.exit(1);
    }

    // Check if tables exist
    console.log('🔍 Verifying database tables...');
    try {
      const userCount = await prisma.user.count();
      const sessionCount = await prisma.session.count();
      console.log(`✅ Tables verified - Users: ${userCount}, Sessions: ${sessionCount}\n`);
    } catch (error) {
      console.error('❌ Failed to verify tables:', error.message);
      process.exit(1);
    }

    console.log('🎉 Database setup complete!\n');
    console.log('Next steps:');
    console.log('   • Run "npm run db:seed" to populate with sample data');
    console.log('   • Run "npm run db:studio" to view your database');
    console.log('   • Run "npm run dev" to start the application');

  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Handle process termination
process.on('SIGINT', async () => {
  console.log('\n🛑 Setup interrupted');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Setup terminated');
  await prisma.$disconnect();
  process.exit(0);
});

setupDatabase();