type UserRoleBadgeProps = {
  role?: 'admin' | 'viewer' | null;
  className?: string;
};

export default function UserRoleBadge({
  role,
  className = '',
}: UserRoleBadgeProps) {
  if (!role) {
    return null;
  }

  const label = role === 'admin' ? 'Admin mode' : 'Viewer mode';
  const baseStyles = 'rounded-full px-3 py-1 text-xs font-semibold';
  const color =
    role === 'admin'
      ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
      : 'bg-slate-100 text-slate-600 border border-slate-200';

  return <span className={`${baseStyles} ${color} ${className}`}>{label}</span>;
}
