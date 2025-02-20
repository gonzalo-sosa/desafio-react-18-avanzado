import Task from '@/models/Task';
import { TaskItem } from '@/Tasks';
import { List } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { db } from '__mocks__/db';
import AllProviders from '__tests__/AllProviders';

describe('TaskItem', () => {
  let task: Task;

  beforeAll(() => {
    task = db.task.create();
  });

  afterAll(() => {
    db.task.delete({ where: { id: { equals: task.id } } });
  });

  const renderTaskItem = () => {
    render(
      <List.Root>
        <TaskItem task={task} popoverProps={{}} />
      </List.Root>,
      {
        wrapper: AllProviders,
      },
    );

    const getTitle = () => screen.getByText(task.title);
    const getEditButton = () => screen.getByRole('button');

    return {
      getTitle,
      getEditButton,
    };
  };

  it('should render task title with edit button', () => {
    const { getTitle, getEditButton } = renderTaskItem();

    expect(getTitle()).toBeInTheDocument();
    expect(getEditButton()).toBeInTheDocument();
  });
});
