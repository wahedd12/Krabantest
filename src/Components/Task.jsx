import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useBoard } from "../context/BoardContext";

export default function Task({ task, boardId, columnId, index }) {
  const { dispatch } = useBoard();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
      data: { columnId, index },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const completed = task.subtasks.filter((s) => s.isCompleted).length;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="rounded-lg bg-white dark:bg-gray-700
                 p-4 shadow hover:shadow-md cursor-pointer"
    >
      <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
        {task.title}
      </h4>
      <p className="mt-1 text-xs text-gray-500">
        {completed} of {task.subtasks.length} subtasks
      </p>
    </div>
  );
}
