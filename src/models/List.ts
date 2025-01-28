import { BoardId } from './Board';

export default interface List {
  id: string;
  title: string;
  boardId: BoardId;
}

export type ListId = List['id'];
