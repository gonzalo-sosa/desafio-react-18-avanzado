import List from '@/models/List';
import useListsStore from '@/store/lists-store';
import TasksList from '@/Tasks/components/TasksList';
import {
  CardRoot,
  CardBody,
  CardHeader,
  HStack,
  IconButton,
  Editable,
  useEditable,
} from '@chakra-ui/react';
import { LuDot } from 'react-icons/lu';
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
          <IconButton variant={'outline'} size={'xs'}>
            <LuDot />
          </IconButton>
        </HStack>
      </CardHeader>
      <CardBody pt={0}>
        <TasksList listId={list.id} />
      </CardBody>
    </CardRoot>
  );
}
