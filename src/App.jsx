import Header from "./Components/Header";
import Board from "./Components/Board";
import { useBoard } from "./context/BoardContext";
import { useEffect } from "react";

function App() {
  const { state } = useBoard();

  // Apply theme to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [state.theme]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <Header />

      <main className="flex justify-center px-6 py-10">
        <div className="w-full max-w-[1280px] rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors">
          <Board />
        </div>
      </main>
    </div>
  );
}

export default App;
