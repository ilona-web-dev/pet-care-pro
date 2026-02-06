import UserRoleBadge from './UserRoleBadge';

type AdminHeaderProps = {
  title: string;
  btnText?: string;
  onAction?: () => void;
  actionDisabled?: boolean;
  role?: 'admin' | 'viewer' | null;
};

export default function AdminHeader({
  title,
  btnText,
  onAction,
  actionDisabled,
  role,
}: AdminHeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white pt-3 pb-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-slate-800">{title}</h1>
          <UserRoleBadge role={role} />
        </div>
        {btnText && onAction && (
          <button
            className="cursor-pointer rounded-full bg-teal-600 px-4 py-2 text-sm text-white disabled:opacity-50"
            onClick={onAction}
            disabled={actionDisabled}
          >
            {btnText}
          </button>
        )}
      </div>
    </header>
  );
}
