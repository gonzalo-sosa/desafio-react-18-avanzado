import LoginForm from '@/components/LoginForm';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import AllProviders from '__tests__/AllProviders';

describe('Login', () => {
  const renderLoginForm = () => {
    const onSubmit = vi.fn();

    render(<LoginForm onSubmit={onSubmit} />, { wrapper: AllProviders });

    const getEmailField = () => screen.getByRole('textbox', { name: /email/i });
    const getPasswordField = () => screen.getByTestId('password-input');
    const getSubmitButton = () =>
      screen.getByRole('button', { name: /sesión/i });

    const validUser = { email: 'test@example.com', password: '12345678' };

    const fillWithTab = async (user: { email?: string; password?: string }) => {
      const userE = userEvent.setup();
      if (user.email) await userE.type(getEmailField(), user.email);
      await userE.tab();
      if (user.password) await userE.type(getPasswordField(), user.password);
      await userE.tab();
    };

    const fillAndSubmit = async (user: {
      email?: string;
      password?: string;
    }) => {
      const userE = userEvent.setup();
      if (user.email) await userE.type(getEmailField(), user.email);
      if (user.password) await userE.type(getPasswordField(), user.password);
      await userE.click(getSubmitButton());
    };

    const expectErrorToBeInTheDocument = (errorMessage: RegExp) => {
      const error = screen.getByTestId('field-error');
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent(errorMessage);
    };

    return {
      getEmailField,
      getPasswordField,
      getSubmitButton,
      fillWithTab,
      fillAndSubmit,
      validUser,
      onSubmit,
      expectErrorToBeInTheDocument,
    };
  };

  it('should render form fields', () => {
    const form = renderLoginForm();

    expect(form.getEmailField()).toBeInTheDocument();
    expect(form.getPasswordField()).toBeInTheDocument();
    expect(form.getSubmitButton()).toBeInTheDocument();
  });

  it('should put focus on the email field', () => {
    const form = renderLoginForm();

    expect(form.getEmailField()).toHaveFocus();
  });

  it.each([
    {
      scenario: 'missing',
      errorMessage: /válido/i,
    },
    {
      scenario: 'invalid',
      email: 'a'.repeat(10),
      errorMessage: /válido/,
    },
  ])(
    'should show error message when email is $scenario',
    async ({ email, errorMessage }) => {
      const form = renderLoginForm();

      await form.fillWithTab({ ...form.validUser, email });

      form.expectErrorToBeInTheDocument(errorMessage);
    },
  );

  it.each([
    {
      scenario: 'missing',
      errorMessage: /8/i,
    },
    {
      scenario: 'less than 8',
      password: 'a'.repeat(7),
      errorMessage: /8/,
    },
  ])(
    'should show error message when password is $scenario',
    async ({ password, errorMessage }) => {
      const form = renderLoginForm();

      await form.fillWithTab({ ...form.validUser, password });

      form.expectErrorToBeInTheDocument(errorMessage);
    },
  );

  it('should call onSubmit when form is submitted', async () => {
    const form = renderLoginForm();

    await form.fillAndSubmit(form.validUser);

    expect(form.onSubmit).toHaveBeenCalled();
  });
});
