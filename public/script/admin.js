const navs = document.querySelector(".navs");

export function createNavs() {
  navs.innerHTML = `<nav class="nav-bar">
    <div class="logo-field">
      <img class="logoimg" src="./imgs/logoinpt.png" alt="logo" />
    </div>
        <div class="profilestatus">
             <p>Login as : name</p>
             <button class="btnstatus"><p>Login</p></button>
        </div>
      </li>
    </ul>

  </nav>
  <ul class="menu">
    <li class="menu_list">
      <span class="front fas fa-home"></span>
      <a href="#" class="side">home</a>
    </li>
    <li class="menu_list">
      <span class="front fas fa-info"></span>
      <a href="#" class="side">Notif</a>
    </li>
    <li class="menu_list">
      <span class="front fas fa-briefcase"></span>
      <a href="#" class="side">reservation</a>
    </li>
    <li class="menu_list">
      <span class="front fas fa-paper-plane"></span>
      <a href="#" class="side">contact</a>
    </li>
  </ul>`;
}

createNavs();
