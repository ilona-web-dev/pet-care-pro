import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

type AdminNavItem = {
  path: string;
  label: string;
  icon?: React.ReactNode;
};
const adminNav: AdminNavItem[] = [
  { path: '/admin/clients', label: 'Clients' },
  { path: '/admin/pets', label: 'Pets' },
  { path: '/admin/visits', label: 'Visits' },
];

export default function AdminNavigation() {
  return (
    <nav className="flex flex-col gap-1 px-3">
      {adminNav.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            clsx(
              'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition',
              isActive
                ? 'bg-teal-50 text-teal-700'
                : 'text-slate-600 hover:bg-slate-100',
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
