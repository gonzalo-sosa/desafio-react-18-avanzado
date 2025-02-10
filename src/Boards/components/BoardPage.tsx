import { Button, Flex, ListItem, Stack } from '@chakra-ui/react';
import { ListCard, AddListForm } from '@/Lists';
import { LuPlus } from 'react-icons/lu';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Board from '@/models/Board';
import BoardNavBar from './BoardNavBar';
import ListCardContainer from '@/Lists/components/ListCardContainer';
import { useListsStore } from '@/store';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { useBoard } from '@/store/boards';
import { useListsByBoard } from '@/store/lists';
import { DragEndEvent } from '@dnd-kit/core';

export default function BoardPage() {
  const { boardId } = useParams();

  const board = useBoard(boardId!);

  const lists = useListsByBoard(boardId!);
  const addList = useListsStore((s) => s.addList);
  const reorderLists = useListsStore((s) => s.reorderLists);

  const [showForm, setShowForm] = useState(false);

  if (!board) return null;

  return (
    <Stack h={'vh'}>
      <BoardNavBar board={board} />
      <Flex
        flex={1}
        w={'full'}
        h={'full'}
        overflowX={'auto'}
        flexDirection={'row'}
        flexWrap={'nowrap'}
        padding={2}
        gap={4}
      >
        <ListCardContainer onDragEndList={handleDragEndList}>
          <SortableContext
            items={lists}
            strategy={horizontalListSortingStrategy}
          >
            {lists.map((list) => (
              <ListItem key={list.id}>
                <ListCard key={list.id} list={list} draggable />
              </ListItem>
            ))}
          </SortableContext>
        </ListCardContainer>

        {showForm ? (
          <AddListForm onSubmit={handleAddList} />
        ) : (
          <Button
            onClick={() => setShowForm(true)}
            maxW={'280px'}
            rounded={'2xl'}
          >
            <LuPlus size={'xs'} />
            {lists.length ? 'Añade otra lista' : 'Añadir una lista'}
          </Button>
        )}
      </Flex>
    </Stack>
  );

  function handleAddList(data: Pick<Board, 'title'>) {
    if (!board) return;

    const newList = {
      id: String(Date.now()),
      title: data.title,
      boardId: board.id,
    };

    addList(newList);
    setShowForm(false);
  }

  function handleDragEndList({ active, over }: DragEndEvent) {
    if (!over || active.id === over.id) return;

    reorderLists(active.id.toString(), over.id.toString());
  }
}
