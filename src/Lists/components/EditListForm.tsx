import { Field } from '@/components/ui/field';
import { Button, Fieldset, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  title: z
    .string()
    .min(1, { message: '1 carácter como mínimo' })
    .max(100, 'El título debe tener cómo máximo 100 caracteres')
    .regex(/[A-Za-z0-9]/),
});

type FormData = z.infer<typeof schema>;

interface EditListFormProps {
  onSubmit: (data: FormData) => void;
}

export default function EditListForm({ onSubmit }: EditListFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { title: '' },
  });

  return (
    <form data-no-dnd="true" onSubmit={handleSubmit(onSubmit)}>
      <Fieldset.Root>
        <Fieldset.Legend>Editar Lista</Fieldset.Legend>
        <Fieldset.Content>
          <Field
            label={'Título'}
            invalid={!!errors.title}
            errorText={errors.title?.message}
          >
            <Controller
              name="title"
              control={control}
              render={({ field }) => <Input {...field} size={'xs'} autoFocus />}
            />
          </Field>
        </Fieldset.Content>
        <Button type="submit" disabled={isSubmitting}>
          Guardar
        </Button>
      </Fieldset.Root>
    </form>
  );
}
