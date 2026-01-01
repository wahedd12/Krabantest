import { useBoard } from "../context/BoardContext";

export default function ThemeToggle() {
  const { state, dispatch } = useBoard();

  return (
    <button
      onClick={() => dispatch({ type: "TOGGLE_THEME" })}
      className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-sm font-medium text-gray-800 dark:text-gray-100 transition"
    >
      {state.theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}
