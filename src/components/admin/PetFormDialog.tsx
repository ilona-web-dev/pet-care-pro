import { useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import PetFormContent from './PetFormContent';
import useCreatePetMutation from '../../hooks/useCreatePetMutation';
import useUpdatePetMutation from '../../hooks/useUpdatePetMutation';
import { useAllClientsQuery } from '../../hooks/useAllClientsQuery';
import type { Pet } from '../../types/admin';

const petSchema = z.object({
  ownerId: z.string().min(1, 'Select owner'),
  name: z.string().min(1, 'Enter pet name'),
  species: z.enum(['dog', 'cat', 'bird', 'other']),
  breed: z.string().optional(),
  sex: z.enum(['male', 'female']).optional(),
  birthDate: z.string().optional(),
  microchip: z.string().optional(),
  weightKg: z.string().optional(),
  notes: z.string().optional(),
});

export type PetFormValues = z.infer<typeof petSchema>;

type Props = {
  open: boolean;
  onClose: () => void;
  initialValues?: Pet | null;
  defaultOwnerId?: string;
};

const PET_FORM_DEFAULTS: PetFormValues = {
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

export default function PetFormDialog({
  open,
  onClose,
  initialValues,
  defaultOwnerId,
}: Props) {
  const { data: clients = [] } = useAllClientsQuery();
  const ownerOptions = clients
    .slice()
    .sort((a, b) => a.fullName.localeCompare(b.fullName))
    .map((client) => ({
      value: client.id,
      label: `${client.fullName} (${client.email})`,
    }));

  const form = useForm<PetFormValues>({
    resolver: zodResolver(petSchema),
    defaultValues: PET_FORM_DEFAULTS,
  });

  useEffect(() => {
    if (initialValues) {
      form.reset({
        ownerId: initialValues.ownerId,
        name: initialValues.name,
        species: initialValues.species,
        breed: initialValues.breed ?? '',
        sex: initialValues.sex ?? undefined,
        birthDate: initialValues.birthDate ?? '',
        microchip: initialValues.microchip ?? '',
        weightKg: initialValues.weightKg
          ? String(initialValues.weightKg)
          : '',
        notes: initialValues.notes ?? '',
      });
      return;
    }
    form.reset({
      ...PET_FORM_DEFAULTS,
      ownerId: defaultOwnerId ?? '',
    });
  }, [initialValues, form, defaultOwnerId]);

  const isEditMode = Boolean(initialValues);

  const { mutate: createPet, isPending: isCreating } =
    useCreatePetMutation();
  const { mutate: updatePet, isPending: isUpdating } =
    useUpdatePetMutation();

  const isSubmitting = isEditMode ? isUpdating : isCreating;

  const onSubmit: SubmitHandler<PetFormValues> = (values) => {
    const payload = {
      ...values,
      weightKg: values.weightKg ? Number(values.weightKg) : undefined,
    };

    if (isEditMode && initialValues) {
      updatePet(
        { id: initialValues.id, data: payload },
        {
          onSuccess: () => {
            toast.success('Pet saved');
            form.reset();
            onClose();
          },
          onError: (error) =>
            toast.error(error.message ?? 'Failed to save pet'),
        },
      );
      return;
    }

    createPet(payload, {
      onSuccess: () => {
        toast.success('Pet saved');
        form.reset();
        onClose();
      },
      onError: (error) => toast.error(error.message ?? 'Failed to save pet'),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEditMode ? 'Edit pet' : 'Add pet'}</DialogTitle>
      <DialogContent>
        <form
          id="pet-form"
          className="space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <PetFormContent form={form} ownerOptions={ownerOptions} />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" form="pet-form" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : isEditMode ? 'Save changes' : 'Add pet'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
