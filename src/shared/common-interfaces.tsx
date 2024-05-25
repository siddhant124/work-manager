export interface UserDetailsProps {
    name: string;
    email: string;
    password: string;
    about: string;
    profileUrl: string;
  }
  
  export interface ErrorType {
    errorResponse: {
      errmsg: string;
      code: number;
    };
  }