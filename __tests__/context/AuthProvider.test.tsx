import { User } from '@/Auth/model';
import { AuthProvider, useAuthContext } from '@/Auth';
import { render, screen, waitFor } from '@testing-library/react';
import { useEffect, useState } from 'react';
import userEvent from '@testing-library/user-event';
import { UserTestComponent } from '__tests__/utils';

describe('AuthProvider', () => {
  const user: User = {
    id: '1',
    email: 'email@example.com',
    name: 'Test User',
  };

  it('should initializes user from localStorage on mount', () => {
    localStorage.setItem('user', JSON.stringify(user));

    function TestComponent() {
      const { getUser } = useAuthContext();
      const currentUser = getUser();
      return <div>{currentUser ? currentUser.name : 'No user'}</div>;
    }

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('should updates user and saves to localStorage', async () => {
    const setItemSpy = vi.spyOn(localStorage, 'setItem');
    render(
      <AuthProvider>
        <UserTestComponent user={user} action="login" />
      </AuthProvider>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Login' }));
    await waitFor(() =>
      expect(screen.getByTestId('user')).toHaveTextContent('Test User'),
    );
    expect(setItemSpy).toHaveBeenCalledWith('user', JSON.stringify(user));
  });

  it('should clears user and removes from localStorage', async () => {
    localStorage.setItem('user', JSON.stringify(user));
    const removeItemSpy = vi.spyOn(localStorage, 'removeItem');

    render(
      <AuthProvider>
        <UserTestComponent user={user} action="logout" />
      </AuthProvider>,
    );
    expect(screen.getByTestId('user')).toHaveTextContent('Test User');

    await userEvent.click(screen.getByRole('button', { name: 'Logout' }));
    await waitFor(() =>
      expect(screen.getByTestId('user')).toHaveTextContent('No user'),
    );
    expect(removeItemSpy).toHaveBeenCalledWith('user');
  });

  it('handles empty localStorage', () => {
    const TestComponent = () => {
      const { getUser } = useAuthContext();
      return <div>{getUser()?.name || 'No user'}</div>;
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );
    expect(screen.getByText('No user')).toBeInTheDocument();
  });
});
