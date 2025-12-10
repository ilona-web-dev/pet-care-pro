const visitTypes = [
  'Wellness visit',
  'Surgery consult',
  'Emergency triage',
  'Grooming',
  'Behaviour & nutrition',
  'Other',
];

export default function ContactForm() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-100">
      <form className="space-y-6">
        <div>
          <label
            className="text-sm font-semibold text-slate-700"
            htmlFor="ownerName"
          >
            Your name
          </label>
          <input
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 transition outline-none focus-visible:border-teal-400 focus-visible:ring-2 focus-visible:ring-teal-500/40"
            id="ownerName"
            name="ownerName"
            placeholder="Aoife Murphy"
            type="text"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              className="text-sm font-semibold text-slate-700"
              htmlFor="phone"
            >
              Phone number
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 transition outline-none focus-visible:border-teal-400 focus-visible:ring-2 focus-visible:ring-teal-500/40"
              id="phone"
              name="phone"
              placeholder="+353 1 123 4567"
              type="tel"
            />
          </div>
          <div>
            <label
              className="text-sm font-semibold text-slate-700"
              htmlFor="email"
            >
              Email address
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 transition outline-none focus-visible:border-teal-400 focus-visible:ring-2 focus-visible:ring-teal-500/40"
              id="email"
              name="email"
              placeholder="you@email.com"
              type="email"
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              className="text-sm font-semibold text-slate-700"
              htmlFor="petName"
            >
              Pet name
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 transition outline-none focus-visible:border-teal-400 focus-visible:ring-2 focus-visible:ring-teal-500/40"
              id="petName"
              name="petName"
              placeholder="Finn"
              type="text"
            />
          </div>
          <div>
            <label
              className="text-sm font-semibold text-slate-700"
              htmlFor="visitType"
            >
              Type of visit
            </label>
            <select
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 transition outline-none focus-visible:border-teal-400 focus-visible:ring-2 focus-visible:ring-teal-500/40"
              id="visitType"
              name="visitType"
              defaultValue=""
            >
              <option value="" disabled>
                Select visit type
              </option>
              {visitTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            className="text-sm font-semibold text-slate-700"
            htmlFor="message"
          >
            Notes / symptoms
          </label>
          <textarea
            className="mt-2 min-h-[120px] w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 transition outline-none focus-visible:border-teal-400 focus-visible:ring-2 focus-visible:ring-teal-500/40"
            id="message"
            name="message"
            placeholder="Let us know if your pet has ongoing meds, allergies, or specific concerns."
          />
        </div>

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
