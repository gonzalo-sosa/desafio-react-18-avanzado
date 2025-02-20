import AddTask from '@/Tasks/components/AddTask';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AllProviders from '__tests__/AllProviders';

describe('AddTask', () => {
  it('should render add task button', () => {
    render(<AddTask listId="" />, { wrapper: AllProviders });

    expect(
      screen.getByRole('button', { name: /tarjeta/i }),
    ).toBeInTheDocument();
  });

  it('should render add task form when user clicks add task button', async () => {
    render(<AddTask listId="" />, { wrapper: AllProviders });

    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /tarjeta/i }));

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render add task button when user blurs add task form', async () => {
    render(<AddTask listId="" />, { wrapper: AllProviders });

    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /tarjeta/i }));
    await user.tab();

    expect(
      screen.getByRole('button', { name: /tarjeta/i }),
    ).toBeInTheDocument();
  });
});
