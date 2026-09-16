const express = require("express");
const router = express.Router();
const db = require("../db/database");

router.get("/", (req, res) => {
  const users = db
    .prepare("SELECT id, name, email, role FROM users ORDER BY id DESC")
    .all();
  res.json(users);
});

router.get("/:id", (req, res) => {
  const user = db
    .prepare("SELECT id, name, email, role FROM users WHERE id = ?")
    .get(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

router.post("/", (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "name, email, and password are required" });
  }
  const existing = db
    .prepare("SELECT id FROM users WHERE email = ?")
    .get(email);
  if (existing)
    return res
      .status(409)
      .json({ error: "An account with this email already exists" });

  const result = db
    .prepare(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    )
    .run(name, email, password, role || "registered");
  const newUser = db
    .prepare("SELECT id, name, email, role FROM users WHERE id = ?")
    .get(result.lastInsertRowid);
  res.status(201).json(newUser);
});

router.patch("/:id", (req, res) => {
  const { name, role } = req.body;
  const existing = db
    .prepare("SELECT * FROM users WHERE id = ?")
    .get(req.params.id);
  if (!existing) return res.status(404).json({ error: "User not found" });

  db.prepare("UPDATE users SET name = ?, role = ? WHERE id = ?").run(
    name ?? existing.name,
    role ?? existing.role,
    req.params.id,
  );
  const updated = db
    .prepare("SELECT id, name, email, role FROM users WHERE id = ?")
    .get(req.params.id);
  res.json(updated);
});

router.delete("/:id", (req, res) => {
  const existing = db
    .prepare("SELECT * FROM users WHERE id = ?")
    .get(req.params.id);
  if (!existing) return res.status(404).json({ error: "User not found" });
  if (existing.role === "admin")
    return res.status(403).json({ error: "Admin accounts cannot be deleted" });
  db.prepare("DELETE FROM users WHERE id = ?").run(req.params.id);
  res.status(204).send();
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "email and password are required" });

  const user = db
    .prepare(
      "SELECT id, name, email, role FROM users WHERE email = ? AND password = ?",
    )
    .get(email, password);
  if (!user)
    return res.status(401).json({ error: "Invalid email or password" });
  res.json(user);
});

module.exports = router;
