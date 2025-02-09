import List, { ListId } from '@/models/List';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface State {
  lists: List[];
}

interface Actions {
  addList: (list: List) => void;
  updateList: (list: List) => void;
  deleteList: (listId: ListId) => void;
}

const useListsStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      lists: [],
      addList: (list) => set((state) => ({ lists: [...state.lists, list] })),
      updateList: (list) =>
        set((state) => {
          const listToUpdate = state.lists.find((l) => l.id === list.id);
          if (!listToUpdate) return;

          Object.assign(listToUpdate, list);
        }),
      deleteList: (listId) =>
        set((state) => ({
          lists: state.lists.filter((l) => l.id !== listId),
        })),
    })),
    {
      name: 'lists',
    },
  ),
);

export default useListsStore;
