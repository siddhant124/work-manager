"use client";

import React, { useState } from "react";
import addTaskSgv from "@/app/assets/add_task_image.svg";
import Image from "next/image";
import { AddTaskAPI } from "@/services/taskService";
import { TaskDetailsProps, TaskStatus } from "@/shared/common-interfaces";
import { toast } from "react-toastify";

const AddTask = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [task, setTask] = useState<TaskDetailsProps>({
    title: "",
    content: "",
    status: TaskStatus.NONE,
  });

  const HandleClearTask = () => {
    setTask({
      title: "",
      content: "",
      status: TaskStatus.NONE,
    });
  };

  const handleAddTask = async () => {
    setIsLoading(true);
    try {
      await AddTaskAPI(task);

      toast.success("Task added successfully!", {
        position: "top-right",
      });
      void HandleClearTask();
    } catch (error) {
      console.log("failure response");
      toast.error("Failed to create task...", {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full justify-center ">
      <div className="w-2/4">
        <h1 className="text-2xl p-2 text-center">Add your task</h1>

        <div className="flex mt-10 justify-center">
          <Image
            src={addTaskSgv}
            alt={"add task image"}
            style={{
              width: "40%",
            }}
          />
        </div>

        {/* task title */}
        <div className="mt-5">
          <label
            htmlFor="task_title"
            className="block text-sm font-medium mb-2"
          >
            Title
          </label>
          <input
            type="text"
            className="w-full p-2.5 rounded-xl border border-orange-400"
            id="task_title"
            placeholder="Add task here"
            name="task-title"
            onChange={(event) => {
              setTask({
                ...task,
                title: event.target.value,
              });
            }}
            value={task.title}
          />
        </div>

        {/* task content */}
        <div className="mt-5">
          <label
            htmlFor="task_content"
            className="block text-sm font-medium mb-2"
          >
            Content
          </label>
          <textarea
            className="w-full p-2.5 rounded-xl border border-orange-400"
            id="task_content"
            placeholder="Add task description here"
            rows={5}
            name="task-content"
            onChange={(event) => {
              setTask({
                ...task,
                content: event.target.value,
              });
            }}
            value={task.content}
          />
        </div>

        {/* task status */}
        <div className="mt-5">
          <label
            htmlFor="task_status"
            className="block text-sm font-medium mb-2"
          >
            Status
          </label>

          <select
            id="task_status"
            className="w-full p-2.5 rounded-xl border border-orange-400"
            name="task-status"
            value={task.status}
            onChange={(event) => {
              setTask({
                ...task,
                status:
                  event.target.value === "1"
                    ? TaskStatus.PENDING
                    : TaskStatus.COMPLETED,
              });
            }}
          >
            <option value={TaskStatus.NONE} disabled>
              ---Select Status---
            </option>
            <option value={TaskStatus.PENDING}>Pending</option>
            <option value={TaskStatus.COMPLETED}>Completed</option>
          </select>
        </div>

        {/* add and clear button */}
        <div className="mt-6 w-full flex flex-row justify-center space-x-5">
          <button
            className="bg-green-300 hover:bg-green-500 p-4 rounded-2xl"
            onClick={() => void handleAddTask()}
          >
            {isLoading ? "Adding Task..." : "Add Task"}
          </button>
          <button
            className="bg-red-300 hover:bg-red-500 p-4 rounded-2xl"
            onClick={() => void HandleClearTask()}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
