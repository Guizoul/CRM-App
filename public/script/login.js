// const select inputs
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const btn = document.querySelector(".btn");

///function to vlidate email
function ValidateEmail(input) {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (input.value.match(validRegex)) {
    return true;
  } else {
    return false;
  }
}

// select alert box
let alertbox = document.querySelector(".alert");
const exitbtn = document.querySelector(".closebtn");

////////function Myalert to not block the page

const showMyAlert = function (msg) {
  let alertmsg = document.querySelector(".errormsg");
  alertmsg.innerHTML = msg;
  alertbox.style.display = "inherit";

  setTimeout(function () {
    alertbox.style.display = "none";
  }, 4000);
};

/// handl events

// exit button
exitbtn.addEventListener("click", function () {
  alertbox.style.display = "none";
});
//
btn.addEventListener("click", () => {
  if (!ValidateEmail(email)) {
    showMyAlert("please enter an email");
  } else if (password.value.length < 8) {
    showMyAlert("please enter a validz password should be 8 letters");
  } else {
    sendData("/login", {
      email: email.value,
      password: password.value,
    });
  }
});

//

async function sendData(path, data) {
  const res = await fetch(path, {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(data),
  });
  const data1 = await res.json();
  processTheData(data1);
}

/// process data

const sendReq = async (route, token) => {
  console.log("sending get resquest ");
  const resp = await fetch(route, {
    method: "Get",
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    }),
  });
  //const data2 = resp.json();
  //console.log(data2);
};

const processTheData = (data) => {
  console.log("process");
  if (data.alert) {
    console.log(data.acesstoken);
    showMyAlert(data.alert);
  } else if (data.etudiant) {
    sessionStorage.user = JSON.stringify(data);
    location.replace("/etudiant");
  } else if (data.professeur) {
    sessionStorage.user = JSON.stringify(data);
    location.replace("/prof");
    //sendReq("/prof", data.acesstoken);
  } else if (data.admin) {
    sessionStorage.user = JSON.stringify(data);
    location.replace("/admin");
  }
};

//if the user logged in he can't relogin (should logout first).
window.onload = () => {
  if (sessionStorage.user) {
    let user = JSON.parse(sessionStorage.user);
    //location.replace("/prof");
  }
};
