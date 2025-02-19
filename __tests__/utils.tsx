import router from '@/routes';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

export const navigateTo = (to: string) => {
  const routes = createMemoryRouter(router.routes, { initialEntries: [to] });

  render(<RouterProvider router={routes} />);
};

export const getSidebar = () => ({
  getSidebarContainer: () => screen.getByTestId('sidebar'),
  getSidebarOpenButton: () => screen.getByTestId('sidebar-open'),
  getSidebarCloseButton: () => screen.getByTestId('sidebar-close'),
});
