import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/public/PublicHeader';
import Footer from '../components/shared/Footer';
import ScrollToTop from '../components/shared/ScrollToTop';

export default function PublicLayout() {
  const { pathname } = useLocation();
  const isLoginPage = pathname === '/login';

  return (
    <div className="min-h-screen bg-slate-50">
      <ScrollToTop />
      <Header hideNav={isLoginPage} />
      <main className="container mx-auto py-10">
        <Outlet />
      </main>
      <Footer hideNav={isLoginPage} />
    </div>
  );
}
