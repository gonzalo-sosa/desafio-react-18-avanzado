import '@/customSensors'; // Para inhabilitar drag and drop para botones o elementos con el atributo data-no-dnd
import AddList from '@/Lists/components/AddList';
import BoardLists from '@/Lists/components/BoardLists';
import { useBoard } from '@/store/boards';
import { useListsByBoard } from '@/store/lists';
import { Flex, Stack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import BoardNavBar from './BoardNavBar';

export default function BoardInfo() {
  const { boardId } = useParams();
  const board = useBoard(boardId!);

  const lists = useListsByBoard(boardId!);

  if (!board) throw new Error('Board not found');

  return (
    <Stack h={'vh'}>
      <BoardNavBar board={board} />
      <Flex
        flex={1}
        w={'full'}
        h={'full'}
        overflowX={'auto'}
        flexDirection={'row'}
        flexWrap={'nowrap'}
        padding={2}
        gap={4}
      >
        <BoardLists lists={lists} />
        <AddList boardId={boardId!} hasLists={lists.length > 0} />
      </Flex>
    </Stack>
  );
}
