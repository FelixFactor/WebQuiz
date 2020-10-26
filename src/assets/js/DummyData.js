"use strict";
const USER_QUIZ_STORAGE = "user_quiz";




/**
 * Constructs the User's Quiz Database
 */
if (!localStorage.getItem(USER_QUIZ_STORAGE)) {
  const userQuiz = [{}];
  localStorage.setItem(USER_QUIZ_STORAGE, JSON.stringify(userQuiz));
}
