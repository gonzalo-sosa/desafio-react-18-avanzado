import Task from '@/models/Task';
import { ListItem } from '@chakra-ui/react';

type TaskItemProps = {
  task: Task;
};

export default function TaskItem({ task }: TaskItemProps) {
  return <ListItem>{task.title}</ListItem>;
}
