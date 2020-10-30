<template>
  <div id="login" class="grid">
    <label id="item1">
      <img src="@/assets/icon.png" alt="">
      <h1>Bem Vindo ao WebQuiz</h1>
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

    <input id="btn_login" class="loginButton" type="submit" v-on:click="toLogin" value="Entrar"/>

    <label id="errormsg" class="loginInput hidden"></label>

    <a id="toForgot" href="#" @click.prevent="toForgot">Esqueceu-se da palavra-passe?</a>

    <input id="toRegister" class="loginButton" type="submit" value="Criar Conta"
      v-on:click="toRegister"/>
  </div>
</template>

<script>
import userManager from "@/assets/js/userManager.js";
import utils from "@/assets/js/utils.js";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      pass: "",
      currentUser: undefined
    };
  },
  created() {
    if (userManager.getCurrentUser()) {
      this.$router.push({ name: "home" });
    }
    //userManager.getHash();
  },
  methods: {
    toLogin() {
      try{
        utils.isInputEmpty(this.email, this.pass);

        //Validate email
        if (!utils.regexEmail(this.email)) {
          throw new Error("Introduza um email válido.");
        }

        this.currentUser = userManager.clientSideLogin(this.email, this.pass);
        if(this.currentUser == undefined){
          this.$router.replace({ name: "login" });
        }
        this.$router.push({ name: "home"});
      }catch(ex){
        utils.byID('errormsg').innerHTML = ex.message;
        utils.byID('errormsg').classList.remove("hidden");
        this.pass = "";
      }
    },
    toRegister() {
      this.$router.push({ name: "register" });
    },
    toForgot(){
      this.$router.push({name: "recover"});
    },
    getCurrentUser() {
      userManager.getUser();
    }
  }
};
</script>



<style src="@/assets/css/login.css" scoped>
h1{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
