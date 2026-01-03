import { type UseFormReturn } from 'react-hook-form';
import type { PetFormValues } from './PetFormDialog';
import FormField from '../ui/form/FormField';
import FormInput from '../ui/form/FormInput';
import FormSelect from '../ui/form/FormSelect';
import FormTextArea from '../ui/form/FormTextArea';

type Props = {
  form: UseFormReturn<PetFormValues>;
  ownerOptions: { value: string; label: string }[];
};

const speciesOptions = [
  { value: 'dog', label: 'Dog' },
  { value: 'cat', label: 'Cat' },
  { value: 'bird', label: 'Bird' },
  { value: 'other', label: 'Other' },
];

const sexOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

export default function PetFormContent({ form, ownerOptions }: Props) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-4">
      <FormField label="Owner" htmlFor="ownerId" error={errors.ownerId?.message}>
        <FormSelect
          id="ownerId"
          options={ownerOptions}
          placeholder="Select owner"
          {...register('ownerId')}
          hasError={!!errors.ownerId}
        />
      </FormField>

      <FormField label="Pet name" htmlFor="name" error={errors.name?.message}>
        <FormInput
          id="name"
          placeholder="Buddy"
          {...register('name')}
          hasError={!!errors.name}
        />
      </FormField>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          label="Species"
          htmlFor="species"
          error={errors.species?.message}
        >
          <FormSelect
            id="species"
            options={speciesOptions}
            placeholder="Select species"
            {...register('species')}
            hasError={!!errors.species}
          />
        </FormField>

        <FormField label="Breed" htmlFor="breed" error={errors.breed?.message}>
          <FormInput
            id="breed"
            placeholder="Golden Retriever"
            {...register('breed')}
            hasError={!!errors.breed}
          />
        </FormField>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Sex" htmlFor="sex" error={errors.sex?.message}>
          <FormSelect
            id="sex"
            options={sexOptions}
            placeholder="Select sex"
            {...register('sex')}
            hasError={!!errors.sex}
          />
        </FormField>

        <FormField
          label="Birth date"
          htmlFor="birthDate"
          error={errors.birthDate?.message}
        >
          <FormInput
            id="birthDate"
            type="date"
            {...register('birthDate')}
            hasError={!!errors.birthDate}
          />
        </FormField>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          label="Microchip"
          htmlFor="microchip"
          error={errors.microchip?.message}
        >
          <FormInput
            id="microchip"
            placeholder="MC123456"
            {...register('microchip')}
            hasError={!!errors.microchip}
          />
        </FormField>

        <FormField
          label="Weight (kg)"
          htmlFor="weightKg"
          error={errors.weightKg?.message}
        >
          <FormInput
            id="weightKg"
            type="number"
            step="0.1"
            placeholder="4.5"
            {...register('weightKg')}
            hasError={!!errors.weightKg}
          />
        </FormField>
      </div>

      <FormField label="Notes" htmlFor="notes" error={errors.notes?.message}>
        <FormTextArea
          id="notes"
          rows={3}
          placeholder="Temperament, special care..."
          {...register('notes')}
          hasError={!!errors.notes}
        />
      </FormField>
    </div>
  );
}
