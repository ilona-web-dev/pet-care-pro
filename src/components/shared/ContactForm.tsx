import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ImSpinner2 } from 'react-icons/im';
import FormInput from '../ui/form/FormInput';
import FormSelect from '../ui/form/FormSelect';
import FormTextArea from '../ui/form/FormTextArea';
import FormField from '../ui/form/FormField';

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

const simulateRequest = (values: ContactFormValues) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log('Contact request', values);
      resolve();
    }, 1200);
  });

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
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

  const onSubmit = handleSubmit(async (values) => {
    try {
      await toast.promise(simulateRequest(values), {
        loading: 'Sending request...',
        success: 'Thanks! We will call or email you shortly.',
        error: 'Something went wrong. Please try again.',
      });
      reset();
    } catch (error) {
      // toast.promise already handled the error state
    }
  });

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-100">
      <form className="space-y-6" onSubmit={onSubmit}>
        <FormField
          label="Your name"
          htmlFor="ownerName"
          error={errors.ownerName?.message}
        >
          <FormInput
            id="ownerName"
            placeholder="Aoife Murphy"
            type="text"
            {...register('ownerName')}
            hasError={!!errors.ownerName}
          />
        </FormField>

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            label="Phone number"
            htmlFor="phone"
            error={errors.phone?.message}
          >
            <FormInput
              id="phone"
              placeholder="+353 1 123 4567"
              type="tel"
              {...register('phone')}
              hasError={!!errors.phone}
            />
          </FormField>

          <FormField
            label="Email address"
            htmlFor="email"
            error={errors.email?.message}
          >
            <FormInput
              id="email"
              placeholder="you@email.com"
              type="email"
              {...register('email')}
              hasError={!!errors.email}
            />
          </FormField>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            label="Pet name"
            htmlFor="petName"
            error={errors.petName?.message}
          >
            <FormInput
              id="petName"
              placeholder="Finn"
              type="text"
              {...register('petName')}
              hasError={!!errors.petName}
            />
          </FormField>

          <FormField
            label="Type of visit"
            htmlFor="visitType"
            error={errors.visitType?.message}
          >
            <FormSelect
              id="visitType"
              options={visitTypes}
              placeholder="Select visit type"
              defaultValue=""
              {...register('visitType')}
              hasError={!!errors.visitType}
            />
          </FormField>
        </div>
        <FormField
          label="Notes / symptoms"
          htmlFor="message"
          error={errors.message?.message}
        >
          <FormTextArea
            id="message"
            placeholder="Let us know if your pet has ongoing meds, allergies, or specific concerns."
            {...register('message')}
            hasError={!!errors.message}
          />
        </FormField>

        <button
          className="w-full rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <ImSpinner2 className="h-4 w-4 animate-spin" />
              Sending...
            </span>
          ) : (
            'Request callback'
          )}
        </button>
        <p className="text-center text-xs text-slate-400">
          By submitting you agree to be contacted via phone or email within
          clinic hours.
        </p>
      </form>
    </div>
  );
}
