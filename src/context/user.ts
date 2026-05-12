import { createContext, useContext } from "react";
import type { UserAccount } from "../types/UserAccount";

export interface UserContextType {
  user: UserAccount | null;
  setUser: (user: UserAccount | null) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}
