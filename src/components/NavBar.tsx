import { useAuth } from '@/Auth';
import { Button, Flex, Heading, HStack, Input } from '@chakra-ui/react';
import { Avatar } from './ui/avatar';
import { LuBell, LuMessageCircleQuestion } from 'react-icons/lu';

export default function NavBar() {
  const { getUser, logout } = useAuth();
  return (
    <HStack padding={2} as={'nav'} justifyContent={'space-between'}>
      <Flex>
        <Heading>Trello</Heading>
      </Flex>
      <Flex flexDirection={'row'} alignItems={'center'} gap={2}>
        <Input />
        <LuBell size={32} />
        <LuMessageCircleQuestion size={32} />
        <Avatar name={getUser()?.name} />
        <Button onClick={() => logout()}>Logout</Button>
      </Flex>
    </HStack>
  );
}
