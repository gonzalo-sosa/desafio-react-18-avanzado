import ThreeDots from '@/components/icons/ThreeDots';
import Popover from '@/components/Popover';
import { Tooltip } from '@/components/ui/tooltip';
import List from '@/models/List';
import useListsStore from '@/store/lists';
import TasksListWrapper from '@/Tasks/components/TasksListWrapper';
import {
  CardBody,
  CardHeader,
  CardRoot,
  Editable,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { CSSProperties, forwardRef, memo, useState } from 'react';
import EditListForm from './EditListForm';

interface ListCardProps {
  list: List;
  style?: CSSProperties;
}

const ListCard = forwardRef<HTMLDivElement, ListCardProps>(
  ({ list, style, ...rest }, ref) => {
    const updateList = useListsStore((s) => s.updateList);

    const [editableTitle, setEditableTitle] = useState(list.title);

    const [popoverOpen, setPopoverOpen] = useState(false);

    function handleChangeListTitle() {
      updateList({ ...list, title: editableTitle });
    }

    function handleEditList(data: Partial<Omit<List, 'id'>>) {
      updateList({ ...list, ...data });
      setEditableTitle(data.title || list.title);
      setPopoverOpen(false);
    }

    return (
      <CardRoot
        ref={ref}
        style={style}
        {...rest}
        minW={'280px'}
        maxW={'280px'}
        rounded={'2xl'}
        borderWidth={1}
        backgroundColor={'gray.100'}
      >
        <CardHeader>
          <HStack
            data-no-dnd="true"
            cursor={'default'}
            justifyContent={'space-between'}
          >
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
                  data-no-dnd="true"
                  variant={'outline'}
                  size={'xs'}
                  _hover={{ bg: 'gray.300' }}
                  aria-label="Editar lista"
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
          <TasksListWrapper listId={list.id} />
        </CardBody>
      </CardRoot>
    );
  },
);

ListCard.displayName = 'ListCard';

export default memo(ListCard);
