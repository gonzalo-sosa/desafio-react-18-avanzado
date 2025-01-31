import Task from '@/models/Task';
import { ListItem } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
      boxShadow={'sm'}
      p={2}
      textStyle={'xs'}
    >
      {task.title}
    </ListItem>
  );
}
