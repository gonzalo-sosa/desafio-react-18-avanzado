import Board, { BoardId } from '@/models/Board';
import { useCallback } from 'react';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface State {
  boards: Board[];
}

interface Actions {
  addBoard: (board: Board) => void;
  updateBoard: (board: Board) => void;
  deleteBoard: (boardId: BoardId) => void;
}

const useBoardsStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      boards: [],
      addBoard: (board) =>
        set((state) => ({ boards: [...state.boards, board] })),
      updateBoard: (board) => {
        set((state) => {
          const boardToUpdate = state.boards.find((b) => b.id === board.id);
          if (!boardToUpdate) return;
          Object.assign(boardToUpdate, board);
        });
      },
      deleteBoard: (boardId) =>
        set((state) => ({
          boards: state.boards.filter((b) => b.id !== boardId),
        })),
    })),
    {
      name: 'boards',
    },
  ),
);

export default useBoardsStore;

export const useBoard = (id: BoardId) =>
  useBoardsStore(useCallback((s) => s.boards.find((b) => b.id === id), [id]));

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Boards Store', useBoardsStore);
}
