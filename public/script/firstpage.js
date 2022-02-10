const buttons = document.querySelectorAll(".buttons button");

console.log(buttons);

for (let y = 0; y < buttons.length; y++) {
  buttons[y].addEventListener("click", () => {
    location.replace("/login");
  });
}
