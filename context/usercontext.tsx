import { MockUser } from "@/data/users";
import { api } from "@/services/api";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { UsersAction, UsersState, usersReducer } from "./users-reducer";

interface UsersContextValue {
  users: UsersState;
  dispatch: React.Dispatch<UsersAction>;
  isLoading: boolean;
  error: string | null;
  reload: () => void;
}

const UsersContext = createContext<UsersContextValue | null>(null);

export function UsersProvider({ children }: { children: ReactNode }) {
  const [users, dispatch] = useReducer(usersReducer, []);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function loadUsers() {
    setIsLoading(true);
    setError(null);
    api
      .get<MockUser[]>("/users")
      .then(({ data }) => {
        dispatch({ type: "LOAD", payload: data });
      })
      .catch((err) => {
        setError("Could not load users. Is the server running?");
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <UsersContext.Provider
      value={{ users, dispatch, isLoading, error, reload: loadUsers }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers(): UsersContextValue {
  const ctx = useContext(UsersContext);
  if (!ctx) throw new Error("useUsers must be used within a UsersProvider");
  return ctx;
}
