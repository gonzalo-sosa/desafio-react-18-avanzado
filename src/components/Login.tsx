import {
  Box,
  Button,
  Fieldset,
  Grid,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import useAuth from '../Auth/hooks/useAuthContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { LuTrello } from 'react-icons/lu';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field } from '@/components/ui/field';
import { PasswordInput } from '@/components/ui/password-input';

const schema = z.object({
  email: z.string().email({ message: 'El correo no es válido' }),
  password: z
    .string()
    .min(8, { message: 'La contraseña debe de tener al menos 8 caracteres' }),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const { getUser, login } = useAuth();
  const navigate = useNavigate();
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

  if (getUser()) {
    return <Navigate to="/" />;
  }

  const handleLogin = ({ email }: FormData) => {
    login({
      id: String(Date.now()),
      name: email.substring(0, email.indexOf('@')),
      email,
    });
    navigate('/', { state: { from: 'login' } });
  };

  return (
    <Grid placeItems={'center'}>
      <Box display="flex" flexDirection="column" width="55%" maxWidth="500px">
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <LuTrello size={100} />
          <Heading textStyle={'md'}>Inicia sesión para continuar</Heading>
        </Box>
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
        <Stack>
          <Text textAlign={'center'} color={'gray.500'}>
            O continúa con
          </Text>
          <Button w={'100%'} my={1} variant={'outline'}>
            <Image
              src="https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/google-logo.5867462c.svg"
              alt="Logo de Google"
              htmlWidth={24}
              marginLeft={2}
            />
            Google
          </Button>
          <Button w={'100%'} my={1} variant={'outline'}>
            <Image
              src="https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/microsoft-logo.c73d8dca.svg"
              alt="Logo de Microsoft"
              htmlWidth={24}
              marginLeft={2}
            />
            Microsoft
          </Button>
          <Button w={'100%'} my={1} variant={'outline'}>
            <Image
              src="https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/apple-logo.54e0d711.svg"
              alt="Logo de Apple"
              htmlWidth={24}
              marginLeft={2}
            />
            Apple
          </Button>
          <Button w={'100%'} my={1} variant={'outline'}>
            <Image
              src="https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/slack-logo.5d730c10.svg"
              alt="Logo de Slack"
              htmlWidth={24}
              marginLeft={2}
            />
            Slack
          </Button>
        </Stack>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Link to="/register">¿No tiene una cuenta? Crea una</Link>
          <br />
        </Box>
      </Box>
    </Grid>
  );
}
