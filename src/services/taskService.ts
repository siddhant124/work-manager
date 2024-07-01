import { httpAxios } from "@/helper/httpHelper";
import {
  TaskDetailsProps,
  UserSpecificTasks,
} from "@/shared/common-interfaces";

export async function AddTaskAPI(task: TaskDetailsProps) {
  const result = await httpAxios
    .post("/api/tasks", task)
    .then((response) => response.data);

  return result;
}

export async function GetUserTasksAPI(userId: string) {
  const result = await httpAxios
    .get(`/api/users/${userId}/tasks`)
    .then((response) => response.data as UserSpecificTasks);

  return result;
}

export async function DeleteUserTask(taskId: string) {
  const result = await httpAxios
    .delete(`/api/tasks/${taskId}`)
    .then((response) => response.data as UserSpecificTasks);

  return result;
}
