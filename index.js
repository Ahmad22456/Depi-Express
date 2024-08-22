require("dotenv").config();
const express = require("express");
const fs = require("fs");

const app = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//Middleware
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  fs.readFile("database.json", "utf-8", (err, data) => {
    if (err) res.status(400).json({ Error: err });
    if (data) {
      const category = req.query.category;
      const maxPrice = req.query.maxPrice;
      const parsedData = JSON.parse(data);
      if (!category && !maxPrice) {
        res.status(200).json(parsedData);
      } else if (category && !maxPrice) {
        res.status(200).json(parsedData.filter((x) => x.category == category));
      } else if (!category && maxPrice) {
        res
          .status(200)
          .json(parsedData.filter((x) => x.price <= parseFloat(maxPrice)));
      } else if (category && maxPrice) {
        res
          .status(200)
          .json(
            parsedData.filter(
              (x) => x.category == category && x.price <= parseFloat(maxPrice)
            )
          );
      } else {
        res.status(200).json({ Msg: "Invalid request" });
      }
    }
  });
});
