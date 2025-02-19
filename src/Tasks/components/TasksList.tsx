import { ListId } from '@/models/List';
import { useTasksByList } from '@/store/tasks';
import { ListRoot } from '@chakra-ui/react';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import SortableTaskItem from './SortableTaskItem';

interface TasksListProps {
  listId: ListId;
}

export default function TasksList({ listId }: TasksListProps) {
  const tasks = useTasksByList(listId);

  const [activePopoverId, setActivePopoverId] = useState<string | null>(null);

  return (
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
  );
}
