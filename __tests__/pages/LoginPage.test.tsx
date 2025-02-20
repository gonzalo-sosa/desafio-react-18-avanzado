import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { mockAuthState } from '__mocks__/authentication';
import { navigateTo } from '__tests__/utils';
import { useNavigate } from 'react-router-dom';

vi.mock('react-router-dom', async (importOriginal) => {
  const originalModule = await importOriginal();

  return {
    ...(originalModule as typeof import('react-router-dom')),
    Navigate: vi.fn().mockImplementation(() => <div>Mock Navigate</div>),
    useNavigate: vi.fn().mockReturnValue(vi.fn()),
  };
});

describe('Login', () => {
  beforeEach(() => {
    mockAuthState({
      getUser: () => null,
      login: vi.fn(),
      logout: vi.fn(),
    });
  });

  const renderLoginPage = () => {
    navigateTo('/login');

    return {
      ...LoginForm(),
    };
  };

  it('should render form fields', () => {
    const form = renderLoginPage();

    expect(form.getEmailField()).toBeInTheDocument();
    expect(form.getPasswordField()).toBeInTheDocument();
    expect(form.getSubmitButton()).toBeInTheDocument();
  });

  it('should redirect to root when user is authenticated', () => {
    mockAuthState({
      getUser: () => ({ id: '1', name: 'Test', email: 'test@email.com' }),
      login: () => {},
      logout: () => {},
    });
    renderLoginPage();

    expect(screen.getByText(/Mock Navigate/i)).toBeInTheDocument();
  });

  it('should redirect to root when form is submitted', async () => {
    const form = renderLoginPage();
    const navigate = useNavigate();

    await form.fillAndSubmit(form.validUser);

    expect(navigate).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/', { state: { from: 'login' } });
  });

  const LoginForm = () => {
    const onSubmit = vi.fn();

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
});
