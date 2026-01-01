import { useEffect } from "react";
import { useBoard } from "./context/BoardContext";
import Header from "./Components/Header";
import Board from "./Components/Board";

function App() {
  const { state } = useBoard();

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      state.theme === "dark"
    );
  }, [state.theme]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <Board />
    </div>
  );
}

export default App;
