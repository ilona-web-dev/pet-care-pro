import { z } from 'zod';

export const vetSchema = z.object({
  fullName: z.string().min(2, 'Enter full name'),
  role: z.string().min(5, 'Enter role'),
  yearsExperience: z.number().min(1, 'Enter years of experience'),
  isActive: z.boolean(),
  notes: z.string().optional(),
});

export type VetFormValues = z.infer<typeof vetSchema>;

export const VET_FORM_DEFAULTS: VetFormValues = {
  fullName: '',
  role: '',
  yearsExperience: 0,
  isActive: true,
  notes: '',
};
