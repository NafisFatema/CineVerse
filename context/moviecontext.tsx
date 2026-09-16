import { Movie } from "@/data/movies";
import { api } from "@/services/api";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { MoviesAction, MoviesState, moviesReducer } from "./movies-reducer";

interface MoviesContextValue {
  movies: MoviesState;
  dispatch: React.Dispatch<MoviesAction>;
  isLoading: boolean;
  error: string | null;
  reload: () => void;
}

const MoviesContext = createContext<MoviesContextValue | null>(null);

export function MoviesProvider({ children }: { children: ReactNode }) {
  const [movies, dispatch] = useReducer(moviesReducer, []);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function loadMovies() {
    setIsLoading(true);
    setError(null);
    api
      .get<Movie[]>("/movies")
      .then(({ data }) => {
        dispatch({ type: "LOAD", payload: data });
      })
      .catch((err) => {
        setError("Could not load movies. Is the server running?");
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <MoviesContext.Provider
      value={{ movies, dispatch, isLoading, error, reload: loadMovies }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

export function useMovies(): MoviesContextValue {
  const ctx = useContext(MoviesContext);
  if (!ctx) throw new Error("useMovies must be used within a MoviesProvider");
  return ctx;
}
