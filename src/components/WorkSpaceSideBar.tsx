// type Props = {};

import { Heading, HStack, IconButton, ListRoot } from '@chakra-ui/react';
import { LuCalendar, LuChevronDown, LuTable } from 'react-icons/lu';
import SideBarItem from './SideBarItem';

export default function WorkSpaceSideBar() {
  return (
    <>
      <HStack px={2} justifyContent={'space-between'}>
        <Heading fontSize={'sm'} fontWeight={'normal'}>
          Vistas del Espacio de trabajo
        </Heading>
        <IconButton variant={'outline'} size={'xs'}>
          <LuChevronDown />
        </IconButton>
      </HStack>
      <ListRoot listStyle={'none'}>
        <SideBarItem navLinkProps={{ to: '/workspace/table' }}>
          <LuTable />
          Tabla
        </SideBarItem>
        <SideBarItem navLinkProps={{ to: '/workspace/calendar' }}>
          <LuCalendar /> Calendario
        </SideBarItem>
      </ListRoot>
    </>
  );
}
