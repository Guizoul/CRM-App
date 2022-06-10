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

const date=document.getElementById("start");
console.log(date);
const heure_debut=document.getElementById("dateD");
const heure_fin=document.getElementById("dateF");
const fois=document.getElementById("fois");
const salle=document.getElementById("salleList");
const cours = document.getElementById("cours");
const filiere=document.getElementById("filiere");
const niveau=document.getElementById("niveau");
const bouton=document.getElementById("bouton");

var timepicker = new TimePicker('time', {
  lang: 'en',
  theme: 'dark'
});
timepicker.on('change', function(evt) {
  
  var value = (evt.hour || '00') + ':' + (evt.minute || '00');
  evt.element.value = value;

});

bouton.addEventListener("click", ()=>{
  fetch("/reservation", {
    method:"post",
    headers: new Headers({"Content-Type" : "application/json"}),
    body:JSON.stringify({
      date:date,
      heure_debut:heure_debut,
      heure_fin:heure_fin,
      fois:fois,
      salle:salle,
      cours:cours,
      filiere:filiere,
      niveau:niveau
    }).then((res) => res.json()).then((data) =>{
      displayClassrooms(data)
    })
  })
})

const displayClassrooms=(data)=>{
  const list = document.querySelector(".list");
  for(let i=0;i<data.SallesDispo.length;i++){
    list.innerHTML+=`<div class="salleList">
  <span class=""> <p class="text">${data.SallesDispo[i].idsalle}</p> </span>
  <button class="book">Reserver!</button>
</div>`
  }
  
}






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

const selection=document.getElementById("Repeat")


