"use client";

import { useEffect, useState } from "react";
import UserContext from "./user-context";
import { CurrentUser } from "@/services/userService";
import { UserResponse } from "@/shared/common-interfaces";

const UserProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [user, setUser] = useState<UserResponse | undefined>(undefined);

  const [called, setCalled] = useState(false);
  useEffect(() => {
    setCalled(true);
    async function load() {
      try {
        const loggedInUser = (await CurrentUser()) as UserResponse;
        setUser({ ...loggedInUser });
      } catch (error) {
        setUser(undefined);
      }
    }
    if (called === true) {
      load();
    }
  }, [called]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
