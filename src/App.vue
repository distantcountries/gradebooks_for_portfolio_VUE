<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-light" style="color:white; padding:1rem 3rem 1rem 3rem;" id="navigation">
      <nav class="nav_wrapper">
      <div class="nav_logo">
        <router-link to="/" style="color:#38a2b8; text-decoration:none">
          <div class="nav_logo_image">
            <img alt="Gradebook" src="./assets/book.png">
          </div>
          <p id="logoText">Online Gradebook</p>
        </router-link>
      </div>
      <div v-if="!isAuthenticated" class="nav_not_authenticated">
        <div class="nav_element">
          <router-link to="/">
            <div class="nav_element_image">
              <img alt="Gradebook" src="./assets/gradebooks.png">
            </div>
            <p>Gradebooks</p>
          </router-link>
        </div>
        <div class="nav_element">
          <router-link to="/login">
            <div class="nav_element_image">
              <img alt="Gradebook" src="./assets/login.png">
            </div>
            <p>Login</p>
          </router-link>
        </div>
        <div class="nav_element">
          <router-link to="/register">
            <div class="nav_element_image">
              <img alt="Gradebook" src="./assets/register.png">
            </div>
            <p>Register</p>
          </router-link> 
        </div>
      </div>
      <div v-if="isAuthenticated" class="nav_authenticated">
        <div class="nav_element">
          <router-link to="/">
            <div class="nav_element_image">
              <img alt="Gradebook" src="./assets/gradebooks.png">
            </div>
            <p>Gradebooks</p>
          </router-link>
        </div>
        <div class="nav_element">
          <router-link to="/teachers">
            <div class="nav_element_image">
              <img alt="Gradebook" src="./assets/professors.png">
            </div>
              <p>All professors</p>
          </router-link>
        </div>
        <div class="nav_element">
          <router-link to="/my-gradebook">
            <div class="nav_element_image">
              <img alt="Gradebook" src="./assets/my_gradebook.png">
            </div>
            <p>My Gradebook</p>
          </router-link>
        </div>
        <div class="nav_element">
          <router-link to="/gradebooks/create">
            <div class="nav_element_image">
              <img alt="Gradebook" src="./assets/add_gradebook.png">
            </div>
            <p>Add Gradebook</p>
          </router-link>
        </div>
        <div class="nav_element">
          <a href="#" @click="logout">
          <div class="nav_element_image">
            <img alt="Gradebook" src="./assets/logout.png">
          </div>
            <p>Logout</p>
          </a> 
        </div>
      </div>
      </nav>
    </nav>
    <router-view/>
    <footer style="display:flex">
      <div class="footer_child">
        <div class="social_media_icons">
          <h5>Online gradebook</h5>
          <div>
            <div class="social_media_icons_links">
              <a href="#"><img alt="Skype" src="./assets/skype.png"></a>
              <a href="#"><img alt="Facebook" src="./assets/facebook.png"></a>
              <a href="#"><img alt="Linkedin" src="./assets/linkedin.png"></a>
              <a href="#"><img alt="Tweeter" src="./assets/tweeter.png"></a>
            </div>
          </div>
        </div>
        <div class="footer_adress">
          <p>
            Smetanina 12<br />
            11040 Belgrade<br />
            Serbia<br />
            +38163 12 34 567
          </p>
        </div>
        <div class="footer_segment_top_button">
          <div id="go_to_top">
            <a href="#navigation">
              <img alt="go_top" src="./assets/top_arrow.png">
              <span>Move to top</span>
            </a> 
          </div>
        </div>
        <div class="footer_copyright">
          <p>
            Copyright 2015-2019 <br />
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { authService } from './services/Auth'
  export default {
    data() {
      return {
        isAuthenticated: authService.isAuthenticated(),
      }
    },

    created() {
      this.$bus.$on('logged', () => {
        this.isAuthenticated = authService.isAuthenticated()
      })
    },

    methods: {
      logout() {
        authService.logout()
        this.$router.push('/login')
      }, 
    }
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

div {
  font-family: 'Muli', sans-serif;
}

#app {
  background-image: radial-gradient(white 40% , #d9d9d9);
}

html {
  scroll-behavior: smooth;
}

/* ---------------------navigation--------------------- */
nav {
  width: 100%;
  box-shadow: 0 3px 2px -2px lightgrey;
  display: flex;
  justify-content: space-between;
}

.nav_wrapper {
  margin:0 auto;
  width: 85%;
  display: flex;
  box-shadow:none;
}

nav .nav_logo {
  width: 25%;
}

.nav_logo .nav_logo_image {
  width: 100%;
  display: flex;
  justify-content: center;
}

.nav_logo .nav_logo_image img {
    width: 30%;
}

.nav_logo:hover {
    opacity: 0.5;
    filter: alpha(opacity=40);
}

.nav_logo #logoText {
  width: 100%;
  color:#ef5656;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}

nav a {
  color: #38a2b8;
}

/* ---------------------navigation nav not authenticated--------------------- */
.nav_not_authenticated {
  width: 35%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav_not_authenticated a:hover, .nav_authenticated a:hover {
  text-decoration: none;
  color: #38a2b8;
  opacity:0.5;
}

.nav_not_authenticated .nav_element {
  width: 33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.nav_element a {
  width: 100%;
}

.nav_element_image {
  display: flex;
  justify-content: center;
}

.nav_element_image img {
  width:80%;
  height: auto;
}

.nav_element p {
  width: 100%;
  text-align: center;
  font-size: 1rem;
}
/* ---------------------navigation nav authenticated--------------------- */

.nav_authenticated {
  width: 68%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav_authenticated .nav_element {
  width: 19%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* ---------------------navigation responsive--------------------- */
@media (max-width: 1220px) {
  .nav_wrapper {
    width: 100%;
  }

  .nav_not_authenticated {
    width: 40%;
  }

  nav .nav_logo {
    width: 25%;
  }

  .nav_logo #logoText {
    font-size: 1.3rem;
  }

  .nav_element_image img {
    width:60%;
  }

  .nav_authenticated {
    width: 68%;
  }

  .nav_authenticated .nav_element {
    width: 25%;
  } 
}

@media (max-width: 992px) {
  .nav_wrapper {
    width: 70%;
    flex-direction: column;
    justify-content: center;
  }

  nav .nav_logo {
    width: 100%;
    justify-content: center;
  }

  nav .nav_logo .nav_logo_image {
    width: 100%;
  }

  nav .nav_logo .nav_logo_image img {
    width: 20%;
  }

  .nav_logo #logoText {
    font-size: 1.3rem;
  }

  .nav_not_authenticated, .nav_authenticated {
    width: 100%;
    justify-content: center;
    flex-direction: column;
  }

  .nav_not_authenticated .nav_element, .nav_authenticated .nav_element {
    width: 70%;
  }

  .nav_element_image img {
    width:35%;
  }
}

@media (max-width: 480px) and (min-width:300px) {
  .nav_wrapper {
    width: 100%;
  }

  .nav_logo #logoText {
    font-size: 1.5rem;
  }

  .nav_not_authenticated .nav_element, .nav_authenticated .nav_element {
    width: 100%;
  }

  .nav_element_image img {
    width:50%;
  }
} 

/* ---------------------footer--------------------- */
footer {
  margin:0 auto;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  background-color: #38a2b8;
  box-shadow: 0px -2px 2px 0px grey;
  padding: 2rem;
}

.footer_child {
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
}

.footer_adress {
  width: 40%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}

.social_media_icons {
  width: 28%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}

.footer_segment_top_button {
  width: 20%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}

.social_media_icons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

footer .footer_child .social_media_icons h5 {
  width: 100%;
  font-weight:bold; 
  text-align:center;
  font-size: 1.3rem;
}

.social_media_icons div {
  width:100%;
  display: flex;
  justify-content: center;
}

.social_media_icons .social_media_icons_links {
  width: 100%;
}

.social_media_icons a {
  width: 22%;
}

.social_media_icons img {
  width:100%;
} 

.social_media_icons a:hover {
  opacity:0.5;
}

footer p {
  text-align: center;
  width: 100%;
} 

.footer_adress p {
  font-weight: bold;
}

#go_to_top {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#go_to_top a {
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
} 

#go_to_top img {
  width: 100%;
}

