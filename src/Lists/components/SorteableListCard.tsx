import { useSortable } from '@dnd-kit/sortable';
import ListCard from './ListCard';
import { ComponentProps } from 'react';
import { CSS } from '@dnd-kit/utilities';

type SorteableListCardProps = {
  draggable: boolean;
  listCardProps: ComponentProps<typeof ListCard>;
};

export default function SorteableListCard({
  draggable,
  listCardProps: { list, ...rest },
}: SorteableListCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: list.id,
      data: { type: 'list', accepts: ['task'] },
      disabled: !draggable,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: draggable ? 'grab' : 'default',
  };

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
}
