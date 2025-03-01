import { useBoardsStore } from '@/store';
import { EmptyState, VStack } from '@chakra-ui/react';
import { BsTrello } from 'react-icons/bs';
import { Navigate } from 'react-router-dom';

export default function WorkSpacePage() {
  const boards = useBoardsStore((s) => s.boards);

  if (boards.length === 0) return <WorkSpaceEmpty />;

  return <Navigate to={`/workspace/boards/${boards[0].id}`} />;
}

function WorkSpaceEmpty() {
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
