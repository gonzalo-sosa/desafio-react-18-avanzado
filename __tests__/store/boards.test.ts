import useBoardsStore from '../../src/store/boards';

describe('Boards Store', () => {
  const board = {
    id: '1',
    title: 'Test Board',
    lists: [],
  };
  beforeEach(() => {
    useBoardsStore.getState().boards = [];
  });

  it('should add a board', () => {
    const addBoard = useBoardsStore((s) => s.addBoard);

    addBoard(board);

    const boards = useBoardsStore.getState().boards;
    expect(boards.length).toBe(1);
    expect(boards).toContainEqual(board);
  });
  it('should update a board', () => {
    const [addBoard, updateBoard] = useBoardsStore((s) => [
      s.addBoard,
      s.updateBoard,
    ]);
    const boardUpdated = { ...board, title: 'Updated Board' };

    addBoard(board);
    updateBoard(boardUpdated);

    const boards = useBoardsStore.getState().boards;
    expect(boards.length).toBe(1);
    expect(boards).toContainEqual(boardUpdated);
  });
  it('should delete a board', () => {
    const [addBoard, deleteBoard] = useBoardsStore((s) => [
      s.addBoard,
      s.deleteBoard,
    ]);

    addBoard(board);
    deleteBoard(board.id);

    const boards = useBoardsStore.getState().boards;
    expect(boards.length).toBe(0);
  });
});
