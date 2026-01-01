import Column from "./Column";
import { useBoard } from "../context/BoardContext";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

export default function Board() {
  const { state, dispatch } = useBoard();

  const activeBoard = state.boards.find(
    (board) => board.id === state.currentBoardId
  );

  if (!activeBoard) {
    return (
      <div className="p-8 text-gray-500 text-center">No board selected</div>
    );
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const { columnId: sourceColId, index: oldIndex } = active.data.current;
    const { columnId: targetColId, index: newIndex } = over.data.current;

    dispatch({
      type: "MOVE_TASK",
      payload: {
        boardId: activeBoard.id,
        taskId: active.id,
        fromColumnId: sourceColId,
        toColumnId: targetColId,
        oldIndex,
        newIndex,
      },
    });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex gap-6 overflow-x-auto pb-4">
        {activeBoard.columns.map((column) => (
          <SortableContext
            key={column.id}
            items={column.tasks.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            <Column column={column} boardId={activeBoard.id} />
          </SortableContext>
        ))}
      </div>
    </DndContext>
  );
}
