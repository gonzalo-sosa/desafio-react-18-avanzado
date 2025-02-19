import { Field } from '@/components/ui/field';
import { Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  title: z
    .string()
    .min(1, 'El título debe tener 1 carácter como mínimo')
    .max(100, 'El título debe tener 100 caracteres como máximo')
    .regex(/[A-Za-z0-9]/, 'El título sólo puede contener letras y números'),
});

type FormData = z.infer<typeof schema>;

interface AddTaskFormProps {
  onSubmit: (data: FormData) => void;
  onBlur: () => void;
}

export default function AddTaskForm({ onSubmit, onBlur }: AddTaskFormProps) {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const doSubmit = (data: FormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(doSubmit)} onBlur={onBlur}>
      <Field errorText={errors.title?.message}>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              size={'xs'}
              autoFocus
              placeholder={'Añade un título o pega un enlace'}
            />
          )}
        />
      </Field>
    </form>
  );
}
