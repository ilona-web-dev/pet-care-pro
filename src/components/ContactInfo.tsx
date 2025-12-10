import mapImage from '../assets/map.jpg';
export default function ContactInfo() {
  return (
    <div className="rounded-3xl bg-slate-900 p-8 text-slate-200">
      <p className="text-sm font-semibold tracking-wide text-teal-100 uppercase">
        Visit us
      </p>
      <p className="mt-3 text-xl font-semibold text-white">
        PetCare Pro, Dublin 2
      </p>
      <p className="mt-2 text-sm text-slate-300">
        62 Lower Grand Canal Street, Dublin 2
      </p>
      <div className="mt-5 space-y-3 text-sm">
        <p className="text-slate-300">
          <span className="font-semibold text-white">Main line:</span> +353 1
          123 4567
        </p>
        <p className="text-slate-300">
          <span className="font-semibold text-white">
            Emergency nurse 24/7:
          </span>{' '}
          +353 1 555 2470
        </p>
        <p className="text-slate-300">
          <span className="font-semibold text-white">Email:</span>{' '}
          <a
            className="underline decoration-teal-500/60 hover:text-white"
            href="mailto:care@petcarepro.ie"
          >
            care@petcarepro.ie
          </a>
        </p>
      </div>
      <div className="mt-6 space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
        <p className="text-xs tracking-wide text-slate-300 uppercase">
          Clinic hours
        </p>
        <p>Mon – Fri · 08:00 – 20:00</p>
        <p>Saturday · 09:00 – 18:00</p>
        <p>Sunday · Emergency nurse triage</p>
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
        <img
          src={mapImage}
          alt="Map of PetCare Pro Dublin location"
          className="h-48 w-full object-cover"
        />
      </div>
    </div>
  );
}
