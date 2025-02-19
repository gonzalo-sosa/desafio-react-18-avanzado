import { Field } from '@/components/ui/field';
import { Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  title: z
    .string()
    .min(1, { message: 'Título es requerido' })
    .max(100, 'Título debe tener como máximo 100 caracteres')
    .regex(/[A-Za-z0-9]/),
});

type FormData = z.infer<typeof schema>;

interface AddListFormProps {
  onSubmit: (data: FormData) => void;
  onBlur: () => void;
}

export default function AddListForm({ onSubmit, onBlur }: AddListFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function doSubmit(data: FormData) {
    onSubmit(data);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(doSubmit)} onBlur={onBlur}>
      <Field errorText={errors.title?.message}>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input {...field} placeholder={'Lista...'} autoFocus />
          )}
        />
      </Field>
    </form>
  );
}
