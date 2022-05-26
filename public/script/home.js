import { createNavs, createFooter } from "./createnavBar.js";

createNavs();
createFooter();
// form to specify the date of reservation
const form = document.querySelector(".form");

// report a problem
const reportbtn = document.querySelector(".col-5");
reportbtn.addEventListener("click", () => {
  location.replace("/contact");
});

//profile section

// //

// function processData(data) {
//   const sallesid = data.classeid;
//   const sallescapacity = data.classecapacity;

//   for (let i = 0; i < sallesid.length; i++) {
//     createSallcard(sallesid[i], sallescapacity[i], i);
//   }
//   const btnreserve = document.querySelectorAll(".reserverbtn");
//   for (let j = 0; j < btnreserve.length; j++) {
//     btnreserve[j].addEventListener("click", () => {
//       form.style.display = "block";

//       const btnsbmt = document.querySelector(".btnSubmit");

//       btnsbmt.addEventListener("click", async () => {
//         const dateReservation = document.querySelector(".date");
//         if (dateReservation.value.length != 0) {
//           const salleInfo = {
//             idclasse: btnreserve[j].previousElementSibling.innerHTML,
//             dateRes: dateReservation.value,
//           };
//           fetch("/prof", {
//             method: "put",
//             headers: new Headers({ "Content-Type": "application/json" }),
//             body: JSON.stringify(salleInfo),
//           })
//             .then((res) => {
//               res.json();
//             })
//             .then((data) => {
//               if (!data.updatedb) {
//                 form.style.display = "none";
//               }
//             });
//         } else {
//           console.log("enter a date please");
//         }
//       });
//     });
//   }
// }

//  get planning of the day from backend

const salles = document.querySelector(".salles");
salles.style.display = "none";
function createSallcard(idclasse, capacity, idCard) {
  salles.innerHTML += `
  <div class="sallcard" id="${idCard}">
        <img class="salleimg" src="./imgs/imgsalle.png" alt="" />
        <ul class="infosalle">
          <li class="idsalle">${idclasse}</li>
          <li  class="reserverbtn"><button class="reserversalle">reserve</button></li>
          <li class="capcity">${capacity}</li>
        </ul>
      </div>
  `;
}

// /// handel events

const inebtn = document.querySelectorAll(".ine");

// inebtn.forEach((value) => {
//   value.addEventListener("click", () => {
//     value.style.background = "#1e56a0";
//   });
//   value.addEventListener("hover", () => {
//     value.style.background = " #d6e4f0";
//   });
// });

const loader = document.querySelector(".loader");

for (let i = 0; i < inebtn.length; i++) {
  inebtn[i].addEventListener("click", () => {
    loader.style.display = "block";
    setTimeout(() => {
      loader.style.display = "none";
    }, 2000);
    inebtn[i].style.background = "#1e56a0";
    const dataemploi = {
      niveau: i,
      jour: "monday",
      time: "09:00:00",
    };
    fetch("/", {
      method: "post",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(dataemploi),
    })
      .then((res) => res.json())
      .then((data) => {
        emploiNow(data, i + 1);
      });
  });
}

const emploiNow = (data, niveau) => {
  const emploi = data.planning;
  console.log(emploi);
  for (let j = 0; j < data.planning.length; j++) {
    const row1 = document.querySelector(`.table-row${j + 1}`);
    row1.childNodes[1].innerHTML = `<i class="fa fa-map-marker"></i>${emploi[j].idsalle}</div>`;

    row1.childNodes[3].innerHTML = ` ${emploi[j].nommatiere}`;

    row1.childNodes[5].innerHTML = ` PR.${emploi[j].lastname}`;

    row1.childNodes[7].innerHTML = ` ${emploi[j].nomfiliere}${niveau}`;
  }
};
/// to decorate text only
var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};
window.onload = function () {
  var elements = document.getElementsByClassName("txt-rotate");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-rotate");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};

//
const navelement = document.querySelector(".nav-list");

navelement.innerHTML = `
<li>
<a href="http://localhost:1337/planinpt">Plan de L'INPT</a>
</li>
<li>
 <img class="user" src="../public/imgs/user.png" srcset=""/>
  <ul class="navbar-dropdown">
    <li>
      <button class="login">login</button>
    </li>
`;

const btnlogin = document.querySelector(".login");
btnlogin.addEventListener("click", () => {
  location.replace("/login");
});
