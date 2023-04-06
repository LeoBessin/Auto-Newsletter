import { PRODUCTHUNT_TOKEN } from "./apiToken.mjs";

export const ERROR_MESSAGE = "Error";

let myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Host", "api.producthunt.com");
myHeaders.append("Authorization", `Bearer ${PRODUCTHUNT_TOKEN}`);

export async function getLastProductHunt(nbOfResponse = 5, typeOrder = "RANKING") {
  let filledResponse;
  let graphql = JSON.stringify({
    query:
      "{\r\n  posts(first: " +
      nbOfResponse +
      ', featured: true, topic: "developer-tools", order: ' +
      typeOrder +
      ") {\r\n    edges {\r\n      node {\r\n        id\r\n        name\r\n        tagline\r\n        url\r\n         thumbnail {\r\n          url\r\n        }\r\n      }\r\n    }\r\n  }\r\n}",
    variables: {},
  });
  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql,
    redirect: "follow",
  };

  filledResponse = await fetch(
    "https://api.producthunt.com/v2/api/graphql",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log("error", error);
      return ERROR_MESSAGE;
    });

  return filledResponse;
}
