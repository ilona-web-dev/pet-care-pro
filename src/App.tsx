import './App.css';
import { createBrowserRouter } from 'react-router-dom';

import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home';

import { RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
   {
      path: '/',
      element: <PublicLayout />,
      children: [{ index: true, element: <Home /> }],
   },
   {
      path: '/admin',
      element: <AdminLayout />,
      children: [{ index: true, element: <AdminDashboard /> }],
   },
]);

function App() {
   return (
      <>
         <RouterProvider router={router}></RouterProvider>
      </>
   );
}

export default App;
