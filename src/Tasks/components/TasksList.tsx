import { ListId } from '@/models/List';
import useTasksStore from '@/store/tasks-store';
import { Button, ListRoot } from '@chakra-ui/react';
import TaskItem from './TaskItem';

type TasksListProps = {
  listId: ListId;
};

export default function TasksList({ listId }: TasksListProps) {
  const tasks = useTasksStore((s) => s.tasks).filter(
    (t) => t.listId === listId,
  );
  const addTask = useTasksStore((s) => s.addTask);

  const handleAddTask = () => {
    addTask({
      id: '1',
      title: 'Mi tarjeta',
      description: 'Mi descripción',
      listId,
    });
  };

  return (
    <>
      <ListRoot>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ListRoot>
      <Button onClick={() => handleAddTask()}>Añade una tarjeta</Button>
    </>
  );
}
