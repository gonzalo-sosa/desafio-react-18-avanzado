import RegisterForm from '@/components/RegisterForm';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import AllProviders from '__tests__/AllProviders';

describe('Register', () => {
  const renderRegisterForm = () => {
    const onSubmit = vi.fn();

    render(<RegisterForm onSubmit={onSubmit} />, { wrapper: AllProviders });

    const getEmailField = () => screen.getByRole('textbox', { name: /email/i });
    const getPasswordsField = () => screen.getAllByTestId('password-input');
    const getSubmitButton = () =>
      screen.getByRole('button', { name: /cuenta/i });

    const validUser = {
      email: 'test@example.com',
      password: '12345678',
      confirmPassword: '12345678',
    };

    const fillWithTab = async (user: {
      email?: string;
      password?: string;
      confirmPassword?: string;
    }) => {
      const userE = userEvent.setup();
      if (user.email) await userE.type(getEmailField(), user.email);
      await userE.tab();
      if (user.password)
        await userE.type(getPasswordsField()[0], user.password);
      await userE.tab();
      if (user.confirmPassword)
        await userE.type(getPasswordsField()[1], user.confirmPassword);
      await userE.tab();
    };

    const fillAndSubmit = async (user: {
      email?: string;
      password?: string;
      confirmPassword?: string;
    }) => {
      const userE = userEvent.setup();
      if (user.email) await userE.type(getEmailField(), user.email);
      if (user.password)
        await userE.type(getPasswordsField()[0], user.password);
      if (user.confirmPassword)
        await userE.type(getPasswordsField()[1], user.confirmPassword);

      await userE.click(getSubmitButton());
    };

    const expectErrorToBeInTheDocument = (errorMessage: RegExp) => {
      const error = screen.getByTestId('field-error');
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent(errorMessage);
    };

    return {
      getEmailField,
      getPasswordsField,
      getSubmitButton,
      fillWithTab,
      fillAndSubmit,
      validUser,
      onSubmit,
      expectErrorToBeInTheDocument,
    };
  };

  it('should render form fields', () => {
    const form = renderRegisterForm();

    expect(form.getEmailField()).toBeInTheDocument();
    form.getPasswordsField().forEach((input) => {
      expect(input).toBeInTheDocument();
    });
    expect(form.getSubmitButton()).toBeInTheDocument();
  });

  it('should put focus on the email field', () => {
    const form = renderRegisterForm();

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
      const form = renderRegisterForm();

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
      const form = renderRegisterForm();

      await form.fillWithTab({ ...form.validUser, password });

      form.expectErrorToBeInTheDocument(errorMessage);
    },
  );

  it('should show error message when passwords do not match', async () => {
    const data = {
      password: 'a'.repeat(8),
      confirmPassword: 'b'.repeat(8),
    };
    const form = renderRegisterForm();

    await form.fillAndSubmit({ ...form.validUser, ...data });

    form.expectErrorToBeInTheDocument(/coinciden/i);
  });

  it('should call onSubmit when form is submitted', async () => {
    const form = renderRegisterForm();

    await form.fillAndSubmit(form.validUser);

    expect(form.onSubmit).toHaveBeenCalled();
  });
});
