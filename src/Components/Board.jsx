import Column from "./Column";
import { useBoard } from "./context/BoardContext";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

export default function Board() {
  const { state, dispatch } = useBoard();

  const activeBoard = state.boards.find(b => b.id === state.currentBoardId);

  if (!activeBoard) {
    return <div className="p-8 text-gray-500 text-center">No board selected</div>;
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
        newIndex,
      },
    });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto">
        {activeBoard.columns.map((col) => (
          <SortableContext
            key={col.id}
            items={col.tasks.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex-shrink-0 w-64 md:w-72 lg:w-80">
              <Column column={col} boardId={activeBoard.id} />
            </div>
          </SortableContext>
        ))}
      </div>
    </DndContext>
  );
}
