import { ListId } from '@/models/List';
import Task, { TaskId } from '@/models/Task';
import { arrayMove } from '@dnd-kit/sortable';
import { useCallback } from 'react';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface State {
  tasks: Task[];
}

interface Actions {
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: TaskId) => void;
  reorderTasks: (
    activeTaskId: TaskId,
    overTaskId: TaskId,
    sourceListId: ListId,
    destinationListId: ListId,
  ) => void;
}

const useTasksStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      tasks: [],
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      updateTask: (task) =>
        set((state) => {
          const taskToUpdate = state.tasks.find((t) => t.id === task.id);
          if (!taskToUpdate) return;

          Object.assign(taskToUpdate, task);
        }),
      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => {
            return t.id !== taskId;
          }),
        })),
      reorderTasks: (
        activeTaskId: TaskId,
        overTaskId: TaskId,
        sourceListId: ListId,
        destinationListId: ListId,
      ) => {
        if (sourceListId === destinationListId)
          set((state) => {
            const activeTaskIndex = state.tasks.findIndex(
              (t) => t.id === activeTaskId,
            );
            const overTaskIndex = state.tasks.findIndex(
              (t) => t.id === overTaskId,
            );

            if (activeTaskIndex === -1 || overTaskIndex === -1) return state;

            return {
              tasks: arrayMove(state.tasks, activeTaskIndex, overTaskIndex),
            };
          });
        else
          set((state) => {
            const taskToMove = state.tasks.find((t) => t.id === activeTaskId);
            if (!taskToMove) return state;

            // Actualiza el listId de la tarea para que pertenezca a la nueva lista
            taskToMove.listId = destinationListId;
          });
      },
    })),
    {
      name: 'tasks',
    },
  ),
);

export default useTasksStore;

export const useTask = (id: TaskId) =>
  useTasksStore(useCallback((s) => s.tasks.find((t) => t.id === id), [id]));

export const useTasksByList = (listId: ListId) =>
  useTasksStore(
    useCallback((s) => s.tasks.filter((t) => t.listId === listId), [listId]),
  );

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Tasks Store', useTasksStore);
}
