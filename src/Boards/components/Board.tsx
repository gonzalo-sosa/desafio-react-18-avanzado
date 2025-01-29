// type Props = {};

import useBoardsStore from '@/store/boards-store';
import { Box, Button, Flex, ListItem, ListRoot } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import BoardNavBar from './BoardNavBar';
import ListCard from '@/Lists/components/ListCard';
import useListsStore from '@/store/lists-store';

export default function Board() {
  const { boardId } = useParams();
  const boards = useBoardsStore((s) => s.boards);
  const [board] = boards.filter((b) => b.id === boardId);
  const lists = useListsStore((s) => s.lists);
  const addList = useListsStore((s) => s.addList);

  const handleAddList = () => {
    const newList = {
      id: '1',
      title: 'Mi Lista',
      boardId: board.id,
    };
    addList(newList);
  };

  return (
    <Box>
      <BoardNavBar board={board} />
      <Flex flexDirection={'row'} gap={4}>
        <ListRoot
          listStyle={'none'}
          flexDirection={'row'}
          gap={4}
          flexWrap={'nowrap'}
          overflowX={'auto'}
        >
          {lists.map((list) => (
            <ListItem key={list.id}>
              <ListCard key={list.id} list={list} />
            </ListItem>
          ))}
        </ListRoot>
        <Button onClick={() => handleAddList()} maxW={'280px'}>
          {lists.length ? 'Añade otra lista' : 'Añadir una lista'}
        </Button>
      </Flex>
    </Box>
  );
}
