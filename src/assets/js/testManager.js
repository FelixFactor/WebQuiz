
import userManager from "./userManager.js";
import utils from "./utils.js";
import userTests from "./userTestsManager.js";

const AVAILABLE_TESTS = "tests";
const QUESTIONS_STORAGE = "questions";
let score = 0;

function userAnswer(questionId, answer) {
  return { questionId, answer };
}
//const availableTests = [];
const arrayofQs = [];
/**
* Test Constructor
* @param {*} test
* @param {*} questions
*/
function currentTest(test, questions) {
  return {
    test,
    questions
  }
}
/**
 * Constructs the Test Database
 * if no DB exists
 */
if (!localStorage.getItem(AVAILABLE_TESTS)) {
  const avaTests = [
    {
      id: 1,
      course: "JavaScript",
      topic: "Conhecimento Básico",
      professor: "João Galamba",
      dificulty: "Média",
      maxScore: 20,
      duration: 2,
      startDate: "2020-10-28",
      repeatTest: true,
      questions: [1, 2, 3, 4]
    },
    {
      id: 2,
      course: "C#",
      topic: ".Net Core",
      professor: "Rafael Santos",
      dificulty: "Fácil",
      maxScore: 10,
      duration: 2,
      startDate: "2020-10-28",
      repeatTest: true,
      questions: [9, 10, 11, 12]
    },
    {
      id: 3,
      course: "SQL",
      topic: "Sql Ninja",
      professor: "Maria de Fátima",
      dificulty: "Fácil",
      maxScore: 20,
      duration: 2,
      startDate: "2020-10-28",
      repeatTest: true,
      questions: [5, 6, 7, 8]
    },
    {
      id: 4,
      course: "Linguagens de Programação",
      topic: "Vários Conceitos",
      professor: "Maria de Fátima",
      dificulty: "Regular",
      maxScore: 20,
      duration: 2,
      startDate: "2020-11-03",
      repeatTest: false,
      questions: [5, 6, 7, 8]
    }
  ];
  localStorage.setItem(AVAILABLE_TESTS, JSON.stringify(avaTests));
}

/**
 * Constructs the Question Database
 * If no database exists
 */
if (!localStorage.getItem(QUESTIONS_STORAGE)) {
  const avaQuestions = [
    {
      id: 1,
      type: "multiple",
      question: "Who invented JavaScript?",
      answers: ["Douglas Crockford", "Sheryl Sandberg", "Brendan Eich"],
      correctAnswer: "Brendan Eich"
    },
    {
      id: 2,
      type: "multiple",
      question: "Which one of these is a JavaScript package manager?",
      answers: ["Node.js", "TypeScript", "npm"],
      correctAnswer: "npm"
    },
    {
      id: 3,
      type: "multiple",
      question: "Which tool can you use to ensure code quality?",
      answers: ["ESLint", "jQuery", "RequireJS", "Angular"],
      correctAnswer: "ESLint"
    },
    {
      id: 4,
      type: "multiple",
      question:
        "Which of the following type of variable is visible only within a function where it is defined?",
      answers: [
        "global variable",
        "local variable",
        "Both of the above.",
        "None of the above."
      ],
      correctAnswer: "local variable"
    },
    {
      id: 5,
      type: "multiple",
      question:
        "Que definição deve-se aplicar quando queremos que um entrada não fique vazia?",
      answers: ["UNIQUE", "DEFAULT", "NOT NULL", "PRIMARY KEY"],
      correctAnswer: "NOT NULL"
    },
    {
      id: 6,
      type: "direct",
      question: "Como se define uma variável em SQL? (só a palavra)",
      correctAnswer: "declare"
    },
    {
      id: 7,
      type: "multiple",
      question: "O que é uma DBMS?",
      answers: [
        "Data Bench Markers",
        "DataBase Management System",
        "Data Base Manager System"
      ],
      correctAnswer: "DataBase Management System"
    },
    {
      id: 8,
      type: "multiple",
      question: "Como se define o campo principal duma tabela?",
      answers: ["UNIQUE", "DEFAULT", "NOT NULL", "PRIMARY KEY"],
      correctAnswer: "PRIMARY KEY"
    },
    {
      id: 9,
      type: "multiple",
      question: "O que é POO?",
      answers: [
        "Perímetro Obtuso",
        "Programa Oleado e Orientado",
        "Programação Orientada a Objectos",
        "Programação Orientada a Objecções"
      ],
      correctAnswer: "Programação Orientada a Objectos"
    },
    {
      id: 10,
      type: "direct",
      question: '"While" e "ForEach" são ciclos de ______.',
      correctAnswer: "iteração"
    },
    {
      id: 11,
      type: "direct",
      question: "Que verbo é usado para fazer update?",
      correctAnswer: "httpput"
    },
    {
      id: 12,
      type: "multiple",
      question: "Onde está guardada a config de uma app NET CORE?",
      answers: ["webconfig", "startup", "program", "runconfig"],
      correctAnswer: "startup"
    }
  ];
  localStorage.setItem(QUESTIONS_STORAGE, JSON.stringify(avaQuestions));
}
/**
  * RETURNS THE QUESTION DATABASE
  * OR AN ERROR IF NONE EXISTS
  *
  */
