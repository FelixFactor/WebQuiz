<template>
  <div id="forgot_password" class="grid">
    <label id="forgot_item1">Recuperar Password</label>
    <input
      v-model="email"
      id="forgot_username"
      class="forgotInput"
      type="text"
      placeholder="Enter your email..."
    />

    <input
      v-model="control"
      id="forgot_control"
      class="forgotInput"
      type="text"
      placeholder="Qual a sua cor favorita?"
    />

    <input
      id="forgot_pass"
      class="forgotInput"
      type="password"
      v-model="pwd"
      placeholder="Nova password..."
    />

    <input
      id="forgot_repeat_pass"
      class="forgotInput"
      type="password"
      v-model="repeat_pass"
      placeholder="Repetir nova password..."
    />

    <input
      @click.prevent="recoverAcc"
      id="btn_forgot"
      class="forgotButton"
      type="submit"
      value="Recuperar"
    />

    <label id="forgot_errormsg" class="forgotInput" :class="error? 'error':'ok'">{{errorMsg}}</label>

    <a id="forgot_toLogin" href="#" @click.prevent="toLogin">Voltar ao login</a>
  </div>
</template>

<script>
import utils from "../assets/js/utils.js";
import userManager from "../assets/js/userManager.js";

export default {
  name: "Recover",
  data() {
    return {
      email: "",
      control: "",
      pwd: "",
      repeat_pass: "",
      currentUser: undefined,
      errorMsg: "",
      error: false
    };
  },
  methods: {
    toLogin() {
      this.$router.push({ name: "login" });
    },
    recoverAcc() {
      try {
        //Check if input is empty
        if (
          this.email === "" ||
          this.control === "" ||
          this.pwd === "" ||
          this.repeat_pass === ""
        ) {
          throw new Error("Deve preencher todos os campos.");
        }

        //Validate email
        if (!utils.regexEmail(this.email)) {
          throw new Error("Introduza um email válido.");
        }

        //Validate password
        if (!utils.regexPassword(this.pwd)) {
          throw new Error(
            "Introduza uma password válida (1 Maiúscula, 1 minúscula, 1 dígito, 1 caracter especial(.!$%#))."
          );
        }

        //Validate repeat password
        if (!utils.regexPassword(this.repeat_pass)) {
          throw new Error("Repetição de password inválida.");
        }

        //Check if repeat password is equal to password
        if (!(this.repeat_pass === this.pwd)) {
          throw new Error("Passwords não são iguais.");
        }

        const user = userManager.getUserByEmailAndControl(
          this.email,
          this.control
        );

        if (user === undefined) {
          throw new Error("Utilizador não encontrado.");
        }

        const newUser = {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          pwd: this.pwd,
          salt: "",
          nif: user.nif,
          mobileNumber: user.mobileNumber,
          birthdate: user.birthdate,
          address: user.address,
          country: user.country,
          control: user.control,
          saltControl: user.saltControl
        };

        userManager.removeUser(user);

        userManager.createUser(newUser);

        this.errorMsg = "Conta recuperada com sucesso.";
        utils.clearForgotFields();
      } catch (ex) {
        this.error = true;
        this.errorMsg = ex.message;
        this.pwd = "";
        this.repeat_pass = "";
      }
    },
  },
};
</script>

<style src="@/assets/css/login.css" scoped>
</style>
