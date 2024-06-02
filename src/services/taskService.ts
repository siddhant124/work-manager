import { HttpAxios } from "@/helper/httpHelper";
import { TaskDetailsProps } from "@/shared/common-interfaces";

export async function AddTaskAPI(task: TaskDetailsProps) {
  const result = await HttpAxios.post("/api/tasks", task).then(
    (response) => response.data
  );

  return result;
}
