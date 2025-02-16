import '@testing-library/jest-dom/vitest';
import ResizeObserver from 'resize-observer-polyfill';
import { JSDOM } from 'jsdom';
import { vi } from 'vitest';
import 'vitest-axe/extend-expect';
import localStorageMock from '__mocks__/localStorage';

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

// #region Chakra UI

const { window: jsdomWindow } = new JSDOM();

// IntersectionObserver mock
const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}));
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);
jsdomWindow['IntersectionObserver'] = IntersectionObserverMock;

// Scroll Methods mock
jsdomWindow.Element.prototype.scrollTo = () => {};
jsdomWindow.Element.prototype.scrollIntoView = () => {};

// requestAnimationFrame mock
jsdomWindow.requestAnimationFrame = (cb: FrameRequestCallback) =>
  setTimeout(cb, 1000 / 60);

// URL object mock
jsdomWindow.URL.createObjectURL = () => 'https://i.pravatar.cc/300';
jsdomWindow.URL.revokeObjectURL = () => {};

// navigator mock
Object.defineProperty(jsdomWindow, 'navigator', {
  value: {
    clipboard: {
      writeText: vi.fn(),
    },
  },
});

// Override globalThis
Object.assign(global, { window, document: jsdomWindow.document });

// #endregion Chakra UI
