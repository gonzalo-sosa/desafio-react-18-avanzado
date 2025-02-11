import { useBoardsStore } from '@/store';
import { EmptyState, Image, Table, VStack } from '@chakra-ui/react';

export default function TablePage() {
  const boards = useBoardsStore((s) => s.boards);

  if (boards.length === 0) return <TableEmpty />;

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell />
        </Table.Row>
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell />
        </Table.Row>
      </Table.Footer>
    </Table.Root>
  );
}

import tableEmptyImage from '@/assets/table-empty-image.svg';

function TableEmpty() {
  return (
    <EmptyState.Root size={'lg'}>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <Image src={tableEmptyImage} />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>No hay tableros seleccionados</EmptyState.Title>
          <EmptyState.Description>
            Selecciona tableros para crear la vista de tu Espacio de trabajo
          </EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
