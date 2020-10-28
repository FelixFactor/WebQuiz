"use strict";
const USER_QUIZ_STORAGE = "user_quiz";
const INDEX_TABLE_ID = "count";

/**
 * Constructs the User's Quiz Database
 */
if (!localStorage.getItem(USER_QUIZ_STORAGE)) {
  const userQuiz = [];
  localStorage.setItem(USER_QUIZ_STORAGE, JSON.stringify(userQuiz));
}

if(!localStorage.getItem(INDEX_TABLE_ID)) {
  const count = 0;
  localStorage.setItem(INDEX_TABLE_ID, count);
}

function getIndex(){
  if(!localStorage[INDEX_TABLE_ID]) {
    return alert("The User's Tests Index was not found!\n Please reload the app.")
  }
  return JSON.parse(localStorage[INDEX_TABLE_ID]);
}
function getUserTestsDB() {
  if(!localStorage[USER_QUIZ_STORAGE]) {
    return alert("The User's Tests Table was not found!\n Please reload the app.")
  }
  return JSON.parse(localStorage[USER_QUIZ_STORAGE]);
}

export default {
  getFinishedTests(userId){
    return getUserTestsDB().filter(u => u.userId === userId);
  },
  /**
   * Stores a User Test in DB.
   * User test contains: userId, quizId, an array with the answers with Key, Value pair (QID, String)
   */
  storeUSerTest(userQuiz) {
    let counter = getIndex();
    counter += 1;
    const db = getUserTestsDB();
    db.push(userQuiz);
    userQuiz.index = counter;
    localStorage.setItem(INDEX_TABLE_ID, counter)
    localStorage.setItem(USER_QUIZ_STORAGE, JSON.stringify(db));
    return userQuiz.index;
  },
  getUserTestById(index) {
    return getUserTestsDB().find(x => x.index === index);
  }
}


