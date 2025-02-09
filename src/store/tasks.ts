import Task, { TaskId } from '@/models/Task';
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
    })),
    {
      name: 'tasks',
    },
  ),
);

export default useTasksStore;
