const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.json())

app.get("/", (req, res) => res.sendFile("index.html"));

app.get("/eng/random", (req, res) => {
  const files = fs.readdirSync("/eng");

  if (files.length === 0) {
    console.log("There are no memes in the folder :(");
  } else {
    res.redirect(`https://memes-silk.vercel.app/eng/${files[Math.floor(Math.random() * files.length)]}/`)
    console.log('Random file name:', );
  }
});

app.listen(port, () => console.log(`Server ready on port ${port}.`));

module.exports = app;