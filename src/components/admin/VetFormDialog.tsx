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
import VetFormContent from './VetFormContent';
import useCreateVetMutation from '../../hooks/useCreateVetMutation';
import useUpdateVetMutation from '../../hooks/useUpdateVetMutation';
import toast from 'react-hot-toast';
import type { Vet } from '../../types/admin';

const vetSchema = z.object({
  fullName: z.string().min(2, 'Enter full name'),
  role: z.string().min(5, 'Enter role'),
  yearsExperience: z.number().min(1, 'Enter years of experience'),
  isActive: z.boolean(),
  notes: z.string().optional(),
});

export type VetFormValues = z.infer<typeof vetSchema>;

const VET_FORM_DEFAULTS: VetFormValues = {
  fullName: '',
  role: '',
  yearsExperience: 0,
  isActive: true,
  notes: '',
};

type Props = {
  open: boolean;
  onClose: () => void;
  initialValues?: Vet | null;
};

export default function VetFormDialog({ open, onClose, initialValues }: Props) {
  const form = useForm<VetFormValues>({
    resolver: zodResolver(vetSchema),
    defaultValues: VET_FORM_DEFAULTS,
  });

  useEffect(() => {
    form.reset(
      initialValues
        ? {
            fullName: initialValues.fullName,
            role: initialValues.role,
            yearsExperience: initialValues.yearsExperience,
            isActive: initialValues.isActive,
            notes: initialValues.notes ?? '',
          }
        : VET_FORM_DEFAULTS,
    );
  }, [initialValues, form]);

  const isEditMode = Boolean(initialValues);

  const { mutate: createVet, isPending: isCreating } = useCreateVetMutation();
  const { mutate: updateVet, isPending: isUpdating } = useUpdateVetMutation();

  const isSubmitting = isEditMode ? isUpdating : isCreating;

  const onSubmit: SubmitHandler<VetFormValues> = (values) => {
    if (isEditMode && initialValues) {
      updateVet(
        { id: initialValues.id, data: values },
        {
          onSuccess: () => {
            toast.success('Vet saved');
            form.reset();
            onClose();
          },
          onError: (error) =>
            toast.error(error.message ?? 'Failed to save vet'),
        },
      );
      return;
    }

    createVet(values, {
      onSuccess: () => {
        toast.success('Vet saved');
        form.reset();
        onClose();
      },
      onError: (error) => toast.error(error.message ?? 'Failed to save vet'),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEditMode ? 'Edit vet' : 'Add vet'}</DialogTitle>
      <DialogContent>
        <form
          id="vet-form"
          className="space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <VetFormContent form={form} />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" form="vet-form" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : isEditMode ? 'Save changes' : 'Add vet'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
