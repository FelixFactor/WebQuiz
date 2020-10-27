
import userManager from "./userManager.js";
import { byID, markQuestion, lockRdBtns, checkRadioBtns } from "./utils.js";
import userTests from "./userTestsManager.js";

const AVAILABLE_TESTS = "tests";
const QUESTIONS_STORAGE = "questions";
const USER_QUIZ_STORAGE = "user_quiz";
let score = 0;


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
      startDate: "2020-10-28T00:00:00.000Z",
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
      startDate: "2020-10-28T00:00:00.000Z",
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
      startDate: "2020-10-28T00:00:00.000Z",
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
      startDate: "2020-10-28T15:00:00.000Z",
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
      correctAnswer: "PRIMARY KEY"
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

//const availableTests = [];
const arrayofQs = [];


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
    const avaTests = this.testsDB();
    return avaTests.find(test => test.id == id);
  },

  /**
   * RETURNS THE AVAILABLE TESTS IN DATABASE
   * OR AN ERROR IF NONE EXISTS
   */
  testsDB() {
    if (!localStorage[AVAILABLE_TESTS]) {
      throw Error("No Test Database was found. Please restart app!");
    }
    return JSON.parse(localStorage[AVAILABLE_TESTS]);
  },

  /**
   * RETURNS THE QUESTION DATABASE
   * OR AN ERROR IF NONE EXISTS
   *
   */
  questionsDB() {
    if (!localStorage[QUESTIONS_STORAGE]) {
      throw Error("No Question Database was found. Please restart app!");
    }
    return JSON.parse(localStorage[QUESTIONS_STORAGE]);
  },

  /**
   * GETS USER'S FINISHED TESTS
   * OR AN ERROR IF NONE EXISTS
   */
  userTestsDB() {
    if (!localStorage[USER_QUIZ_STORAGE]) {
      throw Error("No Question Database was found. Please restart app!");
    }
    return JSON.parse(localStorage[USER_QUIZ_STORAGE]);
  },

  /**
   * Get all available test
   *
   * Appends the html to the proper div
   */
  getAllAvailableTests() {
    return this.testsDB();
  },

  /**
   * gets all finished user's quizes
   * renders the list of quizes
   */
  getAllFinishedTests() {
    const currentUser = userManager.getUserEmail();
    let quizlist = [];
    for (let quiz of this.userTestsDB()) {
      if (quiz.userId == currentUser) {
        quizlist.push(this.findTestById(quiz.quizId));
      }
    }
    this.renderQuizElement(quizlist);
  },

  /**
 * Test Constructor
 * @param {*} test
 * @param {*} questions
 */
  currentTest(test, questions) {
    return {
      test,
      questions
    }
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
      arrayofQs.push(this.getQbyId(question));
    }
    //save the current test to localstorage
    const quiz = new this.currentTest(this.findTestById(testId), arrayofQs);

    //construct the quiz
    return quiz;
  },

  /**
   * Finds a question by its Id and returns it
   *
   * @param {*} id Id of the question to be searched
   */
  getQbyId(id) {
    const qsDB = this.questionsDB();
    return qsDB.find(q => q.id == id);
  },

  /**
   *
   * @param {*} userId
   * @param {*} quizId
   * @param {*} answers
   * @param {*} score
   */
  currentUserTest(userId, quizId, answers, score) {
    return {
      userId,
      quizId,
      answers,
      score
    };
  },

  /**
   * Submit Test
   * 1 - creates an object with userId, quizId and the user's answers
   * 2 - stores the quiz in DB
   */
  submitTest(testId) {
    score = 0;
    const answers = this.scoreUserAnswers();

    score = this.getScore(score, this.findTestById(testId));

    //const textHtml = byID("quiz_layout").innerHTML;

    const userQuiz = this.currentUserTest(
      userManager.getUserEmail(),
      testId,
      answers,
      score
    );

    this.storeUSerTest(userQuiz);
  },

  getScore(real, quiz) {
    score = quiz.maxScore / quiz.questions.length;
    return (score *= real);
  },

  /**
   * Stores a User Test in DB.
   * User test contains: userId, quizId, an array with the answers with Key, Value pair (QID, String)
   */
  storeUSerTest(userQuiz) {
    const db = userTests.getUserTestsDB();

    db.push(userQuiz);

    localStorage.setItem([USER_QUIZ_STORAGE], JSON.stringify(userQuiz));
  },

  /**
   * Iterates through the user's answers and scores them
   * returning an array with the given answers.
   * @returns {*} userAnswers An array with the pair [Key, Value]
   */
  scoreUserAnswers() {
    const userAnswers = [];

    //quiz_layout is the element that holds questions and answers
    //there are div elements holding multiple choice and direct questions
    //it gets all divs in the element quiz_layout and iterates through to check the answers
    for (let item of byID("quiz_layout").getElementsByTagName("div")) {
      if (item.classList[0] == "multiple") { //item is an element containing a question and possible answers
        const hasAnswer = checkRadioBtns(item);
        //returns undefined if no RB was checked
        this.checkAnswer(hasAnswer);
        userAnswers.push(hasAnswer.id + "=" + hasAnswer.value);
        lockRdBtns(item);
      } else if (item.classList[0] == "direct") {
        const query = item.querySelector("input");
        this.checkAnswer(query);
        userAnswers.push(query.id + "=" + query.value);
        //locks the text-box
        query.setAttribute("readonly", true);
      }
    }
    return userAnswers;
  },

  /**
   * Compares the given answer with the correct one and highlights the answer.
   * Green or Red
   *
   * @param {*} answer element containing the answer. Must contain a value!
   */
  checkAnswer(answer) {
    if (answer.value == undefined) {
      //console.log('wrong');
      //markQuestion(byClass('multiple'), 'wrong') COMO MARCAMOS UM UNDEFINED??????
    } else if (
      answer.value.toUpperCase() == arrayofQs.find(i => i.id == answer.id).correctAnswer.toUpperCase()
    ) {
      //addClassById(answer, 'correct');
      //console.log('correct');
      markQuestion(answer, "correct");
      score += 1;
    } else {
      //addClassById(answer, 'wrong');
      //console.log('wrong');
      markQuestion(answer, "wrong");
    }
  }
}