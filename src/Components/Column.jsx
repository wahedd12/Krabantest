import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Task from "./Task";

export default function Column({ column, boardId }) {
  console.log("COLUMN:", column);

  if (!column) return null;
  return (
    <div className="w-72 shrink-0">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
        {column.name} ({column.tasks.length})
      </h3>

      <SortableContext
        items={column.tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {column.tasks.map((task) => (
            <Task key={task.id} task={task} boardId={boardId} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
