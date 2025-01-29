// type Props = {};

import BoardsList from '@/Boards/components/BoardsList';
import { Flex, ListItem, ListRoot, VStack } from '@chakra-ui/react';
import WorkSpace from './WorkSpace';

export default function SideBar() {
  return (
    <VStack as={'aside'} padding={2}>
      <Flex as={'nav'} flexDirection={'column'} gap={2}>
        <ListRoot listStyle={'none'}>
          <ListItem>Tableros</ListItem>
          <ListItem>Miembros</ListItem>
          <ListItem>Ajustes del Espacio de trabajo</ListItem>
        </ListRoot>
        <WorkSpace />
        <BoardsList />
      </Flex>
    </VStack>
  );
}
