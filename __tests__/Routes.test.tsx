import { User } from '@/Auth/model';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockAuthState } from '__mocks__/authentication';
import { getSidebar, navigateTo } from './utils';

describe('Routes', () => {
  const validUser: User = {
    id: '1',
    email: 'test@example.com',
    name: 'Test validUser',
  };

  it('should render not found page when page is not valid', () => {
    navigateTo('/invalid-route');

    expect(screen.getByText(/encontrar/i)).toBeInTheDocument();
  });

  it('should render login when url is "/" and validUser is not logged', () => {
    mockAuthState({
      getUser: () => null,
      login: () => {},
      logout: () => {},
    });

    navigateTo('/');

    expect(
      screen.getByRole('heading', { name: /sesión/i }),
    ).toBeInTheDocument();
  });

  it('should redirect to workspace when url is "/" and validUser is logged', () => {
    mockAuthState({
      getUser: () => validUser,
      login: () => {},
      logout: () => {},
    });

    navigateTo('/');

    expect(
      screen.getByRole('heading', { name: /espacio de trabajo/i }),
    ).toBeInTheDocument();
  });

  it('should redirect to login when accessing protected route without auth', () => {
    mockAuthState({
      getUser: () => null,
      login: () => {},
      logout: () => {},
    });
    navigateTo('/workspace/boards');

    expect(
      screen.getByRole('heading', { name: /sesión/i }),
    ).toBeInTheDocument();
  });

  it('should render register page when url is /register', () => {
    mockAuthState({
      getUser: () => null,
      login: () => {},
      logout: () => {},
    });
    navigateTo('/register');

    expect(
      screen.getByRole('heading', { name: /cuenta/i }),
    ).toBeInTheDocument();
  });

  it('should render table page when url is /workspace/table', () => {
    mockAuthState({
      getUser: () => validUser,
      login: () => {},
      logout: () => {},
    });
    navigateTo('/workspace/table');

    expect(
      screen.getByRole('heading', { name: /tableros/i }),
    ).toBeInTheDocument();
  });

  it('should render boards page when url is /workspace/boards', () => {
    mockAuthState({
      getUser: () => validUser,
      login: () => {},
      logout: () => {},
    });
    navigateTo('/workspace/boards');

    expect(
      screen.getByRole('heading', { name: /tableros/i }),
    ).toBeInTheDocument();
  });

  it('should allow navigation between routes when authenticated', async () => {
    mockAuthState({
      getUser: () => validUser,
      login: () => {},
      logout: () => {},
    });
    navigateTo('/workspace/members');

    const { getSidebarOpenButton, getSidebarCloseButton } = getSidebar();
    const user = userEvent.setup();

    await user.click(getSidebarOpenButton());
    await user.click(screen.getByRole('link', { name: /miembros/i }));
    await user.click(getSidebarCloseButton());

    const headings = screen.getAllByRole('heading', { name: /miembros/i });
    headings.forEach((h) => expect(h).toBeInTheDocument());
  });
});
