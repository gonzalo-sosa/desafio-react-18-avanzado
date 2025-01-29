// type Props = {};

import { Heading, ListItem, ListRoot } from '@chakra-ui/react';
import { LuCalendar, LuTable } from 'react-icons/lu';

export default function WorkSpace() {
  return (
    <>
      <Heading fontSize={'md'} fontWeight={'normal'}>
        WorkSpace
      </Heading>
      <ListRoot listStyle={'none'}>
        <ListItem display={'flex'} alignItems={'center'} gap={4}>
          <LuTable />
          Tabla
        </ListItem>
        <ListItem display={'flex'} alignItems={'center'} gap={4}>
          <LuCalendar /> Calendario
        </ListItem>
      </ListRoot>
    </>
  );
}
