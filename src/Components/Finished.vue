<template>
  <div class="main-element quiz-box">
    <div v-for="quiz of getUserQuizs()" v-bind:key="quiz.index">
      <div class="quiz-element">
        <p name="course">{{ quiz.course }}</p>
        <p name="topic">{{ quiz.topic }}</p>
        <p name="professor">{{ quiz.completeDate }}</p>
        <p name="dificulty">{{ quiz.score }}</p>
        <router-link :to="{name: 'submitted-test', params: {quizId: quiz.index}}">
          <a id="btn_enterTest" class="btn btn-success">
            Rever
          </a>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import testManager from "@/assets/js/testManager.js";
import userTests from "@/assets/js/userTestsManager.js";
import userManager from "@/assets/js/userManager.js";

export default {
  name: "Finished",
  data() {
    return {
      //userTest retorna uma nova instancia de userTest
      userTest: function userTest(index, quizId, course, topic, completeDate, score) {
        return {
            index,
            quizId, 
            course, 
            topic, 
            completeDate, 
            score
          }
        },
      userTests:[],
      currentUser: undefined,
    };
  },
  created() {
    if (!userManager.isTokenValid()) {
      this.$router.replace({ name: "login" });
    }
    this.currentUser = userManager.getCurrentUser();
    this.loadFinished();
  },
  methods: {
    loadFinished() {
      const tests = userTests.getFinishedTests(this.currentUser.email);
      for(let test of tests){
        const getTest = this.getTestByID(test.quizId);
        this.userTests.push(this.userTest(test.index, test.quizId, getTest.course, getTest.topic, "28 Out 2020", test.score));
      }
    },
    getTestByID(quizId){
      return testManager.getAllAvailableTests().find(i => i.id === quizId);
    },
    getUserQuizs(){
      return this.userTests;
    }
  },
};
</script>

<style>
</style>