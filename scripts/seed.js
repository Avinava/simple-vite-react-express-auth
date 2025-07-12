#!/usr/bin/env node

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

// Sample data
const sampleUsers = [
  {
    email: 'admin@saasStarter.com',
    password: 'Admin123!',
    firstName: 'Admin',
    lastName: 'User',
    role: 'SUPER_ADMIN',
    emailVerified: true,
  },
  {
    email: 'john.doe@example.com',
    password: 'User123!',
    firstName: 'John',
    lastName: 'Doe',
    role: 'USER',
    emailVerified: true,
  },
  {
    email: 'jane.smith@example.com',
    password: 'User123!',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'USER',
    emailVerified: true,
  },
  {
    email: 'moderator@saasStarter.com',
    password: 'Mod123!',
    firstName: 'Moderator',
    lastName: 'User',
    role: 'ADMIN',
    emailVerified: true,
  },
  {
    email: 'sarah.chen@techstart.com',
    password: 'User123!',
    firstName: 'Sarah',
    lastName: 'Chen',
    role: 'USER',
    emailVerified: true,
  },
  {
    email: 'mike.rodriguez@devco.com',
    password: 'User123!',
    firstName: 'Mike',
    lastName: 'Rodriguez',
    role: 'USER',
    emailVerified: false, // Unverified user example
  },
];

async function hashPassword(password) {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

async function seedUsers() {
  console.log('👥 Seeding users...');
  
  for (const userData of sampleUsers) {
    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email }
      });

      if (existingUser) {
        console.log(`   ⚠️  User ${userData.email} already exists, skipping...`);
        continue;
      }

      // Hash password
      const hashedPassword = await hashPassword(userData.password);

      // Create user
      const user = await prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword,
        },
      });

      console.log(`   ✅ Created user: ${user.email} (${user.role})`);
    } catch (error) {
      console.error(`   ❌ Failed to create user ${userData.email}:`, error.message);
    }
  }
}

async function cleanupExpiredSessions() {
  console.log('🧹 Cleaning up expired sessions...');
  
  try {
    const result = await prisma.session.deleteMany({
      where: {
        expiresAt: {
          lt: new Date()
        }
      }
    });
    
    console.log(`   ✅ Removed ${result.count} expired sessions`);
  } catch (error) {
    console.error('   ❌ Failed to cleanup sessions:', error.message);
  }
}

async function displayStats() {
  console.log('\n📊 Database Statistics:');
  
  try {
    const userCount = await prisma.user.count();
    const adminCount = await prisma.user.count({ where: { role: 'ADMIN' } });
    const superAdminCount = await prisma.user.count({ where: { role: 'SUPER_ADMIN' } });
    const verifiedCount = await prisma.user.count({ where: { emailVerified: true } });
    const sessionCount = await prisma.session.count();
    
    console.log(`   👥 Total Users: ${userCount}`);
    console.log(`   🔐 Admins: ${adminCount}`);
    console.log(`   👑 Super Admins: ${superAdminCount}`);
    console.log(`   ✅ Verified Users: ${verifiedCount}`);
    console.log(`   🎫 Active Sessions: ${sessionCount}`);
    
    // Display sample login credentials
    console.log('\n🔑 Sample Login Credentials:');
    console.log('   Super Admin: admin@saasStarter.com / Admin123!');
    console.log('   Admin: moderator@saasStarter.com / Mod123!');
    console.log('   User: john.doe@example.com / User123!');
    console.log('   User: jane.smith@example.com / User123!');
    
  } catch (error) {
    console.error('❌ Failed to get statistics:', error.message);
  }
}

async function seed() {
  console.log('🌱 Starting database seeding...\n');

  try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connected\n');

    // Seed data
    await seedUsers();
    await cleanupExpiredSessions();
    
    // Display statistics
    await displayStats();

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n💡 Tips:');
    console.log('   • Use "npm run db:studio" to view your data');
    console.log('   • Use "npm run db:reset" to reset the database');
    console.log('   • Check the sample credentials above for testing');

  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Handle process termination
process.on('SIGINT', async () => {
  console.log('\n🛑 Seeding interrupted');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Seeding terminated');
  await prisma.$disconnect();
  process.exit(0);
});

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seed();
}

export default seed;