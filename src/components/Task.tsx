import { TaskDetails, TaskStatus } from "@/shared/common-interfaces";

export const UserTask = ({ task }: { task: TaskDetails }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col mt-5 rounded-lg w-2/3 shadow-xl bg-white p-4 overflow-hidden">
        <h2 className="text-xl font-bold mb-1">{task.title}</h2>
        <p>{task.content}</p>
        <div className="flex flex-row items-center mt-4 justify-between text-sm text-gray-500">
          <p>
            Created on:{" "}
            {new Date(task.createdDate).toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <span
            className={`px-2 py-1 rounded-full 
               ${
                 task.status == TaskStatus.PENDING
                   ? "bg-red-500 text-white"
                   : "bg-green-500 text-white"
               }`}
          >
            {task.status == TaskStatus.PENDING ? "PENDING" : "COMPLETED"}
          </span>
        </div>
      </div>
    </div>
  );
};
