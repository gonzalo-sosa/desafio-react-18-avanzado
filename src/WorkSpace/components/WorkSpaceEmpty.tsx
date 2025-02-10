import { EmptyState, VStack } from '@chakra-ui/react';
import { BsTrello } from 'react-icons/bs';

export default function WorkSpaceEmpty() {
  return (
    <EmptyState.Root size={'lg'}>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <BsTrello />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>Tu espacio de trabajo está vacío</EmptyState.Title>
          <EmptyState.Description>
            Crea un nuevo tablero para empezar
          </EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
