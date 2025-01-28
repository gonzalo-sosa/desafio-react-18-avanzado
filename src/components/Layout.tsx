import { ReactNode } from 'react';
import NavBar from '@/components/NavBar';

type Props = {
  children: ReactNode | ReactNode[];
};

export default function Layout({ children }: Props) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
