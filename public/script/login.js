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

async function sendData(path, data) {
  console.log("send data function");
  const res = await fetch(path, {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(data),
  });

  const data1 = await res.json();
  processTheData(data1);
}

/// process data

const processTheData = (data) => {
  if (data.alert) {
    showMyAlert(data.alert);
  } else if (data.etudiant) {
    location.replace("/etudiant");
  } else if (data.professeur) {
    location.replace("/prof");
  } else if (data.admin) {
    location.replace("/admin");
  }
};
