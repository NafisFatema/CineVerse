const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "cineverse.db");
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    year INTEGER NOT NULL,
    color TEXT NOT NULL,
    poster_url TEXT
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('admin', 'manager', 'registered'))
  )
`);

const movieCount = db.prepare("SELECT COUNT(*) AS count FROM movies").get();
if (movieCount.count === 0) {
  const insertMovie = db.prepare(
    "INSERT INTO movies (title, year, color, poster_url) VALUES (?, ?, ?, ?)",
  );
  const seedMovies = [
    ["Titanic", 1997, "#1E3A5F", null],
    ["Inception", 2010, "#2C2C54", null],
    ["Interstellar", 2014, "#0F3460", null],
    ["The Dark Knight", 2008, "#1A1A1A", null],
    ["Avengers: Endgame", 2019, "#6B1E1E", null],
    ["Parasite", 2019, "#3C3C1E", null],
  ];
  const insertMany = db.transaction((movies) => {
    for (const m of movies) insertMovie.run(...m);
  });
  insertMany(seedMovies);
}

const userCount = db.prepare("SELECT COUNT(*) AS count FROM users").get();
if (userCount.count === 0) {
  const insertUser = db.prepare(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
  );
  insertUser.run("Admin", "admin@cineverse.com", "admin123", "admin");
  insertUser.run(
    "Star Cineplex Manager",
    "manager@cineverse.com",
    "manager123",
    "manager",
  );
  insertUser.run("Rahim", "user@cineverse.com", "user123", "registered");
}

module.exports = db;
