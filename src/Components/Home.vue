<template>
  <div id="homepage">
    <header>
      <h1><img src="@/assets/icon.png" width="25" height="25" alt=""> WebQuiz</h1>
      <nav id="top-nav" class="top-nav">
        <div class="top-nav-element">
          <span id="welcomeUser" >Bem-vindo {{user.fullname}}</span>

          <router-link :to="{ name: 'user-settings' }">
            <a id="btn_settings">Opções de Conta</a>
          </router-link>

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

        <div class="left-nav-element" id="btn_available" @click.prevent="loadAvailable">
          <a>Testes Disponíveis</a>
        </div>

        <router-link :to="{ name: 'finished-list', params:{currentUser: this.currentUser} }">
          <div class="left-nav-element" id="btn_finished">
            <a>Testes Realizados</a>
          </div>
        </router-link>

        <router-link :to="{ name: 'scheduled-list' }">
          <div class="left-nav-element" id="btn_scheduled">
            <a>Testes Agendados</a>
          </div>
        </router-link>
      </div>
      <!--END LEFT NAVIGATION BAR-->
    </div>
    <footer></footer>
  </div>
</template>

<script>
import utils from "@/assets/js/utils.js";
import userManager from "@/assets/js/userManager.js";

export default {
  name: "Home",
  data() {
    return {
      user:{
        fullname: ""
      },
      currentUser: null
    };
  },
  created() {
    if (!userManager.getCurrentUser()) {
      this.$router.replace({ name: "login" });
    }
    else{
      this.currentUser = userManager.getCurrentUser();
      this.user.fullname = this.getFullname();
    }
  },
  methods: {
    toLogout() {
      document.cookie = "user_jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      this.currentUser = null;
      this.$router.push({ name: "login" });
    },
    navbar() {
      utils.collapse();
    },
    loadAvailable(){
      this.$router.push({name: 'available-list'});
    },
    getFullname(){
      return this.currentUser === null? "unknow":this.currentUser.firstName +" "+ this.currentUser.lastName;
    }
  },
};
</script>

<style src="@/assets/css/home.css"></style>
