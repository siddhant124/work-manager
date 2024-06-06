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
