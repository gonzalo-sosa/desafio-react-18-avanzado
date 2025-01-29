import { useAuth } from '@/Auth';
import { Avatar } from '@/components/ui/avatar';
import Board from '@/models/Board';
import { Button, Flex, Heading, HStack } from '@chakra-ui/react';
import {
  LuCloudLightning,
  LuDot,
  LuRocket,
  LuStar,
  LuUserPlus,
  LuUsers,
} from 'react-icons/lu';

type BoardNavBarProps = {
  board: Board;
};

export default function BoardNavBar({ board }: BoardNavBarProps) {
  const { getUser } = useAuth();

  return (
    <HStack justifyContent={'space-between'} paddingBlock={2}>
      <Flex flexDirection={'row'} alignItems={'center'} gap={2}>
        <Heading>{board.title}</Heading>
        <LuStar />
        <LuUsers />
      </Flex>
      <Flex flexDirection={'row'} alignItems={'center'} gap={2}>
        <LuRocket />
        <LuCloudLightning />
        <Avatar name={getUser()?.name} />
        <Button>
          <LuUserPlus />
          Compartir
        </Button>
        <LuDot />
      </Flex>
    </HStack>
  );
}
