#!/usr/bin/env node

import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

async function runMigrations() {
  console.log('🔄 Running database migrations...\n');

  try {
    // Check if .env exists
    if (!fs.existsSync('.env')) {
      console.log('❌ .env file not found. Please create one from .env.example');
      process.exit(1);
    }

    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) {
      console.log('❌ DATABASE_URL not found in .env file');
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
      process.exit(1);
    }

    // Check if this is the first migration
    const migrationsDir = path.join(process.cwd(), 'prisma', 'migrations');
    const isFirstMigration = !fs.existsSync(migrationsDir) || fs.readdirSync(migrationsDir).length === 0;

    if (isFirstMigration) {
      console.log('🆕 First migration detected - initializing database...');
      
      // For first migration, we'll use db push to avoid migration history issues
      console.log('📋 Pushing initial schema...');
      execSync('npx prisma db push', { stdio: 'inherit' });
      
      console.log('🏷️  Creating initial migration...');
      execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
    } else {
      console.log('🔄 Running pending migrations...');
      
      // Check migration status first
      try {
        console.log('📊 Checking migration status...');
        execSync('npx prisma migrate status', { stdio: 'inherit' });
      } catch (error) {
        console.log('⚠️  Migration status check failed, proceeding with migration...');
      }
      
      // Run migrations
      execSync('npx prisma migrate dev', { stdio: 'inherit' });
    }

    // Generate Prisma client
    console.log('\n🔧 Generating Prisma client...');
    execSync('npx prisma generate', { stdio: 'inherit' });

    // Verify database state
    console.log('\n🔍 Verifying database state...');
    try {
      const userCount = await prisma.user.count();
      const sessionCount = await prisma.session.count();
      console.log(`✅ Database verified - Users: ${userCount}, Sessions: ${sessionCount}`);
    } catch (error) {
      console.error('❌ Database verification failed:', error.message);
      process.exit(1);
    }

    console.log('\n🎉 Migrations completed successfully!');
    console.log('\n💡 Next steps:');
    console.log('   • Run "npm run db:seed" to add sample data');
    console.log('   • Run "npm run db:studio" to view your database');
    console.log('   • Run "npm run dev" to start the application');

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    
    if (error.message.includes('migration')) {
      console.log('\n💡 Migration troubleshooting:');
      console.log('   • Check if your schema changes are valid');
      console.log('   • Ensure database is accessible');
      console.log('   • Try "npx prisma migrate reset" to reset migrations');
      console.log('   • Use "npx prisma db push" for development');
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Handle process termination
process.on('SIGINT', async () => {
  console.log('\n🛑 Migration interrupted');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Migration terminated');
  await prisma.$disconnect();
  process.exit(0);
});

runMigrations();