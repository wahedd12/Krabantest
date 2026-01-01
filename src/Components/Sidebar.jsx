import { useBoard } from "../context/BoardContext";
import ThemeToggle from "./ThemeToggle";

export default function Sidebar() {
  const { state, dispatch } = useBoard();

  return (
    <>
      {/* Mobile / Tablet open button */}
      <button
        className="md:hidden p-2 m-2 rounded-md
                   bg-gray-200 dark:bg-gray-700"
        onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64
          bg-white dark:bg-gray-800
          border-r border-gray-200 dark:border-gray-700
          transform transition-transform duration-300
          ${state.isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
          flex flex-col
        `}
      >
        {/* Top content */}
        <div className="p-6 flex-1">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">
            ALL BOARDS ({state.boards.length})
          </h2>

          <ul className="space-y-2">
            {state.boards.map((board) => (
              <li
                key={board.id}
                onClick={() =>
                  dispatch({
                    type: "SET_CURRENT_BOARD",
                    payload: board.id,
                  })
                }
                className={`
                  cursor-pointer px-4 py-2 rounded-r-full
                  ${
                    state.currentBoardId === board.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }
                `}
              >
                {board.name}
              </li>
            ))}
          </ul>

          <button
            className="mt-6 text-blue-600 font-semibold"
            onClick={() => dispatch({ type: "ADD_BOARD" })}
          >
            + Create New Board
          </button>
        </div>

        {/* Bottom controls (assignment requirement) */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
          <ThemeToggle />

          <button
            onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
            className="w-full text-left text-sm text-gray-500 dark:text-gray-400"
          >
            Hide Sidebar
          </button>
        </div>
      </aside>
    </>
  );
}
