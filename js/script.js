let basketShop = document.querySelector("#shopCart");
let dataTogglerButton = document.querySelector("#dataTogglerButton");
eventListner();
function eventListner() {
  dataTogglerButton.addEventListener("click", dataToggler);
  basketShop.addEventListener("click", basketShop1);
}
function dataToggler() {
  document.querySelector("#collapseOne1").classList.remove("show");
}
function basketShop1() {
    document.querySelector("#navbarText").classList.remove("show");
}
  