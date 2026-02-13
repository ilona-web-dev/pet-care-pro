import { useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import ClientFormContent from './ClientFormContent';
import useCreateClientMutation from '../../hooks/useCreateClientMutation';
import useUpdateClientMutation from '../../hooks/useUpdateClientMutation';
import toast from 'react-hot-toast';
import type { Client } from '../../types/admin';
import {
  clientSchema,
  CLIENT_FORM_DEFAULTS,
  type ClientFormValues,
} from '../../formSchema/clientSchema';

type Props = {
  open: boolean;
  onClose: () => void;
  initialValues?: Client | null;
};

export default function ClientFormDialog({
  open,
  onClose,
  initialValues,
}: Props) {
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: CLIENT_FORM_DEFAULTS,
  });

  useEffect(() => {
    if (initialValues) {
      form.reset({
        fullName: initialValues.fullName,
        email: initialValues.email,
        phone: initialValues.phone,
        address: initialValues.address ?? '',
        notes: initialValues.notes ?? '',
      });
      return;
    }
    form.reset(CLIENT_FORM_DEFAULTS);
  }, [initialValues, form]);

  const isEditMode = Boolean(initialValues);

  const { mutate: createClient, isPending: isCreating } =
    useCreateClientMutation();
  const { mutate: updateClient, isPending: isUpdating } =
    useUpdateClientMutation();

  const isSubmitting = isEditMode ? isUpdating : isCreating;

  const onSubmit: SubmitHandler<ClientFormValues> = (values) => {
    if (isEditMode && initialValues) {
      updateClient(
        { id: initialValues.id, data: values },
        {
          onSuccess: () => {
            toast.success('Client saved');
            form.reset();
            onClose();
          },
          onError: (error) =>
            toast.error(error.message ?? 'Failed to save client'),
        },
      );
      return;
    }

    createClient(values, {
      onSuccess: () => {
        toast.success('Client saved');
        form.reset();
        onClose();
      },
      onError: (error) => toast.error(error.message ?? 'Failed to save'),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEditMode ? 'Edit client' : 'Add client'}</DialogTitle>
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
        <Button onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" form="client-form" disabled={isSubmitting}>
          {isSubmitting
            ? 'Saving…'
            : isEditMode
              ? 'Save changes'
              : 'Add client'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
