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

window.onload = () => {
  if (!sessionStorage.user) {
    location.replace("/login");
  } else {
    const nameetu = ourUser.name;

    if (nameetu != null) {
      console.log(nameetu);
      updateProfilename(nameetu);
    }
  }
};

const selection = document.getElementById("Repeat");
