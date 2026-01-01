import { useBoard } from "../context/BoardContext";
import ThemeToggle from "./ThemeToggle";

export default function Sidebar() {
  const { state, dispatch } = useBoard();

  return (
    <>
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
        {/* Top */}
        <div className="p-4">
          <h2 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">
            All Boards
          </h2>

          <ul className="space-y-3">
            {state.boards.map((board) => (
              <li
                key={board.id}
                onClick={() =>
                  dispatch({
                    type: "SET_CURRENT_BOARD",
                    payload: board.id,
                  })
                }
                className={`cursor-pointer p-2 rounded-md
                  ${
                    state.currentBoardId === board.id
                      ? "bg-purple-600 text-white"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
              >
                {board.name}
              </li>
            ))}
          </ul>

          <button
            onClick={() => dispatch({ type: "ADD_BOARD" })}
            className="mt-6 w-full py-2 rounded-md bg-purple-600 text-white"
          >
            + Create New Board
          </button>
        </div>

        {/* Bottom controls */}
        <div className="mt-auto p-4 space-y-4">
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
