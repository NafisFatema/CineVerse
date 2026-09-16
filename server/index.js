require("dotenv").config();
const express = require("express");
const cors = require("cors");

const moviesRouter = require("./routes/movies");
const usersRouter = require("./routes/users");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ status: "CineVerse API is running" }));
app.use("/api/movies", moviesRouter);
app.use("/api/users", usersRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`CineVerse API listening on http://localhost:${PORT}`),
);
