/* 
Live version no need of proxy because we have a domain

//Company House Api
let api = "d2a36ad2-bc98-45c0-a119-97bee7b4e679:";
let encodedString = btoa(api); //built in method for encryption

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

// let api = "d2a36ad2-bc98-45c0-a119-97bee7b4e679:";
// let encodedString = btoa(api);
// let proxyUrl = "https://cors-anywhere.herokuapp.com/";
// let url = proxyUrl + "https://api.companieshouse.gov.uk/search/companies?q=test"  /* Test is the query from the input field */

// fetch(url, {
//   method: "GET",
//   headers: {
//     Authorization: "Basic " + encodedString,
//     "Content-Type": "application/json",
//   },
// })
//   .then((response) => response.json())
//   .then((json) => console.log(json))
//   .catch((error) => console.log(error));


// Company names API

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const companyName = document.querySelector("#name").value.toUpperCase();

  let api = "d2a36ad2-bc98-45c0-a119-97bee7b4e679:";
  let encodedString = btoa(api);
  let proxyUrl = "https://cors-anywhere.herokuapp.com/";
  // let searchQuery = "FAC"
  let url =
    proxyUrl +
    `https://api.companieshouse.gov.uk/search/companies?q=${companyName}`; /* Test is the query from the input field */

  fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Basic " + encodedString,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      // console.log(json.items)
      let result = json.items.filter((companyObj) => {
        return companyObj.title.includes(companyName);
      });
      console.log(result);
    })
    .catch((error) => console.log(error));
});

//Image API
const pexelApi = "563492ad6f91700001000001bf9128825e32458bbc14804fc4881c1d";
const searchTerm = "panda";
const generateLogoBtn = document.getElementById("btn__generate");
const outputFigure = document.querySelector("figure");

//Data base manipulation

//Get random image
const getRandomPhoto = (photos) => {
  const randomNumber = Math.floor(Math.random() * photos.length);
  const randomImageUrl = photos[randomNumber].src.medium;
  // console.log("Function getRandomPhoto", randomImageUrl);
  return randomImageUrl;
};

const changeImageSrc = (imageUrl) => {
  outputFigure.innerHTML = `<img src="${imageUrl}" alt="" />`;
};

const generateLogo = () => {
  // Get the random photo

  fetch(`https://api.pexels.com/v1/search?query=${searchTerm}&per_page=80`, {
    method: "GET",
    headers: {
      Authorization: pexelApi,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => getRandomPhoto(json.photos))
    .then((imageUrl) => changeImageSrc(imageUrl))
    .catch((error) => console.log(error));

  //
};

generateLogoBtn.addEventListener("click", generateLogo);
