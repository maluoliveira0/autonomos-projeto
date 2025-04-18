import express from 'express';
import { createBooking, getMyBookings, updateBookingStatus, getBookings } from '../controllers/booking.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', authMiddleware, createBooking);
router.put('/:id/status', authMiddleware, updateBookingStatus);
router.get('/', authMiddleware, getBookings);
router.get('/my', authMiddleware, getMyBookings);

export default router;