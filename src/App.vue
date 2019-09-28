<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-light" style="color:white; padding:1rem 3rem 1rem 3rem;" id="navigation">
      <div class="nav_logo">
        <router-link to="/" style="color:#38a2b8; text-decoration:none">
          <img alt="Gradebook" src="./assets/book.png">
          <span id="logoText">Online Gradebook</span>
        </router-link>
      </div>
      <div v-if="!isAuthenticated" class="nav_not_authenticated">
        <div class="nav_element">
          <router-link to="/">
            <div>
              <img alt="Gradebook" src="./assets/gradebooks.png">
            </div>
            <p>Gradebooks</p>
          </router-link>
        </div>
        <div class="nav_element">
          <router-link to="/login">
            <div>
              <img alt="Gradebook" src="./assets/login.png">
            </div>
            <p>Login</p>
          </router-link>
        </div>
        <div class="nav_element">
          <router-link to="/register">
            <div>
              <img alt="Gradebook" src="./assets/register.png">
            </div>
            <p>Register</p>
          </router-link> 
        </div>
      </div>
      <div v-if="isAuthenticated" class="nav_authenticated">
        <div class="nav_element">
          <router-link to="/">
            <div>
              <img alt="Gradebook" src="./assets/gradebooks.png">
            </div>
            <p>Gradebooks</p>
          </router-link>
        </div>
        <div class="nav_element">
          <router-link to="/teachers">
            <div>
              <img alt="Gradebook" src="./assets/professors.png">
            </div>
              <p>All professors</p>
          </router-link>
        </div>
        <div class="nav_element">
          <router-link to="/my-gradebook">
            <div>
              <img alt="Gradebook" src="./assets/my_gradebook.png">
            </div>
            <p>My Gradebook</p>
          </router-link>
        </div>
        <div class="nav_element">
          <router-link to="/gradebooks/create">
            <div>
              <img alt="Gradebook" src="./assets/add_gradebook.png">
            </div>
            <p>Add Gradebook</p>
          </router-link>
        </div>
        <div class="nav_element">
          <a href="#" @click="logout">
          <div>
            <img alt="Gradebook" src="./assets/logout.png">
          </div>
            <p>Logout</p>
          </a> 
        </div>
      </div>
    </nav>
    <router-view/>
    <div class="container"></div>
    <footer style="display:flex">
      <div class="social_media_icons">
        <h5 style="font-weight:bold;">Online gradebook</h5>
        <div>
          <a href="#"><img alt="Skype" src="./assets/skype.png"></a>
          <a href="#"><img alt="Facebook" src="./assets/facebook.png"></a>
          <a href="#"><img alt="Linkedin" src="./assets/linkedin.png"></a>
          <a href="#"><img alt="Tweeter" src="./assets/tweeter.png"></a>
        </div>
      </div>
      <div class="footer_segment">
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

nav .nav_logo {
  width: 25%;
}

.nav_logo img {
    margin:0.5rem;
    height: 100px;
    width: auto;
    border-radius: 0.5rem;
    display: inline-block;
}

.nav_logo:hover {
    opacity: 0.5;
    filter: alpha(opacity=40);
}

.nav_not_authenticated {
  width: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav_authenticated {
  width: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav a {
  color: #38a2b8;
}

.nav_not_authenticated a:hover, .nav_authenticated a:hover {
  text-decoration: none;
  color: #38a2b8;
  opacity:0.5;
}

.nav_authenticated .nav_element {
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.nav_not_authenticated .nav_element {
  width: 33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.nav_element div {
  width: 100%;
  display: flex;
  justify-content: center;
}

.nav_element img {
  width:50%;
  height: auto;
}

.nav_element p {
  width: 100%;
  text-align: center;
}

/* .nav_element:hover {
  opacity: 0.7;
  cursor: pointer;
} */

#logoText {
  color:#ef5656;
  font-size: 1.5rem;
  font-weight: bold;
}

.container {
  min-height: 320px;
  width:100%;
}

/* ---------------------footer--------------------- */

footer {
  margin:0 auto;
  padding: 2rem 25rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #38a2b8;
  box-shadow: 0px -2px 2px 0px grey;
}

.footer_segment, .social_media_icons, .footer_segment_top_button {
  width: 20%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.social_media_icons {
  display: flex;
  flex-direction: column;
}

.social_media_icons div {
  width:100%;
}

.social_media_icons div img {
  width:20%;
} 

.social_media_icons a:hover {
  opacity:0.5;
}

footer p {
  text-align: center;
  width: 100%;
} 

.footer_segment p {
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

</style>