import express from 'express';
import { getProfile, updateProfile, createProfile } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/me', authMiddleware, getProfile);
router.put('/me', authMiddleware, updateProfile);
router.post('/profile', authMiddleware, createProfile);

export default router;