import { ReactNode } from 'react';
import NavBar from '@/components/NavBar';
import SideBar from './SideBar';

interface Props {
  children: ReactNode | ReactNode[];
}

export default function Layout({ children }: Props) {
  return (
    <>
      <NavBar />
      <SideBar />

      {children}
    </>
  );
}
