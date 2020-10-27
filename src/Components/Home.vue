<template>
  <div id="homepage">
    <header>
      <h1>WebQuiz</h1>
      <nav id="top-nav" class="top-nav">
        <div class="top-nav-element">
          <span id="welcomeUser">Bem-vindo {{currentUser.firstName}} {{currentUser.lastName}} </span>
          <a id="btn_settings" href="" @click.prevent="userSets">Settings</a>
          <a id="btn_logout" href="" @click.prevent="toLogout">Logout</a>
        </div>
      </nav>
    </header>
    
    <div class="main">
      <router-view></router-view>
      <!--LEFT NAVIGATION BAR-->
      <div class="left-nav open" id="left_nav">
        <div class="hamburguer">
          <a id="hamburguer" href="#" @click.prevent="navbar">
            <div></div>
            <div></div>
            <div></div>
          </a>
        </div>
        <div class="left-nav-element" id="btn_available" @click="availableMenu">
          <a>Testes Disponíveis</a>
        </div>
        <div class="left-nav-element" id="btn_finished" @click="finishedMenu">
          <a>Testes Realizados</a>
        </div>
        <div class="left-nav-element" id="btn_scheduled" @click="scheduledMenu">
          <a>Testes Agendados</a>
        </div>
      </div>
      <!--END LEFT NAVIGATION BAR-->
    </div>
    <footer>Footer</footer>
  </div>
</template>

<script>
// import { logout } from "@/assets/js/site.js";
import * as utils from "@/assets/js/utils.js";
import sessionManager from "@/assets/js/userManagement.js";



export default {
  name: "Home",
  data() {
    return {
      currentUser: {
        type: Object,
        required: false
      } 
    }
  },
  create(){
    if(sessionManager.isTokenValid()){

      this.$router.replace({ name: "login" });
    }
  },
  methods: {
    toLogout() {
      document.cookie = "user_jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      this.$router.push({ name: "login" });

      utils.removeFromGroup("left-nav-element", "active");
    },
    navbar() {
      utils.collapse();
    },
    availableMenu() {
      this.$router.push({ name: "available-list" });

      utils.removeFromGroup("left-nav-element", "active");
      utils.addClassById('btn_available', 'active');
    },
    finishedMenu(){
      this.$router.push({ name: "finished-list" });

      utils.removeFromGroup("left-nav-element", "active");
      utils.addClassById('btn_finished', 'active');
    },
    scheduledMenu(){
      this.$router.push({ name: "scheduled-list" });

      utils.removeFromGroup("left-nav-element", "active");
      utils.addClassById('btn_scheduled', 'active');
    },
    userSets(){
      this.$router.push({ name: "userSettings" });

      utils.removeFromGroup("left-nav-element", "active");
    }
  }
};
</script>

<style src="@/assets/css/home.css"></style>
