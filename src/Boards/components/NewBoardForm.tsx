import { Field } from '@/components/ui/field';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';
import {
  Button,
  createListCollection,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const visibilities = createListCollection({
  items: [
    { label: 'Privado', value: 'private' },
    { label: 'Espacio de trabajo', value: 'workspace' },
    { label: 'Publico', value: 'public' },
  ],
});

const schema = z.object({
  title: z
    .string()
    .min(3, 'El título debe contener al menos 3 caracteres')
    .max(100, { message: 'El nombre debe contener menos de 100 caracteres' })
    .regex(/[A-Za-z0-9]/, {
      message: 'El título solo puede contener letras y números',
    }),
  visibility: z.string({ required_error: 'Visibilidad es requerido' }).array(),
});

type FormData = z.infer<typeof schema>;

interface NewBoardFormProps {
  onSubmit: (data: FormData) => void;
}

export default function NewBoardForm({ onSubmit }: NewBoardFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <Stack as={'form'} maxW={'400px'} onSubmit={handleSubmit(onSubmit)}>
      <Heading fontWeight={'normal'}>Crear Tablero</Heading>
      {/* <Field label="Color de fondo">
        <BackgroundColorPicker />
      </Field> */}
      <Field
        label="Título de tablero"
        invalid={!!errors.title}
        errorText={errors.title?.message}
      >
        <Controller
          control={control}
          name="title"
          defaultValue=""
          render={({ field }) => <Input {...field} autoFocus />}
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
              <SelectContent zIndex={'max'}>
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
      <Button type="submit" disabled={isSubmitting}>
        Crear
      </Button>
      <Button disabled>Empieza con una platilla</Button>
    </Stack>
  );
}
