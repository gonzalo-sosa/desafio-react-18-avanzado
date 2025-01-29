import { Box, Button } from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

// type Props = {};

export default function Login() {
  const { getUser, login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login({
      id: String(Date.now()),
      name: 'Gonzalo Sosa',
      email: 'gonzalo@email.com',
    });
    navigate('/', { state: { from: 'login' } });
  };

  return (
    <Box padding={2}>
      <Button onClick={() => handleLogin()} disabled={getUser() !== null}>
        Login
      </Button>
    </Box>
  );
}
