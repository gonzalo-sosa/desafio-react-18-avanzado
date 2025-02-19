import Popover from '@/components/Popover';
import Board, { BoardId } from '@/models/Board';
import { useBoardsStore } from '@/store';
import { ReactElement } from 'react';
import NewBoardForm from './NewBoardForm';

interface AddBoardProps {
  trigger: ReactElement;
  onAddBoard: (boardId: BoardId) => void;
}

export default function AddBoard({ trigger, onAddBoard }: AddBoardProps) {
  const addBoard = useBoardsStore((s) => s.addBoard);

  const handleAddBoard = (data: Omit<Board, 'id'>) => {
    const id = String(Date.now());
    addBoard({ ...data, id });
    onAddBoard(id);
  };

  return (
    <Popover
      popoverRootProps={{
        positioning: { placement: 'right' },
        modal: true,
      }}
      trigger={trigger}
    >
      <NewBoardForm onSubmit={handleAddBoard} />
    </Popover>
  );
}
