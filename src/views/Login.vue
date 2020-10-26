<template>
  <div id="login" class="grid">
    <label id="item1">
      Bem Vindo ao WebQuiz
    </label>

    <input
      id="username"
      class="loginInput"
      type="text"
      placeholder="Enter your email..."
      v-model="email"/>

    <input
      id="pwd"
      class="loginInput"
      type="password"
      placeholder="Enter your password..."
      v-model="pass"/>

    <input id="btn_login" class="loginButton" type="submit" v-on:click="toLogin"/>

    <label id="errormsg" class="loginInput hidden"></label>

    <a id="toForgot" href="#" @click.prevent="toForgot">Esqueceu-se da palavra-passe?</a>

    <input id="toRegister" class="loginButton" type="submit" value="Criar Conta"
      v-on:click="toRegister"/>
  </div>
</template>

<script>
import sessionManager from "@/assets/js/userManagement.js";
import * as utils from "@/assets/js/utils.js";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      pass: "",
      currentUser: undefined,
      error: null
    };
  },
  // created() {
  //   if (sessionManager.isLoggedIn()) {
  //     this.$router.push({ name: "home" });
  //   }
  // },
  methods: {
    toLogin() {
      try{
        utils.isInputEmpty(this.email, this.pass);
        this.currentUser = sessionManager.clientSideLogin(this.email, this.pass);
        this.$router.push({ name: "home" });
      }catch(ex){
        utils.byID('errormsg').innerHTML = ex.message;
        utils.byID('errormsg').classList.remove("hidden");
      }
    },
    toRegister() {
      this.$router.push({ name: "register" });
    },
    toForgot(){
      this.$router.push({name: "recover"});
    },
    getCurrentUser() {
      sessionManager.getUser();
    }
  }
};
</script>

<style src="@/assets/css/login.css" scoped></style>
