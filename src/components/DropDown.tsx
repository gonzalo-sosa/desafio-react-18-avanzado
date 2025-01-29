import { Menu, Button } from '@chakra-ui/react';
import { ReactNode } from 'react';

type DropDownProps = {
  children: ReactNode;
};

export default function DropDown({ children }: DropDownProps) {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          {children}
        </Button>
      </Menu.Trigger>
    </Menu.Root>
  );
}
