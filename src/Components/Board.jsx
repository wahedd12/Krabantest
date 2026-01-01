import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useBoard } from "../context/BoardContext";
import Column from "./Column";

export default function Board() {
  const { state, dispatch } = useBoard();

  const board = state.boards.find(
    (b) => b.id === state.currentBoardId
  );

  if (!board) return null;

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    dispatch({
      type: "MOVE_TASK",
      payload: {
        boardId: board.id,
        taskId: active.id,
        fromColumnId: active.data.current.columnId,
        toColumnId: over.data.current.columnId,
        newIndex: over.data.current.index,
      },
    });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex gap-6 p-6 overflow-x-auto">
        {board.columns.map((column) => (
          <SortableContext
            key={column.id}
            items={column.tasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            <Column column={column} boardId={board.id} />
          </SortableContext>
        ))}
      </div>
    </DndContext>
  );
}
