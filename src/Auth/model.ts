export type User = {
  id: string;
  name: string;
  email: string;
};

type AuthType = {
  getUser: () => User | null;
  login: (user: User) => void;
  logout: () => void;
};

export default AuthType;
