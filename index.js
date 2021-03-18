/* 
Live version no need of proxy because we have a domain

let api = "d2a36ad2-bc98-45c0-a119-97bee7b4e679:";
let encodedString = btoa(api);

fetch("https://api.company-information.service.gov.uk/company/00000006", {
  method: "GET",
  headers: {
    Authorization: "Basic " + encodedString,
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json))
  .catch((error) => console.log(error));

*/

let api = "d2a36ad2-bc98-45c0-a119-97bee7b4e679:";
let encodedString = btoa(api);
let proxyUrl = "https://cors-anywhere.herokuapp.com/";
let url = proxyUrl + "https://api.companieshouse.gov.uk/search/companies?q=test"  /* Test is the query from the input field */

fetch(url, {
  method: "GET",
  headers: {
    Authorization: "Basic " + encodedString,
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json))
  .catch((error) => console.log(error));
