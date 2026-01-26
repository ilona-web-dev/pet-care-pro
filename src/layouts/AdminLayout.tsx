import { NavLink, Outlet } from 'react-router-dom';
import clsx from 'clsx';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/shared/Logo';
import AdminUserInfo from '../components/admin/AdminUserInfo';
import useAuthSession from '../hooks/useAuthSession';
import useUserRoleQuery from '../hooks/useUserRoleQuery';

const adminNav = [
  { path: '/admin/clients', label: 'Clients' },
  { path: '/admin/pets', label: 'Pets' },
  { path: '/admin/visits', label: 'Visits' },
  { path: '/admin/vets', label: 'Vets' },
];

export default function AdminLayout() {
  const { userId, email, isLoading } = useAuthSession();

  const { data: roleData, isLoading: roleLoading } = useUserRoleQuery(
    userId ?? undefined,
  );

  const roleLabel =
    roleLoading || isLoading ? 'Loading…' : (roleData ?? 'guest');

  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row">
        <aside className="w-full min-w-60 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 lg:w-64">
          <Logo />
          <p className="mt-6 text-xs font-semibold tracking-[0.3em] text-slate-500 uppercase">
            Admin Portal
          </p>

          <nav className="mt-6 flex flex-col gap-2">
            <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-slate-500 uppercase">
              Menu
            </p>
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

          <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
            <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-slate-500 uppercase">
              Account
            </p>
            <AdminUserInfo
              email={email}
              role={roleLabel}
              loadingRole={roleLoading || isLoading}
              className="mt-3"
            />
            <button
              type="button"
              onClick={handleSignOut}
              className="mt-4 w-full cursor-pointer rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-700"
            >
              Sign out
            </button>
          </div>
        </aside>
        <main className="mt-6 flex-1 overflow-x-hidden lg:mt-0">
          <div className="rounded-3xl bg-white px-6 py-6 shadow-sm ring-1 ring-slate-100">
            <section>
              <Outlet />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
