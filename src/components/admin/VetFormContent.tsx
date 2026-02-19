import { type UseFormReturn } from 'react-hook-form';
import FormField from '../ui/form/FormField';
import FormInput from '../ui/form/FormInput';
import FormTextArea from '../ui/form/FormTextArea';
import FormSelect from '../ui/form/FormSelect';
import { type VetFormValues } from '../../formSchema/vetSchema';

type Props = { form: UseFormReturn<VetFormValues> };

export default function VetFormContent({ form }: Props) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <>
      <FormField
        label="Full name"
        htmlFor="fullName"
        error={errors.fullName?.message}
      >
        <FormInput
          id="fullName"
          placeholder="Jane Smith"
          {...register('fullName')}
          hasError={!!errors.fullName}
        />
      </FormField>

      <FormField label="Role" htmlFor="role" error={errors.role?.message}>
        <FormInput
          id="role"
          placeholder="Surgery lead"
          {...register('role')}
          hasError={!!errors.role}
        />
      </FormField>

      <FormField
        label="Years experience"
        htmlFor="yearsExperience"
        error={errors.yearsExperience?.message}
      >
        <FormInput
          id="yearsExperience"
          type="number"
          placeholder="5"
          {...register('yearsExperience', { valueAsNumber: true })}
          hasError={!!errors.yearsExperience}
        />
      </FormField>

      <FormField
        label="Is vet active"
        htmlFor="isActive"
        error={errors.isActive?.message}
      >
        <FormSelect
          {...register('isActive', { setValueAs: (val) => val === 'true' })}
          options={[
            { value: 'true', label: 'Active' },
            { value: 'false', label: 'Inactive' },
          ]}
          id="isActive"
          placeholder="Select status"
          hasError={!!errors.isActive}
        />
      </FormField>

      <FormField label="Notes" htmlFor="notes" error={errors.notes?.message}>
        <FormTextArea
          id="notes"
          placeholder="Pet meds, allergies, preferences…"
          rows={3}
          {...register('notes')}
          hasError={!!errors.notes}
        />
      </FormField>
    </>
  );
}
