import useBoardsStore from '@/store/boards-store';
import { ListRoot, Heading, HStack, IconButton } from '@chakra-ui/react';
import { LuPlus, LuTrello } from 'react-icons/lu';
import NewBoardForm from './NewBoardForm';
import Popover from '../../components/Popover';
import Board from '@/models/Board';
import SideBarItem from '@/components/SideBarItem';
import { useNavigate } from 'react-router-dom';

// type Props = {};

export default function BoardsSideBar() {
  const boards = useBoardsStore((s) => s.boards);
  const addBoard = useBoardsStore((s) => s.addBoard);
  const navigate = useNavigate();

  const handleAddBoard = (data: Omit<Board, 'id'>) => {
    addBoard({ ...data, id: '1' });
    navigate('/boards/1');
  };

  return (
    <>
      <HStack justifyContent={'space-between'} px={2}>
        <Heading fontSize={'sm'} fontWeight={'normal'}>
          Sus tableros
        </Heading>
        <Popover
          trigger={
            <IconButton variant={'outline'} type="submit" size={'xs'}>
              <LuPlus />
            </IconButton>
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
