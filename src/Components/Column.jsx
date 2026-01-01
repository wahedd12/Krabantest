import Task from "./Task";
import SortableItem from "./SortableItem";

export default function Column({ column, boardId }) {
  const tasks = column.tasks || [];

  return (
    <div className="w-72 flex-shrink-0 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex flex-col gap-4">
      <h3 className="text-sm font-semibold tracking-wide text-gray-500 dark:text-gray-300 mb-2">
        {column.name} ({tasks.length})
      </h3>

      <div className="flex flex-col gap-4">
        {tasks.map((task, index) => (
          <SortableItem
            key={task.id}
            id={task.id}
            columnId={column.id}
            index={index}
          >
            <Task task={task} boardId={boardId} />
          </SortableItem>
        ))}
      </div>
    </div>
  );
}
