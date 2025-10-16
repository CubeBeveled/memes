import express from "express";
import color from "colors";
import { getContents, ignoredDirs } from "./data";
const app = express();

app.use(express.static(__dirname)); // Server files from this folder
const bottomHtml = '<a href="https://github.com/CubeBeveled/memes" target="_blank"><img src="assets/icons/github.svg" class="icon"></a>';
let folders = [];

main()
async function main() {
  for (const f of await getContents(".")) {
    if (ignoredDirs.includes(f.name)) continue;

    if (f.type == "dir") {
      const content = await getContents(f.name);
      let html;

      folders.push({
        name: f.name,
        files: content
      });

      console.log(color.yellow("Found:"), f.name)

      let elements = [];

      for (const i of content) {
        if (i.type == "file") {
          elements.push(
            `<div class="file-container">
              <a href="/${f.name}/${i.name}" class="file">
                <img src="assets/icons/${getIcon(i.name)}" class="icon">
                ${i.name}
              </a>
              <a href="/${f.name}/${i.name}" class="file" download>
                <button class="button">Download</button>
              </a>
            </div>`
          )
        }
      }

      html = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" type="text/css" href="assets/styles.css"/>
            
            <script>
              window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
            </script>
            <script defer src="/_vercel/insights/script.js"></script>
            <title>Memes - ${f.name}</title>
          </head>
          <body>
            ${elements.join("")}
            <div class="bottom-container">
              ${bottomHtml}
            </div>
          </body>
          </html>
        `;
      elements = [];

      app.get(`/${f.name}`, async (req, res) => {
        console.log(color.gray("Requested"), "/" + f.name)
        res.send(html);
      });
    }
  }
}

app.get("/", async (req, res) => {
  let elements = [];

  console.log(color.gray("Requested"), "/")

  for (const i of folders) {
    elements.push(
      `<div class="file-container">
        <a href="/${i.name}" class="file">
          <img src="assets/icons/folder.svg" class="icon">
          ${i.name}
        </a>
      </div>`
    )
  }

  const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="assets/styles.css"/>

        <script>
          window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
        </script>
        <script defer src="/_vercel/insights/script.js"></script>
        
        <title>Memes - Categories</title>
      </head>
      <body>
        ${elements.join("")}
        <div class="bottom-container">
          ${bottomHtml}
        </div>
      </body>
      </html>
    `;

  res.send(html);
});

app.listen(3000, () => console.log(`Server ready on port 3000`));

module.exports = app;
