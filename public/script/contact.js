const socket = io();
socket.on("message", (msg) => {
  console.log(msg);
});

const sendBtn = document.querySelector(".btn");

sendBtn.addEventListener("click", () => {
  const ReportMsg = document.getElementById("msg").value;
  const Classe = document.getElementById("classe").value;
  const Name = document.getElementById("Fullname").value;
  // const email = document.getElementById("Email").value;

  console.log(ReportMsg, Classe, Name);
  fetch("/admin/contact", {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({
      Classe: Classe,
      name: Name,
      ReportMsg: ReportMsg,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});
