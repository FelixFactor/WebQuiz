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
  isRegisterInputEmpty
} from "./utils.js";

import sessionManager from "./userManager.js";

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
function register(user, repeat_pass) {
  let msg = byID("register_errormsg");

    //Check if any input is empty
    if (
      isRegisterInputEmpty(
        user.email,
        user.pwd,
        repeat_pass,
        user.firstName,
        user.lastName,
        user.address,
        user.nif,
        user.mobileNumber,
        user.birthdate,
        user.control
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
    if (!regexEmail(user.email)) {
      throw new Error("Introduza um email válido.");
    }

    //Validate password
    if (!regexPassword(user.pwd)) {
      throw new Error(
        "Introduza uma password válida (1 Maiúscula, 1 minúscula, 1 dígito, 1 caracter especial(.!$%#))."
      );
    }

    //Validate repeat password
    if (!regexPassword(repeat_pass)) {
      throw new Error("Repetição de password inválida.");
    }

    //Check if repeat password is equal to password
    if (!(repeat_pass === user.pwd)) {
      throw new Error("Passwords não são iguais.");
    }

    //Validate phone
    let result = validatePhone(user.mobileNumber);

    if (!(result === true)) {
      throw new Error(result);
    }

    //Validate tin
    if (!validateTin(user.nif)) {
      throw new Error("Introduza um NIF válido.");
    }

    sessionManager.createUser(user);

    msg.innerHTML = "Conta criada com sucesso.";
    msg.style.color = "green";
    msg.classList.remove("hidden");
    clearFields();
}