"use strict";
/* eslint-disable no-unused-vars */
import {
  byID,
  addClassById,
  removeClassById,
  changeCss,
  clearFields,
  clearForgotFields,
  getAllElemByClass,
  hideLoginError,
  hideRegisterError,
  hideForgotError,
  maxDate,
  clearContainer,
  openNav,
  hideSettingsError,
  removeFromGroup
} from "./utils.js";

import * as testManager from "./testManager.js";

import { getUserFullName } from "./userManager.js";

export {
  switchPage,
  toHome,
  ToLogin,
  showHide,
  loginToRegister,
  registerToLogin,
  loginToForgot,
  forgotToLogin,
  switchTab
};

//SHOW SCREENS
//refactor para receber id de um element e mostrar essa view!!!
function switchPage(id) {
  clearContainer("quiz_container");

  //logout
  if (id === "login") {
    ToLogin();
  }
  //login
  else if (id === "home") {
    toHome();
  } else if (id === "settings") {
    toSettings();
  }
  //other ids
  // else {
  //     let section = '';

  //     //gets the id of the left_nav element clicked
  //     let elem = byID(this.id);

  //     //turn all nav-links inactive
  //     let btns = getAllElemByClass('left-nav-element');
  //     btns.forEach(btn => {
  //         btn.classList.remove('active');
  //     });

  //     //makes the clicked element the active link
  //     addClassById(this.id, 'active');

  //     //switch case
  //     if (elem.id === 'btn_available') {
  //         section = byID('available');
  //     }
  //     if (elem.id === 'btn_finished') {
  //         section = byID('finished');
  //     }
  //     if (elem.id === 'btn_scheduled') {
  //         section = byID('scheduled');
  //     }

  //     showHide(section);
  //}
}

function switchTab() {
  let section = "";

  //gets the id of the left_nav element clicked
  let elem = byID(this.id);

  removeFromGroup("left-nav-element", "active");

  //makes the clicked element the active link
  addClassById(this.id, "active");

  clearContainer("quiz_box_available");

  clearContainer("quiz_container");

  //switch case
  if (elem.id === "btn_available") {
    testManager.getAlAvailableTests();
  } else if (elem.id === "btn_finished") {
    testManager.getAllFinishedTests();
  } else if (elem.id === "btn_scheduled") {
    section = byID("scheduled");
  }

  const btns = document.querySelectorAll("a[id=btn_enterTest]");
  btns.forEach(btn => {
    btn.addEventListener("click", goToTest);
  });

  showHide(byID("available"));
}

function startPage() {
  //populates Available Tests page
  testManager.getAlAvailableTests();
  // //registers the button to take the tests
  const btns = document.querySelectorAll("a[id=btn_enterTest]");
  btns.forEach(btn => {
    btn.addEventListener("click", goToTest);
  });
}

function toHome(uname) {
  //change title
  document.title = "Home";

  byID("welcomeUser").innerHTML += getUserFullName(uname);

  //gets the css link element and applies the new css
  changeCss("currentstyle", "css/home.css");

  //gets the element login page and hides it
  addClassById("login", "hidden");

  //gets the element homepage and shows it
  removeClassById("homepage", "hidden");

  //itereates all buttons in left_nav to remove active class
  removeFromGroup("left-nav-element", "active");

  //gets the element available and removes hidden class from it
  //the first page to be shown is the Available Quiz
  startPage();
  removeClassById("available", "hidden");

  //gets the element left_nav and shows it
  removeClassById("left_nav", "hidden");

  //gets the element top-nav and shows it
  removeClassById("top-nav", "hidden");

  //gets the element btn_available  and adds active class to it
  switchPage("btn_available");
}

//logouts to Login Page
function ToLogin() {
  //change title
  document.title = "Login";

  //gets the element available and hides it
  addClassById("available", "hidden");

  //gets the element scheduled and hides it
  addClassById("scheduled", "hidden");

  //gets the element finished and hides it
  addClassById("finished", "hidden");

  //gets the element testes and hides it
  addClassById("quiz_container", "hidden");

  //gets the element left_nav and hides it
  addClassById("left_nav", "hidden");

  //gets the element top-nav and hides it
  addClassById("top-nav", "hidden");
  
  //gets the element homepage and hides it
  addClassById("homepage", "hidden");

  //gets the element settings and shows it
  addClassById("settings", "hidden");

  //gets the css link element and applies the new css
  changeCss("currentstyle", "css/login.css");

  //gets the element login page and shows it
  removeClassById("login", "hidden");

  //Open left_nav
  openNav(byID("left_nav"));

  byID("welcomeUser").innerHTML = "Bem-vindo ";

  //remove quiz elements
  clearContainer("quiz_box_available");

  clearContainer("quiz_container");
}

/**
 * Receives a section(element) and after removing all others from view shows the given section
 *
 * @param {*} section
 */
function showHide(section) {
  //hides all sections
  getAllElemByClass("main-element").forEach(element => {
    element.classList.add("hidden");
  });

  //shows the section of the id passed
  section.classList.remove("hidden");

  //gets the element settings and shows it
  addClassById("settings", "hidden");
}

/**
 * Captures the target data-value, that called the event
 * Sends the Id to the testManager to retrieve the quiz from DB
 * The testManager then creates the HTML accordingly and appends it to the main page
 * Removes the styling from the nav-bar buttons
 * Finally displays the test for the user and adds an eventlistener to the submit button
 */
function goToTest() {
  let value = event.currentTarget.getAttribute("data-value");
  //alert(value);

  testManager.getQuestions(value);

  removeFromGroup("left-nav-element", "active");

  showHide(byID("quiz_container"));

  //the button now exists, it will be binded to the event listener
  byID("btn_submitTest").addEventListener("click", testManager.submitTest);
}

//Change from login to register
function loginToRegister() {
  //change title
  document.title = "Registar";

  //gets the css link element and applies the new css
  changeCss("currentstyle", "css/register.css");

  //gets the element login and hides it
  addClassById("login", "hidden");

  //gets the element register and shows it
  removeClassById("register", "hidden");

  maxDate();
  clearFields();
  hideRegisterError();
}

//Change from register to login
function registerToLogin() {
  //change title
  document.title = "Login";

  //gets the css link element and applies the new css
  changeCss("currentstyle", "css/login.css");

  //gets the element register and hides it
  addClassById("register", "hidden");

  //gets the element login and shows it
  removeClassById("login", "hidden");

  hideLoginError();
}

//Change from login to forgot password
function loginToForgot() {
  //change title
  document.title = "Recuperar Password";

  //gets the element login and hides it
  addClassById("login", "hidden");

  //gets the element register and shows it
  removeClassById("forgot_password", "hidden");

  clearForgotFields();
  hideForgotError();
}

//Change from forgot password to login
function forgotToLogin() {
  //change title
  document.title = "Login";

  //gets the element login and hides it
  addClassById("forgot_password", "hidden");

  //gets the element register and shows it
  removeClassById("login", "hidden");

  hideLoginError();
}

//Go to settings
function toSettings() {
  removeFromGroup("left-nav-element", "active");

  //gets the element available and hides it
  addClassById("available", "hidden");

  //gets the element scheduled and hides it
  addClassById("scheduled", "hidden");

  //gets the element finished and hides it
  addClassById("finished", "hidden");

  //gets the element testes and hides it
  addClassById("quiz_container", "hidden");

  //gets the element settings and shows it
  removeClassById("settings", "hidden");

  hideSettingsError();
  maxDate();
}
