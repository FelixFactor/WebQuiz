<template>
  <div class="main-element quiz-box">
      <div class="quiz-element" v-for="quiz of getTests()" v-bind:key="quiz.id">
        <p name="course">{{ quiz.course }}</p>
        <p name="topic">{{ quiz.topic }}</p>
        <p name="professor">{{ quiz.professor }}</p>
        <p name="dificulty">{{ quiz.dificulty }}</p>
        <a id="btn_enterTest" class="btn btn-success" @click="loadQuiz">Entrar</a>
      </div>
  </div>
</template>

<script>
import testManager from "@/assets/js/testManager.js";

export default {
  name: "AvailableList",
  data() {
    return {
      quizes: null
    };
  },
  created() {
    this.loadAvailable();
  },
  methods: {
    loadAvailable() {
      this.quizes = testManager.getAllAvailableTests();
    },
    getTests(){
      return this.quizes;
    },
    loadQuiz(){
      //loads the ActiveTest sending the quiz.id that was clicked
  }
  }
};
</script>

<style >

</style>
