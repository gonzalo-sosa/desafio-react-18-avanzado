import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/Auth';
import Layout from '@/components/Layout';

export default function ProtectedRoutes() {
  const { getUser } = useAuth();

  if (!getUser()) return <Navigate to="/login" />; // TODO: fix warning Cannot update a component (`AuthProvider`) while rendering a different component (`ProtectedRoutes`).

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
