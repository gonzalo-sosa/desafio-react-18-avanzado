import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/Auth';
import Layout from '@/components/Layout';

export default function ProtectedRoutes() {
  const { getUser } = useAuth();

  if (!getUser()) return <Navigate to="/login" />;

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
