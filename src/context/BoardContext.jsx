import { createContext, useContext, useReducer, useEffect } from "react";
import data from "../data/data.json";
import { loadState, saveState } from "../utils/localStorage";

const BoardContext = createContext();

const initialState = loadState() || {
  boards: data.boards || [],
  currentBoardId: data.currentBoardId || data.boards[0]?.id,
  theme: data.theme || "light",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_CURRENT_BOARD":
      return { ...state, currentBoardId: action.payload };

    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };

    case "ADD_TASK": {
      const { boardId, columnId, task } = action.payload;
      return {
        ...state,
        boards: state.boards.map((board) =>
          board.id !== boardId
            ? board
            : {
                ...board,
                columns: board.columns.map((col) =>
                  col.id !== columnId
                    ? col
                    : { ...col, tasks: [...col.tasks, task] }
                ),
              }
        ),
      };
    }

    case "UPDATE_TASK": {
      const { boardId, taskId, title, description, subtasks } = action.payload;
      return {
        ...state,
        boards: state.boards.map((board) =>
          board.id !== boardId
            ? board
            : {
                ...board,
                columns: board.columns.map((col) => ({
                  ...col,
                  tasks: col.tasks.map((task) =>
                    task.id === taskId
                      ? { ...task, title, description, subtasks }
                      : task
                  ),
                })),
              }
        ),
      };
    }

    case "UPDATE_TASK_STATUS": {
      const { boardId, taskId, newStatus } = action.payload;
      return {
        ...state,
        boards: state.boards.map((board) =>
          board.id !== boardId
            ? board
            : {
                ...board,
                columns: board.columns.map((col) => {
                  let taskToMove;
                  const filteredTasks = col.tasks.filter((t) => {
                    if (t.id === taskId) {
                      taskToMove = { ...t, status: newStatus };
                      return false;
                    }
                    return true;
                  });
                  if (col.name === newStatus && taskToMove) {
                    return { ...col, tasks: [...filteredTasks, taskToMove] };
                  }
                  return { ...col, tasks: filteredTasks };
                }),
              }
        ),
      };
    }

    case "TOGGLE_SUBTASK": {
      const { boardId, taskId, subtaskId } = action.payload;
      return {
        ...state,
        boards: state.boards.map((board) =>
          board.id !== boardId
            ? board
            : {
                ...board,
                columns: board.columns.map((col) => ({
                  ...col,
                  tasks: col.tasks.map((task) =>
                    task.id === taskId
                      ? {
                          ...task,
                          subtasks: task.subtasks.map((s) =>
                            s.id === subtaskId
                              ? { ...s, isCompleted: !s.isCompleted }
                              : s
                          ),
                        }
                      : task
                  ),
                })),
              }
        ),
      };
    }

    case "MOVE_TASK": {
      const { boardId, taskId, fromColumnId, toColumnId, oldIndex, newIndex } =
        action.payload;

      return {
        ...state,
        boards: state.boards.map((board) => {
          if (board.id !== boardId) return board;

          // Clone columns to avoid mutating original
          const columns = board.columns.map((col) => ({ ...col }));

          // Find source and target columns
          const sourceCol = columns.find((c) => c.id === fromColumnId);
          const targetCol = columns.find((c) => c.id === toColumnId);
          if (!sourceCol || !targetCol) return board;

          // Remove task from source column
          const taskIndex = sourceCol.tasks.findIndex((t) => t.id === taskId);
          if (taskIndex === -1) return board;
          const [task] = sourceCol.tasks.splice(taskIndex, 1);

          // Insert task into target column at newIndex
          targetCol.tasks.splice(newIndex, 0, task);

          return { ...board, columns };
        }),
      };
    }

    default:
      return state;
  }
}

export function BoardProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Persist state to localStorage
  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  return useContext(BoardContext);
}
