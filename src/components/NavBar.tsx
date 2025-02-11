import {
  Button,
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
} from 'react-icons/lu';
import { MenuItem, MenuRoot, MenuTrigger } from './ui/menu';
import Logo from './Logo';
import DropDown from './DropDown';
import { InputGroup } from './ui/input-group';
import { useAuthContext } from '@/Auth';
import MenuDots from './icons/MenuDots';

export default function NavBar() {
  const { getUser, logout } = useAuthContext();

  return (
    <HStack
      as={'nav'}
      padding={2}
      justifyContent={'space-between'}
      textStyle={'xs'}
    >
      <HStack gap={2}>
        <MenuRoot>
          <MenuTrigger asChild>
            <IconButton variant="ghost" size="md">
              <MenuDots />
            </IconButton>
          </MenuTrigger>
          <MenuContent>
            <MenuItem value="new-txt">New Text File</MenuItem>
          </MenuContent>
        </MenuRoot>
        <Logo />
        <DropDown>
          <Button variant={'ghost'} size={'xs'}>
            Espacios de trabajo <LuChevronDown />
          </Button>
        </DropDown>
        <DropDown>
          <Button variant={'ghost'} size={'xs'}>
            Reciente <LuChevronDown />
          </Button>
        </DropDown>
        <DropDown>
          <Button variant={'ghost'} size={'xs'}>
            Marcado <LuChevronDown />
          </Button>
        </DropDown>
        <DropDown>
          <Button variant={'ghost'} size={'xs'}>
            Plantillas <LuChevronDown />
          </Button>
        </DropDown>
        <DropDown>
          <Button colorPalette={'blue'} variant={'solid'} size={'xs'}>
            Crear
          </Button>
        </DropDown>
      </HStack>
      <HStack alignItems={'center'} gap={2}>
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
      </HStack>
    </HStack>
  );
}
