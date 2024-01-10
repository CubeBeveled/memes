const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000; // Use the default port or a custom one
const folderName = "eng"

// Custom middleware to log requests
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

// Serve all files from the project directory
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  const folderPath = path.join(__dirname, folderName);

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|webm|webp)$/i.test(file));
    const videoFiles = files.filter(file => /\.(mp4)$/i.test(file));

    res.send(`
      <!DOCTYPE html>
      <html lang="en">

      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/styles.css">
        <title>Meme browser</title>
      </head>
      <body>
        ${
          imageFiles.map(file => 
            `<img class="image" src="${folderName}/${file}" alt="${folderName}/${file}">`
          ).join("")
        }
        ${
          videoFiles.map(file => 
            `<video class="video" controls>
              <source src="${folderName}/${file}" type="video/mp4">
            </video>`
          ).join("")
        }
      </body>
      </html>
    `);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});