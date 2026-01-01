import { createContext, useContext, useReducer, useEffect } from "react";
import data from "../data/data.json";
import { loadState, saveState } from "../utils/localStorage";

const BoardContext = createContext();

const fallbackState = {
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
        boards: state.boards.map((board) => {
          if (board.id !== boardId) return board;

          let movedTask = null;

          const columns = board.columns.map((col) => {
            const remainingTasks = col.tasks.filter((t) => {
              if (t.id === taskId) {
                movedTask = { ...t, status: newStatus };
                return false;
              }
              return true;
            });

            return { ...col, tasks: remainingTasks };
          });

          return {
            ...board,
            columns: columns.map((col) =>
              col.name === newStatus && movedTask
                ? { ...col, tasks: [...col.tasks, movedTask] }
                : col
            ),
          };
        }),
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

          const columns = board.columns.map((col) => ({
            ...col,
            tasks: [...col.tasks],
          }));

          const sourceCol = columns.find((c) => c.id === fromColumnId);
          const targetCol = columns.find((c) => c.id === toColumnId);

          if (!sourceCol || !targetCol) return board;

          const task = sourceCol.tasks[oldIndex];
          if (!task) return board;

          sourceCol.tasks.splice(oldIndex, 1);
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
  const [state, dispatch] = useReducer(
    reducer,
    fallbackState,
    () => loadState() || fallbackState
  );

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
