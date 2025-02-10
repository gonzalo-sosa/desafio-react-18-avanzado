import List, { ListId } from '@/models/List';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { useCallback } from 'react';
import { arrayMove } from '@dnd-kit/sortable';

interface State {
  lists: List[];
}

interface Actions {
  addList: (list: List) => void;
  updateList: (list: List) => void;
  deleteList: (listId: ListId) => void;
  reorderLists: (activeListId: ListId, overListId: ListId) => void;
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
      reorderLists: (activeListId, overListId) =>
        set((state) => {
          const activeListIndex = state.lists.findIndex(
            (l) => l.id === activeListId,
          );
          const overListIndex = state.lists.findIndex(
            (l) => l.id === overListId,
          );

          if (activeListIndex === -1 || overListIndex === -1) return state;

          return {
            lists: arrayMove(state.lists, activeListIndex, overListIndex),
          };
        }),
    })),
    {
      name: 'lists',
    },
  ),
);

export default useListsStore;

export const useList = (id: ListId) =>
  useListsStore(useCallback((s) => s.lists.find((l) => l.id === id), [id]));

export const useListsByBoard = (boardId: string) =>
  useListsStore(
    useCallback((s) => s.lists.filter((l) => l.boardId === boardId), [boardId]),
  );

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Lists Store', useListsStore);
}
