import { Button, Fieldset, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { Field } from '@/components/ui/field';

const schema = z.object({
  title: z
    .string({ message: 'El título es obligatorio' })
    .min(1, { message: '1 carácter como mínimo' }),
});

type FormData = z.infer<typeof schema>;

interface EditListFormProps {
  onSubmit: (data: FormData) => void;
}

export default function EditListForm({ onSubmit }: EditListFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              defaultValue=""
              render={({ field }) => (
                <Input {...field} placeholder={'Lista...'} autoFocus />
              )}
            />
          </Field>
        </Fieldset.Content>
        <Button type="submit">Guardar</Button>
      </Fieldset.Root>
    </form>
  );
}
