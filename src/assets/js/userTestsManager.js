"use strict";
const USER_QUIZ_STORAGE = "user_quiz";

/**
 * Constructs the User's Quiz Database
 */
if (!localStorage.getItem(USER_QUIZ_STORAGE)) {
  const userQuiz = [{}];
  localStorage.setItem(USER_QUIZ_STORAGE, JSON.stringify(userQuiz));
}

export default {
  getUserTestsDB() {
    if(!localStorage[USER_QUIZ_STORAGE]) {
      return alert("The User's Tests Table was not found!\n Please reload the app.")
    }
    return JSON.parse(localStorage[USER_QUIZ_STORAGE]);
  },

  getFinishedTest(userId){
    return this.getUserTestsDB().filter(u => u.email === userId);
  }
}


