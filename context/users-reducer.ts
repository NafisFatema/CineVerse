import { MockUser } from "@/data/users";

export type UsersState = MockUser[];

export type UsersAction =
  | { type: "LOAD"; payload: MockUser[] }
  | { type: "UPDATE_USER"; payload: MockUser }
  | { type: "REMOVE_USER"; payload: number };

export function usersReducer(
  state: UsersState,
  action: UsersAction,
): UsersState {
  switch (action.type) {
    case "LOAD":
      return action.payload;

    case "UPDATE_USER":
      return state.map((u) =>
        u.id === action.payload.id ? action.payload : u,
      );

    case "REMOVE_USER":
      return state.filter((u) => u.id !== action.payload);

    default:
      return state;
  }
}
