import { httpAxios } from "@/helper/httpHelper";
import { UserDetailsProps, UserLoginProps } from "@/shared/common-interfaces";

export async function UserSignUp(userData: UserDetailsProps) {
  const result = await httpAxios
    .post("/api/users", userData)
    .then((response) => response.data);
  return result;
}

export async function UserLogIn(loginData: UserLoginProps) {
  const result = await httpAxios
    .post("/api/login", loginData)
    .then((response) => response.data);
  return result;
}

export async function CurrentUser() {
  const result = await httpAxios
    .get("/api/current")
    .then((response) => response.data);
  return result;
}

export async function LogOutUser() {
  const result = await httpAxios
    .post("/api/logout")
    .then((response) => response.data);
  return result;
}
