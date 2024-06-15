import { Dispatch, SetStateAction } from "react";

export enum TaskStatus {
  NONE,
  PENDING,
  COMPLETED,
}

export interface UserDetailsProps {
  name: string;
  email: string;
  password: string;
  about: string;
  profileUrl: string;
  userPasswordConfirm?: string;
}

export interface ErrorType {
  errorResponse: {
    errmsg: string;
    code: number;
  };
}

export interface UserParamsType {
  userId: string;
}

export interface TaskParamsType {
  taskId: string;
}

export interface TaskDetailsProps {
  title: string;
  content: string;
  status: TaskStatus;
  userId: string;
}

export interface UserLoginProps {
  email: string;
  password: string;
}

export type JWTVerifyResponse = {
  _id: string;
  name: string;
  iat: number;
};

export type ContextProps = {
  _id: string;
  name: string;
  email: string;
  about: string;
  profileUrl: string;
  authToken: string;
  __v: number;
};

export interface UserResponse {
  currentUser: ContextProps;
  success: boolean;
}

export type UserContextData = {
  user: UserResponse | undefined;
  setUser: Dispatch<SetStateAction<UserResponse | undefined>>;
};