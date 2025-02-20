import Board from '@/models/Board';
import { screen } from '@testing-library/react';
import { mockAuthState } from '__mocks__/authentication';
import { db } from '__mocks__/db';
import { navigateTo } from '__tests__/utils';
import { create } from 'zustand';

vi.mock('react-router-dom', async (importOriginal) => {
  const originalModule = await importOriginal();
  return {
    ...(originalModule as typeof import('react-router-dom')),
    useParams: vi.fn(),
  };
});

vi.mock('@/store', async (importOriginal) => {
  const originalModule = await importOriginal();
  return {
    ...(originalModule as typeof import('@/store')),
    useBoardsStore: vi.fn(),
  };
});

vi.mock('@/store/boards.ts', async (importOriginal) => {
  const originalModule = await importOriginal();
  return {
    ...(originalModule as typeof import('@/store')),
    useBoard: vi.fn(),
  };
});

describe('BoardInfo', () => {
  let board: Board;
  let boardStore: ReturnType<typeof create>;

  const setupStore = () => {
    boardStore = create<{
      boards: Board[];
      addBoard: (board: Board) => void;
    }>((set) => ({
      boards: [],
      addBoard: (board) =>
        set((state) => ({ boards: [...state.boards, board] })),
    }));

    return boardStore;
  };

  beforeEach(() => {
    board = db.board.create();
    boardStore = setupStore();
    mockAuthState({
      getUser: () => ({
        id: '1',
        name: 'Test',
        email: 'test@email.com',
      }),
      login: vi.fn(),
      logout: vi.fn(),
    });
  });

  afterEach(() => {
    db.board.delete({ where: { id: { equals: board.id } } });
    boardStore.setState({ boards: [] });
  });

  const renderBoardInfo = async () => {
    const { useParams } = await import('react-router-dom');
    vi.mocked(useParams).mockReturnValue({ boardId: board.id });

    const { useBoardsStore } = await import('@/store');

    const { useBoard } = await import('@/store/boards');
    vi.mocked(useBoardsStore).mockReturnValue(boardStore);
    vi.mocked(useBoard).mockReturnValue(board);

    navigateTo(`/workspace/boards/${board.id}`);
  };

  it('should render board', async () => {
    await renderBoardInfo();

    expect(await screen.findByText(board.title)).toBeInTheDocument();
  });

  it('should render add list button', async () => {
    await renderBoardInfo();

    expect(screen.getByText(/añadir una lista/i)).toBeInTheDocument();
  });

  it.todo('should throw error when board not exists', async () => {});
});
