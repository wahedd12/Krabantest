import { useBoard } from "../context/BoardContext";

export default function Task({ task, boardId, columnId, index }) {
  const { dispatch } = useBoard();

  const completedCount = task.subtasks.filter(s => s.isCompleted).length;

  return (
    <div
      className="bg-white dark:bg-gray-700 p-4 rounded-md shadow-sm cursor-pointer"
    >
      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{task.title}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-300 mb-3">
        {completedCount} of {task.subtasks.length} subtasks
      </p>

      {/* Subtasks */}
      <div className="space-y-1 mb-3">
        {task.subtasks.map((sub) => (
          <label key={sub.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={sub.isCompleted}
              onChange={() =>
                dispatch({
                  type: "TOGGLE_SUBTASK",
                  payload: { boardId, taskId: task.id, subtaskId: sub.id },
                })
              }
            />
            <span className="text-sm text-gray-700 dark:text-gray-200">{sub.title}</span>
          </label>
        ))}
      </div>

      {/* Task status */}
      <select
        value={task.status}
        onChange={(e) =>
          dispatch({
            type: "UPDATE_TASK_STATUS",
            payload: { boardId, taskId: task.id, newStatus: e.target.value },
          })
        }
        className="w-full py-1 px-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-gray-100 text-sm"
      >
        <option value="To Do">To Do</option>
        <option value="Doing">Doing</option>
        <option value="Done">Done</option>
      </select>
    </div>
  );
}
