import { createNavs } from "./admin.js";
createNavs();

const namePorfil = document.querySelector(".profilestatus p");

function updateProfilename(name) {
  namePorfil.innerHTML = name;
}

module.exports = updateProfilename;
