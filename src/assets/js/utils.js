"use strict";

export default {
  /**
   * 
   * @param {*} elementId 
   */
  byID(elementId) {
    return document.getElementById(elementId);
  },
  /**
   * 
   * @param {*} elementClass 
   */
  byClass(elementClass) {
    return document.getElementsByClassName(elementClass);
  },
  /**
   * 
   * @param {*} elementId 
   * @param {*} className 
   */
  addClassById(elementId, className) {
    this.byID(elementId).classList.add(className);
  },
  /**
   * 
   * @param {*} elementId 
   * @param {*} className 
   */
  removeClassById(elementId, className) {
    this.byID(elementId).classList.remove(className);
  },
  /**
   * Removes a style from a group of a given class
   * @param {*} cls the given's group class (ex.:'nav-bar')
   * @param {*} stl the style to be removed (ex.:'hidden')
   */
  removeFromGroup(cls, stl) {
    for (let i of this.getAllElemByClass(cls)) {
      i.classList.remove(stl);
    }
  },
  /**
   * 
   * @param {*} firstName 
   */
  regexFirstName(firstName) {
    let regex = /^[a-zA-Z]{2,}$/;
    if (firstName.match(regex) === null) {
      return false;
    }
    return true;
  },
  /**
   * 
   * @param {*} lastName 
   */
  regexLastName(lastName) {
    let regex = /^[a-zA-Z]{3,}$/;
    if (lastName.match(regex) === null) {
      return false;
    }
    return true;
  },
  /**
   * Regex for email
   * @param {*} email 
   */
  regexEmail(email) {
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regex) === null) {
      return false;
    }
    return true;
  },
  /**
   * Regex for password
   * @param {*} pwd 
   */
  regexPassword(pwd) {
    let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.!$%#])[0-9a-zA-Z.!$%#]{8,}$/;
    if (pwd.match(regex) === null) {
      return false;
    }
    return true;
  },
  /**
   * Validation for Tin
   * @param {*} value 
   */
  validateTin(value) {
    const nif = typeof value === "string" ? value : value.toString();
    const validationSets = {
      one: ["1", "2", "3", "5", "6", "8"],
      two: [
        "45",
        "70",
        "71",
        "72",
        "74",
        "75",
        "77",
        "79",
        "90",
        "91",
        "98",
        "99"
      ]
    };
    if (nif.length !== 9) {
      return false;
    }
    if (
      !validationSets.one.includes(nif.substr(0, 1)) &&
      !validationSets.two.includes(nif.substr(0, 2))
    ) {
      return false;
    }
    const total =
      nif[0] * 9 +
      nif[1] * 8 +
      nif[2] * 7 +
      nif[3] * 6 +
      nif[4] * 5 +
      nif[5] * 4 +
      nif[6] * 3 +
      nif[7] * 2;
    const modulo11 = Number(total) % 11;
    const checkDigit = modulo11 < 2 ? 0 : 11 - modulo11;
    return checkDigit === Number(nif[8]);
  },
  /**
   * Regex for phone number
   * @param {*} phone 
   */
  validatePhone(phone) {
    let regex = /^[0-9]{1,}-[0-9]{1,}-[0-9]{1,}$/;
    let regex2 = /^[0-9]{3,}$/;
    if (phone.match(regex) === null && phone.match(regex2) === null) {
      return "Introduza um número de telemóvel válido.";
    }
    return true;
  },
  /**
   * Clear fields of register
   */
  clearFields() {
    const newUser = this.byID("register").getElementsByTagName("input");
    newUser.register_username.value = "";
    newUser.register_pass.value = "";
    newUser.register_repeat_pass.value = "";
    newUser.register_first_name.value = "";
    newUser.register_last_name.value = "";
    newUser.register_address.value = "";
    newUser.register_tin.value = "";
    newUser.register_phone.value = "";
    newUser.register_birth_date.value = "";
    newUser.register_control.value = "";
    this.byID("register_country").value = "Portugal";
  },
  /**
   * Clear fields of register
   */
  clearForgotFields() {
    this.byID("forgot_username").value = "";
    this.byID("forgot_control").value = "";
    this.byID("forgot_pass").value = "";
    this.byID("forgot_repeat_pass").value = "";
  },
  /**
   * checks for empty fields
   * @returns an error message if one field is empty, false otherwise
   */
  isInputEmpty(uname, pwd) {
    if (uname === "" || pwd === "") {
      throw new Error("Introduza um email e uma password para aceder ao portal!");
    }
    return false;
  },
  /**
   * checks for empty fields
   * @param {*} username 
   * @param {*} pass 
   * @param {*} repeat_pass 
   * @param {*} firstName 
   * @param {*} lastName 
   * @param {*} address 
   * @param {*} tin 
   * @param {*} phone 
   * @param {*} birthDate 
   * @param {*} control 
   */
  isRegisterInputEmpty(
    username,
    pass,
    repeat_pass,
    firstName,
    lastName,
    address,
    tin,
    phone,
    birthDate,
    control
  ) {
    if (
      username === "" ||
      pass === "" ||
      repeat_pass === "" ||
      firstName === "" ||
      lastName === "" ||
      address === "" ||
      tin === "" ||
      phone === "" ||
      birthDate === "" ||
      control === ""
    ) {
      return true;
    }
    return false;
  },
  /**
   * gets all elements in the given class
   *
   * @param {*} clss element's class
   *
   * @returns an array with all elements
   */
  getAllElemByClass(clss) {
    return Array.from(this.byClass(clss));
  },
  /**
   * Hide error message in login
   */
  hideLoginError() {
    let msg = this.byID("errormsg");
    if (!msg.classList.contains("hidden")) {
      msg.classList.add("hidden");
    }
  },
  /**
   * Hide error message in register
   */
  hideRegisterError() {
    let msg = this.byID("register_errormsg");
    if (!msg.classList.contains("hidden")) {
      msg.classList.add("hidden");
    }
  },
  /**
   * Hide error message in forgot password
   */
  hideForgotError() {
    let msg = this.byID("forgot_errormsg");
    if (!msg.classList.contains("hidden")) {
      msg.classList.add("hidden");
    }
  },
  /**
   * Hide error message in settings
   */
  hideSettingsError() {
    let msg = this.byID("settings_errormsg");
    if (!msg.classList.contains("hidden")) {
      msg.classList.add("hidden");
    }
  },
  /**
   * Set max date for register_birth_date & settings_birth_date
   */
  maxDate(element) {
    var dtToday = new Date();
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if (month < 10) {
      month = "0" + month.toString();
    }
    if (day < 10) {
      day = "0" + day.toString();
    }
    var value = year + "-" + month + "-" + day;
    element.setAttribute("max", value);
  },
  /**
   * Gets the current date in a string
   */
  getCurrentDate(){
    var today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes();
    return date+' '+time;
  },
  /**
   * return an new Date object with the values from a string
   * @param {*} date the string with a date separated with a '-'
   */
  returnDate(date){
    return new Date(date.split('-')[0], date.split('-')[1], date.split('-')[2])
  },
  //Open or collapse left-nav
  collapse() {
    let nav = this.byID("left_nav");
    if (nav.classList.contains("open")) {
      this.closeNav(nav);
    } else {
      this.openNav(nav);
    }
  },
  //Open left-nav
  openNav(nav) {
    nav.classList.remove("collapsed");
    nav.classList.add("open");
    let btns = Array.from(this.byClass("left-nav-element"));
    btns.forEach(btn => {
      btn.classList.remove("hidden");
    });
  },
  //Close left-nav
  closeNav(nav) {
    nav.classList.remove("open");
    nav.classList.add("collapsed");
    let btns = Array.from(this.byClass("left-nav-element"));
    btns.forEach(btn => {
      btn.classList.add("hidden");
    });
  },
  /**
   * Clears a container with the given id
   * @param {*} container id of the container to be cleared
   */
  clearContainer(container) {
    if (this.byID(container).hasChildNodes) {
      while (this.byID(container).firstChild) {
        this.byID(container).removeChild(this.byID(container).firstChild);
      }
    }
  },
  /**
   * Marks an element with correct or wrong answer
   * with green and red color respectively
   *
   * @param {*} element
   * @param {*} state
   */
  markQuestion(element, state) {
    element.classList.add(state);
  },
  /**
   * Format birth date to yyyy-mm-dd
   */
  formatDate(birthdate) {
    let date = new Date(birthdate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    date.toLocaleDateString();
    let dt = date.getDate();
    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return year + "-" + month + "-" + dt;
  },
  /**
   * Locks radio buttons after submiting the quiz
   * @param {*} btns
   */
  lockRdBtns(btns) {
    for (let btn of btns.getElementsByTagName("input")) {
      btn.disabled = true;
    }
  },
  /**
   * Iterates the element looking for a checked button.
   * If one is found, returns it.
   *
   * @param {*} arrayofRadioBtns element containing the array of Radio buttons
   *
   * @returns The element that is checked, or undefined if none is found
   */
  checkRadioBtns(arrayofRadioBtns) {
    for (let rdBtn of arrayofRadioBtns.getElementsByTagName("input")) {
      if (rdBtn.checked) {
        return rdBtn;
      }
    }
    return { id: arrayofRadioBtns.id, value: null };
  },
  /**
   * Validates inputs with a regex expression
   */
  ValidateFields(firstName, lastName, Email, phone, tin) {
    //Validate first name
    if (!this.regexFirstName(firstName)) {
      throw new Error("Introduza o primeiro nome.");
    }
    //Validate last name
    if (!this.regexLastName(lastName)) {
      throw new Error("Introduza o apelido.");
    }
    //Validate email
    if (!this.regexEmail(Email)) {
      throw new Error("Introduza um email válido.");
    }
    //Validate phone
    let result = this.validatePhone(phone.toString());
    if (!(result === true)) {
      throw new Error(result);
    }
    //Validate tin
    if (!this.validateTin(tin)) {
      throw new Error("Introduza um NIF válido.");
    }
  },
  /**
   * Returns the value of the first cookie given by key.
   *
   * @param {string} key A non-empty string with the cookie key.
   * @returns {string} A string with the value.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
   */
  getCookieValue(key) {
    if (key.length === 0) {
      throw new TypeError(`Empty key.`);
    }
    const pair = document.cookie.split("; ").find(pair => pair.startsWith(key));
    if (pair) {
      return pair.split("=")[1];
    }
    return undefined;
  },
  /**
   * Creates or sets a new cookie with key and value and other options.
   *
   * @param {string} key A non-empty string with the cookie key.
   * @param {string} value A string with the new value.
   * @param {object} param2 Specification object
   *      @param {Number} maxAge Key age in seconds
   *      @param {Date} expires Expiration date
   *      @param {boolean} sameSite If this should be a same-site only
   *      cookie. If false, then the cookie can be used in cross-site
   *      requests, making the app more vulnerable to CSRF attacks.
   *      @param {boolean} secure If true, then this cookie will only be
   *      sent in HTTPS connections.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
   */
  setCookieValue(
    key,
    value,
    { maxAge, expires, sameSite, secure } = {}
  ) {
    if (key.length === 0) {
      throw new TypeError(`Empty key.`);
    }
    maxAge = maxAge || maxAge === 0 ? `; max-age=${maxAge}` : "";
    expires = expires ? `; expires=${expires.toUTCString()}` : "";
    sameSite = sameSite ? "; samesite" : "";
    secure = secure ? "; secure" : "";
    document.cookie = `${key}=${value}${maxAge}${expires}${sameSite}${secure}`;
  },
  /**
   * Like find, but returns what the mapping  returns.
   * mappingFn acts also as a predicate: findMapped stops searching
   * through the arrayLikeObject as soon as mappingFn returns a thruthy
   * value. It's that truthy value that is returned by this 
   *
   * @param {arrayLikeObject} arrayLikeObject Sequence of objects
   * supporting indexing (numerical properties starting at 0) and with
   * a length property.
   * @param {Function} mappingFn Acts both as predicate and as extraction
   * 
   * @returns {truthy} First truthy value returned by mappingFn
   */
  findMapped(arrayLikeObject, mappingFn) {
    for (let i = 0; i < arrayLikeObject.length; ++i) {
      const mappedValue = mappingFn(arrayLikeObject[i]);
      if (mappedValue) {
        return mappedValue;
      }
    }
    return undefined;
  }
}

