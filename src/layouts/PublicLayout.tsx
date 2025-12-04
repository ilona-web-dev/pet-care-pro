import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

type PublicLayoutProps = {};

export default function PublicLayout({}: PublicLayoutProps) {
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
