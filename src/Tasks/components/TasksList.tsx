import { ListId } from '@/models/List';
import useTasksStore from '@/store/tasks-store';
import { Button, HStack, IconButton, ListRoot } from '@chakra-ui/react';
import TaskItem from './TaskItem';
import { useState } from 'react';
import AddTaskForm from './AddTaskForm';
import Task from '@/models/Task';
import { LuImage, LuPlus } from 'react-icons/lu';

type TasksListProps = {
  listId: ListId;
};

export default function TasksList({ listId }: TasksListProps) {
  const tasks = useTasksStore((s) => s.tasks).filter(
    (t) => t.listId === listId,
  );
  const addTask = useTasksStore((s) => s.addTask);

  const [showForm, setShowForm] = useState(false);

  const handleAddTask = (data: Pick<Task, 'title'>) => {
    addTask({
      id: String(Date.now()),
      title: data.title,
      description: '',
      listId,
    });

    setShowForm(false);
  };

  return (
    <>
      <ListRoot
        listStyle={'none'}
        flexDirection={'column'}
        gap={3}
        paddingBlock={4}
      >
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ListRoot>
      {showForm ? (
        <AddTaskForm onSubmit={handleAddTask} />
      ) : (
        <HStack>
          <Button
            flex={1}
            justifyContent={'start'}
            size={'xs'}
            onClick={() => setShowForm(true)}
          >
            <LuPlus size={'xs'} />
            Añade una tarjeta
          </Button>
          <IconButton size={'xs'}>
            <LuImage />
          </IconButton>
        </HStack>
      )}
    </>
  );
}
