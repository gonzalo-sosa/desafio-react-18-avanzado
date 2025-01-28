import Board, { BoardId } from '@/models/Board';
import { create } from 'zustand';

interface State {
  boards: Board[];
  addBoard: (board: Board) => void;
  updateBoard: (board: Board) => void;
  deleteBoard: (boardId: BoardId) => void;
}

const useBoardsStore = create<State>((set) => ({
  boards: [],
  addBoard: (board) => set((state) => ({ boards: [board, ...state.boards] })),
  updateBoard: (board) =>
    set((state) => ({
      // TODO: mejorar lógica para evitar que recorra todo el array
      boards: state.boards.map((b) => (b.id === board.id ? board : b)),
    })),
  deleteBoard: (boardId) =>
    set((state) => ({
      boards: state.boards.filter((b) => {
        return b.id !== boardId;
      }),
    })),
}));

export default useBoardsStore;
