import Task from '@/models/Task';
import { ListItem } from '@chakra-ui/react';

type TaskItemProps = {
  task: Task;
};

export default function TaskItem({ task }: TaskItemProps) {
  return (
    <ListItem boxShadow={'sm'} p={2} textStyle={'xs'}>
      {task.title}
    </ListItem>
  );
}
