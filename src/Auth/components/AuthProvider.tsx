import AuthContext from '../context/AuthContext';
import { ReactNode, useEffect, useState } from 'react';
import { User } from '../model';

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = getUser();
    if (user) login(user);
  });

  function getUser() {
    if (user) return user;

    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedData = JSON.parse(savedUser);
      return parsedData;
    }

    return null;
  }

  function login(user: User) {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('user');
  }

  return (
    <AuthContext.Provider value={{ getUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
