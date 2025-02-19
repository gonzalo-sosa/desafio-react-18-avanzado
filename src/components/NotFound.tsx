import { EmptyState, Span, Text, VStack } from '@chakra-ui/react';
import { BiError } from 'react-icons/bi';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <EmptyState.Root
      minH="100vh"
      minW="100vw"
      alignContent={'center'}
      justifyItems={'center'}
    >
      <EmptyState.Content>
        <EmptyState.Indicator>
          <BiError />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>
            {isRouteErrorResponse(error)
              ? 'Página no encontrada'
              : 'Error inesperado'}
          </EmptyState.Title>
          <EmptyState.Description asChild>
            {isRouteErrorResponse(error) ? (
              <Text>
                No pudimos encontrar la página que buscabas.{' '}
                <Link to="/">
                  <Span color="blue.500">Volver a la página de inicio</Span>
                </Link>
              </Text>
            ) : (
              <Text>
                {error instanceof Error
                  ? error.message
                  : 'Ocurrió un error inesperado'}
              </Text>
            )}
          </EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
