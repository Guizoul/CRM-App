import { createNavs, createFooter } from "./createnavBar.js";

import { setPlanning, createmploi } from "./emploi.js";

createNavs();

createmploi();
createFooter();


const navelement = document.querySelector(".nav-list");

navelement.innerHTML = `
<li>
<a href="http://localhost:1337/planinpt">Plan de L'INPT</a>
</li>
<li>
 <img class="user" src="../public/imgs/user.png" srcset=""/>
  <ul class="navbar-dropdown">
    <li>
      <button class="login">login</button>
    </li>
`;
