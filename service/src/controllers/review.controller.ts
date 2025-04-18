import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
  userId?: number;
}

export const addReview = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { serviceId, rating, comment } = req.body;

  if (!serviceId || !rating || !comment) {
    res.status(400).json({ message: 'Service ID, rating, and comment are required' });
  }

  try {
    // Verifica se o serviço existe
    const service = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!service) res.status(404).json({ message: 'Service not found' });

    // Verifica se o usuário já avaliou esse serviço
    const existing = await prisma.review.findFirst({
      where: {
        serviceId,
        userId: req.userId,
      },
    });

    if (existing) {
      res.status(400).json({ message: 'You have already reviewed this service' });
    }

    const review = await prisma.review.create({
      data: {
        serviceId,
        userId: req.userId!,
        rating,
        comment,
      },
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add review', error });
  }
};

export const getReviewsForService = async (req: Request, res: Response): Promise<void> => {
  const { serviceId } = req.params;

  try {
    const reviews = await prisma.review.findMany({
      where: { serviceId: Number(serviceId) },
      include: {
        user: {
          select: { id: true, name: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews', error });
  }
};