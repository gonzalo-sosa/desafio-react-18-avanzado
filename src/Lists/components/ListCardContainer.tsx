import { ListRoot } from '@chakra-ui/react';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { ReactNode } from 'react';
import { ListId } from '@/models/List';

type ListCardContainerProps = {
  lists: ListId[];
  onDragEndList: (event: DragEndEvent) => void;
  children: ReactNode | ReactNode[];
};

export default function ListCardContainer({
  lists,
  onDragEndList,
  children,
}: ListCardContainerProps) {
  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <DndContext
      id="list-card-container"
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEndList}
    >
      <ListRoot listStyle={'none'} flexDirection={'row'} gap={4}>
        <SortableContext items={lists} strategy={horizontalListSortingStrategy}>
          {children}
        </SortableContext>
      </ListRoot>
    </DndContext>
  );
}
