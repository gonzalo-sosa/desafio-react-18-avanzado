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
