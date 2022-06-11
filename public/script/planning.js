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
  }, 2000);
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
    showMyAlert("Please fill all fields");
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

searchBtn.addEventListener("click", () => {
  searchInput = searchInput.value;
});
