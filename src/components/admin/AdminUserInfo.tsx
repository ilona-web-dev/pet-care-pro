import { MdPerson } from 'react-icons/md';

type Props = {
  email?: string | null;
  role?: string | null;
  loadingRole?: boolean;
  className?: string;
};

export default function AdminUserInfo({
  email,
  role,
  loadingRole,
  className,
}: Props) {
  const roleText = loadingRole ? 'Detecting role…' : (role ?? 'guest');

  return (
    <div
      className={`flex items-start gap-4 text-sm text-slate-600 ${
        className ?? ''
      }`}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
        <MdPerson aria-hidden size={15} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold tracking-wide text-slate-500 uppercase">
            Welcome
          </span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold tracking-wide text-slate-600 uppercase">
            {roleText}
          </span>
        </div>
        <span className="mt-1 text-xs font-medium break-all text-slate-700">
          {email ?? 'Guest user'}
        </span>
      </div>
    </div>
  );
}
