import { useBoard } from "../context/BoardContext";

export default function ThemeToggle() {
  const { state, dispatch } = useBoard();

  return (
    <button
      onClick={() => dispatch({ type: "TOGGLE_THEME" })}
      className="flex items-center gap-2 rounded-lg px-3 py-2
                 bg-gray-200 dark:bg-gray-700
                 text-gray-800 dark:text-gray-100
                 hover:bg-gray-300 dark:hover:bg-gray-600"
    >
      {state.theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
