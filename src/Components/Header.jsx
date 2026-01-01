import ThemeToggle from "./ThemeToggle";
import { useBoard } from "./context/BoardContext";

export default function Header() {
  const { dispatch } = useBoard();

  return (
    <header className="flex items-center justify-between px-6 py-4
                       bg-white dark:bg-gray-800
                       border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-lg font-bold text-gray-900 dark:text-white">
        Kanban
      </h1>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button
          onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          Toggle Sidebar
        </button>
      </div>
    </header>
  );
}
