import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
  userId?: number;
}

export const createBooking = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { serviceId, scheduledAt } = req.body;

  if (!serviceId || !scheduledAt) {
    res.status(400).json({ message: 'Service ID and scheduled date are required' });
  }

  try {
    const service = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!service) {
      res.status(404).json({ message: 'Service not found' });
    }

    const booking = await prisma.booking.create({
      data: {
        userId: req.userId!,
        serviceId,
        scheduledAt: new Date(scheduledAt),
      },
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create booking', error });
  }
};

export const updateBookingStatus = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const bookingId = parseInt(req.params.id);
  const { status } = req.body;

  try {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { service: true },
    });

    if (!booking) {
      res.status(404).json({ message: 'Agendamento não encontrado.' });
    }

    if (booking?.service.userId !== req.userId) {
      res.status(403).json({ message: 'Você não tem permissão para alterar esse agendamento.' });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status },
    });

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar status do agendamento.', error });
  }
};

export const getBookings = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.userId },
      include: {
        service: {
          include: {
            user: {
              select: { id: true, name: true, email: true },
            },
          },
        },
      },
      orderBy: {
        scheduledAt: 'asc',
      },
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings', error });
  }
};

export const getMyBookings = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        service: {
          userId: req.userId, // ou seja, o usuário é o dono do serviço
        },
      },
      include: {
        user: true, // quem agendou
        service: true,
      },
      orderBy: {
        scheduledAt: 'asc',
      },
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings', error });
  }
}