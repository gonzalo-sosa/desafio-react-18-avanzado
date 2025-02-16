import { useAuthContext } from '@/Auth';
import { User } from '@/Auth/model';
import { useEffect, useState } from 'react';

// Helper component for login/logout tests
export const UserTestComponent = ({
  user,
  action,
}: {
  user: User;
  action: 'login' | 'logout';
}) => {
  const { login, logout, getUser } = useAuthContext();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => setCurrentUser(getUser()), [getUser]);

  return (
    <div>
      <button onClick={() => (action === 'login' ? login(user) : logout())}>
        {action === 'login' ? 'Login' : 'Logout'}
      </button>
      <div data-testid="user">{currentUser?.name || 'No user'}</div>
    </div>
  );
};
