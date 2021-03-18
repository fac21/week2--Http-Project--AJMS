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

//Company name API
const form = document.querySelector("form");
const outputText = document.getElementById("companyName");
let companyName;

const pexelApi = "563492ad6f91700001000001bf9128825e32458bbc14804fc4881c1d";
const defaultSearch = "cat";
const generateLogoBtn = document.getElementById("btn__generate");
const outputImg = document.getElementById("content__output--img");

let result;
form.addEventListener("submit", (event) => {
  event.preventDefault();

  
  companyName = document.querySelector("#name").value.toUpperCase();

  let api = "d2a36ad2-bc98-45c0-a119-97bee7b4e679:";
  let encodedString = btoa(api);
  // let proxyUrl = "https://cors-anywhere.herokuapp.com/";
  // let searchQuery = "FAC"
  let url = `https://api.companieshouse.gov.uk/search/companies?q=${companyName}`; /* Test is the query from the input field */

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
      result = json.items.filter((companyObj) => {
        return companyObj.title.includes(companyName);
      });
      console.log(result);
      displayCompanyOutput();
    })
    .catch((error) => console.log(error));
});

function displayCompanyOutput() {
  const companyOutput = document.querySelector("output");
  companyOutput.innerHTML = "";
  let companyResult = document.createElement("article");
  let buttonGenerate = document.querySelector(".btn__generate");
  if (result.length === 0) {
    companyResult.innerText = "Success";
    buttonGenerate.classList.remove("hidden");
  } else {
    companyResult.innerText = "That name is not available";
  }
  companyOutput.appendChild(companyResult);
}

//Image API

//Get random image
const getRandomPhoto = (photos) => {
  if (photos.length == 0) {
    return fetchImages(defaultSearch).then((json) =>
      getRandomPhoto(json.photos)
    );
  }

  const randomNumber = Math.floor(Math.random() * photos.length);
  const randomImageUrl = photos[randomNumber].src.medium;
  return randomImageUrl;
};

const changeImageSrc = (imageUrl) => {
  outputImg.src = imageUrl;
};

const fetchImages = (searchTerm) => {
  return fetch(
    `https://api.pexels.com/v1/search?query=${searchTerm}&per_page=80`,
    {
      method: "GET",
      headers: {
        Authorization: pexelApi,
        "Content-Type": "application/json",
      },
    }
  ).then((response) => response.json());
};

const generateLogo = () => {
  fetchImages(companyName)
    .then((json) => getRandomPhoto(json.photos))
    .then((imageUrl) => changeImageSrc(imageUrl))
    .catch((error) => console.log(error));

  outputText.textContent = companyName;
};

generateLogoBtn.addEventListener("click", generateLogo);
