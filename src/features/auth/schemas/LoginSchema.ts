import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email({
    error: (issue) => !issue.input ? 'Email is required' : 'Invalid email address',
  }),
  
  password: z
    .string({ 
      error: (issue) => !issue.input ? 'Password is required' : 'Invalid string',
    })
    .min(8, { error: 'Password must be at least 8 characters' }),
});

// Extracting TypeScript type from schema to use in component
export type LoginFormValues = z.infer<typeof loginSchema>;