import { Field } from '@/components/ui/field';
import { PasswordInput } from '@/components/ui/password-input';
import { Button, Fieldset, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuthContext } from '../Auth';

const schema = z.object({
  email: z
    .string({ required_error: 'El correo es requerido' })
    .email({ message: 'El correo no es válido' }),
  password: z
    .string()
    .min(8, { message: 'La contraseña debe de tener al menos 8 caracteres' }),
  confirmPassword: z
    .string()
    .min(8, { message: 'La contraseña debe de tener al menos 8 caracteres' }),
});

type FormData = z.infer<typeof schema>;

interface RegisterFormProps {
  onSubmit: () => void;
}

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const { login } = useAuthContext();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, touchedFields, isSubmitted, isValid },
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleRegister = ({ email, password, confirmPassword }: FormData) => {
    if (password !== confirmPassword) {
      setError('confirmPassword', { message: 'Las contraseñas no coinciden' });
      return;
    }
    login({
      id: String(Date.now()),
      name: email.substring(0, email.indexOf('@')),
      email,
    });

    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
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
                    placeholder="correo@example.com"
                    autoFocus
                    borderColor={
                      showFeedback
                        ? error
                          ? 'red.400'
                          : 'green.400'
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
              render={({ field, fieldState: { error, isTouched } }) => {
                const showFeedback = isSubmitted || isTouched;
                return (
                  <PasswordInput
                    {...field}
                    borderColor={
                      showFeedback
                        ? error
                          ? 'red.400'
                          : 'green.400'
                        : undefined
                    }
                  />
                );
              }}
            />
          </Field>
          <Field
            label="Confirmar contraseña"
            invalid={
              (isSubmitted || touchedFields.confirmPassword) &&
              !!errors.confirmPassword
            }
            errorText={
              isSubmitted || touchedFields.confirmPassword
                ? errors.confirmPassword?.message
                : undefined
            }
          >
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field, fieldState: { error, isTouched } }) => {
                const showFeedback = isSubmitted || isTouched;
                return (
                  <PasswordInput
                    {...field}
                    borderColor={
                      showFeedback
                        ? error
                          ? 'red.400'
                          : 'green.400'
                        : undefined
                    }
                  />
                );
              }}
            />
          </Field>
        </Fieldset.Content>
        <Button type="submit" my={4} disabled={!isValid}>
          Crear una cuenta
        </Button>
      </Fieldset.Root>
    </form>
  );
}
