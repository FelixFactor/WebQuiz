"use strict";

export {
  byID,
  byClass,
  addClassById,
  removeClassById,
  changeCss,
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
  getAllElemByClass,
  hideLoginError,
  hideRegisterError,
  hideForgotError,
  maxDate,
  collapse,
  clearContainer,
  markQuestion,
  openNav,
  formatDate,
  hideSettingsError,
  removeFromGroup,
  lockRdBtns,
  checkRadioBtns,
  getCookieValue,
  setCookieValue,
  delCookie,
  capitalize,
  findMapped,
  someCharIn,
  everyCharIn,
  isDigit,
  when,
  generateSalt
};

function byID(elementId) {
  return document.getElementById(elementId);
}

function byClass(elementClass) {
  return document.getElementsByClassName(elementClass);
}

function addClassById(elementId, className) {
  byID(elementId).classList.add(className);
}

function removeClassById(elementId, className) {
  byID(elementId).classList.remove(className);
}

/**
 * Removes a style from a group of a given class
 *
 * @param {*} cls the given's group class (ex.:'nav-bar')
 * @param {*} stl the style to be removed (ex.:'hidden')
 */
function removeFromGroup(cls, stl) {
  for (let i of getAllElemByClass(cls)) {
    i.classList.remove(stl);
  }
}

function changeCss(elementId, href) {
  byID(elementId).href = href;
}

function regexFirstName(firstName) {
  let regex = /^[a-zA-Z]{2,}$/;

  if (firstName.match(regex) === null) {
    return false;
  }

  return true;
}

function regexLastName(lastName) {
  let regex = /^[a-zA-Z]{3,}$/;

  if (lastName.match(regex) === null) {
    return false;
  }

  return true;
}

//Regex for email
function regexEmail(email) {
  let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (email.match(regex) === null) {
    return false;
  }

  return true;
}

//Regex for password
function regexPassword(pwd) {
  let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.!$%#])[0-9a-zA-Z.!$%#]{8,}$/;

  if (pwd.match(regex) === null) {
    return false;
  }

  return true;
}

//Validation for Tin
function validateTin(value) {
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
}

//Regex for phone number
function validatePhone(phone) {
  let regex = /^[0-9]{1,}-[0-9]{1,}-[0-9]{1,}$/;
  let regex2 = /^[0-9]{3,}$/;

  if (phone.match(regex) === null && phone.match(regex2) === null) {
    return "Introduza um número de telemóvel válido.";
  }

  return true;
}

//Clear fields of register
function clearFields() {
  const newUser = byID("register").getElementsByTagName("input");

  newUser.register_username.value = "";
  newUser.register_pass.value = "";
  newUser.register_repeat_pass.value = "";
  newUser.register_first_name.value = "";
  newUser.register_last_name.value = "";
  newUser.register_address.value = "";
  newUser.register_tin.value = "";
  newUser.register_phone.value = "";
  newUser.register_birth_date.value = "";

  byID("register_country").value = "Portugal";
}

//Clear fields of register
function clearForgotFields() {
  byID("forgot_username").value = "";
}

/**
 * checks for empty fields
 *
 * @returns an error message if one field is empty, false otherwise
 */
function isInputEmpty(uname, pwd) {
  if (uname === "" || pwd === "") {
    throw new Error("Enter username and password.");
  }
  return false;
}

//checks for empty fields
function isRegisterInputEmpty(
  username,
  pass,
  repeat_pass,
  firstName,
  lastName,
  address,
  tin,
  phone,
  birthDate
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
    birthDate === ""
  ) {
    return true;
  }

  return false;
}

/**
 * gets all elements in the given class
 *
 * @param {*} clss element's class
 *
 * @returns an array with all elements
 */
function getAllElemByClass(clss) {
  return Array.from(byClass(clss));
}

//Hide error message in login
function hideLoginError() {
  let msg = byID("errormsg");

  if (!msg.classList.contains("hidden")) {
    msg.classList.add("hidden");
  }
}

//Hide error message in register
function hideRegisterError() {
  let msg = byID("register_errormsg");

  if (!msg.classList.contains("hidden")) {
    msg.classList.add("hidden");
  }
}

//Hide error message in forgot password
function hideForgotError() {
  let msg = byID("forgot_errormsg");

  if (!msg.classList.contains("hidden")) {
    msg.classList.add("hidden");
  }
}

//Hide error message in settings
function hideSettingsError() {
  let msg = byID("settings_errormsg");

  if (!msg.classList.contains("hidden")) {
    msg.classList.add("hidden");
  }
}

//Set max date for register_birth_date
function maxDate() {
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

  byID("register_birth_date").setAttribute("max", value);
}

//Open or collapse left-nav
function collapse() {
  let nav = byID("left_nav");

  if (nav.classList.contains("open")) {
    closeNav(nav);
  } else {
    openNav(nav);
  }
}

//Open left-nav
function openNav(nav) {
  nav.classList.remove("collapsed");
  nav.classList.add("open");

  let btns = Array.from(byClass("left-nav-element"));
  btns.forEach(btn => {
    btn.classList.remove("hidden");
  });
}

