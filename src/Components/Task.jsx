import { useBoard } from "../context/BoardContext";

export default function Task({ task, boardId }) {
  const { dispatch } = useBoard();
  const completed = task.subtasks?.filter((s) => s.isCompleted).length || 0;

  return (
    <div className="bg-white dark:bg-gray-600 p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
      <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">{task.title}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-200 mb-2">
        {completed} of {task.subtasks?.length || 0} subtasks
      </p>

      <select
        className="text-sm w-full p-1 rounded border border-gray-300 dark:border-gray-500 bg-gray-100 dark:bg-gray-700"
        value={task.status}
        onChange={(e) =>
          dispatch({
            type: "UPDATE_TASK_STATUS",
            payload: {
              boardId,
              taskId: task.id,
              newStatus: e.target.value,
            },
          })
        }
      >
        <option value="To Do">To Do</option>
        <option value="Doing">Doing</option>
        <option value="Done">Done</option>
      </select>
    </div>
  );
}
