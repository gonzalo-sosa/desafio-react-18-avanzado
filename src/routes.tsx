import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoutes from '@/components/ProtectedRoutes';
import Register from '@/components/Register';
import Login from '@/components/Login';
import WorkSpacePage from './pages/WorkSpacePage';
import NotFound from './components/NotFound';
import TablePage from './pages/TablePage';
import MembersPage from './pages/MembersPage';
import BoardsPage from './pages/BoardsPage';
import BoardInfo from './Boards/components/BoardInfo';

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
        element: <WorkSpacePage />,
      },
      { path: 'boards', element: <BoardsPage /> },
      {
        path: 'boards/:boardId',
        element: <BoardInfo />,
      },
      {
        path: 'workspace/:workspaceId',
        element: <WorkSpacePage />,
      },
      {
        path: 'table',
        element: <TablePage />,
      },
      {
        path: 'members',
        element: <MembersPage />,
      },
    ],
  },
]);

export default router;
