import Login from '@/components/Login';
import Register from '@/components/Register';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import BoardInfo from './Boards/components/BoardInfo';
import NotFound from './components/NotFound';
import ProtectedRoutes from './components/ProtectedRoutes';
import BoardsPage from './pages/BoardsPage';
import MembersPage from './pages/MembersPage';
import TablePage from './pages/TablePage';
import WorkSpacePage from './pages/WorkSpacePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Navigate to={'/workspace'} />,
      },
      {
        path: 'workspace',
        element: <ProtectedRoutes />,
        children: [
          { index: true, element: <WorkSpacePage /> },
          { path: 'boards', element: <BoardsPage /> },
          {
            path: 'boards/:boardId',
            element: <BoardInfo />,
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
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
]);

export default router;
