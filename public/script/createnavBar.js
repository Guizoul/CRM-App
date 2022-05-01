export function createNavs() {
  const header = document.querySelector(".header");
  header.innerHTML += `<section class="navigation">
  <div class="nav-container">
    <div class="brand">
      <a href="http://www.inpt.ac.ma/"
        ><img class="logoinpt" src="../public/imgs/log.png" srcset=""
      /></a>
      <p class="desc">DIGITAL INNOVATION BY INPT</p>
      
    </div>
    <nav>
      <div class="nav-mobile">
        <p id="navbar-toggle"><span></span></p>
      </div>
      <ul class="nav-list">
        <li>
          <a href="#!">Home</a>
        </li>
        
        <li>
          <a href="#!" class="booking">Booking</a>
          <ul class="navbar-dropdown">
            <li>
              <a href="#!">Sass</a>
            </li>
            <li>
              <a href="#!">Less</a>
            </li>
            <li>
              <a href="#!">Stylus</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#!">Notificaiton <i class="fa fa-bell-o"></i></a>
          <ul class="navbar-dropdown">
            <li>
              <a href="#!">Sass</a>
            </li>
            <li>
              <a href="#!">Less</a>
            </li>
            <li>
              <a href="#!">Stylus</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#!">Contact</a>
        </li>
        <li>
        <img class="user" src="../public/imgs/user.png" srcset=""
        />
        <ul class="navbar-dropdown">
            <li class="username">
              USERNAME
            </li>
            <li>
              <button class ="logout">logout</button>
            </li>
      </li>
      
      </ul>
    </nav>
  </div>
</section>`;
}

export function createFooter() {
  const footer = document.querySelector(".footer");
  footer.innerHTML = ` <div class="footer-left">
    <span><img class="logoinpt" src="./public/imgs/logoinpt.png" srcset="" /></span>

  <p class="footer-links">
    <a href="#" class="link-1">Home</a>

    <a href="#">Home</a>

    <a href="#">About</a>

    <a href="#">Contact</a>
  </p>

  <p class="footer-name">
    <i>institut Nationale des postes et telecominication</i> © 2015
  </p>
</div>

<div class="footer-center">
  <div>
    <i class="fa fa-map-marker"></i>
    <p><span>2 avenue Allal Al Fassi Madinat Al Irfane, Rabat</p>
  </div>

  <div>
    <i class="fa fa-phone"></i>
    <p>+212 5380-02701</p>
  </div>

  <div>
    <i class="fa fa-envelope"></i>
    <p><a href="http://www.inpt.ac.ma/en/communication-systems">Contact</a></p>
  </div>
</div>

<div class="footer-right">
  <p class="footer-about">
    <span>About Us</span>
    L’INPT est la seule grande école d'ingénieurs au Maroc offrant un
    cadre propice à des études supérieures très poussées dans le domaine
    du digital, à l'ouverture à l'internationale, ainsi qu'au
    développement personnel des futures élites du pays.
  </p>

  <div class="footer-icons">
    <a href="https://web.facebook.com/www.inpt.ac.ma"><i class="fa fa-facebook"></i></a>
    <a href="https://ma.linkedin.com/in/inpt-rabat-370378a6"><i class="fa fa-linkedin"></i></a>
  </div>
</div>`;
}
