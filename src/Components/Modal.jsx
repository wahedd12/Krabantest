import { useState } from "react";
import { useBoard } from "../context/BoardContext";

export default function Modal({ isOpen, onClose, boardId, columnId, task }) {
  const { dispatch } = useBoard();
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [subtasks, setSubtasks] = useState(task?.subtasks || []);

  if (!isOpen) return null;

  const handleAddSubtask = () => setSubtasks([...subtasks, { id: Date.now().toString(), title: "", isCompleted: false }]);

  const handleSubtaskChange = (index, value) => {
    const newSubs = [...subtasks];
    newSubs[index].title = value;
    setSubtasks(newSubs);
  };

  const handleSave = () => {
    if (task) {
      dispatch({
        type: "UPDATE_TASK",
        payload: { boardId, taskId: task.id, title, description, subtasks },
      });
    } else {
      dispatch({
        type: "ADD_TASK",
        payload: { boardId, columnId, task: { id: Date.now().toString(), title, description, subtasks, status: columnId } },
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-700 rounded-lg p-6 w-96">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">{task ? "Edit Task" : "Add Task"}</h2>

        <input
          className="w-full p-2 mb-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full p-2 mb-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="space-y-2 mb-3">
          {subtasks.map((sub, i) => (
            <input
              key={sub.id}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
              placeholder={`Subtask ${i + 1}`}
              value={sub.title}
              onChange={(e) => handleSubtaskChange(i, e.target.value)}
            />
          ))}
          <button onClick={handleAddSubtask} className="text-blue-500 text-sm">+ Add Subtask</button>
        </div>

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-3 py-1 rounded-md bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100">Cancel</button>
          <button onClick={handleSave} className="px-3 py-1 rounded-md bg-blue-500 text-white">Save</button>
        </div>
      </div>
    </div>
  );
}
