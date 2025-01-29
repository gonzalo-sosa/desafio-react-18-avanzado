import useBoardsStore from '@/store/boards-store';
import { ListRoot, ListItem, Button, Heading, HStack } from '@chakra-ui/react';
import { LuPlus } from 'react-icons/lu';
import { NavLink } from 'react-router-dom';
import BoardAddPopover from './BoardAddPopover';

// type Props = {};

export default function BoardsList() {
  const boards = useBoardsStore((s) => s.boards);
  // const addBoard = useBoardsStore((s) => s.addBoard);

  // const handleAddBoard = () => {
  //   addBoard({
  //     id: '1',
  //     title: 'Mi Tablero',
  //     description: 'Mi Tablero de Trello',
  //   });
  // };

  return (
    <>
      <HStack>
        <Heading fontSize={'medium'} fontWeight={'normal'}>
          Sus tableros
        </Heading>
        <BoardAddPopover>
          <Button
            type="submit"
            backgroundColor={'transparent'}
            color={'white'}
            size={'sm'}
          >
            <LuPlus />
          </Button>
        </BoardAddPopover>
      </HStack>
      <ListRoot
        listStyle={'none'}
        display={'flex'}
        flexDirection={'column'}
        gap={2}
      >
        {boards.map((board) => (
          <ListItem key={board.id}>
            <NavLink to={`/boards/${board.id}`}>{board.title}</NavLink>
          </ListItem>
        ))}
      </ListRoot>
    </>
  );
}
