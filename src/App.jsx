import { useEffect } from "react";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Board from "./Components/Board";
import ThemeToggle from "./Components/ThemeToggle";
import { useBoard } from "./context/BoardContext";

export default function App() {
  const { state } = useBoard();

  // Apply dark/light mode class to root
  useEffect(() => {
    if (state.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [state.theme]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
          {/* Theme toggle top-right */}
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>

          <Board />
        </main>
      </div>
    </div>
  );
}
