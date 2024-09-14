const express = require("express");
const color = require("colors");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.json())
app.use(express.static(path.join(__dirname, "../assets"))); // Server files from this folder

const folderBlacklist = [
  ".git",
  "node_modules",
  "assets"
];
const bottomHtml = '<a href="https://github.com/CubeBeveled/memes" target="_blank"><img src="/icons/github.svg" class="icon"></a>';
let folders = [];

main()
async function main() {
  for (const f of await getContents(".")) {
    if (f.type == "dir" && !folderBlacklist.includes(f.name)) {
      const content = await getContents(f.name);
      let html;

      folders.push({
        name: f.name,
        files: content
      });

      app.use(express.static(path.join(__dirname, `../${f.name}`))); // Server files from this folder

      let elements = [];

      for (const i of content) {
        if (i.type == "file") {
          elements.push(
            `<div class="file-container">
              <a href="/${i.name}" class="file">
                <img src="/icons/${getIcon(i.name)}" class="icon">
                ${i.name}
              </a>
              <a href="/${i.name}" class="file" download>
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
            <link rel="stylesheet" type="text/css" href="/styles.css"/>
            
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
        <a href="${i.name}" class="file">
          <img src="/icons/folder.svg" class="icon">
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
        <link rel="stylesheet" type="text/css" href="/styles.css"/>

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

// Function to get the contents of a folder
function getContents(directoryPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, { withFileTypes: true }, (err, entries) => {
      if (err) {
        reject(err);
      } else {
        let result = [];

        entries.forEach(async (entry) => {
          if (entry.isDirectory()) {
            result.push({
              name: entry.name,
              type: "dir",
            });
          } else {
            result.push({
              name: entry.name,
              type: "file",
            });
          }
        });

        resolve(result);
      }
    });
  });
}

function getIcon(fileName) {
  fileName = fileName.toLowerCase();
  const fileSplit = fileName.split(".")
  const fileExtension = fileSplit[fileSplit.length - 1]

  const fileExtensions = {
    text: [
      "txt",
      "asc",
    ],
    textMedia: [
      "docx",
      "doc",
      "wps",
      "pdf",
      "pages",
      "rtf",
      "md"
    ],
    code: [
      "js",
      "ts",
      "py",
      "html",
      "css",
      "lua",
      "go",
      "java",
      "c",
      "cpp",
      "h",
      "php",
      "sql",
      "ipy"
    ],
    disk: [
      "dmg",
      "iso"
    ],
    config: [
      "dat",
      "dll",
      "editorconfig",
      "eslintrc",
      "conf",
      "gitignore"
    ],
    data: [
      "log",
      "csv",
      "json",
      "sqlite",
      "db"
    ],
    archive: [
      "tar",
      "gz",
      "bz2",
      "zip",
      "rar"
    ],
    book: [
      "epub",
      "azw3",
      "cbz"
    ],
    video: [
      "mp4",
      "m4v",
      "m4p",
      "mkv",
      "mpv",
      "mp2",
      "mpg",
      "mpeg",
      "mov",
      "qt",
      "avi",
      "wmv",
      "webm",
      "flv",
      "swf",
      "avchd",
      "3gp",
      "mpe"
    ],
    images: [
      "png",
      "jpg",
      "jpeg",
      "webp",
      "gif",
      "png",
      "tiff",
      "bmp",
      "tmp",
      "eps",
      "svg",
      "psd",
      "raw",
      "ai"
    ],
    sound: [
      "ogg",
      "asf",
      "aiff",
      "flac",
      "alac",
      "mid",
      "midi",
      "aac",
      "acc",
      "mp3",
      "ac3",
      "mp2",
      "vqf",
      "qt",
      "waf",
      "wav",
      "ra",
      "pcm",
      "cda",
      "wma"
    ]
  }

  if (fileExtensions.text.some(ext => ext == fileExtension)) {
    return "text.svg"
  } else if (fileExtensions.textMedia.some(ext => ext == fileExtension)) {
    return "textmedia.svg"
  } else if (fileExtensions.code.some(ext => ext == fileExtension)) {
    return "code.svg"
  } else if (fileExtensions.disk.some(ext => ext == fileExtension)) {
    return "disk.svg"
  } else if (fileExtensions.config.some(ext => ext == fileExtension)) {
    return "config.svg"
  } else if (fileExtensions.data.some(ext => ext == fileExtension)) {
    return "data.svg"
  } else if (fileExtensions.archive.some(ext => ext == fileExtension)) {
    return "archive.svg"
  } else if (fileExtensions.book.some(ext => ext == fileExtension)) {
    return "book.svg"
  } else if (fileExtensions.video.some(ext => ext == fileExtension)) {
    return "video.svg"
  } else if (fileExtensions.images.some(ext => ext == fileExtension)) {
    return "image.svg"
  } else if (fileExtensions.sound.some(ext => ext == fileExtension)) {
    return "sound.svg"
  } else {
    console.log(color.yellow("File extension not recognized:"), fileExtension)
    return "file.svg"
  }
}

app.listen(port, () => console.log(`Server ready on port ${port}`));

module.exports = app;