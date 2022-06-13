////////SET PLANNING
const setBtn = document.querySelector(".setBtn");
const loader = document.querySelector(".loader");
let alertbox = document.querySelector(".alert");
const exitbtn = document.querySelector(".closebtn");

////////function Myalert to not block the page
alertbox.classList.remove("success");
const showMyAlert = function (msg) {
  let alertmsg = document.querySelector(".errormsg");
  alertmsg.innerHTML = msg;
  alertbox.classList.remove("hidden");
  setTimeout(function () {
    alertbox.classList.add("hidden");
  }, 2500);
};

// exit button
exitbtn.addEventListener("click", function () {
  alertbox.classList.add("hidden");
});

setBtn.addEventListener("click", () => {
  const firstName = document.querySelector(".firstName").value;
  const lastName = document.querySelector(".lastName").value;
  const filiere = document.querySelector("#filiere").value;
  const niveauStr = document.querySelector("#niveau").value;
  let niveau;
  const matches = niveauStr.match(/(\d+)/);

  if (matches) {
    niveau = parseInt(matches[0]);
  }
  const matiere = document.querySelector(".matiere").value;
  const salle = document.querySelector(".salle").value;
  let date = document.querySelector(".date").value;
  date = Date.parse(date);
  date = new Date(date);
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let jour = weekday[date.getDay()];
  const debut = document.querySelector(".debut").value;
  const fin = document.querySelector(".fin").value;

  if (
    !firstName ||
    !lastName ||
    !niveauStr ||
    !filiere ||
    !matiere ||
    !salle ||
    !jour ||
    !debut ||
    !fin
  ) {
    alertbox.style.backgroundColor = "#fa4033b9";
    showMyAlert("Merci de remplir tous les champs");
  } else {
    let data = [
      firstName,
      lastName,
      filiere,
      niveau,
      matiere,
      salle,
      jour,
      debut,
      fin,
    ];
    fetch("/admin/setPlanning", {
      method: "post",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        data: data,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          alertbox.style.backgroundColor = "#4bb543";
          showMyAlert(data.success);
        } else if (data.error) {
          alertbox.style.backgroundColor = "#fa4033b9";
          showMyAlert(data.error);
        } else if (data.fail) {
          alertbox.style.backgroundColor = "#fa4033b9";
          showMyAlert(data.fail);
        }
      });
    loader.classList.remove("hidden");
    setTimeout(() => {
      loader.classList.add("hidden");
      document.querySelector(".firstName").value = "";
      document.querySelector(".lastName").value = "";
      document.querySelector(".matiere").value = "";
      document.querySelector(".salle").value = "";
      document.querySelector(".date").value = "";
      document.querySelector(".debut").value = "";
      document.querySelector(".fin").value = "";
    }, 1000);
  }
});

/////////// GET PLANNING
let searchInput = document.querySelector(".search");
const searchBtn = document.querySelector(".searchBtn");
let container = document.querySelector(".items-top-container");

const createEmploiItems = (items) => {
  let str = "";
  for (let i = 0; i < items.length; i++) {
    str += `<div class="items-container">
  <span class="item jour">${items[i].jour}</span>
  <span class="item debut">${items[i].debut}</span>
  <span class="item fin">${items[i].fin}</span>
  <span class="item salle">${items[i].idsalle}</span>
  <span class="item classe">${items[i].nom + " INE" + items[i].niveau}</span>
  <span class="item matiere">${items[i].nommatiere}</span>
</div>`;
  }
  return str;
};

searchBtn.addEventListener("click", async () => {
  container.innerHTML = `<div class="items-container table-header">
  <span class="item jour">Jour</span>
  <span class="item debut">Debut</span>
  <span class="item fin">Fin</span>
  <span class="item salle">Salle</span>
  <span class="item classe">Classe</span>
  <span class="item matiere">matiere</span>
</div>`;
  const res = await fetch("/admin/setPlanning/getProfPlanning", {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({
      data: searchInput.value,
    }),
  });
  const data = await res.json();
  if (data.error) {
    loader.classList.remove("hidden");
    setTimeout(() => {
      loader.classList.add("hidden");
      showMyAlert(data.error);
    }, 300);
  } else if (data.searchResult) {
    loader.classList.remove("hidden");
    setTimeout(() => {
      loader.classList.add("hidden");
      document.querySelector(".search").value = "";
      console.log(data.searchResult);
      container.insertAdjacentHTML(
        "beforeend",
        createEmploiItems(data.searchResult)
      );
    }, 300);
  } else if (data.noResult) {
    alertbox.style.backgroundColor = "#145cc0b9";
    loader.classList.remove("hidden");
    setTimeout(() => {
      loader.classList.add("hidden");
      showMyAlert(data.noResult);
    }, 300);
  } else {
    loader.classList.remove("hidden");
    setTimeout(() => {
      loader.classList.add("hidden");
      showMyAlert("une erreur s'est produite");
    }, 300);
  }
});

window.onload = () => {
  console.log(ourUser);
  if (!sessionStorage.user) {
    location.replace("/login");
  } else {
    const nameprof = ourUser.name;
    if (ourUser != null) {
      console.log(nameprof);
      updateProfilename(nameprof);
    }
  }
};
