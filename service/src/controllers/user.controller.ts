import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
  userId?: number;
}

export const createProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { name, password } = req.body;
  
    if (!name || !password) {
      res.status(400).json({ message: 'Name and password are required' });
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await prisma.user.update({
        where: { id: req.userId },
        data: {
          name,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });
  
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create profile', error });
    }
  };

export const getProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { name, password } = req.body;

  try {
    const updateData: any = {};
    if (name) updateData.name = name;
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      updateData.password = hashed;
    }

    const user = await prisma.user.update({
      where: { id: req.userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile', error });
  }
};