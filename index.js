require("dotenv").config();
const express = require("express");
const fs = require("fs");

const app = express();
const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));

// Middleware
app.use(express.json());

// Get Request
app.get("/", (req, res) => {
  fs.readFile("database.json", "utf-8", (err, data) => {
    if (err) res.status(400).json({ err });
    if (data) res.status(200).json({ Msg: JSON.parse(data) });
  });
});

// Post Request
app.post("/", (req, res) => {
  res.status(201).json(req.body);
});

// Put Request
app.put("/:id", (req, res) => {
  res.status(201).json({ id: req.params.id });
});

// Delete Request
app.delete("/:id", (req, res) => {
  res.status(200).json({ id: req.params.id });
});
