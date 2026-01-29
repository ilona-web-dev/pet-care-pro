import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 px-4 py-12">
      <div className="mx-auto w-full max-w-4xl rounded-3xl bg-white px-6 py-10 text-center shadow-sm ring-1 ring-slate-100">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-600">
          Oops!
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900">
          Page not found
        </h1>
        <p className="mt-4 text-base text-slate-600">
          The page you&rsquo;re looking for either moved or no longer exists. Choose where to go
          next.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-700"
          >
            Back to homepage
          </button>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
          >
            Go to admin login
          </button>
        </div>
      </div>
    </div>
  );
}
