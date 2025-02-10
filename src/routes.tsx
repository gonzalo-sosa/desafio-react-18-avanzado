import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoutes from '@/components/ProtectedRoutes';
import Register from '@/components/Register';
import Login from '@/components/Login';
import WorkSpacePage from './WorkSpace/components/WorkSpacePage';
import BoardPage from './Boards/components/BoardPage';
import NotFound from './components/NotFound';
import { WorkSpaceEmpty } from './WorkSpace';

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
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <WorkSpaceEmpty />,
      },
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
