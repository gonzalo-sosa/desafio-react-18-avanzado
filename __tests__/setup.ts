import '@testing-library/jest-dom/vitest';
import { mockAuthentication } from '__mocks__/authentication';
import localStorageMock from '__mocks__/localStorage';
import ResizeObserver from 'resize-observer-polyfill';
import { vi } from 'vitest';
import 'vitest-axe/extend-expect';

// ResizeObserver mock

vi.stubGlobal('ResizeObserver', ResizeObserver);
global.ResizeObserver = ResizeObserver;

// HTMLElement mock

window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();

// Mock matchMedia

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Authentication
mockAuthentication();

// localStorage mock

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

beforeEach(() => {
  window.localStorage.clear();
});

//#region  State management

vi.mock('zustand'); // (auto-mocking)

//#endregion State management
