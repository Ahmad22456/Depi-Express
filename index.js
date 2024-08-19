require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));

// Get Request
app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Get Request",
  });
});
