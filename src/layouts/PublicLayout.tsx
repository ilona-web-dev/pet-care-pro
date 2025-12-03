import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
   return (
      <div className="min-h-screen bg-slate-50">
         <header>Header</header>
         <main className="container mx-auto py-10">
            <Outlet />
         </main>
         <footer>Footer</footer>
      </div>
   );
}
