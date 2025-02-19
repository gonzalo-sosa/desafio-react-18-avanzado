export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthType {
  getUser: () => User | null;
  login: (user: User) => void;
  logout: () => void;
}

export default AuthType;
