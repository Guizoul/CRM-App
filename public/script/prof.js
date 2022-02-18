import { createNavs } from "./admin.js";

createNavs();

//data base object

const namePorfil = document.querySelector(".profilestatus p");

export function updateProfilename(name) {
  namePorfil.innerHTML = name;
}

fetch("/prof", {
  method: "post",
  headers: new Headers({ "Content-Type": "application/json" }),
  body: JSON.stringify(),
})
  .then((res) => res.json())
  .then((data) => {
    const sallesid = data.classeid;
    const sallescapacity = data.classecapacity;
    console.log(sallesid);
    console.log(sallescapacity);

    for (let i = 0; i < sallesid.length; i++) {
      createSallcard(sallesid[i], sallescapacity[i], i);
    }
    const btnreserve = document.querySelectorAll(".reserversalle");
    for (let j = 0; j < btnreserve.length; j++) {
      btnreserve[j].addEventListener("click", () => {
        console.log(btnreserve[j].previousElementSibling.innerHTML);

        const salleInfo = {
          idclasse: btnreserve[j].previousElementSibling.innerHTML,
        };
        fetch("/prof", {
          method: "put",
          headers: new Headers({ "Content-Type": "application/json" }),
          body: JSON.stringify(salleInfo),
        });
      });
    }
  });

//// /
const salles = document.querySelector(".salles");
function createSallcard(idclasse, capacity, idCard) {
  salles.innerHTML += `
  <div class="sallcard" id="${idCard}">
        <img class="salleimg" src="./imgs/imgsalle.png" alt="" />
        <ul class="infosalle">
          <li class="idsalle">${idclasse}</li>
          <li class="reserversalle"><button >reserve</button></li>
          <li class="capcity">${capacity}</li>
        </ul>
      </div>
  `;
}

/// handel event
