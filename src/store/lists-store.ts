import List, { ListId } from '@/models/List';
import { create } from 'zustand';

interface State {
  lists: List[];
  addList: (list: List) => void;
  updateList: (list: List) => void;
  deleteList: (listId: ListId) => void;
}

const useListsStore = create<State>((set) => ({
  lists: [],
  addList: (list) => set((state) => ({ lists: [list, ...state.lists] })),
  updateList: (list) =>
    set((state) => ({
      // TODO: mejorar lógica para evitar que recorra todo el array
      lists: state.lists.map((l) => (l.id === list.id ? list : l)),
    })),
  deleteList: (listId) =>
    set((state) => ({
      lists: state.lists.filter((l) => {
        return l.id !== listId;
      }),
    })),
}));

export default useListsStore;
