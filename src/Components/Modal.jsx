import { useState } from "react";
import { useBoard } from "../context/BoardContext";

export default function Modal({ isOpen, onClose, type, boardId, task }) {
  const { state, dispatch } = useBoard();

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [subtasks, setSubtasks] = useState(task?.subtasks || []);

  if (!isOpen) return null;

  const handleSaveTask = () => {
    if (!title.trim()) return;

    if (task) {
      // Update existing task
      dispatch({
        type: "UPDATE_TASK",
        payload: { boardId, taskId: task.id, title, description, subtasks },
      });
    } else {
      // Add new task
      dispatch({
        type: "ADD_TASK",
        payload: {
          boardId,
          columnId: "To Do", // default column for new task
          task: {
            id: Date.now().toString(),
            title,
            description,
            status: "To Do",
            subtasks,
          },
        },
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
        <h3 className="text-lg font-semibold mb-4">{task ? "Edit Task" : "Add Task"}</h3>

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-3 border rounded dark:bg-gray-700 dark:border-gray-600"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-3 border rounded dark:bg-gray-700 dark:border-gray-600"
        />

        <h4 className="font-medium mb-2">Subtasks</h4>
        {subtasks.map((s, i) => (
          <input
            key={s.id}
            type="text"
            value={s.title}
            onChange={(e) => {
              const newSubs = [...subtasks];
              newSubs[i].title = e.target.value;
              setSubtasks(newSubs);
            }}
            className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
        ))}

        <button
          onClick={() => setSubtasks([...subtasks, { id: Date.now().toString(), title: "", isCompleted: false }])}
          className="text-blue-500 mb-4"
        >
          + Add Subtask
        </button>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded border">
            Cancel
          </button>
          <button onClick={handleSaveTask} className="px-4 py-2 rounded bg-blue-500 text-white">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
