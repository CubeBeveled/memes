import fs from "fs";

export const ignoredDirs = [
  ".gitignore",
  ".git",
  "node_modules",
  "assets",
  "index.html",
  "package.json",
  "api.js"
]

export function getIcon(fileName) {
  const fileExtension = getExtension(fileName).toLowerCase();

  const fileExtensions = {
    text: [
      "txt",
      "asc",
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
      "mpe",
      "qt"
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
  } else if (fileExtensions.code.some(ext => ext == fileExtension)) {
    return "code.svg"
  } else if (fileExtensions.config.some(ext => ext == fileExtension)) {
    return "config.svg"
  } else if (fileExtensions.data.some(ext => ext == fileExtension)) {
    return "data.svg"
  } else if (fileExtensions.video.some(ext => ext == fileExtension)) {
    return "video.svg"
  } else if (fileExtensions.images.some(ext => ext == fileExtension)) {
    return "image.svg"
  } else if (fileExtensions.sound.some(ext => ext == fileExtension)) {
    return "sound.svg"
  } else {
    console.log("File extension not recognized:", fileExtension)
    return "file.svg"
  }
}

export function getExtension(fileName) {
  const fileSplit = fileName.split(".")
  return fileSplit[fileSplit.length - 1]
}

export function getName(fileName) {
  const lastDotIndex = fileName.lastIndexOf(".");
  return fileName.substring(0, lastDotIndex); // Extract everything before the last dot
}

export function getContents(directoryPath) {
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