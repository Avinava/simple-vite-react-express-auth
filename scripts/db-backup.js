#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

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

async function createBackup() {
  console.log('💾 Creating database backup...\n');

  if (!process.env.DATABASE_URL) {
    console.log('❌ DATABASE_URL not found in environment variables');
    process.exit(1);
  }

  try {
    // Parse database URL
    const dbConfig = parsePostgresUrl(process.env.DATABASE_URL);
    
    // Create backups directory if it doesn't exist
    const backupsDir = path.join(process.cwd(), 'backups');
    if (!fs.existsSync(backupsDir)) {
      fs.mkdirSync(backupsDir);
      console.log('📁 Created backups directory');
    }

    // Generate backup filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(backupsDir, `backup-${timestamp}.sql`);

    console.log('🔧 Backup configuration:');
    console.log(`   Host: ${dbConfig.host}:${dbConfig.port}`);
    console.log(`   Database: ${dbConfig.database}`);
    console.log(`   File: ${backupFile}`);

    // Set PGPASSWORD environment variable for pg_dump
    const env = { ...process.env, PGPASSWORD: dbConfig.password };

    // Create backup using pg_dump
    console.log('\n📦 Creating backup...');
    const command = `pg_dump -h ${dbConfig.host} -p ${dbConfig.port} -U ${dbConfig.username} -d ${dbConfig.database} --no-password --verbose --clean --if-exists --create > "${backupFile}"`;
    
    execSync(command, { 
      stdio: ['inherit', 'pipe', 'inherit'],
      env 
    });

    // Check if backup file was created and has content
    if (fs.existsSync(backupFile)) {
      const stats = fs.statSync(backupFile);
      if (stats.size > 0) {
        console.log(`✅ Backup created successfully: ${backupFile}`);
        console.log(`📊 Backup size: ${(stats.size / 1024).toFixed(2)} KB`);
        
        // List recent backups
        console.log('\n📋 Recent backups:');
        const backupFiles = fs.readdirSync(backupsDir)
          .filter(file => file.startsWith('backup-') && file.endsWith('.sql'))
          .sort()
          .reverse()
          .slice(0, 5);
          
        backupFiles.forEach(file => {
          const filePath = path.join(backupsDir, file);
          const fileStats = fs.statSync(filePath);
          const date = new Date(fileStats.mtime).toLocaleString();
          const size = (fileStats.size / 1024).toFixed(2);
          console.log(`   📄 ${file} (${size} KB) - ${date}`);
        });
        
        // Cleanup old backups (keep last 10)
        const allBackups = fs.readdirSync(backupsDir)
          .filter(file => file.startsWith('backup-') && file.endsWith('.sql'))
          .sort()
          .reverse();
          
        if (allBackups.length > 10) {
          console.log('\n🧹 Cleaning up old backups...');
          const toDelete = allBackups.slice(10);
          toDelete.forEach(file => {
            fs.unlinkSync(path.join(backupsDir, file));
            console.log(`   🗑️  Deleted: ${file}`);
          });
        }
        
      } else {
        console.log('❌ Backup file is empty');
        fs.unlinkSync(backupFile);
        process.exit(1);
      }
    } else {
      console.log('❌ Backup file was not created');
      process.exit(1);
    }

    console.log('\n💡 To restore this backup, use:');
    console.log(`   npm run db:restore "${backupFile}"`);

  } catch (error) {
    console.error('❌ Backup failed:', error.message);
    
    if (error.message.includes('pg_dump')) {
      console.log('\n💡 Make sure PostgreSQL client tools are installed:');
      console.log('   • macOS: brew install postgresql');
      console.log('   • Ubuntu: sudo apt-get install postgresql-client');
      console.log('   • Windows: Download from postgresql.org');
    }
    
    process.exit(1);
  }
}

createBackup();