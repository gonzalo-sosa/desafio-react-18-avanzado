import { useSortable } from '@dnd-kit/sortable';
import ListCard from './ListCard';
import { ComponentProps, memo, useMemo } from 'react';
import { CSS } from '@dnd-kit/utilities';

interface SorteableListCardProps {
  draggable: boolean;
  listCardProps: ComponentProps<typeof ListCard>;
}

const SorteableListCard = ({
  draggable,
  listCardProps: { list, ...rest },
}: SorteableListCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: list.id,
      data: { type: 'list', accepts: ['task'] },
      disabled: !draggable,
    });

  const style = useMemo(
    () => ({
      transform: CSS.Translate.toString(transform),
      transition,
      cursor: draggable ? 'grab' : 'default',
    }),
    [draggable, transform, transition],
  );

  return (
    <ListCard
      list={list}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      {...rest}
      style={style}
    />
  );
};

export default memo(SorteableListCard);
