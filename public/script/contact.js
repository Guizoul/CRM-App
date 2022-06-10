const socket = io();
socket.on("message", (msg) => {
  console.log(msg);
});

const sendBtn = document.querySelector(".btn");

sendBtn.addEventListener("click", () => {
  const ReportMsg = document.getElementById("message").value;
  // socket.emit("reportMsg", ReportMsg);
  console.log(ReportMsg);

  let MsgServer = {
    ReportMsg: ReportMsg,
  };
  fetch("/admin/contact", {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(MsgServer),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});
