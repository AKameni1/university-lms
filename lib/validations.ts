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
