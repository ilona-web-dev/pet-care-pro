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
    <div className="min-h-screen bg-slate-50 px-4 py-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row">
        <aside className="w-full min-w-[240px] rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 lg:w-64">
          <Logo />
          <p className="mt-8 text-xs tracking-wide text-slate-500 uppercase">
            Admin portal
          </p>
          <nav className="mt-6 flex flex-col gap-2">
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
        <main className="mt-6 flex-1 lg:mt-0">
          <div className="rounded-3xl bg-white px-6 py-6 shadow-sm ring-1 ring-slate-100">
            <AdminHeader />
            <section className="mt-6">
              <Outlet />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
