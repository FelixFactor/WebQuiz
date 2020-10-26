/* eslint-disable no-unused-vars */

import {
  byID,
  regexFirstName,
  regexLastName,
  regexEmail,
  regexPassword,
  validateTin,
  validatePhone,
  clearFields,
  clearForgotFields,
  isInputEmpty,
  isRegisterInputEmpty,
  collapse,
  formatDate
} from "./utils.js";

import sessionManager from "./userManagement.js";

import { switchPage } from "./viewManager.js";

export { register, logout };

/**
 *
 * /basic checks for input
 *
 * checks the inputs against the "database" in localStorage
 * returns true if the user exists and password matches, false otherwise
 */
// function login() {
//   let uname = byID("username").value;
//   let pwd = byID("pwd").value;
//   let msg = byID("errormsg");

//   try {
//     isInputEmpty(uname, pwd);
//     sessionManager.clientSideLogin(uname, pwd);
//   } catch (e) {
//     msg.innerHTML = e.message;
//     msg.classList.remove("hidden");
//   }
// }

/**
 * Logouts a User
 * 1 - Checks if account exists in localstorage
 * 2 - Gets the current user
 * 3 - Compares with the JWT token
 * 4 - Deletes the JWT token
 * 5 - Redirects to login screen
 */
function logout() {
  sessionManager.clientSideLogout();
}

/**
 *
 * checks all inputs for errors
 * throws errors accordingly
 *
 */
function register(user) {
  let msg = byID("register_errormsg");

    //Check if any input is empty
    if (
      isRegisterInputEmpty(
        user.Email,
        user.password,
        user.confirmedPassword,
        user.firstName,
        user.lastName,
        user.address,
        user.NIF,
        user.phone,
        user.birthDate
      )
    ) {
      throw new Error("Deve preencher todos os campos.");
    }

    //Validate first name
    if (!regexFirstName(user.firstName)) {
      throw new Error("Introduza o primeiro nome.");
    }

    //Validate last name
    if (!regexLastName(user.lastName)) {
      throw new Error("Introduza o apelido.");
    }

    //Validate email
    if (!regexEmail(user.username)) {
      throw new Error("Introduza um email válido.");
    }

    //Validate password
    if (!regexPassword(user.pass)) {
      throw new Error(
        "Introduza uma password válida (1 Maiúscula, 1 minúscula, 1 dígito, 1 caracter especial(.!$%#))."
      );
    }

    //Validate repeat password
    if (!regexPassword(user.repeat_pass)) {
      throw new Error("Repetição de password inválida.");
    }

    //Check if repeat password is equal to password
    if (!(user.confirmedPassword === user.pass)) {
      throw new Error("Passwords não são iguais.");
    }

    //Validate phone
    let result = validatePhone(user.phone);

    if (!(result === true)) {
      throw new Error(result);
    }

    //Validate tin
    if (!validateTin(user.NIF)) {
      throw new Error("Introduza um NIF válido.");
    }

    sessionManager.createUser(user);

    msg.innerHTML = "Conta criada com sucesso.";
    msg.style.color = "green";
    msg.classList.remove("hidden");
    clearFields();
}

//Recover password
function recoverPassword() {
  let email = byID("forgot_username").value;
  let msg = byID("forgot_errormsg");

  try {
    //Check if input is empty
    if (email === "") {
      throw new Error("Deve preencher todos os campos.");
    }

    msg.innerHTML = "O email para recuperar a password foi enviado.";
    msg.style.color = "green";
    msg.classList.remove("hidden");
    clearForgotFields();
  } catch (ex) {
    msg.innerHTML = ex.message;
    msg.style.color = "red";
    msg.classList.remove("hidden");
  }
}

//Go to settings
function goToSettings() {
  const user = sessionManager.getCurrentUser().split(",");
  const email = user[0].split(":");
  let User = sessionManager.getUserByID(email[1].replaceAll('"', ""));

  byID("settings_first_name").value = User.firstName;
  byID("settings_last_name").value = User.lastName;
  byID("settings_username").value = User.email;
  byID("settings_phone").value = User.mobileNumber;
  byID("settings_address").value = User.address;
  byID("settings_birth_date").value = formatDate(User.birthdate);
  byID("settings_tin").value = User.nif;
}

