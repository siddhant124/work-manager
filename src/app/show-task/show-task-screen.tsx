"use client";

import { UserTask } from "@/components/Task";
import UserContext from "@/helper/context/user-context";
import { GetUserTasksAPI } from "@/services/taskService";
import {
  TaskDetails,
  UserContextData,
  UserSpecificTasks,
} from "@/shared/common-interfaces";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ShowTasksScreen = () => {
  const context = useContext(UserContext) as UserContextData;
  const [tasks, setUserTasks] = useState<TaskDetails[]>([]);

  const [isTaskDeleteBtnClicked, setIsTaskDeleteBtnClicked] = useState(false);

  async function fetchUserTasks(userId: string) {
    try {
      const tasks = (await GetUserTasksAPI(userId)) as UserSpecificTasks;
      setUserTasks([...tasks["tasks"]]);
    } catch (error) {
      console.log("failure response", error);
      toast.error("Failed to fetch task...", {
        position: "top-right",
      });
    }
  }
  useEffect(() => {
    setIsTaskDeleteBtnClicked(false);
    if (context.user?.currentUser)
      fetchUserTasks(context.user?.currentUser._id);
  }, [context.user?.currentUser, isTaskDeleteBtnClicked]);

  return (
    <div className="flex w-full flex-col mt-3">
      <h1 className="text-3xl text-center">Your Tasks ({tasks.length})</h1>
      {tasks.map((task) => (
        <UserTask
          task={task}
          key={task._id}
          setIsTaskDeleteBtnClicked={setIsTaskDeleteBtnClicked}
        />
      ))}
    </div>
  );
};

export default ShowTasksScreen;
