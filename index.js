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
    if (err) res.status(400).json(err);
    if (data) res.status(200).json({ Msg: JSON.parse(data) });
  });
});

// Post Request
app.post("/", (req, res) => {
  fs.readFile("database.json", "utf-8", (err, data) => {
    if (err) res.status(400).json(err);
    if (data) {
      const parsedData = JSON.parse(data);
      const id = parsedData["Last_Id"] + 1;
      const Users = parsedData["Users"];
      const { name } = req.body;
      Users.push({ id, name });

      fs.writeFile(
        "database.json",
        JSON.stringify({ Users, Last_Id: id }),
        (err) => {
          if (err) {
            res.status(400).json(err);
          } else {
            res.status(200).json({ Msg: "User has been added" });
          }
        }
      );
    }
  });
});

// Put Request
app.put("/:id", (req, res) => {
  fs.readFile("database.json", "utf-8", (err, data) => {
    if (err) res.status(400).json({ err });
    if (data) {
      const parsedData = JSON.parse(data);
      const id = req.params.id;
      const { name } = req.body;
      const Users = parsedData["Users"];
      Users[Users.findIndex((e) => e.id == id)].name = name;

      fs.writeFile(
        "database.json",
        JSON.stringify({ Users, Last_Id: parsedData["Last_Id"] }),
        (err) => {
          if (err) {
            res.status(400).json({ err });
          } else {
            res.status(200).json({ Msg: "User has been updated" });
          }
        }
      );
    }
  });
});

// Delete Request
app.delete("/:id", (req, res) => {
  fs.readFile("database.json", "utf-8", (err, data) => {
    if (err) res.status(400).json({ err });
    if (data) {
      const parsedData = JSON.parse(data);
      const id = req.params.id;
      let Users = parsedData["Users"];
      Users = Users.filter((e) => e.id != id);

      fs.writeFile(
        "database.json",
        JSON.stringify({ Users, Last_Id: parsedData["Last_Id"] }),
        (err) => {
          if (err) {
            res.status(400).json({ err });
          } else {
            res.status(200).json({ Msg: "User has been deleted" });
          }
        }
      );
    }
  });
});
