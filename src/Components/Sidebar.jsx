import { useBoard } from "../context/BoardContext";

export default function Sidebar() {
  const { state, dispatch } = useBoard();
  if (!state.isSidebarOpen) return null;

  return (
    <aside className="w-64 bg-white dark:bg-gray-800
                      border-r border-gray-200 dark:border-gray-700 p-6">
      <h2 className="mb-4 text-xs uppercase tracking-wide
                     text-gray-500 dark:text-gray-400">
        All Boards
      </h2>

      {state.boards.map((board) => (
        <button
          key={board.id}
          onClick={() =>
            dispatch({ type: "SET_CURRENT_BOARD", payload: board.id })
          }
          className="block w-full text-left px-4 py-2 rounded-r-full
                     text-gray-700 dark:text-gray-200
                     hover:bg-indigo-100 dark:hover:bg-indigo-600"
        >
          {board.name}
        </button>
      ))}

      <button className="mt-6 text-indigo-600 dark:text-indigo-400">
        + Create New Board
      </button>
    </aside>
  );
}
