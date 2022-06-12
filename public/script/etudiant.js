import { createNavs, createFooter } from "./createnavBar.js";
import { setPlanning, createmploi } from "./emploi.js";

createNavs();
createmploi();
createFooter();

const navelement = document.querySelector(".nav-list");

navelement.innerHTML = `
<li>
<a href="http://localhost:1337/">Accueil</a>
</li>
<li>
<a href="javascript:void(0);">Notificaiton <i class="fa fa-bell-o"></i></a>
<ul class="navbar-dropdown">
  <li>
    <a href="javascript:void(0);">Sass</a>
  </li>
  <li>
    <a href="javascript:void(0);">Less</a>
  </li>
  <li>
    <a href="javascript:void(0);">Stylus</a>
  </li>
</ul>
</li>
<li>
<img class="user" src="../public/imgs/user.png" srcset=""
/>
<ul class="navbar-dropdown">
  <li class="username">
  </li>
  <li>
    <button class ="logout">se déconnecter</button>
  </li>
</li>

`;

let ourUser = JSON.parse(sessionStorage.user || null);

// planning section

const logout = document.querySelector(".logout");
const namePorfil = document.querySelector(".username");

function updateProfilename(name) {
  console.log(namePorfil);
  namePorfil.innerHTML = name;
}
logout.addEventListener("click", () => {
  const permession = confirm("vous voulez vraiment se déconnecter?");
  if (permession) {
    sessionStorage.clear();
    location.replace("/login");
  }
});

let d = {};

fetch("/etudiant", {
  method: "post",
  headers: new Headers({ "Content-Type": "application/json" }),
  body: JSON.stringify(ourUser),
})
  .then((res) => res.json())
  .then((data) => {
    setPlanning(data, emploiVacations, "etudiant");

    /////////////////////////////////////////////////
    ////////////////////////////////////////////////

    console.log("hey hey");
    // console.log(data);
    // console.log(parseInt(salleContainer[0].dataset.index));
    // for (let i = 0; i < salleContainer.length; i++) {
    //   console.log(salleContainer[i].dataset.index);
    // }
    d = data.planning;
    // console.log(d);
    let clickedSalle = 88;
    // console.log(salleContainer[0].innerHTML);
    for (let i = 0; i < salleContainer.length; i++) {
      salleContainer[i].addEventListener("click", () => {
        showAlert();
        const currentId = salleContainer[i].innerHTML.split(" ").pop();
        for (let j = 0; j < data.planning.length; j++) {
          if (d[j].idsalle === currentId) {
            clickedSalle = currentId;
          }
        }
        console.log(clickedSalle);
      });
    }
  });
const mondayv1m = document.querySelector(".mondayv1m");
const mondayv2m = document.querySelector(".mondayv2m");
const mondayv1a = document.querySelector(".mondayv1a");
const mondayv2a = document.querySelector(".mondayv2a");

const wednsdayv1m = document.querySelector(".wednsdayv1m");
const wednsdayv2m = document.querySelector(".wednsdayv2m");
const wednsdayv1a = document.querySelector(".wednsdayv1a");
const wednsdayv2a = document.querySelector(".mondayv2a");

const tuesdayv1m = document.querySelector(".tuesdayv1m");
const tuesdayv2m = document.querySelector(".tuesdayv2m");
const tuesdayv1a = document.querySelector(".tuesdayv1a");
const tuesdayv2a = document.querySelector(".tuesdayv2a");

const thursdayv1m = document.querySelector(".thursdayv1m");
const thursdayv2m = document.querySelector(".thursdayv2m");
const thursdayv1a = document.querySelector(".thursdayv1a");
const thursdayv2a = document.querySelector(".thursdayv2a");

const fridayv1m = document.querySelector(".fridayv1m");
const fridayv2m = document.querySelector(".fridayv2m");
const fridayv1a = document.querySelector(".fridayv1a");
const fridayv2a = document.querySelector(".fridayv2a");

var emploiVacations = {
  mondayv1m: mondayv1m,
  mondayv2m: mondayv2m,
  mondayv1a: mondayv1a,
  mondayv2a: mondayv2a,
  wednsdayv1m: wednsdayv1m,
  wednsdayv2m: wednsdayv2m,
  wednsdayv1a: wednsdayv1a,
  wednsdayv2a: wednsdayv2a,
  thursdayv1m: thursdayv1m,
  thursdayv2m: thursdayv2m,
  thursdayv1a: thursdayv1a,
  thursdayv2a: thursdayv2a,
  fridayv1m: fridayv1m,
  fridayv2m: fridayv2m,
  fridayv1a: fridayv1a,
  fridayv2a: fridayv2a,
  tuesdayv1m: tuesdayv1m,
  tuesdayv2m: tuesdayv2m,
  tuesdayv1a: tuesdayv1a,
  tuesdayv2a: tuesdayv2a,
};

// window.onload = () => {
//   if (!sessionStorage.user) {
//     location.replace("/login");
//   } else {
//     const nameetu = ourUser.name;

//     if (nameetu != null) {
//       console.log(nameetu);
//       updateProfilename(nameetu);
//     }
//   }
// };

///////////////// GET SALLE DESCRIPTION WHEN CLICKED
const salleContainer = document.querySelectorAll(".cs335");

const getSalleDescription = function () {
  console.log("------Here we go");
  console.log(salleContainer.cellIndex);
};

// console.log(salleContainer[2], salleContainer[8], salleContainer);
// for (let i = 0; i < salleContainer.length; i++) {
//   console.log(salleContainer[i].cellIndex);
// }
for (let i = 0; i < salleContainer.length; i++) {
  // console.log(d);
  // salleContainer[i].addEventListener("click", () => {
  //   console.log(d.planning[salleContainer[i].dataset.index]);
  // });
}
// mondayv1m.addEventListener("click", () => {
//   console.log(mondayv1m.innerHTML);
// });

//////// HANDLE ALERTS AND LOADER
let alertbox = document.querySelector(".alert");
const exitbtn = document.querySelector(".closebtn");
const loader = document.querySelector(".loader");

const showAlert = function (msg) {
  let alertmsg = document.querySelector(".errormsg");
  alertbox.style.backgroundColor = "#fa4033b9";
  alertbox.style.display = "block";
  // setTimeout(function () {
  //   alertbox.classList.add("hidden");
  // }, 1500);
};

// exit button
exitbtn.addEventListener("click", function () {
  alertbox.style.display = "none";
});
