const express = require("express");
const fs = require("fs");
const path = require("path")
const app = express();
const port = 3000;

app.use(express.json())

app.get("/", (req, res) => res.sendFile("/api/main.html"));

app.get("/eng/random", (req, res) => {
  const files = fs.readdirSync(path.join(__dirname, "../eng"));

  if (files.length === 0) {
    res.send("There are no memes in the folder :(");
  } else {
    res.sendFile(`../eng/${files[Math.floor(Math.random() * files.length)]}`)
  }
});

app.listen(port, () => console.log(`Server ready on port ${port}.`));

module.exports = app;