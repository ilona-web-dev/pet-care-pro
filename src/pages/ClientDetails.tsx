import { useParams } from 'react-router-dom';
import useClientDetailsQuery from '../hooks/useClientDetailsQuery';
import { Alert, CircularProgress } from '@mui/material';

export default function ClientDetails() {
  const { clientId } = useParams<{ clientId: string }>();
  const { data, isPending, isError, error } = useClientDetailsQuery(clientId);

  const client = data?.client;
  const pets = data?.pets ?? [];
  const visits = data?.visits ?? [];

  if (isPending)
    return (
      <div className="flex justify-center py-10">
        <CircularProgress />
      </div>
    );
  if (isError)
    return (
      <Alert severity="error" className="rounded-2xl">
        Failed to load client. {error?.message}
      </Alert>
    );

  if (!client)
    return <Alert severity="warning">Client could not be found.</Alert>;

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm tracking-[0.2em] text-slate-500 uppercase">
          Client
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">
          {client.fullName}
        </h1>
        <p className="text-sm text-slate-600">ID: {clientId}</p>
      </header>
      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h2 className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">
            Contact info
          </h2>
          <dl className="mt-4 space-y-3 text-sm text-slate-900">
            <div>
              <dt className="text-xs font-semibold text-slate-500 uppercase">
                Email
              </dt>
              <dd>{client.email || '—'}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-slate-500 uppercase">
                Phone
              </dt>
              <dd>{client.phone || '—'}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-slate-500 uppercase">
                Address
              </dt>
              <dd>{client.address || '—'}</dd>
            </div>
          </dl>
        </article>
        <article className="rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Notes
          </h2>
          <p className="mt-4 text-sm text-slate-700">
            {client.notes ? client.notes : 'No notes yet.'}
          </p>
        </article>
      </section>
      <section className="rounded-2xl border border-slate-100 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-800">Pets</h2>
          <button className="text-sm text-teal-600">Add pet</button>
        </div>
        {pets.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">
            No pets linked to this client yet.
          </p>
        ) : (
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {pets.map((pet) => (
              <div
                key={pet.id}
                className="rounded-xl border border-slate-100 p-4 text-sm shadow-sm"
              >
                <div className="font-semibold text-slate-900">{pet.name}</div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  {pet.species}
                </p>
                <p className="mt-2 text-slate-600">
                  {pet.breed ? `${pet.breed}` : 'Breed not specified'}
                </p>
                <p className="text-xs text-slate-500">
                  Weight: {pet.weightKg ? `${pet.weightKg} kg` : '—'}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
      <section className="rounded-2xl border border-slate-100 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-800">
            Recent visits
          </h2>
          <button className="text-sm text-teal-600">Schedule visit</button>
        </div>
        {visits.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">
            No visits recorded for this client yet.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-xs uppercase text-slate-500">
                <tr>
                  <th className="pb-2 pr-4">Date</th>
                  <th className="pb-2 pr-4">Pet</th>
                  <th className="pb-2 pr-4">Status</th>
                  <th className="pb-2">Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {visits.slice(0, 5).map((visit) => (
                  <tr key={visit.id}>
                    <td className="py-2 pr-4">
                      {new Date(visit.visitDate).toLocaleDateString()}
                    </td>
                    <td className="py-2 pr-4">
                      {pets.find((pet) => pet.id === visit.petId)?.name ??
                        'Unknown'}
                    </td>
                    <td className="py-2 pr-4 capitalize">
                      {visit.status.replace('_', ' ')}
                    </td>
                    <td className="py-2 capitalize">
                      {visit.reason.replace('_', ' ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
