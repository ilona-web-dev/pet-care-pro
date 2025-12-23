import { Outlet } from 'react-router-dom';
import Header from '../components/public/PublicHeader';
import Footer from '../components/shared/Footer';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
