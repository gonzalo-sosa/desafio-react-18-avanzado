import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/Auth';
import Layout from '@/components/Layout';

export default function ProtectedRoutes() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
