// type Props = {};

import BoardsSideBar from '@/Boards/components/BoardsSideBar';
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  ListRoot,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuPlus,
  LuSettings,
  LuTrello,
  LuUsers,
} from 'react-icons/lu';
import {
  DrawerRoot,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
  DrawerTitle,
  DrawerActionTrigger,
} from '@/components/ui/drawer';
import WorkSpaceSideBar from './WorkSpaceSideBar';
import SideBarItem from './SideBarItem';

function SideBarContent() {
  return (
    <VStack>
      <Flex as={'nav'} flexDirection={'column'} gap={2}>
        <ListRoot listStyle={'none'}>
          <SideBarItem navLinkProps={{ to: '/boards' }}>
            <LuTrello />
            Tableros
          </SideBarItem>
          <SideBarItem navLinkProps={{ to: '/members' }}>
            <LuUsers />
            Miembros
            <IconButton variant={'outline'} size={'xs'} marginLeft={'auto'}>
              <LuPlus />
            </IconButton>
          </SideBarItem>
          <SideBarItem navLinkProps={{ to: '/settings' }}>
            <LuSettings />
            Ajustes del Espacio de trabajo
            <IconButton variant={'outline'} size={'xs'} marginLeft={'auto'}>
              <LuChevronDown />
            </IconButton>
          </SideBarItem>
        </ListRoot>
        <WorkSpaceSideBar />
        <BoardsSideBar />
      </Flex>
    </VStack>
  );
}

// interface SideBarProps {
// }

export default function SideBar() {
  return (
    <DrawerRoot placement={'start'}>
      <DrawerTrigger asChild>
        <IconButton size="sm" marginLeft={2}>
          <LuChevronRight />
        </IconButton>
      </DrawerTrigger>
      <DrawerContent maxW={'260px'}>
        <DrawerHeader p={2}>
          <HStack justifyContent={'space-between'}>
            <Button backgroundColor={'blue.500'} p={0}>
              <Text fontSize={'xl'}>E</Text>
            </Button>
            <Box>
              <DrawerTitle fontSize={'sm'} fontWeight={'normal'}>
                Espacio de trabajo de Trello
              </DrawerTitle>
              <Text fontSize={'xs'} fontWeight={'lighter'} color={'gray.400'}>
                Gratuito
              </Text>
            </Box>
            <DrawerActionTrigger asChild>
              <IconButton variant="outline">
                <LuChevronLeft />
              </IconButton>
            </DrawerActionTrigger>
          </HStack>
        </DrawerHeader>
        <DrawerBody px={0}>
          <SideBarContent />
        </DrawerBody>
        <DrawerFooter>
          <Text>Amplía tu suscripción a Premium</Text>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
}
