<template>
  <div id="settings" class="gridSettings">
    <div id="settings_item1">
      <label>Nome</label>
      <input id="settings_first_name" class="" type="text" v-model="input.firstName"/>
    </div>
    <div id="settings_item2">
      <label>Apelido</label>
      <input id="settings_last_name" class="" type="text" v-model="input.lastName"/>
    </div>
    <div id="settings_item3">
      <label>Email</label>
      <input id="settings_username" class="" type="text" v-model="input.email"/>
    </div>
    <div id="settings_item4">
      <label>Password</label>
      <input id="settings_pass" class="" type="password" v-model="input.pwd"/>
    </div>
    <div id="settings_item5">
      <label>Repetir Password</label>
      <input id="settings_repeat_pass" class="" type="password" v-model="confirmedPassword"/>
    </div>
    <div id="settings_item6">
      <label>Telemóvel</label>
      <input id="settings_phone" class="" type="text" v-model="input.mobileNumber"/>
    </div>
    <div id="settings_item7">
      <label>País</label>
      <select id="settings_country" class="" v-model="input.country">
        <option value="Portugal">Portugal</option>
        <option value="Espanha">Espanha</option>
        <option value="França">França</option>
        <option value="Inglaterra">Inglaterra</option>
      </select>
    </div>
    <div id="settings_item8">
      <label>Morada</label>
      <input id="settings_address" class="" type="text" v-model="input.address"/>
    </div>
    <div id="settings_item9">
      <label>Data Nascimento</label>
      <input id="settings_birth_date" class="" type="date" v-model="input.birthdate"/>
    </div>
    <div id="settings_item10">
      <label>NIF</label>
      <input id="settings_tin" class="" type="text" v-model="input.nif"/>
    </div>
    <input id="save_settings" type="submit" value="Guardar alterações" @click.prevent="saveSettings"/>
    <label id="settings_errormsg" class="hidden"></label>
  </div>
</template>

<script>
import userManager from "../assets/js/userManager.js";
import utils from "../assets/js/utils.js";

export default {
    name: "UserSettings",
    props: {currentUSer: Object},
    data(){
        return{
          input: {
        firstName: "",
        lastName: "",
        email: "",
        pwd: "",
        mobileNumber: "",
        country: "",
        address: "",
        birthdate: "",
        nif: "",
      },
      confirmedPassword: "",
    }
  },
  created() {
    this.loadUser();
  },
  mounted(){
    this.maxDate();
  },
  methods:{
    saveSettings(){
      const email = userManager.getUserEmail();
      const user = userManager.getUserByID(email);
      let msg = utils.byID("settings_errormsg");

      try{
        if(this.input.pwd==="" && this.confirmedPassword===""){
          utils.ValidateFields(this.input.firstName, this.input.lastName, this.input.email, this.input.mobileNumber, this.input.nif);

          const newUser = {...this.input, salt:"", control: user.control, saltControl: user.saltControl};

          userManager.removeUser(user);

          userManager.createUser(newUser);

          msg.innerHTML = "Definições alteradas com sucesso.";
          msg.style.color = "green";
          msg.classList.remove("hidden");
          utils.byID("welcomeUser").innerHTML = "Bem-vindo ";
          utils.byID("welcomeUser").innerHTML += userManager.getUserFullName(newUser.email);
        }
        else{
          utils.ValidateFields(this.input.firstName, this.input.lastName, this.input.email, this.input.mobileNumber, this.input.nif);

          //Validate password
          if (!utils.regexPassword(this.input.pwd)) {
            throw new Error(
              "Introduza uma password válida (1 Maiúscula, 1 minúscula, 1 dígito, 1 caracter especial(.!$%#))."
            );
          }

          //Validate repeat password
          if (!utils.regexPassword(this.confirmedPassword)) {
            throw new Error("Repetição de password inválida.");
          }

          //Check if repeat password is equal to password
          if (!(this.confirmedPassword === this.input.pwd)) {
            throw new Error("Passwords não são iguais.");
          }
          const newUser = {...this.input, salt:"", control: user.control, saltControl: user.saltControl};

          userManager.removeUser(user);

          userManager.createUser(newUser);

          msg.innerHTML = "Definições alteradas com sucesso.";
          msg.style.color = "green";
          msg.classList.remove("hidden");
          utils.byID("welcomeUser").innerHTML = "Bem-vindo ";
          utils.byID("welcomeUser").innerHTML += userManager.getUserFullName(newUser.email);
        }

        this.input.pwd = "";
        this.confirmedPassword= "";
      }
      catch(ex){
        msg.innerHTML = ex.message;
        msg.style.color = "red";
        msg.classList.remove("hidden");
      }
    },
    loadUser(){
      //gets the current user's email
      const email = userManager.getUserEmail();
      const user = userManager.getUserByID(email);
      this.input.firstName=user.firstName;
      this.input.lastName=user.lastName;
      this.input.email=user.email;
      this.input.mobileNumber=user.mobileNumber;
      this.input.country=user.country;
      this.input.address=user.address;
      this.input.birthdate=utils.formatDate(user.birthdate);
      this.input.nif=user.nif;
    },
    maxDate(){
      utils.maxDate(utils.byID('settings_birth_date'));
    }
  }
}
</script>

<style scoped>

</style>