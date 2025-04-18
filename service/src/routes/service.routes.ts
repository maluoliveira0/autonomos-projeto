import express from 'express';
import { createService, getAllServices, searchServices } from '../controllers/service.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', authMiddleware, createService);
router.get('/', getAllServices);
router.get('/search', searchServices);

export default router;