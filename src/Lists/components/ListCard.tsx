import {
  CardBody,
  CardHeader,
  CardRoot,
  Editable,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { Tooltip } from '@/components/ui/tooltip';
import List from '@/models/List';
import TasksList from '@/Tasks/components/TasksList';
import ThreeDots from '@/components/icons/ThreeDots';
import useListsStore from '@/store/lists';
import { memo, useState } from 'react';
import Popover from '@/components/Popover';
import EditListForm from './EditListForm';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type ListCardProps = {
  list: List;
  draggable: boolean;
};

function ListCard({ list, draggable }: ListCardProps) {
  const updateList = useListsStore((s) => s.updateList);

  const [editableTitle, setEditableTitle] = useState(list.title);

  const [popoverOpen, setPopoverOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: list.id, disabled: !draggable });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: draggable ? 'grab' : 'default',
  };

  return (
    <CardRoot
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      minW={'280px'}
      maxW={'280px'}
      rounded={'2xl'}
      borderWidth={1}
      backgroundColor={'gray.100'}
    >
      <CardHeader>
        <HStack justifyContent={'space-between'}>
          <Editable.Root
            value={editableTitle}
            onValueChange={(e) => setEditableTitle(e.value)}
          >
            <Editable.Preview />
            <Editable.Input onBlur={handleChangeListTitle} />
          </Editable.Root>
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
    updateList({ ...list, title: editableTitle });
  }

  function handleEditList(data: Partial<Omit<List, 'id'>>) {
    updateList({ ...list, ...data });
    setPopoverOpen(false);
  }
}

export default memo(ListCard);
