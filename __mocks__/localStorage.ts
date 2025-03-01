// Mock localStorage
const localStorageMock = (function () {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

export default localStorageMock;
