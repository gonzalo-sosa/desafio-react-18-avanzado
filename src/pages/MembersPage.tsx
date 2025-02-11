import { useAuthContext } from '@/Auth';
import { Avatar } from '@/components/ui/avatar';
import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  ListItem,
  ListRoot,
  SimpleGrid,
  Stack,
  Table,
  Text,
} from '@chakra-ui/react';
import { LuLockKeyhole, LuUserRoundPlus, LuX } from 'react-icons/lu';

export default function MembersPage() {
  const { getUser } = useAuthContext();

  return (
    <SimpleGrid px={4} py={2} gap={12}>
      <HStack
        justifyContent={'space-evenly'}
        pb={8}
        borderBottom={'1px solid'}
        borderColor={'gray.200'}
      >
        <HStack>
          <Button backgroundColor={'blue.500'} p={0}>
            <Text fontSize={'xl'}>E</Text>
          </Button>
          <Box>
            <Heading fontWeight={'normal'}>
              Espacio de trabajo de Trello
            </Heading>
            <HStack
              textStyle={'xs'}
              fontWeight={'normal'}
              color={'gray.400'}
              gap={2}
            >
              <Text>Premium</Text>
              <LuLockKeyhole />
              <Text>Privada</Text>
            </HStack>
          </Box>
        </HStack>
        <Box>
          <Button colorPalette={'blue'} fontWeight={'normal'}>
            <LuUserRoundPlus size={'xs'} /> Invitar a miembros del Espacio de
            trabajo
          </Button>
        </Box>
      </HStack>
      <Grid
        h="200px"
        templateRows="repeat(3, 1fr)"
        templateColumns="200px 1fr"
        rowGap={4}
        columnGap={6}
      >
        <GridItem colSpan={2}>
          <Heading fontWeight={'normal'}>Colaboradores {'()'}</Heading>
        </GridItem>
        <GridItem rowSpan={3} textStyle={'sm'} color={'gray.500'}>
          <ListRoot listStyle={'none'} as={Stack} gap={1}>
            <ListItem rounded={'sm'} p={2} _hover={{ bgColor: 'gray.200' }}>
              Miembros del espacio de trabajo {'(1)'}
            </ListItem>
            <ListItem rounded={'sm'} p={2} _hover={{ bgColor: 'gray.200' }}>
              Invitados {'(0)'}
            </ListItem>
            <ListItem rounded={'sm'} p={2} _hover={{ bgColor: 'gray.200' }}>
              Solicitudes de unión {'(0)'}
            </ListItem>
          </ListRoot>
        </GridItem>
        <GridItem>
          <Box pb={2} borderBottom={'1px solid'} borderColor={'gray.200'}>
            <Heading fontWeight={'normal'} mb={2}>
              Miembros del espacio de trabajo {'(1)'}
            </Heading>
            <Text textStyle={'sm'} color={'gray.500'}>
              Los miembros del Espacio de trabajo pueden ver todos los tableros
              visibles para el Espacio de trabajo, unirse a ellos y crear nuevos
              tableros en el Espacio de trabajo. Si se añaden nuevos miembros,
              tu factura se actualizará automáticamente.
            </Text>
          </Box>
        </GridItem>
        <GridItem>
          <Box pb={2} borderBottom={'1px solid'} borderColor={'gray.200'}>
            <Heading fontWeight={'normal'} mb={2}>
              Invita a los miembros a unirse
            </Heading>
            <Text textStyle={'sm'} color={'gray.500'}>
              Cualquiera que tenga un enlace de invitación puede unirse a este
              Espacio de trabajo gratuito. Se te facturará por cada miembro que
              se una. Puedes deshabilitar esta funcionalidad y crear un enlace
              nuevo para este Espacio de trabajo en cualquier momento
            </Text>
          </Box>
        </GridItem>
        <GridItem>
          <Box mb={4}>
            <Input
              w={'fit-content'}
              size={'sm'}
              placeholder="Filtrar por nombre"
            />
          </Box>
          <Table.Root>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Avatar name={getUser()?.name} size={'xs'} />
                </Table.Cell>
                <Table.Cell>{getUser()?.name}</Table.Cell>
                <Table.Cell>
                  <Button>Ver tableros {'(0)'}</Button>
                </Table.Cell>
                <Table.Cell>
                  <Button>Administrador</Button>
                </Table.Cell>
                <Table.Cell>
                  <Button>
                    <LuX /> <Text>Dejar...</Text>
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </GridItem>
      </Grid>
    </SimpleGrid>
  );
}
