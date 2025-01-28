import { ListId } from './List';

export default interface Task {
  id: string;
  title: string;
  description: string;
  listId: ListId;
}

export type TaskId = Task['id'];
