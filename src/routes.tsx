import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import BoardInfo from './Boards/components/BoardInfo';
import NotFound from './components/NotFound';
import ProtectedRoutes from './components/ProtectedRoutes';
import { Provider } from './components/ui/provider';
import BoardsPage from './pages/BoardsPage';
import LoginPage from './pages/LoginPage';
import MembersPage from './pages/MembersPage';
import RegisterPage from './pages/RegisterPage';
import TablePage from './pages/TablePage';
import WorkSpacePage from './pages/WorkSpacePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: (
      <Provider>
        <NotFound />
      </Provider>
    ),
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
        element: <RegisterPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
]);

export default router;
