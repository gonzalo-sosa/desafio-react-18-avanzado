import { Tooltip } from '@/components/ui/tooltip';
import { ListId } from '@/models/List';
import Task from '@/models/Task';
import { useTasksStore } from '@/store';
import { Button, HStack, IconButton, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { LuImage, LuPlus } from 'react-icons/lu';
import AddTaskForm from './AddTaskForm';

interface AddTaskButtonProps {
  listId: ListId;
}

export default function AddTask({ listId }: AddTaskButtonProps) {
  const addTask = useTasksStore((s) => s.addTask);

  const [showForm, setShowForm] = useState(false);

  function handleAddTask(data: Pick<Task, 'title'>) {
    const newTask = {
      id: String(Date.now()),
      title: data.title,
      description: '',
      listId,
    };

    addTask(newTask);
  }

  return showForm ? (
    <AddTaskForm onSubmit={handleAddTask} onBlur={() => setShowForm(false)} />
  ) : (
    <HStack>
      <Button
        onClick={() => setShowForm(true)}
        variant={'ghost'}
        size={'xs'}
        rounded={'md'}
        _hover={{ bg: 'gray.300' }}
        flex={1}
        justifyContent={'start'}
      >
        <LuPlus size={'xs'} />
        <Text marginLeft={2}>Añade una tarjeta</Text>
      </Button>
      <Tooltip content={'Añade a partir de pantalla'}>
        <IconButton size={'xs'} variant={'ghost'} _hover={{ bg: 'gray.300' }}>
          <LuImage />
        </IconButton>
      </Tooltip>
    </HStack>
  );
}
