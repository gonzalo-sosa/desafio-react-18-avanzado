import { BoardId } from '@/models/Board';
import List from '@/models/List';
import { useListsStore } from '@/store';
import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import AddListForm from './AddListForm';

interface AddListProps {
  boardId: BoardId;
  hasLists: boolean;
}

export default function AddList({ boardId, hasLists }: AddListProps) {
  const addList = useListsStore((s) => s.addList);

  const [showForm, setShowForm] = useState(false);

  function handleAddList(data: Pick<List, 'title'>) {
    const newList = {
      id: String(Date.now()),
      title: data.title,
      boardId,
    };

    addList(newList);
  }

  return showForm ? (
    <AddListForm onSubmit={handleAddList} onBlur={() => setShowForm(false)} />
  ) : (
    <Button onClick={() => setShowForm(true)} maxW={'280px'} rounded={'2xl'}>
      <LuPlus size={'xs'} />
      {hasLists ? 'Añade otra lista' : 'Añadir una lista'}
    </Button>
  );
}
