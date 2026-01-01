import { useEffect } from "react";
import { useBoard } from "../context/BoardContext";
import Board from "./Components/Board";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";

export default function App() {
  const { state } = useBoard();

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      state.theme === "dark"
    );
  }, [state.theme]);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <Board />
      </div>
    </div>
  );
}
