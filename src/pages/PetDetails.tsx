import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert, CircularProgress } from '@mui/material';
import AdminHeader from '../components/admin/AdminHeader';
import usePetDetailsQuery from '../hooks/usePetDetailsQuery';
import PetFormDialog from '../components/admin/PetFormDialog';
import VisitFormDialog from '../components/admin/VisitFormDialog';

export default function PetDetail() {
  const [isPetDialogOpen, setPetDialogOpen] = useState(false);
  const [isVisitDialogOpen, setVisitDialogOpen] = useState(false);
  const { petId } = useParams<{ petId: string }>();
  const navigate = useNavigate();
  const { data, isPending, isError, error } = usePetDetailsQuery(petId);

  if (isPending) {
    return (
      <div className="flex justify-center py-10">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert severity="error" className="rounded-2xl">
        Failed to load pet. {error?.message}
      </Alert>
    );
  }

  if (!data?.pet || !data.owner) {
    return <Alert severity="warning">Pet could not be found.</Alert>;
  }

  const pet = data.pet;
  const owner = data.owner;
  const visits = data.visits ?? [];
  const visitPetOptions = [{ value: pet.id, label: pet.name }];

  return (
    <div className="space-y-6">
      <AdminHeader title="Pet details" />

      <section className="space-y-4 rounded-2xl border border-slate-100 p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-slate-500 uppercase">
              Pet
            </p>
            <h1 className="text-2xl font-semibold text-slate-900">{pet.name}</h1>
            <p className="text-sm text-slate-500">ID: {petId}</p>
          </div>
          <button
            className="cursor-pointer rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold tracking-wide text-slate-600 uppercase"
            onClick={() => setPetDialogOpen(true)}
          >
            Edit pet
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-slate-100 p-4">
            <h2 className="text-sm font-semibold text-slate-500 uppercase">
              Basic info
            </h2>
            <dl className="mt-3 space-y-2 text-sm text-slate-700">
              <div className="flex justify-between">
                <dt>Species</dt>
                <dd className="font-medium">{pet.species}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Breed</dt>
                <dd className="font-medium">{pet.breed ?? '—'}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Sex</dt>
                <dd className="font-medium">{pet.sex ?? '—'}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Birth date</dt>
                <dd className="font-medium">{pet.birthDate ?? '—'}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Weight</dt>
                <dd className="font-medium">
                  {pet.weightKg ? `${pet.weightKg} kg` : '—'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt>Microchip</dt>
                <dd className="font-medium">{pet.microchip ?? '—'}</dd>
              </div>
            </dl>
          </article>

          <article className="rounded-xl border border-slate-100 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-500 uppercase">
                Owner
              </h2>
              <button
                className="cursor-pointer text-xs font-semibold text-teal-600"
                onClick={() => navigate(`/admin/clients/${owner.id}`)}
              >
                View profile →
              </button>
            </div>
            <div className="mt-3 space-y-2 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">{owner.fullName}</p>
              <p>{owner.email}</p>
              <p>{owner.phone}</p>
            </div>
          </article>
        </div>

        <article className="rounded-xl border border-slate-100 p-4">
          <h2 className="text-sm font-semibold text-slate-500 uppercase">
            Notes
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            {pet.notes ?? 'No notes yet.'}
          </p>
        </article>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-800">
              Visit history
            </h2>
            <p className="text-sm text-slate-500">
              Last {visits.length} visits
            </p>
          </div>
          <button
            className="cursor-pointer rounded-full bg-teal-600 px-4 py-2 text-sm text-white"
            onClick={() => setVisitDialogOpen(true)}
          >
            Schedule visit
          </button>
        </div>

        <div className="space-y-3">
          {visits.map((visit) => (
            <article
              key={visit.id}
              className="rounded-xl border border-slate-100 p-4 text-sm text-slate-700"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-slate-900">
                  {visit.reason.replace('_', ' ')}
                </p>
                <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold tracking-wide text-green-700 uppercase">
                  {visit.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-sm text-slate-500">
                {new Date(visit.visitDate).toLocaleDateString()}
                {visit.vetId ? ` • Vet ${visit.vetId.slice(0, 8)}` : ''}
              </p>
              <p className="mt-2 text-slate-700">{visit.notes ?? '—'}</p>
            </article>
          ))}
          {visits.length === 0 && (
            <p className="text-sm text-slate-500">No visits yet.</p>
          )}
        </div>
      </section>
      <PetFormDialog
        open={isPetDialogOpen}
        onClose={() => setPetDialogOpen(false)}
        initialValues={pet}
      />
      <VisitFormDialog
        open={isVisitDialogOpen}
        onClose={() => setVisitDialogOpen(false)}
        defaultPetId={pet.id}
        petOptionsOverride={visitPetOptions}
      />
    </div>
  );
}
