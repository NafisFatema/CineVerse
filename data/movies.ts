export type Movie = {
  id: string;
  title: string;
  year: number;
  color: string;
  poster?: any;
};

export const INITIAL_MOVIES: Movie[] = [
  {
    id: "1",
    title: "Titanic",
    year: 1997,
    color: "#1E3A5F",
    poster: require("@/assets/images/images/titanic.jpg"),
  },
  { id: "2", title: "Inception", year: 2010, color: "#2C2C54" },
  { id: "3", title: "Interstellar", year: 2014, color: "#0F3460" },
  { id: "4", title: "The Dark Knight", year: 2008, color: "#1A1A1A" },
  { id: "5", title: "Avengers: Endgame", year: 2019, color: "#6B1E1E" },
  { id: "6", title: "Parasite", year: 2019, color: "#3C3C1E" },
];
