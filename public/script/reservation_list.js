import { createNavs, createFooter } from "./createnavBar.js";

createNavs();
createFooter();

const navelement = document.querySelector(".nav-list");
navelement.innerHTML = `
<li>
<a href="javascript:void(0);" class="home">Accueil</a>
</li>
<li>
<a href="javascript:void(0);" class="booking">Réservation</a>
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
    <button class ="logout">Se déconnecter</button>
  </li>
</li>
</ul>
`;

const home = document.querySelector(".home");
const book = document.querySelector(".booking");
book.addEventListener("click", () => {
  location.replace("/admin/reservations");
});
home.addEventListener("click", () => {
  location.replace("/");
});

let ourUser = JSON.parse(sessionStorage.user || null);

fetch("/prof/reservationList", {
  method: "post",
  headers: new Headers({ "Content-Type": "application/json" }),
  body: JSON.stringify(ourUser),
})
  .then((res) => res.json())
  .then((data) => {
    setList(data);
  });
const containerMesres = document.querySelector(".container");
console.log(containerMesres);
function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}
const setList = (data) => {
  const containerMesres = document.querySelector(".scroll-container");
  for (let i = 0; i < data.booked.length; i++) {
    let date = data.booked[i].Dateres;
    date = date.split("T")[0];
    // const d = new Date(Date.parse(date));

    let year = date.split("-")[0];
    let month = date.split("-")[1];
    let day = parseInt(date.split("-")[2]) + 1;
    date = year + "-" + month + "-" + day;
    containerMesres.innerHTML += `<div class="inline">&emsp;
      <h4>${data.booked[i].idsalle}</h4>
      <h4>${date}</h4>
      <h4>${data.booked[i].heuredebut}</h4>
      <button class="modifier btn">Modifier</button>
       <button class="annuler btn">Annuler</button></div>
    `;
  }
  const annulerList = document.querySelectorAll(".annuler");
  for (let i = 0; i < annulerList.length; i++) {
    annulerList[i].addEventListener("click", () => {
      const heurdebut =
        annulerList[i].previousElementSibling.previousElementSibling.innerHTML;
      const dateRes =
        annulerList[i].previousElementSibling.previousElementSibling
          .previousElementSibling.innerHTML;
      const sallecorr =
        annulerList[i].previousElementSibling.previousElementSibling
          .previousElementSibling.previousElementSibling.innerHTML;

      const permession = confirm(
        `Voulez-vous vraiment annuler la reservation de la salle  ${sallecorr}?`
      );
      if (permession) {
        fetch("/prof/annulerReservation", {
          method: "delete",
          headers: new Headers({ "Content-Type": "application/json" }),
          body: JSON.stringify({
            id: ourUser.id,
            salle: sallecorr,
            dateRes: dateRes,
            heurdebut: heurdebut,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            location.reload();
          });
      }
    });
  }
};

const booking = document.querySelector(".booking");

booking.addEventListener("click", () => {
  location.replace("/prof/reservation");
});

const namePorfil = document.querySelector(".username");

function updateProfilename(name) {
  namePorfil.innerHTML = name;
}

window.onload = () => {
  console.log(ourUser);
  if (!sessionStorage.user) {
    location.replace("/login");
  } else {
    const nameprof = ourUser.name;
    console.log(nameprof);
    if (ourUser != null) {
      console.log(nameprof);
      updateProfilename(nameprof);
    }
  }
};
