import { useBoard } from "../context/BoardContext";
import ThemeToggle from "./ThemeToggle";

export default function Sidebar({ onAddBoard }) {
  const { state, dispatch } = useBoard();

  const handleSelectBoard = (id) => {
    dispatch({ type: "SET_CURRENT_BOARD", payload: id });
  };

  return (
    <aside className="w-72 bg-white dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-bold mb-4">All Boards</h2>

        <ul className="flex flex-col gap-2">
          {state.boards.map((board) => (
            <li
              key={board.id}
              className={`cursor-pointer p-2 rounded ${
                board.id === state.currentBoardId
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              onClick={() => handleSelectBoard(board.id)}
            >
              {board.name}
            </li>
          ))}
        </ul>

        <button
          className="mt-4 w-full p-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
          onClick={onAddBoard}
        >
          + Create New Board
        </button>
      </div>

      <ThemeToggle />
    </aside>
  );
}
