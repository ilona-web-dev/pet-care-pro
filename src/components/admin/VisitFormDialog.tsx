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
import { usePetsQuery } from '../../hooks/usePetsQuery';
import { useVetsQuery } from '../../hooks/useVetsQuery';
import useOwnerNameMap from '../../hooks/useOwnerNameMap';
import toast from 'react-hot-toast';

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
};

export default function VisitFormDialog({ open, onClose }: Props) {
  const form = useForm<VisitFormValues>({
    resolver: zodResolver(visitSchema),
    defaultValues: {
      visitDate: '',
      petId: '',
      vetId: '',
      reason: 'vaccination',
      status: 'planned',
      diagnosis: '',
      treatment: '',
      invoiceAmount: '',
      notes: '',
    },
  });

  const { mutate, isPending } = useCreateVisitMutation();

  const onSubmit: SubmitHandler<VisitFormValues> = (values) => {
    const payload = {
      ...values,
      invoiceAmount: values.invoiceAmount
        ? Number(values.invoiceAmount)
        : undefined,
    };
    mutate(payload, {
      onSuccess: () => {
        toast.success('Visit added');
        form.reset();
        onClose();
      },
      onError: (error) => toast.error(error.message ?? 'Failed to save'),
    });
  };

  const { data: pets = [] } = usePetsQuery();
  const { data: vets = [] } = useVetsQuery();
  const ownerNameById = useOwnerNameMap();

  const petOptions = pets
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((pet) => ({
      value: pet.id,
      label: `${pet.name} · Owner: ${ownerNameById[pet.ownerId] ?? 'Unknown'}`,
    }));

  const vetOptions = vets
    .slice()
    .sort((a, b) => a.fullName.localeCompare(b.fullName))
    .map((vet) => ({ value: vet.id, label: `${vet.fullName} (${vet.role})` }));

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add visit</DialogTitle>
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
        <Button onClick={onClose} disabled={isPending}>
          Cancel
        </Button>
        <Button type="submit" form="visit-form" disabled={isPending}>
          {isPending ? 'Adding...' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
