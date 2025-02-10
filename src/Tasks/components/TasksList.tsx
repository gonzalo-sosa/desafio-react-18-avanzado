import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensors,
  useSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Button, HStack, IconButton, ListRoot, Text } from '@chakra-ui/react';
import { ListId } from '@/models/List';
import { LuImage, LuPlus } from 'react-icons/lu';
import { memo, useState } from 'react';
import { Tooltip } from '@/components/ui/tooltip';
import AddTaskForm from './AddTaskForm';
import Task from '@/models/Task';
import TaskItem from './TaskItem';
import useTasksStore from '@/store/tasks';
import '@/customSensors'; // Para inhabilitar drag and drop para botones o elementos con el atributo data-no-dnd

type TasksListProps = {
  listId: ListId;
};

function TasksList({ listId }: TasksListProps) {
  const filteredTasks = useTasksStore((s) => s.tasks).filter(
    (t) => t.listId === listId,
  );
  const addTask = useTasksStore((s) => s.addTask);
  const [tasks, setTasks] = useState(filteredTasks);

  const [showForm, setShowForm] = useState(false);

  const [activePopoverId, setActivePopoverId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEndTask}
    >
      <ListRoot
        listStyle={'none'}
        flexDirection={'column'}
        gap={3}
        paddingBlock={4}
      >
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              draggable={!activePopoverId}
              popoverProps={{
                open: activePopoverId === task.id,
                onOpenChange: (e) =>
                  setActivePopoverId(e.open ? task.id : null),
              }}
            />
          ))}
        </SortableContext>
      </ListRoot>
      {showForm ? (
        <AddTaskForm onSubmit={handleAddTask} />
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
            <IconButton
              size={'xs'}
              variant={'ghost'}
              _hover={{ bg: 'gray.300' }}
            >
              <LuImage />
            </IconButton>
          </Tooltip>
        </HStack>
      )}
    </DndContext>
  );

  function handleAddTask(data: Pick<Task, 'title'>) {
    const newTask = {
      id: String(Date.now()),
      title: data.title,
      description: '',
      listId,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    addTask(newTask);
    setShowForm(false);
  }

  function handleDragEndTask(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || !over.id) return;

    if (active.id !== over.id) {
      const activeTaskIndex = tasks.findIndex(({ id }) => id === active.id);
      const overTaskIndex = tasks.findIndex(({ id }) => id === over.id);

      setTasks((prevTasks) =>
        arrayMove(prevTasks, activeTaskIndex, overTaskIndex),
      );
    }
  }
}

export default memo(TasksList);
