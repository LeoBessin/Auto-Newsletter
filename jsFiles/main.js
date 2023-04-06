import {getLastProductHunt,ERROR_MESSAGE} from "./productHuntAPI.mjs";
import fs from 'fs'

const NB_PRODUCT = 5;

const createNewsLetterHtml = (jsonData) => {

    let allObjects = "";
    const listPosts = jsonData.data.posts.edges;
    for (let i=0;i<NB_PRODUCT;i++){
        
        let v2TextHTML = '<tr><td><table style="padding: 3vh;"><tr><td><img width="150vw" src="/*IMG*/" alt="Image du produit"/></td><td><table><tr><td><h2><strong>🔥 /*NUMBER*/</strong> - /*NAME*/</h2></td></tr><tr><td><p>/*DESC*/</p></td></tr><tr><td><a href="https://www.producthunt.com/posts/convoy-4?utm_campaign=producthunt-api&utm_medium=api-v2&utm_source=Application%3A+Newsletter+%28ID%3A+96878%29" target="_blank">Website</a></td></tr></table></td></tr></table></td></tr>'
        let postObject = listPosts[i].node;
        let title = `${postObject.name}`;
        let description = `${postObject.tagline}`;
        let url = `${postObject.url}`;
        let img = `${postObject.thumbnail.url}`
        v2TextHTML = v2TextHTML.replace("/*NUMBER*/",(i+1).toString())
        v2TextHTML = v2TextHTML.replace("/*NAME*/",title)
        v2TextHTML = v2TextHTML.replace("/*DESC*/",description)
        v2TextHTML = v2TextHTML.replace("/*URL*/",url)
        v2TextHTML = v2TextHTML.replace("/*IMG*/",img)
        allObjects += v2TextHTML
    }

    return allObjects
}

const response = await getLastProductHunt(NB_PRODUCT);
if (response !== ERROR_MESSAGE){
    const dataProductHunt = JSON.parse(response);
    const newHTMLFile = createNewsLetterHtml(dataProductHunt)
    const template = fs.readFileSync("../htmlFiles/templates/template.html", "utf-8");
    const output = template.replace("/*REPLACE_HERE*/", newHTMLFile);
    fs.writeFileSync(`../htmlFiles/campaigns/${new Date().toJSON().slice(0,10)}.html`, output);
}


