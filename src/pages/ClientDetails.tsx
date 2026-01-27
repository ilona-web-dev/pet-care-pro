import { useParams } from 'react-router-dom';

export default function ClientDetails() {
  const { clientId } = useParams();
  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm tracking-[0.2em] text-slate-500 uppercase">
          Client
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">Sean O'Connor</h1>
        <p className="text-sm text-slate-600">ID: {clientId}</p>
      </header>
      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-100 p-4">
          <h2 className="text-sm font-semibold text-slate-500 uppercase">
            Contact info
          </h2>
          {/* Email, phone, address */}
        </article>
        <article className="rounded-2xl border border-slate-100 p-4">
          <h2 className="text-sm font-semibold text-slate-500 uppercase">
            Notes
          </h2>
          {/* Notes text */}
        </article>
      </section>
      <section className="rounded-2xl border border-slate-100 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-800">Pets</h2>
          <button className="text-sm text-teal-600">Add pet</button>
        </div>
        {/* List of pets */}
      </section>
      <section className="rounded-2xl border border-slate-100 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-800">
            Recent visits
          </h2>
          <button className="text-sm text-teal-600">Schedule visit</button>
        </div>
        {/* Visits */}
      </section>
    </div>
  );
}
