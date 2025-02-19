import { NewBoardForm } from '@/Boards';
import Board from '@/models/Board';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { db } from '__mocks__/db';
import AllProviders from '__tests__/AllProviders';

describe('NewBoardForm', () => {
  let board: Board;

  beforeAll(() => {
    board = db.board.create();
  });

  afterAll(() => {
    db.board.delete({
      where: { id: { equals: board.id } },
    });
  });

  const renderNewBoardForm = () => {
    const onSubmit = vi.fn();

    render(<NewBoardForm onSubmit={onSubmit} />, { wrapper: AllProviders });

    const getTitleField = () =>
      screen.getByRole('textbox', { name: /título de tablero/i });
    const getVisibilityField = () =>
      screen.getByRole('combobox', { name: /visibilidad/i });
    const getSubmitButton = () =>
      screen.getByRole('button', { name: /crear/i });

    const fill = async (board: Partial<Omit<Board, 'id'>>) => {
      const user = userEvent.setup();
      if (board.title) await user.type(getTitleField(), board.title);
      if (board.visibility) await user.click(getVisibilityField());
      const options = screen.getAllByRole('option');
      await user.click(options[0]);

      await user.click(getSubmitButton());
    };

    const expectErrorToBeInTheDocument = (errorMessage: RegExp) => {
      const error = screen.getByTestId('field-error');
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent(errorMessage);
    };

    return {
      getTitleField,
      getVisibilityField,
      getSubmitButton,
      onSubmit,
      fill,
      expectErrorToBeInTheDocument,
    };
  };

  it('should render form fields', () => {
    const form = renderNewBoardForm();

    expect(form.getTitleField()).toBeInTheDocument();
    expect(form.getVisibilityField()).toBeInTheDocument();
    expect(form.getSubmitButton()).toBeInTheDocument();
  });

  it('should put focus on the title field', () => {
    const { getTitleField } = renderNewBoardForm();

    expect(getTitleField()).toHaveFocus();
  });

  // Probar cada caso de validación

  it.each([
    {
      scenario: 'missing',
      errorMessage: /3/i,
    },
    {
      scenario: 'whitespace',
      title: ' ',
      errorMessage: /3/i,
    },
    {
      scenario: 'invalid characters',
      title: '#'.repeat(3),
      errorMessage: /letras y números/i,
    },
    {
      scenario: 'less than 3',
      title: 'a'.repeat(2),
      errorMessage: /3/,
    },
    {
      scenario: 'greater than 100',
      title: 'a'.repeat(101),
      errorMessage: /100/,
    },
  ])(
    'should display an error if name is $scenario',
    async ({ title, errorMessage }) => {
      const form = renderNewBoardForm();

      await form.fill({ ...board, title });

      form.expectErrorToBeInTheDocument(errorMessage);
    },
  );

  it('should call onSubmit with the correct data', async () => {
    const { fill, onSubmit } = renderNewBoardForm();

    await fill(board);

    console.log(onSubmit.mock.calls);
  });

  it('should disable the submit button upon submission', async () => {
    const { fill, onSubmit, getSubmitButton } = renderNewBoardForm();
    onSubmit.mockReturnValue(new Promise(() => {}));

    await fill(board);

    expect(getSubmitButton()).toBeDisabled();
  });

  it('should re-enable the submit button after submission', async () => {
    const { fill, getSubmitButton } = renderNewBoardForm();

    await fill(board);

    expect(getSubmitButton()).not.toBeDisabled();
  });

  it.todo('should list the correct visibilities');
});
