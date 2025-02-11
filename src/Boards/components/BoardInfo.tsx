import { Button, Flex, ListItem, Stack } from '@chakra-ui/react';
import { AddListForm } from '@/Lists';
import { LuPlus } from 'react-icons/lu';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useListsStore } from '@/store';
import { useBoard } from '@/store/boards';
import { useListsByBoard } from '@/store/lists';
import { DragEndEvent } from '@dnd-kit/core';
import Board from '@/models/Board';
import BoardNavBar from './BoardNavBar';
import ListCardContainer from '@/Lists/components/ListCardContainer';
import SorteableListCard from '@/Lists/components/SorteableListCard';
import '@/customSensors'; // Para inhabilitar drag and drop para botones o elementos con el atributo data-no-dnd

export default function BoardInfo() {
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
        <ListCardContainer
          lists={lists.map((l) => l.id)}
          onDragEndList={handleDragEndList}
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
