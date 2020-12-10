/*----------------------------------------------------------------------
                                            ClassEs6
-----------------------------------------------------------------------*/
class AddToCart {
  dateCard(card) {
    let cardInfo = {
      image: card.querySelector("img").src,
      title: card.querySelector("h4").textContent,
      price: card.querySelector(".card-body span").textContent,
      id: card
        .querySelector(".card-footer .btn-group .btn-shoping")
        .getAttribute("data-id"),
    };
    addToCartClass.dataCardSendToHTML(cardInfo);
  }
  dataCardSendToHTML(cardInfo) {
    //   for sm basket
    let rowBig = document.createElement("tr");
    rowBig.innerHTML = `
      <tr>
            <td><img width="100px" src="${cardInfo.image}" alt="" srcset=""></td>
            <td>${cardInfo.title}</td>
            <td>${cardInfo.price}</td>
            <td>
            <button type="button" class="close" aria-label="Close" data-id="${cardInfo.id}">
                 <span aria-hidden="true">&times;</span>
            </button>
            </td>
        </tr>
      `;
    //   for large basket
    let addToCardBig = document.querySelector(".addToCardBig");
    addToCardBig.appendChild(rowBig);
    let rowSmall = document.createElement("tr");
    rowSmall.innerHTML = `
        <tr>
              <td><img width="100px" src="${cardInfo.image}" alt="" srcset=""></td>
              <td>${cardInfo.title}</td>
              <td>${cardInfo.price}</td>
              <td>
              <button type="button" class="close" aria-label="Close" data-id="${cardInfo.id}">
                   <span class="remove" aria-hidden="true">&times;</span>
              </button>
              </td>
          </tr>
        `;
    let addToCardSmall = document.querySelector(".addToCardSmall");
    addToCardSmall.appendChild(rowSmall);
  }
}
// ---------------------------------------------------------------------------

