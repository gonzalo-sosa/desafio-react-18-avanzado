import { ListRoot, ListItem } from '@chakra-ui/react';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import SorteableListCard from './SorteableListCard';
import useListsStore from '@/store/lists';
import List from '@/models/List';
import { memo, useMemo } from 'react';

interface BoardListsProps {
  lists: List[];
}

const BoardLists = ({ lists }: BoardListsProps) => {
  const reorderLists = useListsStore((s) => s.reorderLists);

  const sensors = useSensors(useSensor(PointerSensor));

  const listsIDs = useMemo(() => lists.map((l) => l.id), [lists]);

  function handleDragEndList({ active, over }: DragEndEvent) {
    if (!over || active.id === over.id) return;

    reorderLists(active.id.toString(), over.id.toString());
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEndList}
    >
      <ListRoot listStyle={'none'} flexDirection={'row'} gap={4}>
        <SortableContext
          items={listsIDs}
          strategy={horizontalListSortingStrategy}
        >
          {lists.map((list) => (
            <ListItem key={list.id}>
              <SorteableListCard
                key={list.id}
                listCardProps={{ list }}
                draggable
              />
            </ListItem>
          ))}
        </SortableContext>
      </ListRoot>
    </DndContext>
  );
};

export default memo(BoardLists);
