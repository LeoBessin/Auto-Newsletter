import {getLastProductHunt,ERROR_MESSAGE} from "./productHuntAPI.mjs";
import fs from 'fs'

const NB_PRODUCT = 5;

const createNewsLetterHtml = (jsonData) => {
    let textHTMLBeginTable = "<table> <thead> <tr> <th>Produits</th> </tr> </thead> <tbody>";
    const textHTMLEndTable = "</tbody> </table>";
    const textHTMLBeginRow = "<tr> <td>";
    const textHTMLEndRow = "</td> </tr>";
    const listPosts = jsonData.data.posts.edges;
    for (let i=0;i<NB_PRODUCT;i++){
        let postObject = listPosts[i].node;
        let title = `<h2>${postObject.name}</h2>`;
        let description = `<p>${postObject.tagline}</p>`;
        let url = `<a href="${postObject.url}" target="_blank">Website</a>`;
        let img = `<img src="${postObject.thumbnail.url}"></img>`
        let fullRow = textHTMLBeginRow + title + description + url + img + textHTMLEndRow
        textHTMLBeginTable += fullRow
    }

    return textHTMLBeginTable+textHTMLEndTable
}

const response = await getLastProductHunt(NB_PRODUCT)
if (response !== ERROR_MESSAGE){
    const dataProductHunt = JSON.parse(response);
    const newHTMLFile = createNewsLetterHtml(dataProductHunt)
    const template = fs.readFileSync("htmlFiles/templates/template.html", "utf-8");
    const output = template.replace("/*REPLACE_HERE*/", newHTMLFile);
    fs.writeFileSync(`htmlFiles/campains/${new Date().toJSON().slice(0,10)}.html`, output);
}


