import { ListRoot } from '@chakra-ui/react';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { ReactNode } from 'react';

type ListCardContainerProps = {
  onDragEndList: (event: DragEndEvent) => void;
  children: ReactNode | ReactNode[];
};

export default function ListCardContainer({
  onDragEndList,
  children,
}: ListCardContainerProps) {
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
      onDragEnd={onDragEndList}
    >
      <ListRoot listStyle={'none'} flexDirection={'row'} gap={4}>
        {children}
      </ListRoot>
    </DndContext>
  );
}
