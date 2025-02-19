import SideBarItem from '@/components/SideBarItem';
import { BoardId } from '@/models/Board';
import useBoardsStore from '@/store/boards';
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
import { BsArrowRight } from 'react-icons/bs';
import { LuPlus, LuTrello } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import AddBoard from './AddBoard';

export default function BoardsSideBar() {
  const boards = useBoardsStore((s) => s.boards);

  const navigate = useNavigate();

  const { setOpen } = useDrawerContext();

  const handleAddBoard = (boardId: BoardId) => {
    setOpen(false);
    navigate(`/workspace/boards/${boardId}`);
  };

  return (
    <>
      <HStack justifyContent={'space-between'} px={2}>
        <Heading fontSize={'sm'} fontWeight={'normal'}>
          Sus tableros
        </Heading>
        <AddBoard
          trigger={
            <IconButton variant={'outline'} type="submit" size={'xs'}>
              <LuPlus />
            </IconButton>
          }
          onAddBoard={handleAddBoard}
        />
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
              <AddBoard
                trigger={<Link variant={'underline'}>Crea un tablero</Link>}
                onAddBoard={handleAddBoard}
              />
              <BsArrowRight />
            </HStack>
          </Stack>
        </HStack>
      )}
      <ListRoot listStyle={'none'}>
        {boards.map((board) => (
          <SideBarItem
            key={board.id}
            navLinkProps={{ to: `/workspace/boards/${board.id}` }}
          >
            <LuTrello />
            {board.title}
          </SideBarItem>
        ))}
      </ListRoot>
    </>
  );
}
