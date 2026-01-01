export default function Task({ task }) {
  const completed = task.subtasks.filter(s => s.isCompleted).length;

  return (
    <div className="rounded-lg bg-white dark:bg-gray-700 p-4 shadow hover:shadow-md transition cursor-pointer">
      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
        {task.title}
      </h4>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        {completed} of {task.subtasks.length} subtasks
      </p>
    </div>
  );
}
