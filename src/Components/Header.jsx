import { useBoard } from "../context/BoardContext";

export default function Header() {
  const { state } = useBoard();

  return (
    <header
      className="
        flex items-center justify-between
        px-6 py-4
        bg-white dark:bg-gray-800
        border-b border-gray-200 dark:border-gray-700
        h-16
      "
    >
      {/* Logo / App Name */}
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">
        Kanban
      </h1>

      {/* Right-side: (desktop only) can add profile/avatar later */}
      <div className="hidden md:flex items-center gap-4">
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          {state.boards.find(b => b.id === state.currentBoardId)?.name || ""}
        </span>
      </div>
    </header>
  );
}
