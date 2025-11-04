import { z } from 'zod';

export const checkoutFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  country: z.string().min(2, 'Country must be at least 2 characters'),
  zipCode: z.string().min(5, 'ZIP code must be at least 5 characters'),
  paymentMethod: z.enum(['card', 'cash']),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;