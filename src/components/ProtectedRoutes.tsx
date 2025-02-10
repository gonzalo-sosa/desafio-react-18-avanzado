import { Navigate, Outlet } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuthContext } from '@/Auth';

export default function ProtectedRoutes() {
  const { getUser } = useAuthContext();

  if (!getUser()) return <Navigate to="/login" />;

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
