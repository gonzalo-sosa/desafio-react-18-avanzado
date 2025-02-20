import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { mockAuthState } from '__mocks__/authentication';
import { navigateTo } from '__tests__/utils';
import { useNavigate } from 'react-router-dom';

describe('Register', () => {
  beforeAll(() => {
    vi.mock('react-router-dom', async (importOriginal) => {
      const originalModule = await importOriginal();

      return {
        ...(originalModule as typeof import('react-router-dom')),
        Navigate: vi.fn().mockImplementation(() => <div>Mock Navigate</div>),
        useNavigate: vi.fn().mockReturnValue(vi.fn()),
      };
    });
  });

  beforeEach(() => {
    mockAuthState({
      getUser: () => null,
      login: vi.fn(),
      logout: vi.fn(),
    });
  });

  const renderRegisterPage = () => {
    navigateTo('/register');

    return {
      ...RegisterForm(),
    };
  };

  it('should render form fields', () => {
    const form = renderRegisterPage();

    expect(form.getEmailField()).toBeInTheDocument();
    form.getPasswordsField().forEach((input) => {
      expect(input).toBeInTheDocument();
    });
    expect(form.getSubmitButton()).toBeInTheDocument();
  });

  it('should redirect to root when user is authenticated', () => {
    mockAuthState({
      getUser: () => ({ id: '1', name: 'Test', email: 'test@email.com' }),
      login: () => {},
      logout: () => {},
    });
    renderRegisterPage();

    expect(screen.getByText(/Mock Navigate/i)).toBeInTheDocument();
  });

  it('should redirect to root when form is submitted', async () => {
    const form = renderRegisterPage();
    const navigate = useNavigate();

    await form.fillAndSubmit(form.validUser);

    expect(navigate).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/', { state: { from: 'register' } });
  });

  const RegisterForm = () => {
    const onSubmit = vi.fn();

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
});
