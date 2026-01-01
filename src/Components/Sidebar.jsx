import { useBoard } from "../context/BoardContext";
import ThemeToggle from "./ThemeToggle";

export default function Sidebar() {
  const { state, dispatch } = useBoard();

  return (
    <>
      {/* Mobile / Tablet Toggle Button */}
      <button
        className="p-2 md:hidden bg-gray-200 dark:bg-gray-700 rounded-md m-2"
        onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`
          bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
          fixed inset-y-0 left-0 z-40
          transform transition-transform duration-300
          ${state.isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:w-64 lg:w-64
          flex flex-col justify-between
        `}
      >
        <div className="p-4">
          <h2 className="text-lg font-bold mb-6">All Boards</h2>

          <ul className="space-y-3">
            {state.boards.map((board) => (
              <li
                key={board.id}
                className={`
                  cursor-pointer p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700
                  ${state.currentBoardId === board.id ? "bg-blue-200 dark:bg-blue-600 font-bold" : ""}
                `}
                onClick={() => dispatch({ type: "SET_CURRENT_BOARD", payload: board.id })}
              >
                {board.name}
              </li>
            ))}
          </ul>

          <button
            className="mt-6 w-full py-2 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => dispatch({ type: "ADD_BOARD" })}
          >
            + Create New Board
          </button>
        </div>

        {/* Bottom toggles */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <ThemeToggle />
          <button
            onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
            className="mt-3 w-full py-2 px-4 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-600"
          >
            Hide Sidebar
          </button>
        </div>
      </aside>
    </>
  );
}
