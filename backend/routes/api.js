const express = require("express");
const db = require("../config/db");
const router = express.Router();

//test

router.get("/", (req, res) => {
  res.send("Hello World");
});

// Create
router.post("/create", (req, res) => {
  const { name, email } = req.body;
  const query = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.query(query, [name, email], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "User created", id: result.insertId });
  });
});

// Read
router.get("/read", (req, res) => {
  const query = "SELECT * FROM users WHERE is_deleted = FALSE";
  db.query(query, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

// Update
router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const query = "UPDATE users SET name = ?, email = ? WHERE id = ?";
  db.query(query, [name, email, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "User updated" });
  });
});

// Delete
// Soft Delete: Mark a user as deleted
router.put("/delete/:id", (req, res) => {
  const { id } = req.params;
  const query = "UPDATE users SET is_deleted = TRUE WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "User soft deleted successfully" });
  });
});

module.exports = router;
