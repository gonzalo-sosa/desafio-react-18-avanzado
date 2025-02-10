import {
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  MenuContent,
} from '@chakra-ui/react';
import { Avatar } from './ui/avatar';
import {
  LuBell,
  LuChevronDown,
  LuMessageCircleQuestion,
  LuSearch,
  LuSquareMenu,
} from 'react-icons/lu';
import { MenuItem, MenuRoot, MenuTrigger } from './ui/menu';
import Logo from './Logo';
import DropDown from './DropDown';
import { InputGroup } from './ui/input-group';
import { useAuthContext } from '@/Auth';

export default function NavBar() {
  const { getUser, logout } = useAuthContext();

  return (
    <HStack as={'nav'} padding={2} justifyContent={'space-between'}>
      <Flex gap={2}>
        <MenuRoot>
          <MenuTrigger asChild>
            <Button variant="outline" size="sm">
              <LuSquareMenu />
            </Button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem value="new-txt">New Text File</MenuItem>
          </MenuContent>
        </MenuRoot>
        <Logo />
        <DropDown>
          Espacios de trabajo <LuChevronDown />
        </DropDown>
        <DropDown>
          Reciente <LuChevronDown />
        </DropDown>
        <DropDown>
          Marcado <LuChevronDown />
        </DropDown>
        <DropDown>
          Plantillas <LuChevronDown />
        </DropDown>
        <DropDown>Crear</DropDown>
      </Flex>
      <Flex flexDirection={'row'} alignItems={'center'} gap={2}>
        <InputGroup startElement={<LuSearch />}>
          <Input />
        </InputGroup>
        <IconButton size={'xs'}>
          <LuBell />
        </IconButton>
        <IconButton size={'xs'}>
          <LuMessageCircleQuestion />
        </IconButton>
        <Avatar name={getUser()?.name} size={'xs'} />
        <Button onClick={() => logout()} size={'xs'}>
          Logout
        </Button>
      </Flex>
    </HStack>
  );
}
