import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';
import { type VisitReason, type VisitStatus } from '../types/admin';

type UpdateVisitMutation = {
  id: string;
  data: {
    petId?: string;
    vetId?: string;
    visitDate?: string;
    reason?: VisitReason;
    status?: VisitStatus;
    diagnosis?: string;
    treatment?: string;
    invoiceAmount?: number;
    notes?: string;
  };
};

function useUpdateVisitMutation() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, UpdateVisitMutation>({
    mutationFn: async ({ id, data }) => {
      const { error } = await supabase
        .from('visits')
        .update({
          pet_id: data.petId ?? null,
          vet_id: data.vetId ?? null,
          visit_date: data.visitDate ?? null,
          reason: data.reason ?? null,
          status: data.status ?? null,
          diagnosis: data.diagnosis ?? null,
          treatment: data.treatment ?? null,
          invoice_amount: data.invoiceAmount ?? null,
          notes: data.notes ?? null,
        })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Visit updated');
      queryClient.invalidateQueries({ queryKey: ['visits'] });
    },
    onError: (error) => toast.error(error.message ?? 'Failed to update visit'),
  });
}

export default useUpdateVisitMutation;
