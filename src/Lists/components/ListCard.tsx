import { Tooltip } from '@/components/ui/tooltip';
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
              <svg
                width="24"
                height="24"
                role="presentation"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"
                  fill="currentColor"
                ></path>
              </svg>
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
