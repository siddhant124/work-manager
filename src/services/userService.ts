import { HttpAxios } from "@/helper/httpHelper";
import { UserDetailsProps } from "@/shared/common-interfaces";

export async function CreateUserAPI(userData: UserDetailsProps) {
  const result = await HttpAxios.post("/api/users", userData).then(
    (response) => response.data
  );

  return result;
}
