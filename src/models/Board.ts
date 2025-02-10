export default interface Board {
  id: string;
  title: string;
  visibility: string[];
  description?: string;
}

export type BoardId = Board['id'];
