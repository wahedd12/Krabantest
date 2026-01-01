import { createContext, useContext, useReducer, useEffect } from "react";
import data from "../data/data.json";
import { loadState, saveState } from "../utils/localStorage";

const BoardContext = createContext();

const defaultState = {
  boards: data.boards,
  currentBoardId: data.boards[0]?.id,
  theme: "light",
  isSidebarOpen: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_CURRENT_BOARD":
      return { ...state, currentBoardId: action.payload };

    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };

    case "TOGGLE_SIDEBAR":
      return { ...state, isSidebarOpen: !state.isSidebarOpen };

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
      const { boardId, taskId, fromColumnId, toColumnId, newIndex } =
        action.payload;

      return {
        ...state,
        boards: state.boards.map((board) => {
          if (board.id !== boardId) return board;

          const columns = board.columns.map((c) => ({
            ...c,
            tasks: [...c.tasks],
          }));

          const fromCol = columns.find((c) => c.id === fromColumnId);
          const toCol = columns.find((c) => c.id === toColumnId);

          const taskIndex = fromCol.tasks.findIndex((t) => t.id === taskId);
          const [task] = fromCol.tasks.splice(taskIndex, 1);
          toCol.tasks.splice(newIndex, 0, task);

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
    defaultState,
    () => loadState() || defaultState
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

export const useBoard = () => useContext(BoardContext);