function questionsDB() {
  if (!localStorage[QUESTIONS_STORAGE]) {
    throw Error("No Question Database was found. Please restart app!");
  }
  return JSON.parse(localStorage[QUESTIONS_STORAGE]);
}
/**
  * RETURNS THE AVAILABLE TESTS IN DATABASE
  * OR AN ERROR IF NONE EXISTS
  */
function testsDB() {
  if (!localStorage[AVAILABLE_TESTS]) {
    throw Error("No Test Database was found. Please restart app!");
  }
  return JSON.parse(localStorage[AVAILABLE_TESTS]);
}
export default {
  /**
   *
   *  find test by ID
   * Looks in DB for a test with a specific ID
   * Returns the test if any is found
   *
   * @param {string} id Test id
   * @returns {test} An object with parameters of a test
   *
   */
  findTestById(id) {
    const avaTests = testsDB();
    return avaTests.find(test => test.id == id);
  },
  /**
   * Get all available test
   *
   * Appends the html to the proper div
   */
  getAllAvailableTests() {
    return testsDB();
  },
  /**
   * Gets the questions from the given quiz Id
   * @param {*} testId
   */
  getCompleteQuiz(testId) {
    //clears the array of previous questions
    if (arrayofQs.length > 0) {
      arrayofQs.length = 0;
    }
    //verify testId for undefined or null
    for (const question of this.findTestById(testId).questions) {
      arrayofQs.push(getQbyId(question));
    }
    //save the current test to localstorage
    const quiz = new currentTest(this.findTestById(testId), arrayofQs);
    //construct the quiz
    return quiz;
  },
  /**
   *
   * @param {*} userId
   * @param {*} quizId
   * @param {*} answers
   * @param {*} score
   */
  currentUserTest(userId, quizId, answers, score, date) {
    return {
      userId,
      quizId,
      answers,
      score,
      date
    };
  },
  /**
   * Submit Test
   * 1 - creates an object with userId, quizId and the user's answers
   * 2 - stores the quiz in DB
   */
  submitTest(testId) {
    score = 0;
    const answers = scoreUserAnswers();
    score = getScore(score, this.findTestById(testId));
    
    //const textHtml = byID("quiz_layout").innerHTML;
    const userQuiz = this.currentUserTest(
      userManager.getUserEmail(),
      testId,
      answers,
      score,
      utils.getCurrentDate() 
    );
    return userTests.storeUSerTest(userQuiz);
  }
}
/**
 * //////////////////////////////////////////////////
 * //
 * ////END EXPORT DEFAULT
 * //
 * //////////////////////////////////////////////////
 */


/**
* Compares the given answer with the correct one and highlights the answer.
* Green or Red
*
* @param {*} answer element containing the answer. Must contain a value!
*/
function checkAnswer(answer) {
  // eslint-disable-next-line no-debugger
  debugger;
  if (answer.value === null) {
    return;
  }
  else if (answer.value.toUpperCase() === arrayofQs.find(i => i.id == answer.id).correctAnswer.toUpperCase()) {
    score += 1;
  }
}
/**
   * Iterates through the user's answers and scores them
   * returning an array with the given answers.
   * @returns {*} userAnswers An array with the pair [Key, Value]
   */
function scoreUserAnswers() {
  const userAnswers = [{}];

  //quiz_layout is the element that holds questions and answers
  //there are div elements holding multiple choice and direct questions
  //it gets all divs in the element quiz_layout and iterates through to check the answers
  for (let item of utils.byID("quiz_layout").getElementsByTagName("div")) {
    if (item.classList[0] == "multiple") { //item is an element containing a question and possible answers
      const hasAnswer = utils.checkRadioBtns(item);
      checkAnswer(hasAnswer);
      //returns question Id with value=undefined if no RB was checked
      userAnswers.push(new userAnswer(hasAnswer.id, hasAnswer.value));
      utils.lockRdBtns(item);
    } else if (item.classList[0] == "direct") {
      const query = item.querySelector("input");
      checkAnswer(query);
      userAnswers.push(new userAnswer(query.id, query.value));
      //locks the text-box
      query.setAttribute("readonly", true);
    }
  }
  return userAnswers;
}
/**
 * returns the calculated score
 * @param {*} real 
 * @param {*} quiz 
 */
function getScore(real, quiz) {
  score = quiz.maxScore / quiz.questions.length;
  return (score *= real);
}
/**
   * Finds a question by its Id and returns it
   *
   * @param {*} id Id of the question to be searched
   */
function getQbyId(id) {
  const qsDB = questionsDB();
  return qsDB.find(q => q.id == id);
}