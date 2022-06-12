import { createNavs, createFooter } from "./createnavBar.js";

createNavs();
createFooter();

const navelement = document.querySelector(".nav-list");

navelement.innerHTML = `
<li>
<a href="http://localhost:1337/">Accueil</a>
</li>
<li>
 <img class="user" src="../public/imgs/user.png" srcset=""/>
  <ul class="navbar-dropdown">
    <li>
      <button class="login">login</button>
    </li>
`;

const btnlogin = document.querySelector(".login");
btnlogin.addEventListener("click", () => {
  location.replace("/login");
});
