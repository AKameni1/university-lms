import { z } from 'zod';

export const signUpSchema = z.object({
  fullName: z.string().min(3, 'Too short').max(255, 'Too long'),
  email: z.string().email('Invalid email'),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty('University card is required'),
  password: z.string().min(8, 'Too short'),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const bookSchema = z.object({
  title: z.string().trim().min(2, 'Too short').max(200, 'Too long'),
  description: z.string().trim().min(10, 'Too short').max(1000, 'Too long'),
  author: z.string().trim().min(2, 'Too short').max(200, 'Too long'),
  genre: z.string().trim().min(2, 'Too short').max(50, 'Too long'),
  rating: z.coerce.number().min(1, 'Too short').max(5, 'Too long'),
  totalCopies: z.coerce.number().int().positive().lte(10000, 'Too many copies'),
  coverUrl: z.string().nonempty(),
  coverColor: z
    .string()
    .trim()
    .regex(/^#[0-9A-F]{6}$/i, 'Invalid color'),
  videoUrl: z.string().nonempty(),
  summary: z.string().trim().min(10, 'Too short'),
});
