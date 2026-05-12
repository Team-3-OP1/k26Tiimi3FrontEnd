import { useState, useCallback } from "react";
import type { ReactNode } from "react";
import { UserContext } from "./user";
import type { UserContextType } from "./user";

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserContextType["user"]>(() => {
    const token = sessionStorage.getItem("JWT Token");
    const username = sessionStorage.getItem("username");

    if (token && username) {
      return { username };
    }
    return null;
  });

  const logout = useCallback(() => {
    sessionStorage.removeItem("JWT Token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("asiakasId");
    setUser(null);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}
