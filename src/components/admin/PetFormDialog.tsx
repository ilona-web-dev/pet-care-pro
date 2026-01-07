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
import { useClientsQuery } from '../../hooks/useClientsQuery';

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
};

export default function PetFormDialog({ open, onClose }: Props) {
  const { data: clients = [] } = useClientsQuery();
  const ownerOptions = clients
    .slice()
    .sort((a, b) => a.fullName.localeCompare(b.fullName))
    .map((client) => ({
      value: client.id,
      label: `${client.fullName} (${client.email})`,
    }));

  const form = useForm<PetFormValues>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      ownerId: '',
      name: '',
      species: 'dog',
      breed: '',
      sex: undefined,
      birthDate: '',
      microchip: '',
      weightKg: '',
      notes: '',
    },
  });

  const { mutate, isPending } = useCreatePetMutation();

  const onSubmit: SubmitHandler<PetFormValues> = (values) => {
    const payload = {
      ...values,
      weightKg: values.weightKg ? Number(values.weightKg) : undefined,
    };

    mutate(payload, {
      onSuccess: () => {
        toast.success('Pet added');
        form.reset();
        onClose();
      },
      onError: (error) => toast.error(error.message ?? 'Failed to save pet'),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add pet</DialogTitle>
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
        <Button onClick={onClose} disabled={isPending}>
          Cancel
        </Button>
        <Button type="submit" form="pet-form" disabled={isPending}>
          {isPending ? 'Adding...' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
