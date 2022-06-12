import { createNavs, createFooter } from "./createnavBar.js";

createNavs();
createFooter();

const navelement = document.querySelector(".nav-list");
navelement.innerHTML = `
<li>
<a href="http://localhost:1337/">Accueil</a>
</li>
<li>
<a href="javascript:void(0);" class="bookingList">Mes réservations</a>
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

`;

let ourUser = JSON.parse(sessionStorage.user || null);
// const bouton = document.getElementById("bouton");
let heure_debut = document.getElementById("timeD").value;
let heure_fin = document.getElementById("timeF").value;
let fois = document.getElementById("fois").value;
let typeSalle = document.getElementById("salleList").value;
let cours = document.getElementById("cours").value;
let filiere = document.getElementById("filiere").value;
let niveau = document.getElementById("niveau").value;
let date = document.getElementById("date").value;

let alertbox = document.querySelector(".alert");
const exitbtn = document.querySelector(".closebtn");
alertbox.classList.remove("success");
const loader = document.querySelector(".loader");

const showAlert = function (msg) {
  let alertmsg = document.querySelector(".errormsg");
  alertmsg.innerHTML = msg;
  alertbox.classList.remove("hidden");
  setTimeout(function () {
    alertbox.classList.add("hidden");
  }, 1500);
};

// exit button
exitbtn.addEventListener("click", function () {
  alertbox.classList.add("hidden");
});

bouton.addEventListener("click", () => {
  heure_debut = document.getElementById("timeD").value;
  heure_fin = document.getElementById("timeF").value;
  fois = document.getElementById("fois").value;
  typeSalle = document.getElementById("salleList").value;
  cours = document.getElementById("cours").value;
  filiere = document.getElementById("filiere").value;
  niveau = document.getElementById("niveau").value;
  date = document.getElementById("date").value;
  if (
    !fois ||
    !date ||
    !heure_debut ||
    !heure_fin ||
    !typeSalle ||
    !cours ||
    !filiere ||
    !niveau
  ) {
    alertbox.style.backgroundColor = "#fa4033b9";
    showAlert("Merci de remplir tous les champs");
  } else {
    loader.style.display = "block";
    setTimeout(() => {
      loader.style.display = "none";
    }, 3000);

    fetch("/reservation", {
      method: "post",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        date: date,
        heure_debut: heure_debut,
        heure_fin: heure_fin,
        typeSalle: typeSalle,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        displayClassrooms(data);
      });
  }
});

const displayClassrooms = (data) => {
  const list = document.querySelector(".scroll-container");
  list.scrollIntoView({ behavior: "smooth" });
  list.innerHTML = `<h3 class="color-h3">Salles dsiponibles</h3>`;
  for (let i = 0; i < data.SallesDispo.length; i++) {
    list.innerHTML += `<div class="inline">
    <h4>${data.SallesDispo[i].id}</h4> 
    <button class="reserver">Réserver!</button>
    </div>`;
  }
  // reservation events
  const reserver = document.querySelectorAll(".reserver");
  for (let i = 0; i < reserver.length; i++) {
    reserver[i].addEventListener("click", () => {
      let salle = reserver[i].previousElementSibling.innerHTML;
      loader.style.display = "block";
      setTimeout(() => {
        loader.style.display = "none";
      }, 3000);
      const permession = confirm(
        `Voulez-vous vraiment réserver la salle ${salle}?`
      );
      if (permession) {
        fetch("/reservation", {
          method: "put",
          headers: new Headers({ "Content-Type": "application/json" }),
          body: JSON.stringify({
            date: date,
            heure_debut: heure_debut,
            heure_fin: heure_fin,
            salle: salle,
            filiere: filiere,
            niveau: niveau,
            idprof: ourUser.id,
            matiere: cours,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            alertbox.style.backgroundColor = "#4bb543";
            showAlert(data.booked);
          });
      }
    });
  }
};

// planning section

const logout = document.querySelector(".logout");
const namePorfil = document.querySelector(".username");
const bookingList=document.querySelector(".bookingList")

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

bookingList.addEventListener("click", ()=>{
  location.replace("/prof/List")
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
