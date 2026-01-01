import { useBoard } from "./context/BoardContext";

export default function ThemeToggle() {
  const { state, dispatch } = useBoard();

  return (
    <button
      onClick={() => dispatch({ type: "TOGGLE_THEME" })}
      className="px-3 py-2 rounded-md
                 bg-gray-200 dark:bg-gray-700
                 text-gray-800 dark:text-gray-100"
    >
      {state.theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
