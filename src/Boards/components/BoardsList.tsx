import useBoardsStore from '@/store/boards-store';
import { ListRoot, Button, Heading, HStack } from '@chakra-ui/react';
import { LuPlus, LuTrello } from 'react-icons/lu';
import NewBoardForm from './NewBoardForm';
import Popover from '../../components/Popover';
import Board from '@/models/Board';
import SideBarItem from '@/components/SideBarItem';

// type Props = {};

export default function BoardsList() {
  const boards = useBoardsStore((s) => s.boards);
  const addBoard = useBoardsStore((s) => s.addBoard);

  const handleAddBoard = (data: Omit<Board, 'id'>) => {
    addBoard({ ...data, id: '1' });
  };

  return (
    <>
      <HStack justifyContent={'space-between'} px={2}>
        <Heading fontSize={'medium'} fontWeight={'normal'}>
          Sus tableros
        </Heading>
        <Popover
          trigger={
            <Button type="submit" size={'sm'}>
              <LuPlus />
            </Button>
          }
        >
          <NewBoardForm onSubmit={handleAddBoard} />
        </Popover>
      </HStack>
      <ListRoot listStyle={'none'}>
        {boards.map((board) => (
          <SideBarItem
            key={board.id}
            navLinkProps={{ to: `/boards/${board.id}` }}
          >
            <LuTrello />
            {board.title}
          </SideBarItem>
        ))}
      </ListRoot>
    </>
  );
}
