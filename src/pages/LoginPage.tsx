import Trello from '@/components/icons/Trello';
import LoginForm from '@/components/LoginForm';
import {
  Box,
  Button,
  Grid,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Auth';

export default function LoginPage() {
  const { getUser } = useAuthContext();

  const navigate = useNavigate();

  if (getUser()) {
    return <Navigate to="/" />;
  }

  const handleSubmit = () => {
    navigate('/', { state: { from: 'login' } });
  };

  return (
    <Grid placeItems={'center'}>
      <Box display="flex" flexDirection="column" width="55%" maxWidth="500px">
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Icon w={'64px'} h={'64px'}>
            <Trello />
          </Icon>
          <Heading as="h1" fontWeight={'normal'} textStyle={'md'} mt={6}>
            Inicia sesión para continuar
          </Heading>
        </Box>
        <LoginForm onSubmit={handleSubmit} />
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
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          color={'blue.500'}
        >
          <Link to="/register">¿No tiene una cuenta? Crea una</Link>
          <br />
        </Box>
      </Box>
    </Grid>
  );
}
