import { DeleteUserTask } from "@/services/taskService";
import { TaskDetails, TaskStatus } from "@/shared/common-interfaces";
import { Dispatch, SetStateAction } from "react";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

export const UserTask = ({
  task,
  setIsTaskDeleteBtnClicked,
}: {
  task: TaskDetails;
  setIsTaskDeleteBtnClicked: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleDeleteTask = async () => {
    try {
      const response = await DeleteUserTask(task._id);
      toast.success(`${task.title} deleted successfullt`, {
        position: "top-right",
      });
      setIsTaskDeleteBtnClicked(true);
    } catch (error) {
      console.log(error);
      toast.error("Error while deleting task", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col mt-5 rounded-lg w-2/3 shadow-xl bg-white p-4 overflow-hidden">
        <div className="flex flex-row items-center mt-4 justify-between">
          <h2 className="text-xl font-bold mb-1">{task.title}</h2>
          <MdDeleteForever
            size={25}
            className="me-9"
            onClick={handleDeleteTask}
          />
        </div>
        <p>{task.content}</p>
        <div className="flex flex-row items-center mt-4 justify-between ">
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
