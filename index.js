require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));

// Middleware
app.use(express.json());

// Get Request
app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Get Request",
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
