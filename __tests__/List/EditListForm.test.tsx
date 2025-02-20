import EditListForm from '@/Lists/components/EditListForm';
import List from '@/models/List';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { db } from '__mocks__/db';
import AllProviders from '__tests__/AllProviders';

describe('EditListForm', () => {
  let list: List;

  beforeAll(() => {
    list = db.list.create();
  });

  afterAll(() => {
    db.list.delete({ where: { id: { equals: list.id } } });
  });

  const renderEditListForm = () => {
    const onSubmit = vi.fn();

    render(<EditListForm onSubmit={onSubmit} />, { wrapper: AllProviders });

    const getTitleField = () =>
      screen.getByRole('textbox', { name: /título/i });

    const getSubmitButton = () =>
      screen.getByRole('button', { name: /guardar/i });

    const fill = async (list: Partial<List>) => {
      const user = userEvent.setup();
      if (list.title) await user.type(getTitleField(), list.title);

      await user.click(getSubmitButton());
    };

    const expectErrorToBeInTheDocument = (errorMessage: RegExp) => {
      const error = screen.getByTestId('field-error');
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent(errorMessage);
    };

    return {
      onSubmit,
      getTitleField,
      getSubmitButton,
      fill,
      expectErrorToBeInTheDocument,
    };
  };

  it('should render form fields', () => {
    const form = renderEditListForm();

    expect(form.getTitleField()).toBeInTheDocument();
    expect(form.getSubmitButton()).toBeInTheDocument();
  });

  it.each([
    {
      scenario: 'missing',
      erroMessage: /1/,
    },
    {
      scenario: 'greater than 100',
      title: 'a'.repeat(101),
      erroMessage: /100/,
    },
  ])(
    'should render error message when title is $scenario',
    async ({ title, erroMessage }) => {
      const form = renderEditListForm();

      await form.fill({ ...list, title });

      form.expectErrorToBeInTheDocument(erroMessage);
    },
  );

  it('should disable submit button upon submission', async () => {
    const form = renderEditListForm();
    form.onSubmit.mockResolvedValue(new Promise(() => {}));

    await form.fill(list);

    expect(form.getSubmitButton()).toBeDisabled();
  });

  it('should re-enable submit button after submission', async () => {
    const form = renderEditListForm();

    await form.fill(list);

    expect(form.getSubmitButton()).not.toBeDisabled();
  });
});