class RemoveFromCart {
  removeFromSmallBasket(removeCardsmall) {
    //   removed Cart from SmallBsket
    let removeSmallCard = removeCardsmall;
    // remove vard from bigBasket when remove from little basket
    let prodoctInBigBascket = document.querySelectorAll(".addToCardBig tr");
    let removeSmallCardImgSrc = removeSmallCard.children[0].children[0].src;

    // parse nodeList of Prodoct in bigBasket
    for (const prodoct of prodoctInBigBascket) {
      let prodoctInBigBascketImgSrc = prodoct.children[0].children[0].src;
      if (prodoctInBigBascketImgSrc == removeSmallCardImgSrc) {
        prodoct.remove();
      }
    }
    removeSmallCard.remove();
  }
  removeFromBigBasket(removedCardbig) {
    let removeBigCard = removedCardbig;

    // remove from little bascket when remove from big basket
    // parse litle basket
    let prodoctInLitlleBascket = document.querySelectorAll(
      ".addToCardSmall tr"
    );
    let removeBigCardImgSrc = removeBigCard.children[0].children[0].src;
    for (const prodoct of prodoctInLitlleBascket) {
      let prodoctInLitlleBascketImgSrc = prodoct.children[0].children[0].src;
      if (prodoctInLitlleBascketImgSrc == removeBigCardImgSrc) {
        prodoct.remove();
      }
    }
    // remove from bigbasket
    removeBigCard.remove();
  }
  removeAllCart() {
    // remove tbody
    let tbodySmallBasket = document.querySelector(".addToCardSmall");
    while (tbodySmallBasket.firstChild) {
      tbodySmallBasket.firstChild.remove();
    }
    let tbodyBigBasket = document.querySelector(".addToCardBig");
    while (tbodyBigBasket.firstChild) {
      tbodyBigBasket.firstChild.remove();
    }
    localStorage.clear();
  }
}
// --------------------------------------------------------------------------------------
class LocalStorageClass {
  saveToLocalStorage(card) {
    let cardInfo = {
      image: card.querySelector("img").src,
      title: card.querySelector("h4").textContent,
      price: card.querySelector(".card-body span").textContent,
      id: card
        .querySelector(".card-footer .btn-group .btn-shoping")
        .getAttribute("data-id"),
    };
    // get data from local storage if have data
    let courses;
    if (localStorage.getItem("courses")) {
      courses = JSON.parse(localStorage.getItem("courses"));
    } else {
      courses = [];
    }
    courses.push(cardInfo);
    localStorage.setItem("courses", JSON.stringify(courses));
  }
  // GET ITEM FROM LS
  addToCartDom() {
    if (localStorage.getItem("courses")) {
      let coureseInLs = JSON.parse(localStorage.getItem("courses"));
      coureseInLs.forEach(function (cardInfo) {
        let rowBig = document.createElement("tr");
        rowBig.innerHTML = `
      <tr>
            <td><img width="100px" src="${cardInfo.image}" alt="" srcset=""></td>
            <td>${cardInfo.title}</td>
            <td>${cardInfo.price}</td>
            <td>
            <button type="button" class="close" aria-label="Close" data-id="${cardInfo.id}">
                 <span aria-hidden="true">&times;</span>
            </button>
            </td>
        </tr>
      `;
        //   for large basket
        let addToCardBig = document.querySelector(".addToCardBig");
        addToCardBig.appendChild(rowBig);
        let rowSmall = document.createElement("tr");
        rowSmall.innerHTML = `
        <tr>
              <td><img width="100px" src="${cardInfo.image}" alt="" srcset=""></td>
              <td>${cardInfo.title}</td>
              <td>${cardInfo.price}</td>
              <td>
              <button type="button" class="close" aria-label="Close" data-id="${cardInfo.id}">
                   <span class="remove" aria-hidden="true">&times;</span>
              </button>
              </td>
          </tr>
        `;
        let addToCardSmall = document.querySelector(".addToCardSmall");
        addToCardSmall.appendChild(rowSmall);
      });
    }
  }
  removeFromLocalStorage(card) {
    let coursesAll = JSON.parse(localStorage.getItem("courses"));
    let cardInfoImage = {
      image: card.querySelector("img").src,
    };

    coursesAll.forEach(function (course, index) {
      if (course.image == cardInfoImage.image) {
        coursesAll.splice(index, 1);
      }
    });
    localStorage.setItem("courses", JSON.stringify(coursesAll));
  }
}
/* ----------------------------------------------------------------------
                                            Variable
-----------------------------------------------------------------------*/
let addToCartBtn = document.querySelector("#allProdoct");
let addToCartClass = new AddToCart();
let removeCartClass = new RemoveFromCart();
let clearCardBig = document.querySelector("#clearCardBig");
let clearCardSmall = document.querySelector("#clearCardSmall");
let localStoragClass = new LocalStorageClass();

/* ----------------------------------------------------------------------
                                            EventListner
-----------------------------------------------------------------------*/
eventListner();
function eventListner() {
  addToCartBtn.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-shoping")) {
      // get card clicked
      let card = e.target.parentElement.parentElement.parentElement;
      addToCartClass.dateCard(card);
      localStoragClass.saveToLocalStorage(card);
    }
  });
  document
    .querySelector(".cartBasketSmall")
    .addEventListener("click", function (e) {
      if (e.target.classList.contains("remove")) {
        removeCartClass.removeFromSmallBasket(
          e.target.parentElement.parentElement.parentElement
        );
        localStoragClass.removeFromLocalStorage(
          e.target.parentElement.parentElement.parentElement
        );
      }
    });
  document
    .querySelector("#cartBasketBig")
    .addEventListener("click", function (e) {
      //  dont close window basket cart larg
      let mydropdown = document.querySelector("#mydropdown");
      let mymenu = document.querySelector("#cartBasketBig");
      setTimeout(() => {
        mydropdown.classList.add("show");
        mymenu.classList.add("show");
      }, 0.00000000000001);
      if (e.target.parentElement.classList.contains("close")) {
        removeCartClass.removeFromBigBasket(
          e.target.parentElement.parentElement.parentElement
        );
        localStoragClass.removeFromLocalStorage(
          e.target.parentElement.parentElement.parentElement
        );
      }
    });
  // remove all  card
  clearCardBig.addEventListener("click", function () {
    removeCartClass.removeAllCart();
  });
  clearCardSmall.addEventListener("click", function () {
    removeCartClass.removeAllCart();
  });
  // event Listner
  document.addEventListener("DOMContentLoaded", function () {
    localStoragClass.addToCartDom();
  });
}
