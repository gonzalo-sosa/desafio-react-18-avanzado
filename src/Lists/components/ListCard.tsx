import {
  CardBody,
  CardHeader,
  CardRoot,
  Editable,
  HStack,
  IconButton,
  useEditable,
} from '@chakra-ui/react';
import { Tooltip } from '@/components/ui/tooltip';
import List from '@/models/List';
import TasksList from '@/Tasks/components/TasksList';
import ThreeDots from '@/components/icons/ThreeDots';
import useListsStore from '@/store/lists';

type ListCardProps = {
  list: List;
};

export default function ListCard({ list }: ListCardProps) {
  const [currentList] = useListsStore((s) => s.lists).filter(
    (l) => l.id === list.id,
  );

  const editableTitle = useEditable({ defaultValue: list.title });
  currentList.title = editableTitle.value;

  return (
    <CardRoot
      minW={'280px'}
      maxW={'280px'}
      rounded={'2xl'}
      borderWidth={1}
      backgroundColor={'gray.100'}
    >
      <CardHeader>
        <HStack justifyContent={'space-between'}>
          <Editable.RootProvider value={editableTitle}>
            <Editable.Preview />
            <Editable.Input />
          </Editable.RootProvider>
          <Tooltip content={'Enumerar acciones'}>
            <IconButton
              variant={'outline'}
              size={'xs'}
              _hover={{ bg: 'gray.300' }}
            >
              <ThreeDots />
            </IconButton>
          </Tooltip>
        </HStack>
      </CardHeader>
      <CardBody pt={0}>
        <TasksList listId={list.id} />
      </CardBody>
    </CardRoot>
  );
}
