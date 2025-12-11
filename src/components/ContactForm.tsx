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

export default function ContactForm() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-100">
      <form className="space-y-6">
        <FormInput
          label="Your name"
          id="ownerName"
          name="ownerName"
          placeholder="Aoife Murphy"
          type="text"
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <FormInput
            label="Phone number"
            id="phone"
            name="phone"
            placeholder="+353 1 123 4567"
            type="tel"
          />
          <FormInput
            label="Email address"
            id="email"
            name="email"
            placeholder="you@email.com"
            type="email"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <FormInput
            label="Pet name"
            id="petName"
            name="petName"
            placeholder="Finn"
            type="text"
          />
          <FormSelect
            id="visitType"
            name="visitType"
            label="Type of visit"
            options={visitTypes}
            placeholder="Select visit type"
            defaultValue=""
          />
        </div>
        <FormTextArea
          id="message"
          name="message"
          label="Notes / symptoms"
          placeholder="Let us know if your pet has ongoing meds, allergies, or specific concerns."
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
