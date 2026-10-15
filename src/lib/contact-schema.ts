import { z } from 'zod';
import { services } from './site';

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name.').max(100),
  email: z.string().trim().email('Please enter a valid email address.').max(255),
  company: z.string().trim().max(150).default(''),
  service: z.string().refine(value => value === 'Not sure yet' || services.some(service => service.title === value), 'Please choose a service.'),
  message: z.string().trim().min(10, 'Tell us a little more (at least 10 characters).').max(3000),
  website: z.string().max(0).default(''),
});