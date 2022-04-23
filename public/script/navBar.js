export function createNavs() {
  const body = document.body;
  body.innerHTML += `<nav class="nav-bar">
    <div class="logo-field">
      <img class="logoimg" src="./imgs/logoinpt.png" alt="logo" />
    </div>
        <div class="profilestatus">
            <i class='fas fa-user-tie' style='font-size:36px'></i>
             <p class="profilename prf">Login as : name</p>
             <button class="btnstatus"><p>Login</p></button>
        </div>
      </li>
    </ul>

  </nav>
  <ul class="menu">
    <li class="menu_list">
      <span class="front fas fa-home"></span>
      <p class="side home">HOME</p>
    </li>
    <li class="menu_list">
      <span class="front fas fa-info"></span>
      <p class="side">ABOUT</p>
    </li>
    <li class="menu_list">
      <span class="front fas fa-briefcase"></span>
      <p class="side booking">RESERVATION</p>
    </li>
    <li class="menu_list">
      <span class="front fas fa-paper-plane"></span>
      <p class="side contact">CONTACT</p>
    </li>
  </ul>`;
}
