import { useState } from "react";
import { BoardProvider } from "./context/BoardContext";
import Sidebar from "./Components/Sidebar";
import Board from "./Components/Board";
import Modal from "./Components/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <BoardProvider>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Sidebar */}
        <Sidebar onAddBoard={handleAddTask} />

        {/* Main content */}
        <main className="flex-1 flex flex-col">
          {/* Header */}
          <header className="p-6 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-800 shadow-sm">
            <h1 className="text-2xl font-bold">Kanban Board</h1>
            <button
              onClick={handleAddTask}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              + Add Task
            </button>
          </header>

          {/* Board canvas */}
          <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900 p-6">
            <Board />
          </div>
        </main>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          type="add-task"
        />
      </div>
    </BoardProvider>
  );
}

export default App;
