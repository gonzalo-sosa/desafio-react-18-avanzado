import Task, { TaskId } from '@/models/Task';
import { create } from 'zustand';

interface State {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (taskId: TaskId) => void;
}

const useTasksStore = create<State>((set) => ({
  tasks: [],
  addTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),
  updateTask: (task) =>
    set((state) => ({
      // TODO: mejorar lógica para evitar que recorra todo el array
      tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    })),
  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => {
        return t.id !== taskId;
      }),
    })),
}));

export default useTasksStore;
