/*
//HTML PARTIALS
//get the reference to the container
const container = document.querySelector(".container");
const errorContainer = document.querySelector(".error");
let url = "./partials/home.html";
const links = document.querySelectorAll("nav a");

function handleLinkClick(ev) {
    ev.preventDefault();
    // find out which link is clicked
    let currentLink = ev.target;
    url = currentLink.href;
    handleAjax(url);
}

for (let link of links) {
    link.addEventListener("click", handleLinkClick);
}

function handleAjax(urlParam){
    fetch(urlParam)
        .then( function (response) {
            if (response.statusText === "OK") {
                return response.text();
            }
            throw new Error(response.statusText);
        })
        .then(function (data) {
            // use your partials

            container.innerHTML = data;
        })
        .catch(function (err) {
            errorContainer.textContent = `${err.name}: ${err.message}`;
        });
}

*/

var $container = document.querySelector(".container");
var $links = document.querySelectorAll("nav ul li a");

var contents = {};

fetch("partials/home.html")
  .then(function (response) {
    return response.text();
  })
  .then(function (data) {
    $container.innerHTML = data;
  })

var storeContents = function (urlVal) {

  if (!contents[urlVal]) {

    fetch(urlVal)
      .then(function (response) {
        return response.text();
      })
      .then(function (data) {
        contents[urlVal] = data;
        $container.innerHTML = contents[urlVal];
      });
  } else {
    $container.innerHTML = contents[urlVal];
  }
};


const handleClick = function (e) {

  e.preventDefault();

  let key = e.target.href;

  storeContents(key);

};

for (let i = 0; i < $links.length; i++) {

  $links[i].addEventListener("click", handleClick);

}