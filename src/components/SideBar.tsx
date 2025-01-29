// type Props = {};

import BoardsList from '@/Boards/components/BoardsList';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  ListItem,
  ListRoot,
  Text,
  VStack,
} from '@chakra-ui/react';
import WorkSpace from './WorkSpace';
import {
  LuChevronLeft,
  LuChevronRight,
  LuSettings,
  LuTrello,
  LuUsers,
} from 'react-icons/lu';
import { useState } from 'react';

export default function SideBar() {
  const [open, setOpen] = useState(false);

  return (
    <VStack as={'aside'} paddingX={3} paddingY={2} maxW={'260px'}>
      <HStack>
        <IconButton>E</IconButton>
        <Box>
          <Text>Espacio de trabajo de Trello</Text>
          <Text>Gratuito</Text>
        </Box>
        <IconButton onClick={() => setOpen(!open)}>
          {open ? <LuChevronLeft /> : <LuChevronRight />}
        </IconButton>
      </HStack>
      <Flex as={'nav'} flexDirection={'column'} gap={2}>
        <ListRoot listStyle={'none'}>
          <ListItem
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
            gap={4}
          >
            <LuTrello />
            Tableros
          </ListItem>
          <ListItem
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
            gap={4}
          >
            <LuUsers />
            Miembros
          </ListItem>
          <ListItem
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
            gap={4}
          >
            <LuSettings />
            Ajustes del Espacio de trabajo
          </ListItem>
        </ListRoot>
        <WorkSpace />
        <BoardsList />
      </Flex>
    </VStack>
  );
}
