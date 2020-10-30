/* eslint-disable no-unused-vars */
"use strict";

import utils from "./utils.js";
import jsrsasign from "jsrsasign";

const USERS_STORAGE_KEY = "users";
const SECRET = "aP2doagr1$";
const USER_JWT = "user_jwt";
const SALT_LENGTH = 7;

let currentUser = null;

function userDetails(email, firstName, lastName) {
  return {
    email,
    firstName,
    lastName
  };
}

if (!localStorage.getItem(USERS_STORAGE_KEY)) {
  const initialUsers = [
    {
      email: "felix@mail.com",
      firstName: "joão",
      lastName: "felix", // pwd is 'abc'
      pwd: "cfb28b9de815d0607f6b779c3bd6df1328c1a3ae399c7b4cc6a34a19ed898adf",
      salt: "0l/CqPdJdB",
      nif: 215698525,
      mobileNumber: 213561987,
      birthdate: new Date(2001, 0, 1), // WET: 01/01/2001
      address: "Av. da República, n. 5 - 7o Dto, 1100-031 Lisboa",
      country: "Espanha",
      saltControl: "0l/CqPdJdB",
      control: "a204f38100fc7d9242eeab2d1d16bb787fb4715baf0dcd2361e28c7347a26ff9" //Laranja
    }
  ];
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialUsers));
}

/** */
function usersDB() {
  if (!localStorage[USERS_STORAGE_KEY]) {
    throw DBError("A base de dados não existe!");
  }
  return JSON.parse(localStorage[USERS_STORAGE_KEY]);
}

