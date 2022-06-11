import { createNavs, createFooter } from "./createnavBar.js";

createNavs();
createFooter();

const navelement = document.querySelector(".nav-list");
navelement.innerHTML = `
<li>
<a href="http://localhost:1337/">Home</a>
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

// const bouton = document.getElementById("bouton");

bouton.addEventListener("click", () => {
  const heure_debut = document.getElementById("timeD").value;
  const heure_fin = document.getElementById("timeF").value;
  const fois = document.getElementById("fois").value;
  const salle = document.getElementById("salleList").value;
  const cours = document.getElementById("cours").value;
  const filiere = document.getElementById("filiere").value;
  const niveau = document.getElementById("niveau").value;
  const date = document.getElementById("start").value;
  console.log(date);
  fetch("/reservation", {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({
      date: date,
      heure_debut: heure_debut,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      displayClassrooms(data);
    });
});

const displayClassrooms = (data) => {
  const list = document.querySelector(".list");
  for (let i = 0; i < data.SallesDispo.length; i++) {
    list.innerHTML += `<div class="salleList">
  <span class=""> <p class="text">${data.SallesDispo[i].id}</p> </span>
  <button class="book">Reserver!</button>
</div>`;
  }
};

let ourUser = JSON.parse(sessionStorage.user || null);

// planning section

const logout = document.querySelector(".logout");
const namePorfil = document.querySelector(".username");

function updateProfilename(name) {
  console.log(namePorfil);
  namePorfil.innerHTML = name;
}
logout.addEventListener("click", () => {
  const permession = confirm("do you really want to log out?");
  if (permession) {
    sessionStorage.clear();
    location.replace("/login");
  }
});

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

const selection = document.getElementById("Repeat");
