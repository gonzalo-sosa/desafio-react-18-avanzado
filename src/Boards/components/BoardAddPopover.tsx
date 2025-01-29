import {
  Button,
  createListCollection,
  Heading,
  Input,
  PopoverArrow,
  PopoverBody,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Stack,
} from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { ReactNode } from 'react';
import BackgroundColorPicker from './BackgroundColorPicker';

type BoardAddPopoverProps = {
  children: ReactNode;
};

const visibility = createListCollection({
  items: [
    { label: 'Privado', value: 'private' },
    { label: 'Espacio de trabajo', value: 'workspace' },
    { label: 'Publico', value: 'public' },
  ],
});

export default function BoardAddPopover({ children }: BoardAddPopoverProps) {
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Stack as={'form'} gap="4">
            <Heading>Crear Tablero</Heading>
            <label>
              Fondo
              <BackgroundColorPicker />
            </label>
            <Field label="Título de tablero">
              <Input />
            </Field>
            <SelectRoot collection={visibility} size="sm">
              <SelectLabel>Visibilidad</SelectLabel>
              <SelectTrigger>
                <SelectValueText placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                {visibility.items.map((movie) => (
                  <SelectItem item={movie} key={movie.value}>
                    {movie.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
            <Button>Crear</Button>
            <Button disabled>Empieza con una platilla</Button>
          </Stack>
        </PopoverBody>
        <PopoverCloseTrigger />
      </PopoverContent>
    </PopoverRoot>
  );
}
