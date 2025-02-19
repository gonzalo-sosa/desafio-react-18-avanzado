import ThreeDots from '@/components/icons/ThreeDots';
import { Avatar } from '@/components/ui/avatar';
import Board from '@/models/Board';
import { Button, Flex, Heading, HStack, IconButton } from '@chakra-ui/react';
import {
  LuChevronDown,
  LuCloudLightning,
  LuRocket,
  LuStar,
  LuTrello,
  LuUserPlus,
  LuUsers,
} from 'react-icons/lu';
import { useAuthContext } from '@/Auth';

interface BoardNavBarProps {
  board: Board;
}

export default function BoardNavBar({ board }: BoardNavBarProps) {
  const { getUser } = useAuthContext();

  return (
    <HStack
      as={'nav'}
      justifyContent={'space-between'}
      padding={2}
      borderWidth={2}
      backgroundColor={'white'}
    >
      <Flex flexDirection={'row'} alignItems={'center'} gap={2}>
        <Heading>{board.title}</Heading>
        <IconButton size={'xs'} variant={'outline'}>
          <LuStar />
        </IconButton>
        <IconButton size={'xs'} variant={'outline'}>
          <LuUsers />
        </IconButton>
        <Button size={'xs'}>
          <LuTrello />
          Tablero
        </Button>
        <IconButton size={'xs'} variant={'outline'}>
          <LuChevronDown />
        </IconButton>
      </Flex>
      <Flex flexDirection={'row'} alignItems={'center'} gap={2}>
        <IconButton
          size={'xs'}
          variant={'outline'}
          display={{ base: 'none', lg: 'initial' }}
        >
          <LuRocket />
        </IconButton>
        <IconButton
          size={'xs'}
          variant={'outline'}
          display={{ base: 'none', lg: 'initial' }}
        >
          <LuCloudLightning />
        </IconButton>
        <Avatar name={getUser()?.name} size={'xs'} />
        <Button size={'xs'}>
          <LuUserPlus />
          Compartir
        </Button>
        <IconButton size={'xs'} variant={'outline'}>
          <ThreeDots />
        </IconButton>
      </Flex>
    </HStack>
  );
}
