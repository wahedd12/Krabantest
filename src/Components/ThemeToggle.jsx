import { useBoard } from "../context/BoardContext";

export default function ThemeToggle() {
  const { state, dispatch } = useBoard();

  return (
    <button
      className="mt-4 p-2 w-full rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      onClick={() => dispatch({ type: "TOGGLE_THEME" })}
    >
      {state.theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
}
