import { INITIAL_MOVIES, Movie } from "@/data/movies";
import { createContext, ReactNode, useContext, useState } from "react";

type MoviesContextType = {
  movies: Movie[];
  addMovie: (movie: Omit<Movie, "id">) => void;
  updateMovie: (id: string, updates: Partial<Omit<Movie, "id">>) => void;
  deleteMovie: (id: string) => void;
};

const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

let nextId = INITIAL_MOVIES.length + 1;

// This Provider holds the REAL, shared list of movies as React state.
// Any screen wrapped inside it (which, via root layout, is every screen)
// can read `movies` and will automatically re-render when it changes —
// no manual refresh tricks needed anywhere.
export function MoviesProvider({ children }: { children: ReactNode }) {
  const [movies, setMovies] = useState<Movie[]>(INITIAL_MOVIES);

  function addMovie(movie: Omit<Movie, "id">) {
    const newMovie: Movie = { ...movie, id: String(nextId) };
    nextId += 1;
    setMovies((prev) => [...prev, newMovie]);
  }

  function updateMovie(id: string, updates: Partial<Omit<Movie, "id">>) {
    setMovies((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    );
  }

  function deleteMovie(id: string) {
    setMovies((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <MoviesContext.Provider
      value={{ movies, addMovie, updateMovie, deleteMovie }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

// A little hook so screens can just call useMovies() instead of
// importing useContext + MoviesContext every time.
export function useMovies() {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error("useMovies must be used within a MoviesProvider");
  }
  return context;
}
