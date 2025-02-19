// type Props = {};

import BoardsSideBar from '@/Boards/components/BoardsSideBar';
import {
  DrawerActionTrigger,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
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
import SideBarItem from './SideBarItem';
import WorkSpaceSideBar from './WorkSpaceSideBar';

function SideBarContent() {
  return (
    <VStack>
      <Flex as={'nav'} flexDirection={'column'} gap={2}>
        <ListRoot listStyle={'none'}>
          <SideBarItem navLinkProps={{ to: '/workspace/boards' }}>
            <LuTrello />
            Tableros
          </SideBarItem>
          <SideBarItem navLinkProps={{ to: '/workspace/members' }}>
            <LuUsers />
            Miembros
            <IconButton
              variant={'outline'}
              size={'xs'}
              marginLeft={'auto'}
              marginRight={-2}
            >
              <LuPlus />
            </IconButton>
          </SideBarItem>
          <SideBarItem navLinkProps={{ to: '/settings' }}>
            <LuSettings />
            Ajustes del Espacio de trabajo
            <IconButton
              variant={'outline'}
              size={'xs'}
              marginLeft={'auto'}
              marginRight={-2}
            >
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

export default function SideBar() {
  return (
    <DrawerRoot placement={'start'} data-testid={'sidebar'}>
      <DrawerTrigger asChild data-testid={'sidebar-open'}>
        <IconButton size="sm" marginLeft={2}>
          <LuChevronRight />
        </IconButton>
      </DrawerTrigger>
      <DrawerContent maxW={'260px'}>
        <DrawerHeader px={0} py={2}>
          <HStack
            p={2}
            justifyContent={'space-between'}
            borderBottom={'1px solid'}
            borderColor={'gray.200'}
          >
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
            <DrawerActionTrigger asChild data-testid={'sidebar-close'}>
              <IconButton size={'xs'} variant="outline">
                <LuChevronLeft />
              </IconButton>
            </DrawerActionTrigger>
          </HStack>
        </DrawerHeader>
        <DrawerBody p={0}>
          <SideBarContent />
        </DrawerBody>
        <DrawerFooter>
          <Text>Amplía tu suscripción a Premium</Text>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
}
