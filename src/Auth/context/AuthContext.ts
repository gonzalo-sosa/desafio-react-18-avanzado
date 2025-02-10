import { createContext, useContext } from 'react';
import AuthType from '../model';

export const AuthContext = createContext<AuthType>({} as AuthType);
AuthContext.displayName = 'AuthContext';

const useAuthContext = () => useContext(AuthContext);
export default useAuthContext;
