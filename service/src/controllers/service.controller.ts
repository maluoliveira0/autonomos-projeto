import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
  userId?: number;
}

export const createService = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { title, description, category, price } = req.body;

  if (!title || !description || !category || !price) {
    res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const service = await prisma.service.create({
      data: {
        title,
        description,
        category,
        price: parseFloat(price),
        userId: req.userId!,
      },
    });

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error creating service', error });
  }
};

export const getAllServices = async (_req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        reviews: true,
      },
      orderBy: { title: 'desc' }
    });

    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving services', error });
  }
};

export const searchServices = async (req: Request, res: Response): Promise<void> => {
  const { title, category, userId } = req.query;

  try {
    const services = await prisma.service.findMany({
      where: {
        title: {
          contains: String(title),
          mode: 'insensitive',
        },
        category: category ? String(category) : undefined,
        userId: userId ? Number(userId) : undefined,
      },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        reviews: true,
      },
    });

    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error searching services', error });
  }
};