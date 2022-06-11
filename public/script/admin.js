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
          <a href="javascript:void(0);">Planing <i class="fa fa-bell-o"></i></a>
          <ul class="navbar-dropdown">
            <li>
              <a href="javascript:void(0);">Book</a>
            </li>
            <li>
              <a href="javascript:void(0);" class="setPlanning">Set planing</a>
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
              <button class ="logout">logout</button>
            </li>
      </li>

`;

const contactplace = document.querySelector(".contact");

contactplace.addEventListener("click", () => {
  location.replace("/admin/contact");
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

getStas = () => {
  fetch("/admin", {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
  })
    .then((res) => res.json())
    .then((data) => {
      setStats(data);
    });
};
