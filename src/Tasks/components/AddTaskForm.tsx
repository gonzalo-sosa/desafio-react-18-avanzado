import { Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { Field } from '@/components/ui/field';

const schema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
});

type FormData = z.infer<typeof schema>;

interface AddTaskFormProps {
  onSubmit: (data: FormData) => void;
}

export default function AddTaskForm({ onSubmit }: AddTaskFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
