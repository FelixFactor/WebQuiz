/* eslint-disable no-unused-vars */
"use strict";

import {
  getCookieValue,
  setCookieValue,
  findMapped,
  generateSalt
} from "./utils.js";
import jsrsasign from "jsrsasign";

const USERS_STORAGE_KEY = "users";
const SECRET = "aP2doagr1$";
const USER_JWT = "user_jwt";
const SALT_LENGTH = 7;

let currentUser = undefined;

if (!localStorage.getItem(USERS_STORAGE_KEY)) {
  const initialUsers = [
    {
      email: "felix@mail.com",
      firstName: "joão",
      lastName: "felix", // pwd is 'abc'
      pwd: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      salt: "0l/CqPdJdB",
      nif: 215698525,
      mobileNumber: 213561987,
      birthdate: new Date(2001, 0, 1), // WET: 01/01/2001
      address: "Av. da República, n. 5 - 7o Dto, 1100-031 Lisboa",
      country: "Espanha"
    }
  ];
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialUsers));
}

export default {
  /** */
  isLoggedIn() {
    if (currentUser === undefined) {
      currentUser = this.requestUserInformation();
    }
    return currentUser !== undefined;
  },
  /** */
  getUser() {
    if (!this.isLoggedIn()) {
      throw new UserError("Currently no user is logged in.");
    }
    return currentUser;
  },
  /** */
  clientSideLogin(email, pwd) {
    currentUser = this.authenticateUser(email, pwd);
    return currentUser;
  },
  /** */
  authenticateUser(username, pwd) {
    const user = this.getUserByLoginCredentials(username, pwd);
    if (!user) {
      throw new UserError("Invalid username and/or password.");
    }
    setCookieValue(USER_JWT, this.generateJWTForUser(user), { maxAge: 86400 });
    return JSON.stringify(this.extractBasicUserInfo(user));
  },
  /** */
  getUserByLoginCredentials(username, pwd) {
    const md = new jsrsasign.KJUR.crypto.MessageDigest({
      alg: "sha256",
      prov: "cryptojs"
    });
    const db = this.usersDB();
    return db.find(
      user => user.email === username && user.pwd === md.digest(user.salt + pwd));
  },
  /** */
  requestUserInformation() {
    const NOT_FOUND = "{}";
    const userJSON = this.getCurrentUser();
    if (!userJSON) {
      throw TypeError(`Unexpected falsy return value: ${userJSON}.`);
    }
    const user = JSON.parse(userJSON);
    if (user === null || Array.isArray(user) || typeof user !== "object") {
      throw TypeError(
        `Unexpected return value from remote method: ${userJSON}.`
      );
    }
    return userJSON !== NOT_FOUND ? user : undefined;
  },
  /** */
  getCurrentUser() {
    const NOT_FOUND = "{}";
    const jwt = getCookieValue(USER_JWT);
    if (!jwt) {
      return NOT_FOUND;
    }
    // let's check if it's a valid JWT
    if (
      !jsrsasign.KJUR.jws.JWS.verifyJWT(jwt, SECRET, {
        alg: ["HS256"],
        verifyAt: "now"
      })
    ) {
      return NOT_FOUND;
    }
    const [header, payload] = jwt
      .split(".")
      .slice(0, -1)
      .map(jsrsasign.b64utoutf8)
      .map(jsrsasign.KJUR.jws.JWS.readSafeJSONString);
    const user = this.getUserByID(payload.sub);
    if (!user) {
      return NOT_FOUND;
    }
    return JSON.stringify(this.extractBasicUserInfo(user));
  },
  /** */
  getUserID() {
    const user = this.getCurrentUser().split(",");
    const email = user[0].split(":");
    return email[1].replaceAll('"', "");
  },
  /** */
  userExists(newUserSpec) {
    return findMapped(this.usersDB(),
      dbUser =>
        (dbUser.email === newUserSpec.email && "Email") ||
        (dbUser.nif === newUserSpec.nif && "NIF") ||
        (dbUser.mobileNumber === newUserSpec.mobileNumber && "Mobile Number")
    );
  },
  /** */
  createUser(userSpec) {
    const existingAttr = this.userExists(userSpec);
    if (existingAttr) {
      throw new UserError(
        `There is already a registered user with the same ${existingAttr}.`
      );
    }
    const md = new jsrsasign.KJUR.crypto.MessageDigest({
      alg: "sha256",
      prov: "cryptojs"
    });
    const salt = generateSalt(SALT_LENGTH);
    const newUser = {
      ...userSpec,
      salt: salt,
      pwd: md.digest(salt + userSpec.pwd)
    };
    this.storeUser(newUser);
  },
  /** */
  storeUser(newUser) {
    const users = this.usersDB();
    users.push(newUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  },
  /** */
  generateJWTForUser(user) {
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
  },
  /** */
  extractBasicUserInfo(user) {
    const { email, firstName, lastName } = user;
    return { email, firstName, lastName };
  },
  /** */
  getUserByID(userID) {
    return this.usersDB().find(user => user.email === userID);
  },
  /** */
  isTokenValid(){        
    const jwt = this.getCookieValue(USER_JWT);
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
  usersDB() {
    if (!localStorage[USERS_STORAGE_KEY]) {
      throw DBError("Database is empty/uninitialized.");
    }
    return JSON.parse(localStorage[USERS_STORAGE_KEY]);
  },
  /** */
  getUserFullName(uname) {
    const user = this.usersDB().find(user => user.email === uname);
    return user.firstName + " " + user.lastName;
  },
  /** */
  removeUser(user) {
    const users = this.usersDB();
    var index = users.map(x=>{return x.email}).indexOf(user.email);
    if (index === -1) return;
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
  }
};

export class UserError extends Error {}
export class LoginError extends UserError {}
export class LogoutError extends UserError {}
class DBError extends Error {}