const express = require("express");
const fs = require("fs");
const path = require("path")
const api = express();
const port = 3000;

api.use(express.json())

api.get("/", (req, res) => res.sendFile("main.html"));

api.get("/eng/random", (req, res) => {
  const files = fs.readdirSync(path.join(__dirname, "../eng"));

  if (files.length === 0) {
    res.send("There are no memes in the folder :(");
  } else {
    res.sendFile(path.join(__dirname, `../eng/${files[Math.floor(Math.random() * files.length)]}`))
  }
});

api.listen(port, () => console.log(`Server ready on port ${port}.`));

module.exports = api;