import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Task from "./Task";

export default function Column({ column, boardId }) {
  return (
    <div className="w-72 shrink-0">
      <h3 className="mb-4 text-xs uppercase tracking-wide
                     text-gray-500 dark:text-gray-400">
        {column.name} ({column.tasks.length})
      </h3>

      <SortableContext
        items={column.tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {column.tasks.map((task, index) => (
            <Task
              key={task.id}
              task={task}
              boardId={boardId}
              columnId={column.id}
              index={index}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
