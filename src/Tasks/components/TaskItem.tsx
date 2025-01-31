import { Tooltip } from '@/components/ui/tooltip';
import Task from '@/models/Task';
import { IconButton, ListItem, Text } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { LuPencil } from 'react-icons/lu';

type TaskItemProps = {
  task: Task;
};

export default function TaskItem({ task }: TaskItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
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
      borderWidth={2}
      _hover={{ borderColor: 'blue.400' }}
    >
      <Text>{task.title}</Text>
      <Tooltip content={'Editar tarjeta'}>
        <IconButton
          size={'xs'}
          variant={'ghost'}
          opacity={0}
          _groupHover={{ opacity: 1 }}
        >
          <LuPencil />
        </IconButton>
      </Tooltip>
    </ListItem>
  );
}
