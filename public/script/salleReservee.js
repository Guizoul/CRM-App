import { createNavs, createFooter } from "./createnavBar.js";

createNavs();
createFooter();

const navelement = document.querySelector(".nav-list");
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

let ourUser = JSON.parse(sessionStorage.user || null);

const booking = document.querySelector(".booking");

booking.addEventListener("click", () => {
  location.replace("/admin/reservation");
});

fetch("/reservationList", {
  method: "post",
  headers: new Headers({ "Content-Type": "application/json" }),
})
  .then((res) => res.json())
  .then((data) => {
    bookedTrack(data);
  });

const bookedTrack = (data) => {
  const table = document.querySelector(".table");
  console.log(data.booked);
  for (let i = 0; i < data.booked.length; i++) {
    let date = data.booked[i].Dateres;
    date = date.split("T")[0];
    let year = date.split("-")[0];
    let month = date.split("-")[1];
    let day = parseInt(date.split("-")[2]) + 1;
    date = year + "-" + month + "-" + day;

    table.innerHTML += ` <tr>
    <td class="salle">${data.booked[i].idsalle}</td>
    <td class="fulldate">${date} de ${
      data.booked[i].heuredebut.split(":")[0] +
      ":" +
      data.booked[i].heuredebut.split(":")[0]
    } à ${
      data.booked[i].heurefin.split(":")[0] +
      ":" +
      data.booked[i].heurefin.split(":")[1]
    }</td>
    <td classe="prof">${data.booked[i].firstname} ${
      data.booked[i].lastname
    }</td>
    <td class="cour">${data.booked[i].matiere}</td>
  </tr>`;
  }
};

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
    if (ourUser != null) {
      console.log(nameprof);
      updateProfilename(nameprof);
    }
  }
};
