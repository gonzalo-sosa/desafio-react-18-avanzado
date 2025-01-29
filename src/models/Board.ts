export default interface Board {
  id: string;
  title: string;
  description?: string;
}

export type BoardId = Board['id'];
