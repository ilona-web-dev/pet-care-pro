import { z } from 'zod';

export const clientSchema = z.object({
  fullName: z.string().min(2, 'Enter full name'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(5, 'Enter phone'),
  address: z.string().optional(),
  notes: z.string().optional(),
});

export type ClientFormValues = z.infer<typeof clientSchema>;

export const CLIENT_FORM_DEFAULTS: ClientFormValues = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  notes: '',
};
