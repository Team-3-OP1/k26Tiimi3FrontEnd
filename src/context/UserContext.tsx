import { useState, useCallback } from "react";
import type { ReactNode } from "react";
import { UserContext } from "./user";
import type { UserContextType } from "./user";

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserContextType["user"]>(null);

  const logout = useCallback(() => {
    sessionStorage.removeItem("JWT Token");
    setUser(null);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}
