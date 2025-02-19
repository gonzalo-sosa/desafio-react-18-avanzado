import { useAuthContext } from '@/Auth';
import AuthType from '@/Auth/model';
import { PropsWithChildren } from 'react';

// export const useAuthMock = ({
//   user,
//   isLoggedIn,
// }: {
//   user: User | null;
//   isLoggedIn: boolean;
// }) => {
//   if (isLoggedIn) window.localStorage.setItem('user', JSON.stringify(user));

//   return {
//     getUser: () => {
//       return user || JSON.stringify(window.localStorage.getItem('user'));
//     },
//     login: () => {
//       window.localStorage.setItem('user', JSON.stringify(user));
//       return user;
//     },
//     logout: () => {
//       window.localStorage.removeItem('user');
//       return null;
//     },
//   };
// };
export const mockAuthentication = () => {
  return vi.mock('@/Auth', () => ({
    ...vi.importActual('@/Auth'),
    useAuthContext: vi.fn().mockReturnValue({
      getUser: vi.fn(),
      login: vi.fn(),
      logout: vi.fn(),
    }),
    AuthProvider: ({ children }: PropsWithChildren) => children,
  }));
};

export const mockAuthState = (authState: AuthType) => {
  vi.mocked(useAuthContext).mockReturnValue(authState);
};
