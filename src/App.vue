<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-light" style="color:white; padding:1rem 3rem 1rem 3rem;" id="navigation">
      <div class="nav_logo">
        <img alt="Gradebook" src="./assets/book.png">
        <router-link to="/" style="color:#38a2b8; text-decoration:none"><span id="logoText">Online Gradebook</span></router-link>
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
    <footer>
      <!-- <div>
        <h5>School</h5>
        <a>About us</a>
        <a></a>

      </div> -->
      <div id="go_to_top">
        <a href="#navigation"><img alt="go_top" src="./assets/top_arrow.png">
          <span>Move to top</span>
        </a>
      </div>

      <p>
        Copyright 2015-2019 <br />
        All rights reserved.
      </p>
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

nav {
  width: 100%;
  box-shadow: 0 3px 2px -2px lightgrey;
  display: flex;
  justify-content: space-between;
  
}

nav .nav_logo {
  width: 25%;
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
  /* width: 50%; */
}

nav a:hover {
  text-decoration: none;
  color: #38a2b8;
  opacity:0.7;
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

.nav_element:hover {
  opacity: 0.7;
  cursor: pointer;
}


.container {
  min-height: 320px;
  width:100%;
}



#logoText {
  color:#ef5656;
  font-size: 1.5rem;
  font-weight: bold;
}

#logoText:hover {
  color:#ffabab;
}

img {
  width: 10%;
  height: 10%;
}

.betweenLinks {
  color: #38a2b8;
}

footer {
  padding: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #38a2b8;
  box-shadow: 0px -2px 2px 0px grey;
}

footer p {
  text-align: center;
  width: 100%;
  color:white;
}


#go_to_top {
  width: 50px;
  height: 50px;
  /* background-color: grey; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* border-radius: 0.2rem; */
}

#go_to_top a {
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

footer img {
  width:100%;
  height: auto;
  opacity:0.5;
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

</style>