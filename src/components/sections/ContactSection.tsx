import ContactForm from '../shared/ContactForm';
import ContactInfo from '../shared/ContactInfo';

export default function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4">
      <div className="text-center">
        <p className="text-sm font-semibold tracking-wide text-teal-600 uppercase">
          Ready to visit?
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-800">
          Request a callback from our front desk within 1 hour
        </h2>
        <p className="mt-3 text-base text-slate-600">
          Share a few details about your pet and we&apos;ll confirm the best
          time or connect you to the on-call nurse.
        </p>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <ContactForm />
        <ContactInfo />
      </div>
    </section>
  );
}
