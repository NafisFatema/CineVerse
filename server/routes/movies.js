const express = require("express");
const router = express.Router();
const db = require("../db/database");

router.get("/", (req, res) => {
  try {
    const { q } = req.query;
    const movies = q
      ? db
          .prepare("SELECT * FROM movies WHERE title LIKE ? ORDER BY id DESC")
          .all(`%${q}%`)
      : db.prepare("SELECT * FROM movies ORDER BY id DESC").all();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

router.get("/:id", (req, res) => {
  const movie = db
    .prepare("SELECT * FROM movies WHERE id = ?")
    .get(req.params.id);
  if (!movie) return res.status(404).json({ error: "Movie not found" });
  res.json(movie);
});

router.post("/", (req, res) => {
  const { title, year, color, poster_url } = req.body;
  if (!title || !year || !color) {
    return res
      .status(400)
      .json({ error: "title, year, and color are required" });
  }
  const result = db
    .prepare(
      "INSERT INTO movies (title, year, color, poster_url) VALUES (?, ?, ?, ?)",
    )
    .run(title, year, color, poster_url || null);
  const newMovie = db
    .prepare("SELECT * FROM movies WHERE id = ?")
    .get(result.lastInsertRowid);
  res.status(201).json(newMovie);
});

router.patch("/:id", (req, res) => {
  const { title, year, color, poster_url } = req.body;
  const existing = db
    .prepare("SELECT * FROM movies WHERE id = ?")
    .get(req.params.id);
  if (!existing) return res.status(404).json({ error: "Movie not found" });

  db.prepare(
    "UPDATE movies SET title = ?, year = ?, color = ?, poster_url = ? WHERE id = ?",
  ).run(
    title ?? existing.title,
    year ?? existing.year,
    color ?? existing.color,
    poster_url ?? existing.poster_url,
    req.params.id,
  );
  const updated = db
    .prepare("SELECT * FROM movies WHERE id = ?")
    .get(req.params.id);
  res.json(updated);
});

router.delete("/:id", (req, res) => {
  const existing = db
    .prepare("SELECT * FROM movies WHERE id = ?")
    .get(req.params.id);
  if (!existing) return res.status(404).json({ error: "Movie not found" });
  db.prepare("DELETE FROM movies WHERE id = ?").run(req.params.id);
  res.status(204).send();
});

module.exports = router;
