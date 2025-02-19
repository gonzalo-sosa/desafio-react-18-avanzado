import Popover from '@/components/Popover';
import { Tooltip } from '@/components/ui/tooltip';
import Task from '@/models/Task';
import { IconButton, ListItem, PopoverRootProps, Text } from '@chakra-ui/react';
import { LuPencil } from 'react-icons/lu';
import EditTaskForm from './EditTaskForm';
import useTasksStore from '@/store/tasks';
import { CSSProperties, forwardRef } from 'react';

interface TaskItemProps {
  task: Task;
  style?: CSSProperties;
  popoverProps: Omit<PopoverRootProps, 'children'>;
}

const TaskItem = forwardRef<HTMLLIElement, TaskItemProps>(
  ({ task, style, popoverProps, ...rest }, ref) => {
    const updateTask = useTasksStore((s) => s.updateTask);

    return (
      <ListItem
        ref={ref}
        {...rest}
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
  },
);

TaskItem.displayName = 'TaskItem';

export default TaskItem;
