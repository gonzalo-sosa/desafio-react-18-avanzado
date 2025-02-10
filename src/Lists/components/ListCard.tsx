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
import { memo, useState } from 'react';
import Popover from '@/components/Popover';
import EditListForm from './EditListForm';

type ListCardProps = {
  list: List;
};

export function ListCard({ list }: ListCardProps) {
  const updateList = useListsStore((s) => s.updateList);

  const editableTitle = useEditable({ defaultValue: list.title });

  const [popoverOpen, setPopoverOpen] = useState(false);

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
            <Editable.Input onBlur={handleChangeListTitle} />
          </Editable.RootProvider>
          <Popover
            popoverRootProps={{
              positioning: { placement: 'right' },
              modal: true,
              open: popoverOpen,
              onOpenChange: (e) => setPopoverOpen(e.open),
            }}
            trigger={
              <IconButton
                variant={'outline'}
                size={'xs'}
                _hover={{ bg: 'gray.300' }}
              >
                <Tooltip content={'Enumerar acciones'}>
                  <ThreeDots />
                </Tooltip>
              </IconButton>
            }
          >
            <EditListForm onSubmit={handleEditList} />
          </Popover>
        </HStack>
      </CardHeader>
      <CardBody pt={0}>
        <TasksList listId={list.id} />
      </CardBody>
    </CardRoot>
  );

  function handleChangeListTitle() {
    updateList({ ...list, title: editableTitle.value });
  }

  function handleEditList(data: Partial<Omit<List, 'id'>>) {
    updateList({ ...list, ...data });
    setPopoverOpen(false);
  }
}

export default memo(ListCard);
