import { AddTaskForm } from '@/Tasks';
import Task from '@/models/Task';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { db } from '__mocks__/db';
import AllProviders from '__tests__/AllProviders';

describe('AddTaskForm', () => {
  let task: Task;

  beforeAll(() => {
    task = db.task.create();
  });

  afterAll(() => {
    db.task.delete({ where: { id: { equals: task.id } } });
  });

  const renderAddTaskForm = () => {
    const onSubmit = vi.fn();
    const onBlur = vi.fn();

    render(<AddTaskForm onSubmit={onSubmit} onBlur={onBlur} />, {
      wrapper: AllProviders,
    });

    const getTitleField = () => screen.getByPlaceholderText(/título/i);

    const fill = async (Task: Partial<Task>) => {
      const user = userEvent.setup();
      if (Task.title) await user.type(getTitleField(), Task.title + '{enter}');
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
    const { getTitleField } = renderAddTaskForm();

    expect(getTitleField()).toBeInTheDocument();
  });

  it('should call onSubmit with the correct data', async () => {
    const form = renderAddTaskForm();

    await form.fill(task);

    expect(form.onSubmit).toHaveBeenCalledWith({ title: task.title });
  });

  it('should call onBlur', async () => {
    const form = renderAddTaskForm();
    const user = userEvent.setup();

    await user.tab();

    expect(form.onBlur).toHaveBeenCalled();
  });

  it('should reset input field after submit', async () => {
    const form = renderAddTaskForm();

    await form.fill(task);

    expect(form.getTitleField()).toHaveTextContent('');
  });
});
