import heroMainImg from '../../assets/vet-doctor-main.jpg';
const careHighlights = [
  {
    title: 'Multi-pet records',
    description:
      'One secure portal for every cat, dog, and rabbit in the family.',
  },
  {
    title: 'Same-day diagnostics',
    description: 'In-house lab results delivered straight to your inbox.',
  },
  {
    title: 'Fear-free visits',
    description: 'Certified team, low-scent rooms, calming music.',
  },
  {
    title: 'Home pick-up',
    description: 'Transport for senior pets anywhere in Dublin County.',
  },
];

export default function HeroSection() {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-4 py-12 lg:grid-cols-2">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
          Trusted Dublin vets
        </span>
        <h1 className="mt-4 text-4xl font-bold text-slate-800 sm:text-5xl">
          Compassionate veterinary care with modern records and real-time
          updates.
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          We combine decades of experience with a digital-first approach—online
          intake, live visit summaries, and a dedicated nurse line for every pet
          parent.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href="#contact"
            className="rounded-full bg-teal-600 px-6 py-3 font-semibold text-white shadow-lg shadow-teal-600/20 transition hover:bg-teal-700 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            Book appointment
          </a>
          <a
            href="tel:+35311234567"
            className="rounded-full bg-white/90 px-6 py-3 font-semibold text-teal-700 shadow-sm shadow-slate-200 transition hover:bg-white focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            Call now
          </a>
        </div>

        <dl className="mt-8 grid gap-6 text-sm text-slate-600 sm:grid-cols-2">
          {careHighlights.map((highlight) => (
            <div key={highlight.title}>
              <dt className="font-semibold text-slate-900">
                {highlight.title}
              </dt>
              <dd>{highlight.description}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative">
        <img
          src={heroMainImg}
          alt="Veterinarian comforting a dog during a wellness visit"
          className="h-[380px] w-full rounded-3xl object-cover object-right shadow-xl sm:h-[440px] lg:h-[580px]"
        />
        <div className="absolute bottom-6 left-1/2 flex w-[320px] -translate-x-1/2 flex-col gap-3 rounded-2xl bg-white/90 p-5 shadow-lg shadow-teal-600/10 sm:w-[360px] lg:left-6 lg:w-72 lg:translate-x-0">
          <div>
            <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
              This month
            </p>
            <p className="text-2xl font-semibold text-slate-900">
              128 pets treated
            </p>
            <p className="text-sm text-teal-600">
              Emergency care within 15 min
            </p>
          </div>
          <div className="border-t border-slate-100 pt-3 text-sm text-slate-600">
            <p>Live visit updates sent straight to your phone.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
