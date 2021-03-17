let api = "Basic 10945ecb-a140-4caf-b4e7-30a67ba2312d";

fetch("http://api.companieshouse.gov.uk/search/companies?q=test", {
  headers: {
    Authorization: api,
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json))
  .catch((error) => console.log(error));


//   console.log('bello')