import { ListCard } from '@/Lists';
import List from '@/models/List';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { db } from '__mocks__/db';
import AllProviders from '__tests__/AllProviders';

describe('ListCard', () => {
  let list: List;

  beforeAll(() => {
    list = db.list.create();
  });

  afterAll(() => {
    db.list.delete({ where: { id: { equals: list.id } } });
  });

  const renderListCard = () => {
    render(<ListCard list={list} />, { wrapper: AllProviders });

    const getTitle = () => screen.getByLabelText('edit');
    const getEditableInput = () => screen.getByLabelText('editable input');
    const getTasksList = () => screen.getByRole('list');
    const getEditButton = () => screen.getByLabelText(/editar lista/i);

    return {
      getTitle,
      getEditableInput,
      getTasksList,
      getEditButton,
    };
  };

  it('should render list title, edit button and task list', () => {
    const listCard = renderListCard();

    expect(listCard.getTitle()).toBeInTheDocument();
    expect(listCard.getEditableInput()).toBeInTheDocument();
    expect(listCard.getTasksList()).toBeInTheDocument();
    expect(listCard.getEditButton()).toBeInTheDocument();
  });

  it.todo(
    'should change list title when user edits it in edit input',
    async () => {
      const listCard = renderListCard();

      const user = userEvent.setup();
      await user.type(listCard.getEditableInput(), 'nueva lista');

      expect(screen.getByText('nueva lista')).toBeInTheDocument();
    },
  );
});
