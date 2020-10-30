<template>
  <div id="register" class="registerGrid">
    <label id="register_item1">Criar conta no WebQuiz</label>
    <div id="register_item2">
      <label>Nome</label>
      <input
        id="register_first_name"
        class="registerInput"
        type="text"
        v-model="input.firstName"
      />
    </div>
    <div id="register_item3">
      <label>Apelido</label>
      <input
        id="register_last_name"
        class="registerInput"
        type="text"
        v-model="input.lastName"
      />
    </div>
    <div id="register_item4">
      <label>Email</label>
      <input
        id="register_username"
        class="registerInput"
        type="text"
        v-model="input.email"
      />
    </div>
    <div id="register_item12">
      <label>Pergunta de controlo (Qual a sua cor favorita?)</label>
      <input
        id="register_control"
        class="registerInput"
        type="text"
        v-model="input.control"
      />
    </div>
    <div id="register_item5">
      <label>Password</label>
      <input
        id="register_pass"
        class="registerInput"
        type="password"
        v-model="input.pwd"
      />
    </div>
    <div id="register_item6">
      <label>Repetir Password</label>
      <input
        id="register_repeat_pass"
        class="registerInput"
        type="password"
        v-model="repeat_pass"
      />
    </div>
    <div id="register_item7">
      <label>Telemóvel</label>
      <input
        id="register_phone"
        class="registerInput"
        type="text"
        v-model="input.mobileNumber"
      />
    </div>
    <div id="register_item8">
      <label>País</label>
      <select id="register_country" class="registerInput" v-model="input.country">
        <option value="Portugal">Portugal</option>
        <option value="Espanha">Espanha</option>
        <option value="França">França</option>
        <option value="Inglaterra">Inglaterra</option>
      </select>
    </div>
    <div id="register_item9">
      <label>Morada</label>
      <input
        id="register_address"
        class="registerInput"
        type="text"
        v-model="input.address"
      />
    </div>
    <div id="register_item10">
      <label>Data Nascimento</label>
      <input
        id="register_birth_date"
        class="registerInput"
        type="date"
        v-model="input.birthdate"
      />
    </div>
    <div id="register_item11">
      <label>NIF</label>
      <input
        id="register_tin"
        class="registerInput"
        type="text"
        v-model="input.nif"
      />
    </div>
    <input
      id="btn_register"
      class="registerButton"
      type="submit"
      value="Criar Conta"
      v-on:click="registerUser"
    />
    <label id="register_errormsg" class="registerInput hidden"></label>
    
    <input
      id="toLogin"
      class="registerButton"
      type="submit"
      value="Já tem conta?"
      v-on:click="returnLogin"
    />
  </div>
</template>

<script>
import userManager from "@/assets/js/userManager.js";
import utils from "@/assets/js/utils.js";

export default {
  name: "register",
  data() {
    return {
      input: {
        firstName: "",
        lastName: "",
        email: "",
        pwd: "",
        mobileNumber: "",
        country: "Portugal",
        address: "",
        birthdate: "",
        nif: "",
        control: "",
        salt: "",
        saltControl: ""
      },
      repeat_pass: "",
      currentUser: undefined,
      error: null
    };
  },
  create() {
    if (userManager.isLoggedIn()) {
      console.log("Current user already logged in.");
      this.$router.push({ name: "home" });
    }
  },
  mounted(){
    this.maxDate();
  },
  methods: {
    registerUser() {
      try{
        userManager.register(this.input, this.repeat_pass);
      }catch(e){
        utils.byID('register_errormsg').innerHTML = e.message;
        utils.byID('register_errormsg').style.color = "red";
        utils.byID('register_errormsg').classList.remove("hidden");
      }
    },
    returnLogin() {
      this.$router.push({ name: "login" });
    },
    maxDate(){
      utils.maxDate();
    }
  },
};
</script>

<style src="../assets/css/register.css" scoped>
</style>
