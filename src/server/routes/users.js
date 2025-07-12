import express from 'express';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { getUsers, getUser, updateUser, deleteUser } from '../controllers/user.controller.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get all users (admin only)
router.get('/', authorize('ADMIN', 'SUPER_ADMIN'), getUsers);

// Get specific user
router.get('/:id', getUser);

// Update user
router.put('/:id', updateUser);

// Delete user (admin only)
router.delete('/:id', authorize('ADMIN', 'SUPER_ADMIN'), deleteUser);

export default router;