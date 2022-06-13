import { createNavs, createFooter } from "./createnavBar.js";

createNavs();
createFooter();

const navelement = document.querySelector(".nav-list");

const namePorfil = document.querySelector(".username");

const loader = document.querySelector(".loader");

function updateProfilename(name) {
  namePorfil.innerHTML = name;
}
//
let ourUser = JSON.parse(sessionStorage.user || null);

navelement.innerHTML = `
<li>
          <a href="javascript:void(0);" class="home">Accueil</a>
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
          <a href="javascript:void(0);">Calendrier <i class="fa fa-bell-o"></i></a>
          <ul class="navbar-dropdown">
            <li>
              <a href="javascript:void(0);" class="booking">Reservation</a>
            </li>
            <li>
              <a href="javascript:void(0);" class="setPlanning">Mettre à jour le calendrier </a>
            </li>
          </ul>
          </li>
          <li>
          <a href="javascript:void(0);"  class="contact">Contact <i class="fa fa-bell-o"></i></a>
          </li>
        <li>
        <img class="user" src="../public/imgs/user.png" srcset=""
        />
        <ul class="navbar-dropdown">
            <li class="username">
              USERNAME
            </li>
            <li>
              <button class ="logout">se déconnecter</button>
            </li>
      </li>

`;

const bookingplace = document.querySelector(".booking");
const contactplace = document.querySelector(".contact");
const homeplace = document.querySelector(".home");

contactplace.addEventListener("click", () => {
  location.replace("/admin/contact");
});

bookingplace.addEventListener("click", () => {
  location.replace("/admin/booking");
});

homeplace.addEventListener("click", () => {
  location.replace("/");
});

const socket = io();

socket.on("message", (msg) => {
  console.log(msg);
});

const emploi_form = document.querySelector(".setPlanning");
console.log(emploi_form);
emploi_form.addEventListener("click", () => {
  location.replace("/admin/setPlanning");
});

window.onload = () => {
  if (!sessionStorage.user) {
    location.replace("/login");
  } else {
    const nameprof = ourUser.name;
    if (ourUser != null) {
      updateProfilename(nameprof);
    }
  }
};

///////// GETIING STATISTICS
const sallesDispo = document.querySelector(".salles-dispo");
const amphisDispo = document.querySelector(".amphis-dispo");
const ccsDispo = document.querySelector(".ccs-dispo");
const sallesOccupe = document.querySelector(".salles-occupe");
const amphisOccupe = document.querySelector(".amphis-occupe");
const ccsOccupe = document.querySelector(".ccs-occupe");
const btn = document.querySelector(".btn");

btn.addEventListener("click", () => {
  const dateInput = document.querySelector(".date").value;
  const timeInput = document.querySelector(".time").value;
  const data = [dateInput, timeInput];
  fetch("/admin/getStats", {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({
      data,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      loader.classList.remove("hidden");
      setTimeout(() => {
        loader.classList.add("hidden");
        document.querySelector(".firstName").value = "";
        document.querySelector(".lastName").value = "";
        document.querySelector(".matiere").value = "";
        document.querySelector(".salle").value = "";
        document.querySelector(".date").value = "";
        document.querySelector(".debut").value = "";
        document.querySelector(".fin").value = "";
      }, 1000);
      sallesDispo.innerHTML = data.salleDispo;
      ccsDispo.innerHTML = data.ccsDispo;
      amphisDispo.innerHTML = data.amphiDispo;
      sallesOccupe.innerHTML = data.salleOccupe;
      ccsOccupe.innerHTML = data.ccsOccupe;
      amphisOccupe.innerHTML = data.amphiOccupe;
    });
});
