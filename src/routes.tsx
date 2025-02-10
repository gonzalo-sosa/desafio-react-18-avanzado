import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoutes from '@/components/ProtectedRoutes';
import Register from '@/components/Register';
import Login from '@/components/Login';
import WorkSpacePage from './WorkSpace/components/WorkSpacePage';
import BoardPage from './Boards/components/BoardPage';

const router = createBrowserRouter([
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <ProtectedRoutes />,
    children: [
      {
        path: 'boards/:boardId',
        element: <BoardPage />,
      },
      {
        path: 'workspace/:workspaceId',
        element: <WorkSpacePage />,
      },
    ],
  },
]);

export default router;
