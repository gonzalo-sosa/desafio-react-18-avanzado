import { Box, Grid, Heading, Text } from '@chakra-ui/react';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <Grid placeContent={'center'}>
      <Box padding={5}>
        <Heading>Oops</Heading>
        <Text>
          {isRouteErrorResponse(error)
            ? 'Esta página no existe'
            : 'Un error inesperado ha ocurrido'}
        </Text>
        <hr />
        <Link to={'/'}>Vuelve al inicio</Link>
      </Box>
    </Grid>
  );
}
