import {
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  ListRoot,
  Stack,
  Text,
  useDrawerContext,
} from '@chakra-ui/react';
import { LuPlus, LuTrello } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import Board from '@/models/Board';
import NewBoardForm from './NewBoardForm';
import Popover from '@/components/Popover';
import SideBarItem from '@/components/SideBarItem';
import useBoardsStore from '@/store/boards';
import { BsArrowRight } from 'react-icons/bs';

export default function BoardsSideBar() {
  const boards = useBoardsStore((s) => s.boards);
  const addBoard = useBoardsStore((s) => s.addBoard);
  const navigate = useNavigate();
  const { setOpen } = useDrawerContext();

  const handleAddBoard = (data: Omit<Board, 'id'>) => {
    const id = String(Date.now());
    addBoard({ ...data, id });
    navigate(`boards/${id}`);
    setOpen(false);
  };

  return (
    <>
      <HStack justifyContent={'space-between'} px={2}>
        <Heading fontSize={'sm'} fontWeight={'normal'}>
          Sus tableros
        </Heading>
        <Popover
          popoverRootProps={{
            positioning: { placement: 'right' },
            modal: true,
          }}
          trigger={
            <IconButton variant={'outline'} type="submit" size={'xs'}>
              <LuPlus />
            </IconButton>
          }
        >
          <NewBoardForm onSubmit={handleAddBoard} />
        </Popover>
      </HStack>
      {boards.length === 0 && (
        <HStack p={2}>
          <Icon alignSelf={'start'} color={'gray.600'}>
            <LuTrello />
          </Icon>
          <Stack>
            <Text color={'gray.600'}>
              Aún no tienes ningún tablero en este Espacio de trabajo. Todos los
              tableros que crees o a los que te unas aparecerán aquí.
            </Text>
            <HStack>
              <Popover
                popoverRootProps={{
                  positioning: { placement: 'right' },
                  modal: true,
                }}
                trigger={<Link variant={'underline'}>Crea un tablero</Link>}
              >
                <NewBoardForm onSubmit={handleAddBoard} />
              </Popover>
              <BsArrowRight />
            </HStack>
          </Stack>
        </HStack>
      )}
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
