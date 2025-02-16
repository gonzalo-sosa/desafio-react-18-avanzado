import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import router from '@/routes';
import AllProviders from './AllProviders';
import userEvent from '@testing-library/user-event';
import { User } from '@/Auth/model';

describe('Routes', () => {
  const testUser: User = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
  };

  const navigateTo = (to: string) => {
    const routes = createMemoryRouter(router.routes, { initialEntries: [to] });

    render(<RouterProvider router={routes} />, {
      wrapper: AllProviders,
    });
  };

  it('should render login when url is "/" and user is not logged', async () => {
    navigateTo('/');

    await waitFor(() => {
      expect(
        screen.getByText(/sesión/i, { selector: 'h1' }),
      ).toBeInTheDocument();
    });
  });

  it('should render workspaces when url is "/" and user is logged', async () => {
    // Set logged-in state
    window.localStorage.setItem('user', JSON.stringify(testUser));

    navigateTo('/');

    await waitFor(() => {
      expect(screen.getByText(/espacio de trabajo/i)).toBeInTheDocument();
    });
  });

  it('should redirect to login when accessing protected route without auth', async () => {
    navigateTo('/boards');

    await waitFor(() => {
      expect(
        screen.getByText(/sesión/i, { selector: 'h1' }),
      ).toBeInTheDocument();
    });
  });

  it.todo(
    'should allow navigation between routes when authenticated',
    async () => {
      window.localStorage.setItem('user', JSON.stringify(testUser));
      navigateTo('/workspaces');

      // Example: Test navigation to another protected route
      await userEvent.click(screen.getByRole('link', { name: /profile/i }));

      await waitFor(() => {
        expect(
          screen.getByText(/perfil del usuario/i, { selector: 'h1' }),
        ).toBeInTheDocument();
      });
    },
  );
});
