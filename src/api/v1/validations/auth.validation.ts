import { z } from 'zod';

// Schema for signup validation
export const signupSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

// Schema for signin validation
export const signinSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});
