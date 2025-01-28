import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export default function NavBar({ children }: Props) {
  return (
    <nav>
      NavBar
      {children}
    </nav>
  );
}
