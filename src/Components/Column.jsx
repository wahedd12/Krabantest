import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import Task from "./Task";

export default function Column({ column, boardId }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 w-80 flex-shrink-0">
      <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4">
        {column.name}
      </h3>

      <SortableContext
        items={column.tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {column.tasks.map((task, index) => (
            <SortableItem
              key={task.id}
              id={task.id}
              columnId={column.id}
              index={index}
            >
              <Task
                task={task}
                boardId={boardId}
                columnId={column.id}
                index={index}
              />
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
