import {getLastProductHunt,ERROR_MESSAGE} from "./productHuntAPI.mjs";
import fs from 'fs'

const NB_PRODUCT = 5;

const createNewsLetterHtml = (jsonData) => {

    let allObjects = "";
    const listPosts = jsonData.data.posts.edges;
    for (let i=0;i<NB_PRODUCT;i++){
        
        let v2TextHTML = '<div style="max-width: 500px; width: min(500px,85vh); height: 300px; margin: 50px; border-radius: 38px; background: #f1faee; box-shadow: 28px 28px 30px #c3cbc1, -28px -28px 30px #ffffff; display: flex; justify-content: center; align-items: center; padding: 10px; " > <table style=" display: flex; justify-content: center; align-items: center; flex-direction: column; " > <tbody> <tr style=" display: flex; align-items: center; justify-content: center; flex-direction: column; " > <td><h1>🔥 /*NUMBER*/ - /*TITLE*/</h1></td> <td style="margin-top: -30px"> <h3>/*RESUME*/</h3> </td> </tr> <tr> <td> <img style=" border-radius: 15px; background: #f1faee; box-shadow: 18px 18px 30px #c3cbc1, -18px -18px 30px #ffffff; " width="150px" src="/*IMG*/" alt="Product Logo" /> </td> <td style="flex-grow: 2; padding: 10px; text-align: justify" > <p> /*DESC*/ </p> </td> <td> <a href="/*URL*/" target="_blank" > <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="margin-top: 100px" > <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM9.71002 19.6674C8.74743 17.6259 8.15732 15.3742 8.02731 13H4.06189C4.458 16.1765 6.71639 18.7747 9.71002 19.6674ZM10.0307 13C10.1811 15.4388 10.8778 17.7297 12 19.752C13.1222 17.7297 13.8189 15.4388 13.9693 13H10.0307ZM19.9381 13H15.9727C15.8427 15.3742 15.2526 17.6259 14.29 19.6674C17.2836 18.7747 19.542 16.1765 19.9381 13ZM4.06189 11H8.02731C8.15732 8.62577 8.74743 6.37407 9.71002 4.33256C6.71639 5.22533 4.458 7.8235 4.06189 11ZM10.0307 11H13.9693C13.8189 8.56122 13.1222 6.27025 12 4.24799C10.8778 6.27025 10.1811 8.56122 10.0307 11ZM14.29 4.33256C15.2526 6.37407 15.8427 8.62577 15.9727 11H19.9381C19.542 7.8235 17.2836 5.22533 14.29 4.33256Z" fill="#000" ></path></svg ></a> </td> </tr> </tbody> </table> </div>';
        let postObject = listPosts[i].node;
        let title = `${postObject.name}`;
        let resume = `${postObject.tagline}`;
        let description = `${postObject.description}`;
        let url = `${postObject.url}`;
        let img = `${postObject.thumbnail.url}`
        v2TextHTML = v2TextHTML.replace("/*NUMBER*/",(i+1).toString())
        v2TextHTML = v2TextHTML.replace("/*TITLE*/",title)
        v2TextHTML = v2TextHTML.replace("/*RESUME*/",resume)
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


