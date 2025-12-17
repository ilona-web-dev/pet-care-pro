import { NavLink, Outlet } from 'react-router-dom';
import clsx from 'clsx';
import Logo from '../components/shared/Logo';
import AdminHeader from '../components/admin/AdminHeader';

const adminNav = [
  { path: '/admin/clients', label: 'Clients' },
  { path: '/admin/pets', label: 'Pets' },
  { path: '/admin/visits', label: 'Visits' },
];

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="flex w-64 flex-col border-r border-slate-200 bg-white">
        <div className="px-6 py-6">
          <Logo />
          <p className="mt-1 text-xs tracking-wide text-slate-500 uppercase">
            Admin portal
          </p>
        </div>
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
      </aside>
      <main className="flex-1 px-8 py-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          <AdminHeader />
          <section className="flex-1 overflow-y-auto">
            <Outlet />
          </section>
        </div>
      </main>
    </div>
  );
}
