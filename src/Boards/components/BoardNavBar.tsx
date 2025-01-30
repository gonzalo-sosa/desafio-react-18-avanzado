import { useAuth } from '@/Auth';
import { Avatar } from '@/components/ui/avatar';
import Board from '@/models/Board';
import { Button, Flex, Heading, HStack, IconButton } from '@chakra-ui/react';
import {
  LuChevronDown,
  LuCloudLightning,
  LuDot,
  LuRocket,
  LuStar,
  LuTrello,
  LuUserPlus,
  LuUsers,
} from 'react-icons/lu';

type BoardNavBarProps = {
  board: Board;
};

export default function BoardNavBar({ board }: BoardNavBarProps) {
  const { getUser } = useAuth();

  return (
    <HStack
      justifyContent={'space-between'}
      padding={2}
      borderWidth={2}
      backgroundColor={'white'}
    >
      <Flex flexDirection={'row'} alignItems={'center'} gap={2}>
        <Heading>{board.title}</Heading>
        <IconButton size={'xs'}>
          <LuStar />
        </IconButton>
        <IconButton size={'xs'}>
          <LuUsers />
        </IconButton>
        <Button size={'xs'}>
          <LuTrello />
          Tablero
        </Button>
        <IconButton size={'xs'}>
          <LuChevronDown />
        </IconButton>
      </Flex>
      <Flex flexDirection={'row'} alignItems={'center'} gap={2}>
        <IconButton size={'xs'}>
          <LuRocket />
        </IconButton>
        <IconButton size={'xs'}>
          <LuCloudLightning />
        </IconButton>
        <Avatar name={getUser()?.name} size={'xs'} />
        <Button size={'xs'}>
          <LuUserPlus />
          Compartir
        </Button>
        <LuDot />
      </Flex>
    </HStack>
  );
}
