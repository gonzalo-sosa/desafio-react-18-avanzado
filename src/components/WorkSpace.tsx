// type Props = {};

import { Heading, ListItem, ListRoot } from '@chakra-ui/react';

export default function WorkSpace() {
  return (
    <>
      <Heading fontSize={'md'} fontWeight={'normal'}>
        WorkSpace
      </Heading>
      <ListRoot listStyle={'none'}>
        <ListItem>Tabla</ListItem>
        <ListItem>Calendario</ListItem>
      </ListRoot>
    </>
  );
}
