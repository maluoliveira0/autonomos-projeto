// src/index.ts
import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

import { authMiddleware } from './middlewares/auth.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import serviceRoutes from './routes/service.routes';
import bookingRoutes from './routes/booking.routes';
import reviewRoutes from './routes/review.routes';

app.use('/api/auth', authRoutes);
app.use('/api/users', authMiddleware ,userRoutes);
app.use('/api/services', authMiddleware ,serviceRoutes);
app.use('/api/bookings', authMiddleware, bookingRoutes);
app.use('/api/reviews', authMiddleware, reviewRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});