export default {
  /** */
  clientSideLogin(email, pwd) {
    currentUser = authenticateUser(email, pwd);
    return currentUser;
  },
  /** */
  getCurrentUser() {
    const jwt = utils.getCookieValue(USER_JWT);
    if (!jwt) {
      return null;
    }
    // let's check if it's a valid JWT
    if (
      !jsrsasign.KJUR.jws.JWS.verifyJWT(jwt, SECRET, {
        alg: ["HS256"],
        verifyAt: "now"
      })
    ) {
      return null;
    }
    const [header, payload] = jwt
      .split(".")
      .slice(0, -1)
      .map(jsrsasign.b64utoutf8)
      .map(jsrsasign.KJUR.jws.JWS.readSafeJSONString);
    const user = this.getUserByID(payload.sub);
    if (!user) {
      return null;
    }
    return new userDetails(user.email, user.firstName, user.lastName);
  },
  /**
   * returns the current user's email
   */
  getUserEmail() {
    const user = this.getCurrentUser();
    return user.email;
  },
  /**
   * Verifies the inputs given
   * If all inputs are correct, creates a new User
   * Sends any erros that are found in verifications
   * @param {*} user the user to be created
   * @param {*} repeat_pass repetition of the choosen password for verification
   */
  register(user, repeat_pass) {
    let msg = utils.byID("register_errormsg");
    //Check if any input is empty
    if (
      utils.isRegisterInputEmpty(
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
    if (!utils.regexFirstName(user.firstName)) {
      throw new Error("Introduza o primeiro nome.");
    }

    //Validate last name
    if (!utils.regexLastName(user.lastName)) {
      throw new Error("Introduza o apelido.");
    }

    //Validate email
    if (!utils.regexEmail(user.email)) {
      throw new Error("Introduza um email válido.");
    }

    //Validate password
    if (!utils.regexPassword(user.pwd)) {
      throw new Error(
        "Introduza uma password válida (1 Maiúscula, 1 minúscula, 1 dígito, 1 caracter especial(.!$%#))."
      );
    }

    //Validate repeat password
    if (!utils.regexPassword(repeat_pass)) {
      throw new Error("Repetição de password inválida.");
    }

    //Check if repeat password is equal to password
    if (!(repeat_pass === user.pwd)) {
      throw new Error("Passwords não são iguais.");
    }

    //Validate phone
    let result = utils.validatePhone(user.mobileNumber);

    if (!(result === true)) {
      throw new Error(result);
    }

    //Validate tin
    if (!utils.validateTin(user.nif)) {
      throw new Error("Introduza um NIF válido.");
    }

    this.createUser(user);

    msg.innerHTML = "Conta criada com sucesso.";
    msg.style.color = "green";
    msg.classList.remove("hidden");
    utils.clearFields();
  },
  /**
   * Creates a new User with the given properties
   * @param {*} userSpec 
   */
  createUser(userSpec) {
    const existingAttr = userExists(userSpec);
    if (existingAttr) {
      throw new UserError(
        `Já existe um user com o mesmo ${existingAttr}.`
      );
    }
    const salt = generateSalt(SALT_LENGTH);
    if (userSpec.salt === "") {
      if (userSpec.saltControl === "") {
        const hashPwd = createHash(salt, userSpec.pwd);
        const hashControl = createHash(salt, userSpec.control);
        const newUser = {
          ...userSpec,
          salt: salt,
          saltControl: salt,
          control: hashControl,
          pwd: hashPwd
        };
        storeUser(newUser);
      } else {
        const updtPwd = createHash(salt, userSpec.pwd);
        const newUser = {
          ...userSpec,
          salt: salt,
          pwd: updtPwd
        };
        storeUser(newUser);
      }
    } else {
      const newUser = userSpec;
      storeUser(newUser);
    }
  },
  /**
   * Gets a user by its ID 
   * @param {*} userID the user's email
   */
  getUserByID(userID) {
    return usersDB().find(user => user.email === userID);
  },
  /**
   * Checks for a user with the given email
   * If any is found verifies the control given against the user account control
   * returns a user if verification is true, undefined otherwise
   * @param {*} email 
   * @param {*} control 
   */
  getUserByEmailAndControl(email, control) {
    const user = usersDB().find(user => user.email === email);
    if (!user) {
      throw new Error("Não existe nenhum user com esse email.");
    }
    const userCtrl = createHash(user.saltControl, control)
    if (user.control === userCtrl) {
      return user;
    }
    return undefined;
  },
  /**
   * verifies the JWT 
   */
  isTokenValid() {
    const jwt = utils.getCookieValue(USER_JWT);
    if (!jwt) {
      return false
    }
    // let's check if it's a valid JWT
    if (!jsrsasign.KJUR.jws.JWS.verifyJWT(jwt, SECRET, { alg: ['HS256'], verifyAt: 'now' })) {
      return false;
    }
    return true;
  },
  /** */
  getUserFullName(uname) {
    const user = usersDB().find(user => user.email === uname);
    return user.firstName + " " + user.lastName;
  },
  /** */
  removeUser(user) {
    const users = usersDB();
    var index = users.map(x => { return x.email }).indexOf(user.email);
    if (index === -1) return;
    users.splice(index, 1);
    savesDb(users);
  }
};
/**
 * Receives a new user to be added to the localstorage
 * @param {*} newUser 
 */
function storeUser(newUser) {
  const users = usersDB();
  users.push(newUser);
  savesDb(users);
}
/**
 * 
 * @param {*} users 
 */
function savesDb(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}
/**
   * creates a hashed string from the parameters
   * @param {*} salt 
   * @param {*} input 
   */
function createHash(salt, input) {
  const md = new jsrsasign.KJUR.crypto.MessageDigest({
    alg: "sha256",
    prov: "cryptojs"
  });
  md.updateString(salt + input);
  return md.digest();
}
/** */
function userExists(newUserSpec) {
  return utils.findMapped(usersDB(),
    dbUser =>
      (dbUser.email === newUserSpec.email && "Email") ||
      (dbUser.nif === newUserSpec.nif && "NIF") ||
      (dbUser.mobileNumber === newUserSpec.mobileNumber && "Mobile Number")
  );
}
/** */
function authenticateUser(username, pwd) {
  const user = getUserByLoginCredentials(username, pwd);
  if (!user) {
    throw new UserError("Username/password não está correto.");
  }
  utils.setCookieValue(USER_JWT, generateJWTForUser(user), { maxAge: 86400 });
  return new userDetails(user.email, user.firstName, user.lastName);
}
/**
   * Generates a unique JWT token for the given user
   * @param {*} user 
   */
  function generateJWTForUser(user) {
    const header = JSON.stringify({ alg: "HS256", typ: "JWT" });
    const now = jsrsasign.KJUR.jws.IntDate.get("now");
    const end = jsrsasign.KJUR.jws.IntDate.get("now + 1day");
    const payload = JSON.stringify({
      sub: user.email, // SUBject of the JWT (the user)
      iat: now, // Issued AT: time in seconds since UNIX epoch
      nbf: now, // Not BeFore: same
      exp: end // EXPiration time: same
    });
    // testing shows that the .sign method calls base64Url
    return jsrsasign.KJUR.jws.JWS.sign("HS256", header, payload, SECRET);
  }
/** */
function getUserByLoginCredentials(username, pwd) {
  const md = new jsrsasign.KJUR.crypto.MessageDigest({
    alg: "sha256",
    prov: "cryptojs"
  });
  const db = usersDB();
  const user = db.find(
    user => user.email === username);
  if(user === undefined){
    throw new Error("Não existe nenhum user com esse email.")
  }
  md.updateString(user.salt + pwd);
  return db.find(
    user => user.email === username && user.pwd === md.digest());
}
/** */
function requestUserInformation() {
  const userJSON = this.getCurrentUser();
  if (!userJSON) {
    throw TypeError(`Erro inesperado: ${userJSON}.`);
  }
  const user = JSON.parse(userJSON);
  if (user === null || Array.isArray(user) || typeof user !== "object") {
    throw TypeError(
      `O valor retornado não coincide: ${userJSON}.`
    );
  }
  return userJSON !== null ? user : undefined;
}
/**
 * Constructs the private "environment" for the closure generateSalt.
 */
const generateSalt = (function() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const LETTERS = letters.toUpperCase();
  const digits = '0123456789';
  const punct = '$%.#';
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

      return array.reduce(function(symbols, val) {
          const index = val % alphabet.length;
          symbols.push(alphabet[index]);
          return symbols;
      }, []).join('');
  }
})();
export class UserError extends Error { }
export class LoginError extends UserError { }
export class LogoutError extends UserError { }
class DBError extends Error { }