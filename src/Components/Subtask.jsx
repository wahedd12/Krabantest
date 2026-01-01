// src/Components/Subtask.jsx
import { useBoard } from "./context/BoardContext";

export default function Subtask({ subtask, taskId, boardId }) {
  const { dispatch } = useBoard();

  return (
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={subtask.isCompleted}
        onChange={() =>
          dispatch({
            type: "TOGGLE_SUBTASK",
            payload: { boardId, taskId, subtaskId: subtask.id },
          })
        }
        className="w-4 h-4"
      />
      <span className={subtask.isCompleted ? "line-through text-gray-400 dark:text-gray-300" : "text-gray-800 dark:text-gray-100"}>
        {subtask.title}
      </span>
    </label>
  );
}
