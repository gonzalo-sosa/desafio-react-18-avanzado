import { useSortable } from '@dnd-kit/sortable';
import TaskItem from './TaskItem';
import { ComponentProps } from 'react';
import { CSS } from '@dnd-kit/utilities';

interface SortableTaskItemProps {
  draggable: boolean;
  taskItemProps: ComponentProps<typeof TaskItem>;
}

export default function SortableTaskItem({
  draggable,
  taskItemProps: { task, ...rest },
}: SortableTaskItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
      data: {
        type: 'task',
        listId: task.listId,
      },
      disabled: !draggable,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: draggable ? 'grab' : 'default',
  };

  return (
    <TaskItem
      task={task}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      {...rest}
      style={style}
    />
  );
}
