export type Movie = {
  id: number; // assigned by SQLite (AUTOINCREMENT) — not generated locally anymore
  title: string;
  year: number;
  color: string;
  poster_url: string | null;
};
