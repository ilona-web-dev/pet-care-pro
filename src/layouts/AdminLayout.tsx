import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
   return (
      <div className="min-h-screen flex">
         <aside className="w-64">Left col</aside>
         <main className="flex-1 p-8">
            <Outlet />
         </main>
      </div>
   );
}
