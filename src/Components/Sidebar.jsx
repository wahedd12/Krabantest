import { useBoard } from "../context/BoardContext";
import ThemeToggle from "./ThemeToggle";

export default function Sidebar() {
  const { state, dispatch } = useBoard();

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col justify-between transition-colors">
      {/* Boards */}
      <div>
        <h2 className="px-6 pt-6 pb-2 text-xs font-bold tracking-widest text-gray-500 dark:text-gray-400">
          ALL BOARDS ({state.boards.length})
        </h2>

        <ul className="mt-4 space-y-1">
          {state.boards.map((board) => (
            <li key={board.id}>
              <button
                onClick={() =>
                  dispatch({
                    type: "SET_CURRENT_BOARD",
                    payload: board.id,
                  })
                }
                className={`w-full text-left px-6 py-3 rounded-r-full transition font-medium
                  ${
                    state.currentBoardId === board.id
                      ? "bg-purple-600 text-white"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }
                `}
              >
                {board.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Theme Toggle */}
      <div className="p-4">
        <div className="flex justify-center rounded-md bg-gray-100 dark:bg-gray-700 p-2">
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
