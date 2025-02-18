import { Outlet } from 'react-router-dom';
import Providers from './Providers';

export default function App() {
  return (
    <Providers>
      <Outlet />
    </Providers>
  );
}
