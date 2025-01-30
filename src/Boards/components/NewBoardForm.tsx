import { Field } from '@/components/ui/field';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  createListCollection,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react';
import {
  SelectRoot,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValueText,
} from '@/components/ui/select';
import BackgroundColorPicker from './BackgroundColorPicker';

const visibilities = createListCollection({
  items: [
    { label: 'Privado', value: 'private' },
    { label: 'Espacio de trabajo', value: 'workspace' },
    { label: 'Publico', value: 'public' },
  ],
});

const schema = z.object({
  title: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  visibility: z.string({ message: 'Visibility is required' }).array(),
});

type FormData = z.infer<typeof schema>;

interface NewBoardFormProps {
  onSubmit: (data: FormData) => void;
}

export default function NewBoardForm({ onSubmit }: NewBoardFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <Stack as={'form'} maxW={'400px'} onSubmit={handleSubmit(onSubmit)}>
      <Heading>Crear Tablero</Heading>
      <Field label="Color de fondo">
        <BackgroundColorPicker />
      </Field>
      <Field
        label="Título de tablero"
        invalid={!!errors.title}
        errorText={errors.title?.message}
      >
        <Controller
          control={control}
          name="title"
          defaultValue=""
          render={({ field }) => <Input {...field} />}
        />
      </Field>
      <Field
        label="Visibilidad"
        invalid={!!errors.visibility}
        errorText={errors.visibility?.message}
      >
        <Controller
          control={control}
          name="visibility"
          render={({ field }) => (
            <SelectRoot
              name={field.name}
              value={field.value}
              onValueChange={({ value }) => field.onChange(value)}
              onInteractOutside={() => field.onBlur()}
              collection={visibilities}
            >
              <SelectTrigger>
                <SelectValueText placeholder="Seleccionar visibilidad" />
              </SelectTrigger>
              <SelectContent>
                {visibilities.items.map((visibility) => (
                  <SelectItem item={visibility} key={visibility.value}>
                    {visibility.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          )}
        />
      </Field>
      <Button type="submit" disabled={!isValid}>
        Crear
      </Button>
      <Button disabled>Empieza con una platilla</Button>
    </Stack>
  );
}
