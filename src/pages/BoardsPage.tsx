import { InputGroup } from '@/components/ui/input-group';
import { Field } from '@/components/ui/field';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  NativeSelectField,
  NativeSelectRoot,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { LuLockKeyhole, LuSearch, LuUserRoundPlus } from 'react-icons/lu';

export default function BoardsPage() {
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
      <Grid h="200px" templateRows="repeat(3, 1fr)" rowGap={4}>
        <GridItem>
          <Heading>Tableros</Heading>
        </GridItem>
        <GridItem>
          <HStack justifyContent={'space-between'}>
            <HStack justifyContent={'start'}>
              <Field label={'Ordenar por'}>
                <NativeSelectRoot>
                  <NativeSelectField>
                    <option value="" selected disabled>
                      Por defecto
                    </option>
                    <option value="">Más activo recientemente</option>
                    <option value="">Menos activo recientemente</option>
                    <option value="">En orden alfabético de la A a la Z</option>
                    <option value="">En orden alfabético de la Z a la A</option>
                  </NativeSelectField>
                </NativeSelectRoot>
              </Field>
              <Field label={'Filtrar por'}>
                <Input />
              </Field>
            </HStack>
            <Box></Box>
            <Box>
              <Field label={'Buscar'}>
                <InputGroup startElement={<LuSearch />}>
                  <Input placeholder="Buscar tableros" />
                </InputGroup>
              </Field>
            </Box>
          </HStack>
        </GridItem>
        <GridItem>
          <Flex gap={2}>
            <Button
              h={100}
              w={250}
              rounded={'sm'}
              bgColor={'gray.400'}
              alignContent={'center'}
              justifyItems={'center'}
            >
              <Text color={'white'}>Crear tablero nuevo</Text>
            </Button>
          </Flex>
        </GridItem>
      </Grid>
    </SimpleGrid>
  );
}
