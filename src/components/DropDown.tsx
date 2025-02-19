import { Menu } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface DropDownProps {
  children: ReactNode;
}

export default function DropDown({ children }: DropDownProps) {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>{children}</Menu.Trigger>
    </Menu.Root>
  );
}
