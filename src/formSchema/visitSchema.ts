import { z } from 'zod';

export const visitSchema = z.object({
  visitDate: z.string().min(1, 'Select date'),
  petId: z.string().min(1, 'Select pet'),
  vetId: z.string().min(1, 'Select vet'),
  reason: z.enum([
    'vaccination',
    'routine_checkup',
    'follow_up',
    'grooming',
    'other',
  ]),
  status: z.enum(['planned', 'in_progress', 'completed', 'cancelled']),
  diagnosis: z.string().optional(),
  treatment: z.string().optional(),
  invoiceAmount: z
    .string()
    .optional()
    .refine(
      (value) => !value || !Number.isNaN(Number(value)),
      'Enter numeric invoice',
    ),
  notes: z.string().optional(),
});

export type VisitFormValues = z.infer<typeof visitSchema>;

export const VISIT_FORM_DEFAULTS: VisitFormValues = {
  visitDate: '',
  petId: '',
  vetId: '',
  reason: 'vaccination',
  status: 'planned',
  diagnosis: '',
  treatment: '',
  invoiceAmount: '',
  notes: '',
};
