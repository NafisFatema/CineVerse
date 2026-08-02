import { INITIAL_USERS, MockUser, UserRole } from "@/data/users";
import { createContext, ReactNode, useContext, useState } from "react";

type UsersContextType = {
  users: MockUser[];
  deleteUser: (email: string) => void;
  updateUserRole: (email: string, role: UserRole) => void;
  findUserByCredentials: (
    email: string,
    password: string,
  ) => MockUser | undefined;
};

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export function UsersProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<MockUser[]>(INITIAL_USERS);

  function deleteUser(email: string) {
    setUsers((prev) => prev.filter((u) => u.email !== email));
  }

  function updateUserRole(email: string, role: UserRole) {
    setUsers((prev) =>
      prev.map((u) => (u.email === email ? { ...u, role } : u)),
    );
  }

  function findUserByCredentials(email: string, password: string) {
    return users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password,
    );
  }

  return (
    <UsersContext.Provider
      value={{ users, deleteUser, updateUserRole, findUserByCredentials }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
}
