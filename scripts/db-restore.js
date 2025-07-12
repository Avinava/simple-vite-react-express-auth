#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import readline from 'readline';

// Load environment variables
dotenv.config();

function parsePostgresUrl(url) {
  const regex = /postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/;
  const match = url.match(regex);
  
  if (!match) {
    throw new Error('Invalid PostgreSQL URL format');
  }
  
  return {
    username: match[1],
    password: match[2],
    host: match[3],
    port: match[4],
    database: match[5]
  };
}

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

async function listBackups() {
  const backupsDir = path.join(process.cwd(), 'backups');
  
  if (!fs.existsSync(backupsDir)) {
    console.log('📁 No backups directory found');
    return [];
  }

  const backupFiles = fs.readdirSync(backupsDir)
    .filter(file => file.startsWith('backup-') && file.endsWith('.sql'))
    .sort()
    .reverse();

  if (backupFiles.length === 0) {
    console.log('📄 No backup files found');
    return [];
  }

  console.log('📋 Available backups:');
  backupFiles.forEach((file, index) => {
    const filePath = path.join(backupsDir, file);
    const stats = fs.statSync(filePath);
    const date = new Date(stats.mtime).toLocaleString();
    const size = (stats.size / 1024).toFixed(2);
    console.log(`   ${index + 1}. ${file} (${size} KB) - ${date}`);
  });

  return backupFiles;
}

async function restoreDatabase() {
  console.log('🔄 Database Restore Utility\n');

  if (!process.env.DATABASE_URL) {
    console.log('❌ DATABASE_URL not found in environment variables');
    process.exit(1);
  }

  // Safety check for production
  if (process.env.NODE_ENV === 'production') {
    console.log('❌ Database restore is not allowed in production environment');
    process.exit(1);
  }

  try {
    // Parse database URL
    const dbConfig = parsePostgresUrl(process.env.DATABASE_URL);

    let backupFile;
    
    // Check if backup file was provided as argument
    if (process.argv[2]) {
      backupFile = process.argv[2];
      
      // If it's just a filename, look in backups directory
      if (!path.isAbsolute(backupFile) && !backupFile.includes('/')) {
        backupFile = path.join(process.cwd(), 'backups', backupFile);
      }
      
      if (!fs.existsSync(backupFile)) {
        console.log(`❌ Backup file not found: ${backupFile}`);
        process.exit(1);
      }
    } else {
      // List available backups and let user choose
      const backupFiles = await listBackups();
      
      if (backupFiles.length === 0) {
        console.log('\n💡 Create a backup first with: npm run db:backup');
        process.exit(1);
      }

      const choice = await askQuestion('\nEnter backup number to restore (or press Enter to cancel): ');
      
      if (!choice || choice.trim() === '') {
        console.log('✅ Restore cancelled');
        process.exit(0);
      }

      const index = parseInt(choice) - 1;
      if (index < 0 || index >= backupFiles.length) {
        console.log('❌ Invalid backup number');
        process.exit(1);
      }

      backupFile = path.join(process.cwd(), 'backups', backupFiles[index]);
    }

    console.log(`\n📄 Selected backup: ${path.basename(backupFile)}`);
    
    // Get backup file info
    const stats = fs.statSync(backupFile);
    console.log(`📊 Backup size: ${(stats.size / 1024).toFixed(2)} KB`);
    console.log(`📅 Created: ${new Date(stats.mtime).toLocaleString()}`);

    console.log('\n⚠️  WARNING: This will replace ALL data in your database!');
    console.log(`🎯 Target database: ${dbConfig.database} on ${dbConfig.host}:${dbConfig.port}`);
    
    const confirmation = await askQuestion('\nAre you sure you want to continue? (yes/no): ');
    
    if (confirmation.toLowerCase() !== 'yes') {
      console.log('✅ Restore cancelled');
      process.exit(0);
    }

    // Set PGPASSWORD environment variable for psql
    const env = { ...process.env, PGPASSWORD: dbConfig.password };

    console.log('\n🔄 Restoring database...');
    
    // Restore using psql
    const command = `psql -h ${dbConfig.host} -p ${dbConfig.port} -U ${dbConfig.username} -d ${dbConfig.database} --no-password -f "${backupFile}"`;
    
    execSync(command, { 
      stdio: ['inherit', 'pipe', 'inherit'],
      env 
    });

    console.log('✅ Database restored successfully!');
    
    // Regenerate Prisma client to ensure it's in sync
    console.log('\n🔧 Regenerating Prisma client...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    
    console.log('\n🎉 Restore completed successfully!');
    console.log('\n💡 Next steps:');
    console.log('   • Run "npm run dev" to start the application');
    console.log('   • Use "npm run db:studio" to verify the restored data');

  } catch (error) {
    console.error('❌ Restore failed:', error.message);
    
    if (error.message.includes('psql')) {
      console.log('\n💡 Make sure PostgreSQL client tools are installed:');
      console.log('   • macOS: brew install postgresql');
      console.log('   • Ubuntu: sudo apt-get install postgresql-client');
      console.log('   • Windows: Download from postgresql.org');
    }
    
    process.exit(1);
  }
}

// Handle process termination
process.on('SIGINT', async () => {
  console.log('\n🛑 Restore interrupted');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Restore terminated');
  process.exit(0);
});

restoreDatabase();