import { Flex, ListItem } from '@chakra-ui/react';
import { ComponentProps, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface SideBarItemProps {
  navLinkProps: ComponentProps<typeof NavLink>;
  children: ReactNode;
}

export default function SideBarItem({
  navLinkProps,
  children,
}: SideBarItemProps) {
  return (
    <ListItem
      p={2}
      px={4}
      _hover={{ bg: 'gray.100' }}
      textStyle={'sm'}
      color={'gray'}
    >
      <Flex flexDirection={'row'} alignItems={'center'} gap={4} asChild>
        <NavLink {...navLinkProps}>{children}</NavLink>
      </Flex>
    </ListItem>
  );
}
