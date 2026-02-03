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
import VisitFormContent from './VisitFormContent';
import useCreateVisitMutation from '../../hooks/useCreateVisitMutation';
import { useAllPetsQuery } from '../../hooks/useAllPetsQuery';
import { useAllVetsQuery } from '../../hooks/useAllVetsQuery';
import useOwnerNameMap from '../../hooks/useOwnerNameMap';
import useUpdateVisitMutation from '../../hooks/useUpdateVisitMutation';
import toast from 'react-hot-toast';
import type { Visit } from '../../types/admin';
import type { SelectOption } from '../ui/form/FormSelect';

const visitSchema = z.object({
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
  invoiceAmount: z.string().optional(),
  notes: z.string().optional(),
});

export type VisitFormValues = z.infer<typeof visitSchema>;

type Props = {
  open: boolean;
  onClose: () => void;
  initialValues?: Visit | null;
  defaultPetId?: string;
  petOptionsOverride?: SelectOption[];
};

const VISIT_FORM_DEFAULTS: VisitFormValues = {
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

export default function VisitFormDialog({
  open,
  onClose,
  initialValues,
  defaultPetId,
  petOptionsOverride,
}: Props) {
  const form = useForm<VisitFormValues>({
    resolver: zodResolver(visitSchema),
    defaultValues: VISIT_FORM_DEFAULTS,
  });

  useEffect(() => {
    if (initialValues) {
      form.reset({
        visitDate: initialValues.visitDate,
        petId: initialValues.petId,
        vetId: initialValues.vetId,
        reason: initialValues.reason,
        status: initialValues.status,
        diagnosis: initialValues.diagnosis ?? '',
        treatment: initialValues.treatment ?? '',
        invoiceAmount: initialValues.invoiceAmount
          ? String(initialValues.invoiceAmount)
          : '',
        notes: initialValues.notes ?? '',
      });
      return;
    }
    form.reset({
      ...VISIT_FORM_DEFAULTS,
      petId: defaultPetId ?? '',
    });
  }, [initialValues, form, defaultPetId]);

  const isEditMode = Boolean(initialValues);

  const { mutate: createVisit, isPending: isCreating } =
    useCreateVisitMutation();
  const { mutate: updateVisit, isPending: isUpdating } =
    useUpdateVisitMutation();

  const isSubmitting = isEditMode ? isUpdating : isCreating;

  const onSubmit: SubmitHandler<VisitFormValues> = (values) => {
    const payload = {
      ...values,
      invoiceAmount: values.invoiceAmount
        ? Number(values.invoiceAmount)
        : undefined,
    };
    if (isEditMode && initialValues) {
      updateVisit(
        { id: initialValues.id, data: payload },
        {
          onSuccess: () => {
            toast.success('Visit saved');
            form.reset();
            onClose();
          },
          onError: (error) =>
            toast.error(error.message ?? 'Failed to save visit'),
        },
      );
      return;
    }

    createVisit(payload, {
      onSuccess: () => {
        toast.success('Visit saved');
        form.reset();
        onClose();
      },
      onError: (error) => toast.error(error.message ?? 'Failed to save visit'),
    });
  };

  const { data: pets = [] } = useAllPetsQuery();
  const { data: vets = [] } = useAllVetsQuery();
  const ownerNameById = useOwnerNameMap();

  const fallbackPetOptions = pets
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((pet) => ({
      value: pet.id,
      label: `${pet.name} · Owner: ${ownerNameById[pet.ownerId] ?? 'Unknown'}`,
    }));

  const petOptions =
    petOptionsOverride && petOptionsOverride.length > 0
      ? petOptionsOverride
      : fallbackPetOptions;

  const vetOptions = vets
    .slice()
    .sort((a, b) => a.fullName.localeCompare(b.fullName))
    .map((vet) => ({ value: vet.id, label: `${vet.fullName} (${vet.role})` }));

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEditMode ? 'Edit visit' : 'Add visit'}</DialogTitle>
      <DialogContent>
        <form
          id="visit-form"
          className="space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <VisitFormContent
            form={form}
            petOptions={petOptions}
            vetOptions={vetOptions}
          ></VisitFormContent>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" form="visit-form" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : isEditMode ? 'Save changes' : 'Add visit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
