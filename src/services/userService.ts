import { HttpAxios } from "@/helper/httpHelper";
import { UserDetailsProps, UserLoginProps } from "@/shared/common-interfaces";

export async function UserSignUp(userData: UserDetailsProps) {
  const result = await HttpAxios.post("/api/users", userData).then(
    (response) => response.data
  );
  return result;
}

export async function UserLogIn(loginData: UserLoginProps) {
  const result = await HttpAxios.post("/api/login", loginData).then(
    (response) => response.data
  );
  return result;
}
