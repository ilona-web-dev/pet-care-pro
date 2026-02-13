import { type UseFormReturn } from 'react-hook-form';
import { type ClientFormValues } from '../../formSchema/clientSchema';
import FormField from '../ui/form/FormField';
import FormInput from '../ui/form/FormInput';
import FormTextArea from '../ui/form/FormTextArea';

type Props = { form: UseFormReturn<ClientFormValues> };

export default function ClientFormContent({ form }: Props) {
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

      <FormField label="Email" htmlFor="email" error={errors.email?.message}>
        <FormInput
          id="email"
          type="email"
          placeholder="client@email.com"
          {...register('email')}
          hasError={!!errors.email}
        />
      </FormField>

      <FormField label="Phone" htmlFor="phone" error={errors.phone?.message}>
        <FormInput
          id="phone"
          type="tel"
          placeholder="+1 555 123 4567"
          {...register('phone')}
          hasError={!!errors.phone}
        />
      </FormField>

      <FormField
        label="Address"
        htmlFor="address"
        error={errors.address?.message}
      >
        <FormInput
          id="address"
          placeholder="123 Clover Road"
          {...register('address')}
          hasError={!!errors.address}
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
