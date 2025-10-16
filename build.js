import fs from "fs";
import { getContents, ignoredDirs, getIcon } from "./utils.js";

const memes = {};
let html = fs.readFileSync("partial.html").toString();

for (const category of await getContents(".")) {
  if (ignoredDirs.includes(category.name)) continue;

  if (category.type == "dir") {
    const content = await getContents(category.name);
    memes[category.name] = [];

    for (const meme of content) {
      memes[category.name].push({
        name: meme.name,
        path: `${category.name}/${meme.name}`,
        icon: `assets/icons/${getIcon(meme.name)}`,
      });
    }
  }
}

fs.writeFileSync(
  "index.html",
  html.replace("memesjson", JSON.stringify(memes))
);
fs.writeFileSync("memes.json", JSON.stringify(memes, null, 2));