//Save settings
function saveSettings() {
  const user = sessionManager.getCurrentUser().split(",");
  const email = user[0].split(":");
  let User = sessionManager.getUserByID(email[1].replaceAll('"', ""));
  let firstName = byID("settings_first_name").value;
  let lastName = byID("settings_last_name").value;
  let Email = byID("settings_username").value;
  let phone = byID("settings_phone").value;
  let address = byID("settings_address").value;
  let birthDate = byID("settings_birth_date").value;
  let tin = byID("settings_tin").value;
  let pwd = byID("settings_pass").value;
  let repeatPwd = byID("settings_repeat_pass").value;
  let msg = byID("settings_errormsg");

  try {
    if (pwd === "" && repeatPwd === "") {
      //Validate first name
      if (!regexFirstName(firstName)) {
        throw new Error("Introduza o primeiro nome.");
      }

      //Validate last name
      if (!regexLastName(lastName)) {
        throw new Error("Introduza o apelido.");
      }

      //Validate email
      if (!regexEmail(Email)) {
        throw new Error("Introduza um email válido.");
      }

      //Validate phone
      let result = validatePhone(phone);

      if (!(result === true)) {
        throw new Error(result);
      }

      //Validate tin
      if (!validateTin(tin)) {
        throw new Error("Introduza um NIF válido.");
      }

      const newUser = {
        email: Email,
        firstName: firstName,
        lastName: lastName,
        pwd: User.pwd,
        salt: User.salt,
        nif: tin,
        mobileNumber: phone,
        birthdate: birthDate,
        address: address
      };

      sessionManager.removeUser(User);

      sessionManager.createUser(newUser);

      msg.innerHTML = "Definições alteradas com sucesso.";
      msg.style.color = "green";
      msg.classList.remove("hidden");
      byID("welcomeUser").innerHTML = "Bem-vindo ";
      byID("welcomeUser").innerHTML += sessionManager.getUserFullName(newUser.email);
    } else {
      //Validate first name
      if (!regexFirstName(firstName)) {
        throw new Error("Introduza o primeiro nome.");
      }

      //Validate last name
      if (!regexLastName(lastName)) {
        throw new Error("Introduza o apelido.");
      }

      //Validate email
      if (!regexEmail(Email)) {
        throw new Error("Introduza um email válido.");
      }

      //Validate password
      if (!regexPassword(pwd)) {
        throw new Error(
          "Introduza uma password válida (1 Maiúscula, 1 minúscula, 1 dígito, 1 caracter especial(.!$%#))."
        );
      }

      //Validate repeat password
      if (!regexPassword(repeatPwd)) {
        throw new Error("Repetição de password inválida.");
      }

      //Check if repeat password is equal to password
      if (!(repeatPwd === pwd)) {
        throw new Error("Passwords não são iguais.");
      }

      //Validate phone
      let result = validatePhone(phone);

      if (!(result === true)) {
        throw new Error(result);
      }

      //Validate tin
      if (!validateTin(tin)) {
        throw new Error("Introduza um NIF válido.");
      }

      const newUser = {
        email: Email,
        firstName: firstName,
        lastName: lastName,
        pwd: pwd,
        salt: "",
        nif: tin,
        mobileNumber: phone,
        birthdate: birthDate,
        address: address
      };

      sessionManager.removeUser(User);

      sessionManager.createUser(newUser);

      msg.innerHTML = "Definições alteradas com sucesso.";
      msg.style.color = "green";
      msg.classList.remove("hidden");
      byID("welcomeUser").innerHTML = "Bem-vindo ";
      byID("welcomeUser").innerHTML += sessionManager.getUserFullName(newUser.email);
    }
  } catch (ex) {
    msg.innerHTML = ex.message;
    msg.style.color = "red";
    msg.classList.remove("hidden");
  }
}
