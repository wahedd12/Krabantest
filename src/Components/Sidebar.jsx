import { useBoard } from "../context/BoardContext";
import ThemeToggle from "./ThemeToggle";

export default function Sidebar() {
  const { state, dispatch } = useBoard();

  return (
    <>
      {/* Mobile / Tablet open button */}
      <button
        className="p-2 md:hidden bg-gray-200 dark:bg-gray-700 rounded-md m-2"
        onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`
          bg-white dark:bg-gray-800
          border-r border-gray-200 dark:border-gray-700
          fixed inset-y-0 left-0 z-40
          w-64
          transform transition-transform duration-300 ease-in-out
          ${state.isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
          flex flex-col justify-between
        `}
      >
        {/* Top */}
        <div className="p-4">
          <h2 className="text-lg font-bold mb-6">All Boards</h2>

          <ul className="space-y-3">
            {state.boards.map((board) => (
              <li
                key={board.id}
                onClick={() =>
                  dispatch({ type: "SET_CURRENT_BOARD", payload: board.id })
                }
                className={`flex justify-between items-center cursor-pointer p-2 rounded-md
                  hover:bg-gray-200 dark:hover:bg-gray-700
                  ${
                    state.currentBoardId === board.id
                      ? "bg-blue-200 dark:bg-blue-600 font-bold"
                      : ""
                  }`}
              >
                <span>{board.name}</span>

                {/* Edit / Delete */}
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const newName = prompt(
                        "Enter new board name:",
                        board.name
                      );
                      if (newName) {
                        dispatch({
                          type: "EDIT_BOARD",
                          payload: { boardId: board.id, newName },
                        });
                      }
                    }}
                  >
                    ✏️
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm("Delete this board?")) {
                        dispatch({
                          type: "DELETE_BOARD",
                          payload: { boardId: board.id },
                        });
                      }
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <button
            className="mt-6 w-full py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => dispatch({ type: "ADD_BOARD" })}
          >
            + Create New Board
          </button>
        </div>

        {/* Bottom controls (LIKE REAL APP) */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
          {/* Theme toggle */}
          <ThemeToggle />

          {/* Hide sidebar (desktop + mobile) */}
          <button
            onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
            className="w-full text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            Hide Sidebar
          </button>
        </div>
      </aside>
    </>
  );
}
