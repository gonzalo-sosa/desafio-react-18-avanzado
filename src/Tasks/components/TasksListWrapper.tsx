import { ListId } from '@/models/List';
import { useTasksStore } from '@/store';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import AddTask from './AddTask';
import TasksList from './TasksList';

interface TasksListWrapperProps {
  listId: ListId;
}

export default function TasksListWrapper({ listId }: TasksListWrapperProps) {
  const reorderTasks = useTasksStore((s) => s.reorderTasks);

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEndTask({ active, over }: DragEndEvent) {
    if (!over || active.id === over.id) return;

    const sourceListId = active.data?.current?.listId as ListId;
    const destinationListId = over.data?.current?.listId as ListId;

    reorderTasks(
      active.id.toString(),
      over.id.toString(),
      sourceListId,
      destinationListId,
    );
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEndTask}
      >
        <TasksList listId={listId} />
      </DndContext>

      <AddTask listId={listId} />
    </>
  );
}
