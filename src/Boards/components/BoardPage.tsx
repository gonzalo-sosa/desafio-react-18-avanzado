import { Box, Button, Flex, ListItem } from '@chakra-ui/react';
import { ListCard, AddListForm } from '@/Lists';
import { LuPlus } from 'react-icons/lu';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Board from '@/models/Board';
import BoardNavBar from './BoardNavBar';
import ListCardContainer from '@/Lists/components/ListCardContainer';
import useBoardsStore from '@/store/boards';
import useListsStore from '@/store/lists';

// type BoardPageProps = {};
export default function BoardPage() {
  const { boardId } = useParams();

  const boards = useBoardsStore((s) => s.boards);
  const [board] = boards.filter((b) => b.id === boardId);

  const lists = useListsStore((s) => s.lists).filter(
    (l) => l.boardId === boardId,
  );
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
        <ListCardContainer id={'list-container'}>
          {lists.map((list) => (
            <ListItem key={list.id}>
              <ListCard key={list.id} list={list} />
            </ListItem>
          ))}
        </ListCardContainer>

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
