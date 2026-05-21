export type TaskDocument = {
  id: string;
  created_at: number;
  task: string;
  is_completed: boolean;
};

export type TaskComponentProps = {
  item: TaskDocument;
  uid: string;
  onDeletePress: (id: string) => void;
  onEditPress: (id: string) => void;
};