#go_to_top img:hover {
  opacity: 1;
}

#go_to_top{
  position:relative;
  margin:0 auto;
}

#go_to_top a span{
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  top: -5px;
  left: 105%;
  z-index: 1;
}

#go_to_top a:hover span{
  visibility:visible;
}  

.footer_copyright {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid black;
  width: 100%;
}

/* ---------------------footer responsive--------------------- */
@media (min-width: 1220px) {
  footer {
    padding: 2rem 15rem;
  }
  .social_media_icons {
    width: 20%;
  }

  .social_media_icons div .social_media_icons_links {
    width: 100%;
  }

  .social_media_icons h5 {
    font-size: 1.2rem;
  }
}

@media (max-width: 1220px) {
  footer {
    padding: 2rem 5rem;
  }
  .social_media_icons {
    width: 20%;
  }

  .social_media_icons div .social_media_icons_links {
    width: 100%;
  }

  .social_media_icons h5 {
    font-size: 1.2rem;
  }

  .footer_segment p {
    font-size: 1rem;
  }
}

@media (max-width: 992px) {
  footer {
    box-shadow: 0px -1px 1px 0px grey;
  }

  .footer_segment, .social_media_icons {
    width: 35%;
    margin-bottom: 0.5rem;
  }

  .footer_segment_top_button {
    width: 20%;
    margin-bottom: 0.5rem;
  }

  .social_media_icons div .social_media_icons_links {
     width: 100%;
  }
}

@media (max-width: 700px) {
  .footer_child {
    width: 100%;
    flex-direction: column;
    justify-content: center;
  }

  .social_media_icons, .footer_segment_top_button, .footer_adress {
    width: 100%;
  }

  .social_media_icons .social_media_icons_links a {
    width: 15%;
  }
} 

@media (max-width: 480px) and (min-width:300px) {
  footer {
    padding: 1rem;
  }

  .social_media_icons div .social_media_icons_links {
    width: 80%;
  }
} 
</style>