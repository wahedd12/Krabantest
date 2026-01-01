import { useBoard } from "../context/BoardContext";

export default function Subtask({ subtask, taskId, boardId }) {
  const { dispatch } = useBoard();

  return (
    <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
      <input
        type="checkbox"
        checked={subtask.isCompleted}
        onChange={() =>
          dispatch({
            type: "TOGGLE_SUBTASK",
            payload: { boardId, taskId, subtaskId: subtask.id },
          })
        }
      />
      {subtask.title}
    </label>
  );
}
