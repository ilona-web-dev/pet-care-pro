import './App.css';
import { createBrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

import Home from './pages/Home';
import AdminClients from './pages/AdminClients';
import AdminPets from './pages/AdminPets';
import AdminVisits from './pages/AdminVisits';
import AdminVets from './pages/AdminVets';

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
    children: [
      { index: true, element: <Navigate to="clients" replace /> },
      { path: 'clients', element: <AdminClients /> },
      { path: 'pets', element: <AdminPets /> },
      { path: 'visits', element: <AdminVisits /> },
      { path: 'vets', element: <AdminVets /> },
    ],
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
