import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoutes from '@/components/ProtectedRoutes';
import { Register, Login } from './Auth';
import Board from './Boards/components/Board';

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
        element: <Board />,
        children: [
          {
            path: 'lists',
            element: <div>Lists</div>,
            children: [
              {
                path: ':listId',
                element: <div>List Id</div>,
                children: [
                  {
                    path: 'tasks',
                    element: <div>Tasks</div>,
                    children: [
                      {
                        path: ':taskId',
                        element: <div>Task Id</div>,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
