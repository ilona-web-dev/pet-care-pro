import { z } from 'zod';

export const petSchema = z.object({
  ownerId: z.string().min(1, 'Select owner'),
  name: z.string().min(1, 'Enter pet name'),
  species: z.enum(['dog', 'cat', 'bird', 'other']),
  breed: z.string().optional(),
  sex: z.enum(['male', 'female']).optional(),
  birthDate: z.string().optional(),
  microchip: z.string().optional(),
  weightKg: z
    .string()
    .optional()
    .refine(
      (value) => !value || !Number.isNaN(Number(value)),
      'Enter numeric weight',
    ),
  notes: z.string().optional(),
});

export type PetFormValues = z.infer<typeof petSchema>;

export const PET_FORM_DEFAULTS: PetFormValues = {
  ownerId: '',
  name: '',
  species: 'dog',
  breed: '',
  sex: undefined,
  birthDate: '',
  microchip: '',
  weightKg: '',
  notes: '',
};
