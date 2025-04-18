import express from 'express';
import { addReview, getReviewsForService } from '../controllers/review.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', authMiddleware, addReview);
router.get('/:serviceId', getReviewsForService);

export default router;