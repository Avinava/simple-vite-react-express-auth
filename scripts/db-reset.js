#!/usr/bin/env node

import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import readline from 'readline';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

function askQuestion(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function resetDatabase() {
  console.log('🔄 Database Reset Utility\n');

  // Safety check for production
  if (process.env.NODE_ENV === 'production') {
    console.log('❌ Database reset is not allowed in production environment');
    process.exit(1);
  }

  console.log('⚠️  WARNING: This will delete ALL data in your database!');
  console.log('📊 Current database:', process.env.DATABASE_URL?.replace(/:[^:@]*@/, ':****@'));
  
  const confirmation = await askQuestion('\nAre you sure you want to continue? (yes/no): ');
  
  if (confirmation.toLowerCase() !== 'yes') {
    console.log('✅ Database reset cancelled');
    process.exit(0);
  }

  const doubleConfirmation = await askQuestion('Type "DELETE ALL DATA" to confirm: ');
  
  if (doubleConfirmation !== 'DELETE ALL DATA') {
    console.log('✅ Database reset cancelled');
    process.exit(0);
  }

  try {
    console.log('\n🗑️  Clearing existing data...');
    
    // Delete all sessions first (due to foreign key constraints)
    const deletedSessions = await prisma.session.deleteMany();
    console.log(`   ✅ Deleted ${deletedSessions.count} sessions`);
    
    // Delete all users
    const deletedUsers = await prisma.user.deleteMany();
    console.log(`   ✅ Deleted ${deletedUsers.count} users`);

    console.log('\n🔄 Resetting database schema...');
    
    // Reset and push schema
    execSync('npx prisma db push --force-reset', { stdio: 'inherit' });
    
    console.log('\n🌱 Re-seeding database...');
    
    // Import and run seed function
    const { default: seed } = await import('./seed.js');
    await seed();

    console.log('\n🎉 Database reset completed successfully!');
    console.log('\n💡 Your database has been reset and re-seeded with sample data.');

  } catch (error) {
    console.error('❌ Database reset failed:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Handle process termination
process.on('SIGINT', async () => {
  console.log('\n🛑 Reset interrupted');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Reset terminated');
  await prisma.$disconnect();
  process.exit(0);
});

resetDatabase();