fetch("/admin/contact/getReports", {
  method: "post",
  headers: new Headers({ "Content-Type": "application/json" }),
})
  .then((res) => res.json())
  .then((data) => {
    dispalReports(data);
  });

let msgUl = document.querySelector(".msgs");

let chatlist = document.querySelector(".left-section1");
console.log(chatlist);
const dispalReports = (data) => {
  for (let i = 0; i < data.reports.length; i++) {
    console.log("inside dipaly");
    let msgleft = `
                    <li class="msg-left">
                    <div class="msg-left-sub">
                      <img src="/public/imgs/user.png" />
                      <div class="msg-desc">
                      ${data.reports[i].prb} 
                      </div>
                      <small>${data.reports[i].daterep}</small>
                    </div>
                    </li>

  `;
    let reporters = ` <li>
  <div class="chatList">
    <div class="img">
      <img src="/public/imgs/user.png" />
    </div>
    <div class="desc">
      <small class="time">${data.reports[i].classe} </small>
      <h5>${data.reports[i].etudiant} </h5>
    </div>
  </div>
</li>`;
    chatlist.innerHTML += reporters;
    msgUl.innerHTML += msgleft;
  }
};
