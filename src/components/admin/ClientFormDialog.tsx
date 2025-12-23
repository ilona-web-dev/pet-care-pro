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
import ClientFormContent from './ClientFormContent';
import useCreateClientMutation from '../../hooks/useCreateClientMutation';
import toast from 'react-hot-toast';

const clientSchema = z.object({
  fullName: z.string().min(2, 'Enter full name'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(5, 'Enter phone'),
  address: z.string().optional(),
  notes: z.string().optional(),
});

export type ClientFormValues = z.infer<typeof clientSchema>;

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ClientFormDialog({ open, onClose }: Props) {
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      notes: '',
    },
  });

  const { mutate, isPending } = useCreateClientMutation();

  const onSubmit: SubmitHandler<ClientFormValues> = (values) => {
    mutate(values, {
      onSuccess: () => {
        toast.success('Client added');
        form.reset();
        onClose();
      },
      onError: (error) => toast.error(error.message ?? 'Failed to save'),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add client</DialogTitle>
      <DialogContent>
        <form
          id="client-form"
          className="space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <ClientFormContent form={form} />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isPending}>
          Cancel
        </Button>
        <Button type="submit" form="client-form" disabled={isPending}>
          {isPending ? 'Saving....' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
