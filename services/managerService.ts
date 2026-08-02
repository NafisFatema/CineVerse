import { Movie, initialMovies } from '../data/managerMockData';

// In-memory "database" - resets when the app reloads.
let movies: Movie[] = [...initialMovies];

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const managerService = {
  async getMovies(): Promise<Movie[]> {
    await delay();
    return movies;
  },
  async addMovie(movie: Omit<Movie, 'id'>): Promise<Movie> {
    await delay();
    const newMovie: Movie = { ...movie, id: `m${Date.now()}` };
    movies = [newMovie, ...movies];
    return newMovie;
  },
  async removeMovie(id: string): Promise<void> {
    await delay();
    movies = movies.filter((m) => m.id !== id);
  },
};
