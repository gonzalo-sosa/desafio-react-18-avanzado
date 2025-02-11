import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensors,
  useSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Button, HStack, IconButton, ListRoot, Text } from '@chakra-ui/react';
import { ListId } from '@/models/List';
import { LuImage, LuPlus } from 'react-icons/lu';
import { useState } from 'react';
import { Tooltip } from '@/components/ui/tooltip';
import AddTaskForm from './AddTaskForm';
import Task from '@/models/Task';
import { useTasksStore } from '@/store';
import { useTasksByList } from '@/store/tasks';
import SortableTaskItem from './SortableTaskItem';

type TasksListProps = {
  listId: ListId;
};

export default function TasksList({ listId }: TasksListProps) {
  const tasks = useTasksByList(listId);
  const addTask = useTasksStore((s) => s.addTask);
  const reorderTasks = useTasksStore((s) => s.reorderTasks);

  const [showForm, setShowForm] = useState(false);

  const [activePopoverId, setActivePopoverId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

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
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <SortableTaskItem
              key={task.id}
              draggable={!activePopoverId}
              taskItemProps={{
                task: task,
                popoverProps: {
                  open: activePopoverId === task.id,
                  onOpenChange: (e) =>
                    setActivePopoverId(e.open ? task.id : null),
                },
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

    addTask(newTask);
    setShowForm(false);
  }

  function handleDragEndTask({ active, over }: DragEndEvent) {
    if (!over || active.id === over.id) return;

    const sourceListId = active.data?.current?.listId;
    const destinationListId = over.data?.current?.listId;

    reorderTasks(
      active.id.toString(),
      over.id.toString(),
      sourceListId,
      destinationListId,
    );
  }
}
