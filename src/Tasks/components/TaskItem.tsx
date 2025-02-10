import Popover from '@/components/Popover';
import { Tooltip } from '@/components/ui/tooltip';
import Task from '@/models/Task';
import { IconButton, ListItem, PopoverRootProps, Text } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { LuPencil } from 'react-icons/lu';
import EditTaskForm from './EditTaskForm';
import useTasksStore from '@/store/tasks';

type TaskItemProps = {
  task: Task;
  draggable: boolean;
  popoverProps: Omit<PopoverRootProps, 'children'>;
};

export default function TaskItem({
  task,
  draggable,
  popoverProps,
}: TaskItemProps) {
  const updateTask = useTasksStore((s) => s.updateTask);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id, disabled: !draggable });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: draggable ? 'grab' : 'default',
  };

  return (
    <ListItem
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      boxShadow={'xs'}
      bgColor={'whiteAlpha.900'}
      pl={2}
      pr={0}
      rounded={'md'}
      textStyle={'xs'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
      className="group"
      borderWidth={1}
      _hover={{ borderColor: 'blue.400' }}
    >
      <Text>{task.title}</Text>
      <Popover
        popoverRootProps={{
          ...popoverProps,
          positioning: { placement: 'right' },
          modal: true,
        }}
        trigger={
          <IconButton
            size={'xs'}
            variant={'ghost'}
            opacity={0}
            _groupHover={{ opacity: 1 }}
          >
            <Tooltip content={'Editar tarjeta'}>
              <LuPencil />
            </Tooltip>
          </IconButton>
        }
      >
        <EditTaskForm onSubmit={handleEditTask} />
      </Popover>
    </ListItem>
  );

  function handleEditTask(data: Partial<Omit<Task, 'id'>>) {
    updateTask({ ...task, ...data });
    popoverProps.onOpenChange?.({ open: false });
  }
}
