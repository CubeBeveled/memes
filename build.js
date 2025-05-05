import fs from "fs";
import { getContents, ignoredDirs, getIcon, getExtension, getName } from './data.js';

const originalHtml = fs.readFileSync("index.html").toString();
const header = originalHtml.substring(originalHtml.indexOf("<head>"), originalHtml.indexOf("</head>"));

const analytics = `<script>
window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
</script>
<script defer src="/_vercel/insights/script.js"></script>`;
const githubLink = `<div class="bottom-container">
  <a href="https://github.com/CubeBeveled/memes" target="_blank"><img src="/assets/icons/github.svg" class="bottom-icon"></a>
</div>`;

let memesHTML = ``;
for (const category of await getContents(".")) {
  if (ignoredDirs.includes(category.name)) continue;

  if (category.type == "dir") {
    const content = await getContents(category.name);

    memesHTML += `<div class="category">`; // Start a div
    memesHTML += `<img src="/assets/icons/folder.svg" class="icon"> ${category.name}  <span class="dim-text">[ ${content.length} ]</span>`; // Label it

    // Filter the memes by type
    const memeTypes = new Map();
    memeTypes.set("all", []);
    for (const meme of content) {
      const icon = getIcon(meme.name);
      const type = icon.replace(".svg", "");

      if (memeTypes.has(type)) memeTypes.get(type).push({ category: category.name, name: meme.name })
      else memeTypes.set(type, [{ category: category.name, name: meme.name }]);

      memeTypes.get("all").push({ category: category.name, name: meme.name })
    }


    //<a class="meme" target="_blank" href="/eng/!sex.mp4"><img src="/assets/icons/video.svg" class="icon">!sex<span class="dim-text">.mp4</span></a>
    memeTypes.forEach((memesList, type) => {
      memesHTML += `<details class="media-details">`; // Make a dropdown for the type
      memesHTML += `<summary class="media-summary">${type}</summary>`; // Label it

      memesList.forEach((meme) =>
        memesHTML += `<a class="meme" target="_blank" href="${meme.category}/${meme.name}">
      <img src="/assets/icons/${getIcon(meme.name)}" class="icon">
      ${getName(meme.name)}<span class="dim-text">${getExtension(meme.name)}</span>
      </a>`
      )

      memesHTML += `</details>`; // Make a dropdown for the type
    });

    memesHTML += `</div>`; // End the div
  }
}

const body = `${githubLink}`;

const html = `<!DOCTYPE html>
<html lang="en">

<head>
${header}
</head>

<body>
${body}

${memesHTML}
</body>

${analytics}`;

fs.writeFileSync("index.html", html)