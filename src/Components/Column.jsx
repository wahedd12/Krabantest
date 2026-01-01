export default function Column({ column, boardId }) {
  const tasks = column.tasks || [];

  return (
    <div className="w-[280px] shrink-0">
      <h3 className="mb-4 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {column.name} ({tasks.length})
      </h3>

      <div className="space-y-4">
        {tasks.map((task) => (
          <Task key={task.id} task={task} boardId={boardId} />
        ))}
      </div>
    </div>
  );
}
