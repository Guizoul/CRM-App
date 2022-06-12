import { createNavs, createFooter } from "./createnavBar.js";

createNavs();
createFooter();

let ourUser = JSON.parse(sessionStorage.user || null);
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
    <button class ="logout">logout</button>
  </li>
</li>

`;

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

const setList = (data) => {
  const containerMesres = document.querySelector(".scroll-container");
  for (let i = 0; i < data.booked.length; i++) {
    let date = data.booked[i].Dateres;
    date = date.split("T")[0];
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

      console.log(heurdebut, dateRes, sallecorr);

      fetch("/prof/annulerReservation", {
        method: "post",
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
    });
  }
};
