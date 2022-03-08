import { createNavs } from "./admin.js";

createNavs();

// form to specify the date of reservation

const form = document.querySelector(".form");

//data base object

const namePorfil = document.querySelector(".profilestatus p");

function updateProfilename(name) {
  namePorfil.innerHTML = name;
}

function processData(data) {
  const sallesid = data.classeid;
  const sallescapacity = data.classecapacity;

  for (let i = 0; i < sallesid.length; i++) {
    createSallcard(sallesid[i], sallescapacity[i], i);
  }
  const btnreserve = document.querySelectorAll(".reserverbtn");
  for (let j = 0; j < btnreserve.length; j++) {
    btnreserve[j].addEventListener("click", () => {
      form.style.display = "block";

      const btnsbmt = document.querySelector(".btnSubmit");

      btnsbmt.addEventListener("click", async () => {
        const dateReservation = document.querySelector(".date");
        if (dateReservation.value.length != 0) {
          const salleInfo = {
            idclasse: btnreserve[j].previousElementSibling.innerHTML,
            dateRes: dateReservation.value,
          };
          fetch("/prof", {
            method: "put",
            headers: new Headers({ "Content-Type": "application/json" }),
            body: JSON.stringify(salleInfo),
          })
            .then((res) => {
              res.json();
            })
            .then((data) => {
              if (!data.updatedb) {
                form.style.display = "none";
              }
            });
        } else {
          console.log("enter a date please");
        }
      });
    });
  }
}

// get salles from backend
fetch("/prof", {
  method: "post",
  headers: new Headers({ "Content-Type": "application/json" }),
  body: JSON.stringify(),
})
  .then((res) => res.json())
  .then((data) => {
    processData(data);
  });

//// /
const salles = document.querySelector(".salles");
function createSallcard(idclasse, capacity, idCard) {
  salles.innerHTML += `
  <div class="sallcard" id="${idCard}">
        <img class="salleimg" src="./imgs/imgsalle.png" alt="" />
        <ul class="infosalle">
          <li class="idsalle">${idclasse}</li>
          <li  class="reserverbtn"><button class="reserversalle">reserve</button></li>
          <li class="capcity">${capacity}</li>
        </ul>
      </div>
  `;
}

/// handel events

const exitFormDatereservation = document.querySelector(".exit");

exitFormDatereservation.addEventListener("click", () => {
  form.style.display = "none";
});
