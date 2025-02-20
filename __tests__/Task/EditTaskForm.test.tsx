import { EditTaskForm } from '@/Tasks';
import Task from '@/models/Task';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { db } from '__mocks__/db';
import AllProviders from '__tests__/AllProviders';

describe('EditTaskForm', () => {
  let task: Task;

  beforeAll(() => {
    task = db.task.create();
  });

  afterAll(() => {
    db.task.delete({ where: { id: { equals: task.id } } });
  });

  const renderEditTaskForm = () => {
    const onSubmit = vi.fn();

    render(<EditTaskForm onSubmit={onSubmit} />, {
      wrapper: AllProviders,
    });

    const getTitleField = () =>
      screen.getByRole('textbox', { name: /título/i });

    const getSubmitButton = () =>
      screen.getByRole('button', { name: /guardar/i });

    const fill = async (Task: Partial<Task>) => {
      const user = userEvent.setup();
      if (Task.title) await user.type(getTitleField(), Task.title);

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

  it('should render input field', () => {
    const { getTitleField, getSubmitButton } = renderEditTaskForm();

    expect(getTitleField()).toBeInTheDocument();
    expect(getSubmitButton()).toBeInTheDocument();
  });

  it.each([
    {
      scenario: 'missing',
      errorMessage: /1/i,
    },
    {
      scenario: 'greater than 100',
      title: 'a'.repeat(101),
      errorMessage: /100/,
    },
  ])(
    'should render error message when title is $scenario',
    async ({ title, errorMessage }) => {
      const form = renderEditTaskForm();

      await form.fill({ ...task, title });

      form.expectErrorToBeInTheDocument(errorMessage);
    },
  );

  it.todo('should call onSubmit with the correct data', async () => {
    const form = renderEditTaskForm();

    await form.fill(task);

    expect(form.onSubmit).toHaveBeenCalledWith({ title: task.title });
  });
});
