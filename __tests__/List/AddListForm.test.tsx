import { AddListForm } from '@/Lists';
import List from '@/models/List';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { db } from '__mocks__/db';
import AllProviders from '__tests__/AllProviders';

describe('AddListForm', () => {
  let list: List;

  beforeAll(() => {
    list = db.list.create();
  });

  afterAll(() => {
    db.list.delete({ where: { id: { equals: list.id } } });
  });

  const renderAddListForm = () => {
    const onSubmit = vi.fn();
    const onBlur = vi.fn();

    render(<AddListForm onSubmit={onSubmit} onBlur={onBlur} />, {
      wrapper: AllProviders,
    });

    const getTitleField = () => screen.getByPlaceholderText(/lista/i);

    const fill = async (list: Partial<List>) => {
      const user = userEvent.setup();
      if (list.title) await user.type(getTitleField(), list.title + '{enter}');
    };

    const expectErrorToBeInTheDocument = (errorMessage: RegExp) => {
      const error = screen.getByTestId('field-error');
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent(errorMessage);
    };

    return {
      onSubmit,
      onBlur,
      getTitleField,
      fill,
      expectErrorToBeInTheDocument,
    };
  };

  it('should render input field', () => {
    const { getTitleField } = renderAddListForm();

    expect(getTitleField()).toBeInTheDocument();
  });

  it('should call onSubmit with the correct data', async () => {
    const form = renderAddListForm();

    await form.fill(list);

    expect(form.onSubmit).toHaveBeenCalledWith({ title: list.title });
  });

  it('should call onBlur', async () => {
    const form = renderAddListForm();
    const user = userEvent.setup();

    await user.tab();

    expect(form.onBlur).toHaveBeenCalled();
  });

  it('should reset input field after submit', async () => {
    const form = renderAddListForm();

    await form.fill(list);

    expect(form.getTitleField()).toHaveTextContent('');
  });
});
