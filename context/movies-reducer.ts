import { Movie } from "@/data/movies";

export type MoviesState = Movie[];

export type MoviesAction =
  | { type: "LOAD"; payload: Movie[] }
  | { type: "ADD_MOVIE"; payload: Movie }
  | { type: "UPDATE_MOVIE"; payload: Movie }
  | { type: "REMOVE_MOVIE"; payload: number };

export function moviesReducer(
  state: MoviesState,
  action: MoviesAction,
): MoviesState {
  switch (action.type) {
    case "LOAD":
      return action.payload;

    case "ADD_MOVIE":
      return [action.payload, ...state];

    case "UPDATE_MOVIE":
      return state.map((m) =>
        m.id === action.payload.id ? action.payload : m,
      );

    case "REMOVE_MOVIE":
      return state.filter((m) => m.id !== action.payload);

    default:
      return state;
  }
}
