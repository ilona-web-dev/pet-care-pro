import { type UseFormReturn } from 'react-hook-form';
import FormField from '../ui/form/FormField';
import FormInput from '../ui/form/FormInput';
import FormSelect from '../ui/form/FormSelect';
import FormTextArea from '../ui/form/FormTextArea';
import type { VisitFormValues } from '../../formSchema/visitSchema';
import type { SelectOption } from '../ui/form/FormSelect';

type VisitFormContentProps = {
  form: UseFormReturn<VisitFormValues>;
  petOptions: SelectOption[];
  vetOptions: SelectOption[];
};

const reasonOptions: SelectOption[] = [
  { value: 'vaccination', label: 'Vaccination' },
  { value: 'routine_checkup', label: 'Routine check-up' },
  { value: 'follow_up', label: 'Follow-up' },
  { value: 'grooming', label: 'Grooming' },
  { value: 'other', label: 'Other' },
];

const statusOptions: SelectOption[] = [
  { value: 'planned', label: 'Planned' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function VisitFormContent({
  form,
  petOptions,
  vetOptions,
}: VisitFormContentProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-4">
      <FormField label="Pet" htmlFor="petId" error={errors.petId?.message}>
        <FormSelect
          id="petId"
          options={petOptions}
          placeholder="Select pet"
          {...register('petId')}
          hasError={!!errors.petId}
        />
      </FormField>

      <FormField label="Vet" htmlFor="vetId" error={errors.vetId?.message}>
        <FormSelect
          id="vetId"
          options={vetOptions}
          placeholder="Select vet"
          {...register('vetId')}
          hasError={!!errors.vetId}
        />
      </FormField>

      <FormField
        label="Visit date"
        htmlFor="visitDate"
        error={errors.visitDate?.message}
      >
        <FormInput
          id="visitDate"
          type="date"
          {...register('visitDate')}
          hasError={!!errors.visitDate}
        />
      </FormField>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          label="Reason"
          htmlFor="reason"
          error={errors.reason?.message}
        >
          <FormSelect
            id="reason"
            options={reasonOptions}
            placeholder="Select reason"
            {...register('reason')}
            hasError={!!errors.reason}
          />
        </FormField>

        <FormField
          label="Status"
          htmlFor="status"
          error={errors.status?.message}
        >
          <FormSelect
            id="status"
            options={statusOptions}
            placeholder="Select status"
            {...register('status')}
            hasError={!!errors.status}
          />
        </FormField>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          label="Diagnosis"
          htmlFor="diagnosis"
          error={errors.diagnosis?.message}
        >
          <FormInput
            id="diagnosis"
            placeholder="Diagnosis notes"
            {...register('diagnosis')}
            hasError={!!errors.diagnosis}
          />
        </FormField>

        <FormField
          label="Treatment"
          htmlFor="treatment"
          error={errors.treatment?.message}
        >
          <FormInput
            id="treatment"
            placeholder="Treatment details"
            {...register('treatment')}
            hasError={!!errors.treatment}
          />
        </FormField>
      </div>

      <FormField
        label="Invoice amount (€)"
        htmlFor="invoiceAmount"
        error={errors.invoiceAmount?.message}
      >
        <FormInput
          id="invoiceAmount"
          type="number"
          step="0.01"
          placeholder="70"
          {...register('invoiceAmount')}
          hasError={!!errors.invoiceAmount}
        />
      </FormField>

      <FormField label="Notes" htmlFor="notes" error={errors.notes?.message}>
        <FormTextArea
          id="notes"
          rows={3}
          placeholder="Extra notes"
          {...register('notes')}
          hasError={!!errors.notes}
        />
      </FormField>
    </div>
  );
}
