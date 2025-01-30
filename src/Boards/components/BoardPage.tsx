// type Props = {};

import useBoardsStore from '@/store/boards-store';
import { Box, Button, Flex, ListItem, ListRoot } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import BoardNavBar from './BoardNavBar';
import ListCard from '@/Lists/components/ListCard';
import useListsStore from '@/store/lists-store';
import { useState } from 'react';
import AddListForm from '@/Lists/components/AddListForm';
import Board from '@/models/Board';
import { LuPlus } from 'react-icons/lu';

export default function BoardPage() {
  const { boardId } = useParams();

  const boards = useBoardsStore((s) => s.boards);
  const [board] = boards.filter((b) => b.id === boardId);

  const lists = useListsStore((s) => s.lists);
  const addList = useListsStore((s) => s.addList);

  const [showForm, setShowForm] = useState(false);

  const handleAddList = (data: Pick<Board, 'title'>) => {
    const newList = {
      id: String(Date.now()),
      title: data.title,
      boardId: board.id,
    };

    addList(newList);

    setShowForm(false);
  };

  return (
    <Box>
      <BoardNavBar board={board} />
      <Flex
        h={'100vh'}
        w={'100%'}
        flexDirection={'row'}
        gap={4}
        flexWrap={'nowrap'}
        overflowX={'auto'}
        padding={2}
      >
        <ListRoot listStyle={'none'} flexDirection={'row'} gap={4}>
          {lists.map((list) => (
            <ListItem key={list.id}>
              <ListCard key={list.id} list={list} />
            </ListItem>
          ))}
        </ListRoot>
        {showForm ? (
          <AddListForm onSubmit={handleAddList} />
        ) : (
          <Button
            onClick={() => setShowForm(true)}
            maxW={'280px'}
            rounded={'2xl'}
          >
            <LuPlus size={'xs'} />
            {lists.length ? 'Añade otra lista' : 'Añadir una lista'}
          </Button>
        )}
      </Flex>
    </Box>
  );
}
