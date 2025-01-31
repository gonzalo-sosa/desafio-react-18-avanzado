import { ListId } from '@/models/List';
import useTasksStore from '@/store/tasks-store';
import { Button, HStack, IconButton, ListRoot } from '@chakra-ui/react';
import TaskItem from './TaskItem';
import { useState } from 'react';
import AddTaskForm from './AddTaskForm';
import Task from '@/models/Task';
import { LuImage, LuPlus } from 'react-icons/lu';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

type TasksListProps = {
  listId: ListId;
};

export default function TasksList({ listId }: TasksListProps) {
  const tasks = useTasksStore((s) => s.tasks).filter(
    (t) => t.listId === listId,
  );
  const addTask = useTasksStore((s) => s.addTask);
  const setTasks = useTasksStore((s) => s.setTasks);

  const [showForm, setShowForm] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

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
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <ListRoot
        listStyle={'none'}
        flexDirection={'column'}
        gap={3}
        paddingBlock={4}
      >
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </SortableContext>
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
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || !over.id) return;

    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex(({ id }) => id === active.id);
      const newIndex = tasks.findIndex(({ id }) => id === over.id);

      setTasks(arrayMove(tasks, oldIndex, newIndex));
    }
  }
}
