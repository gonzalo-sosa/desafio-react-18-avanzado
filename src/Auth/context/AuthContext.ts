import { createContext } from 'react';
import AuthType from '../model';

const AuthContext = createContext<AuthType>({} as AuthType);

AuthContext.displayName = 'AuthContext';

export default AuthContext;
