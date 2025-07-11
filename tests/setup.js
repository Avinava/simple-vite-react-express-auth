import { beforeAll, afterAll } from '@jest/globals';
import prisma from '../src/server/config/database.js';

beforeAll(async () => {
  // Setup test database
  process.env.NODE_ENV = 'test';
});

afterAll(async () => {
  // Cleanup
  await prisma.$disconnect();
});