//Close left-nav
function closeNav(nav) {
  nav.classList.remove("open");
  nav.classList.add("collapsed");

  let btns = Array.from(byClass("left-nav-element"));
  btns.forEach(btn => {
    btn.classList.add("hidden");
  });
}

/**
 * Clears a container with the given id
 * @param {*} container id of the container to be cleared
 */
function clearContainer(container) {
  if (byID(container).hasChildNodes) {
    while (byID(container).firstChild) {
      byID(container).removeChild(byID(container).firstChild);
    }
  }
}

/**
 * Marks an element with correct or wrong answer
 * with green and red color respectively
 *
 * @param {*} element
 * @param {*} state
 */
function markQuestion(element, state) {
  element.classList.add(state);
}

//Format birth date to yyyy-mm-dd
function formatDate(birthdate) {
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
}

/**
 * Locks radio buttons after submiting the quiz
 * @param {*} btns
 */
function lockRdBtns(btns) {
  for (let btn of btns.getElementsByTagName("input")) {
    btn.disabled = true;
  }
}

/**
 * Iterates the element looking for a checked button.
 * If one is found, returns it.
 *
 * @param {*} arrayofRadioBtns element containing the array of Radio buttons
 *
 * @returns The element that is checked, or undefined if none is found
 */
function checkRadioBtns(arrayofRadioBtns) {
  for (let rdBtn of arrayofRadioBtns.getElementsByTagName("input")) {
    if (rdBtn.checked) {
      return rdBtn;
    }
  }
  return undefined;
}


////////////////////////////////////////////////////////////////////////////////
///
///     COOKIES AND WEB STORAGE API
///
////////////////////////////////////////////////////////////////////////////////

/**
 * Returns the value of the first cookie given by key.
 *
 * @param {string} key A non-empty string with the cookie key.
 * @returns {string} A string with the value.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
 */
function getCookieValue(key) {
  if (key.length === 0) {
    throw new TypeError(`Empty key.`);
  }
  const pair = document.cookie.split("; ").find(pair => pair.startsWith(key));
  if (pair) {
    return pair.split("=")[1];
  }
  return undefined;
}

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
function setCookieValue(
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
}

/**
 * Deletes the cookie
 *
 * @param {string} key A non-empty string with the cookie key.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
 */
function delCookie(key) {
  setCookieValue(key, "", { maxAge: 0 });
}

////////////////////////////////////////////////////////////////////////////////
///
///     GENERAL UTILITIES
///
////////////////////////////////////////////////////////////////////////////////

/**
 * Like find, but returns what the mapping function returns.
 * mappingFn acts also as a predicate: findMapped stops searching
 * through the arrayLikeObject as soon as mappingFn returns a thruthy
 * value. It's that truthy value that is returned by this function
 *
 * @param {arrayLikeObject} arrayLikeObject Sequence of objects
 * supporting indexing (numerical properties starting at 0) and with
 * a length property.
 * @param {Function} mappingFn Acts both as predicate and as extraction
 * function
 * @returns {truthy} First truthy value returned by mappingFn
 */
function findMapped(arrayLikeObject, mappingFn) {
  for (let i = 0; i < arrayLikeObject.length; ++i) {
    const mappedValue = mappingFn(arrayLikeObject[i]);
    if (mappedValue) {
      return mappedValue;
    }
  }
  return undefined;
}

function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : str;
}

function someCharIn(str, chars) {
  for (let char of str) {
    if (chars.includes(char)) {
      return true;
    }
  }
  return false;
}

function everyCharIn(str, chars) {
  for (let char of str) {
    if (!chars.includes(char)) {
      return false;
    }
  }
  return typeof str === "string" && !!str;
}

// function everyCharIn2(str, chars) {
//   return str.split("").every(char => chars.includes(char));
// }

const isDigit = (function() {
  const regExp = /^[0-9]+$/;
  return str => regExp.test(str);
})();

// function isDigit(str) {
//     return /^[0-9]+$/.test(str);
// }

/**
 * Insted of writing code like this:
 *
 *      const v = testAndGetValue();
 *      if (v) {
 *          doSomethingWithValue(v);
 *      }
 *      // v not needed anymore
 *
 * we can write it like this with 'when':
 *
 *   when(testAndGetValue(), (v) => doSomethingWithValue(v));
 *
 * @param {boolean} expressionResult A truthy or falsy value
 * @param {function} useExpressionResultFn  A function that is called
 *    when expressionResult is truthy with expressionResult as its argument.
 */
function when(expressionResult, useExpressionResultFn) {
  return expressionResult ? useExpressionResultFn(expressionResult) : false;
}

/**
 * Constructs the private "environment" for the closure generateSalt.
 */
const generateSalt = (function() {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const LETTERS = letters.toUpperCase();
  const digits = "0123456789";
  const punct = "$%.#";
  const alphabet = letters + LETTERS + digits + punct;

  /**
   * Generate a cryptographically strong random salt suitable for
   * password hashing.
   *
   * @param {Number} length Salt length
   * @returns {string} Salt value
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
   */
  return function generateSalt(length) {
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    return array
      .reduce(function(symbols, val) {
        const index = val % alphabet.length;
        symbols.push(alphabet[index]);
        return symbols;
      }, [])
      .join("");
  };
})();
