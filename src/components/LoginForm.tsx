import { Field } from '@/components/ui/field';
import { PasswordInput } from '@/components/ui/password-input';
import { Button, Fieldset, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuthContext } from '../Auth';

const schema = z.object({
  email: z.string().email({ message: 'El correo no es válido' }),
  password: z
    .string()
    .min(8, { message: 'La contraseña debe de tener al menos 8 caracteres' }),
});

type FormData = z.infer<typeof schema>;

interface LoginFormProps {
  onSubmit: () => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const { login } = useAuthContext();

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitted, isValid },
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = ({ email }: FormData) => {
    login({
      id: String(Date.now()),
      name: email.substring(0, email.indexOf('@')),
      email,
    });

    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <Fieldset.Root>
        <Fieldset.Content>
          <Field
            label="Email"
            invalid={(isSubmitted || touchedFields.email) && !!errors.email}
            errorText={
              isSubmitted || touchedFields.email
                ? errors.email?.message
                : undefined
            }
          >
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState: { error, isTouched } }) => {
                const showFeedback = isSubmitted || isTouched;
                return (
                  <Input
                    {...field}
                    autoFocus
                    placeholder="correo@example.com"
                    borderColor={
                      showFeedback
                        ? error
                          ? 'red.500'
                          : 'green.500'
                        : undefined
                    }
                  />
                );
              }}
            />
          </Field>
          <Field
            label="Contraseña"
            invalid={
              (isSubmitted || touchedFields.password) && !!errors.password
            }
            errorText={
              isSubmitted || touchedFields.password
                ? errors.password?.message
                : undefined
            }
          >
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState: { isTouched, error } }) => {
                const showFeedback = isSubmitted || isTouched;
                return (
                  <PasswordInput
                    {...field}
                    borderColor={
                      showFeedback
                        ? error
                          ? 'red.500'
                          : 'green.500'
                        : undefined
                    }
                  />
                );
              }}
            />
          </Field>
        </Fieldset.Content>
        <Button type="submit" my={4} disabled={!isValid}>
          Iniciar sesión
        </Button>
      </Fieldset.Root>
    </form>
  );
}
