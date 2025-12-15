import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FormInput from './ui/form/FormInput';
import FormSelect from './ui/form/FormSelect';
import FormTextArea from './ui/form/FormTextArea';

const visitTypes = [
  { value: 'wellness', label: 'Wellness visit' },
  { value: 'surgery', label: 'Surgery consult' },
  { value: 'emergency', label: 'Emergency triage' },
  { value: 'grooming', label: 'Grooming' },
  { value: 'behaviour', label: 'Behaviour & nutrition' },
  { value: 'other', label: 'Other' },
];

const contactSchema = z.object({
  ownerName: z.string().min(2, 'Please enter your name'),
  phone: z.string().min(2, 'Phone number is required'),
  email: z.string().email('Valid email required'),
  petName: z.string().min(1, 'Pet name is required'),
  visitType: z.string().min(1, 'Select visit type'),
  message: z.string().min(5, 'Please describe the concern'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      ownerName: '',
      phone: '',
      email: '',
      petName: '',
      visitType: '',
      message: '',
    },
  });

  const onSubmit = handleSubmit((values) => {
    console.log(values);
    reset();
  });

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-100">
      <form className="space-y-6" onSubmit={onSubmit}>
        <FormInput
          label="Your name"
          id="ownerName"
          placeholder="Aoife Murphy"
          type="text"
          {...register('ownerName', { required: true })}
          error={errors.ownerName?.message}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <FormInput
            label="Phone number"
            id="phone"
            placeholder="+353 1 123 4567"
            type="tel"
            {...register('phone')}
            error={errors.phone?.message}
          />
          <FormInput
            label="Email address"
            id="email"
            placeholder="you@email.com"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <FormInput
            label="Pet name"
            id="petName"
            placeholder="Finn"
            type="text"
            {...register('petName')}
            error={errors.petName?.message}
          />
          <FormSelect
            id="visitType"
            label="Type of visit"
            options={visitTypes}
            placeholder="Select visit type"
            defaultValue=""
            {...register('visitType')}
            error={errors.visitType?.message}
          />
        </div>
        <FormTextArea
          id="message"
          label="Notes / symptoms"
          placeholder="Let us know if your pet has ongoing meds, allergies, or specific concerns."
          {...register('message')}
          error={errors.message?.message}
        />

        <button
          className="w-full rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          type="submit"
        >
          Request callback
        </button>
        <p className="text-center text-xs text-slate-400">
          By submitting you agree to be contacted via phone or email within
          clinic hours.
        </p>
      </form>
    </div>
  );
}
