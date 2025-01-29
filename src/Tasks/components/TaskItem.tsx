import Task from '@/models/Task';

type TaskItemProps = {
  task: Task;
};

export default function TaskItem({ task }: TaskItemProps) {
  return <>{task.title}</>;
}
