<template>
  <div  class="main-element quiz-box">
    <div v-for="quiz of getQuizes()" v-bind:key="quiz.id">
      <div class="quiz-element">
        <p name="course">{{ quiz.course }}</p>
        <p name="topic">{{ quiz.topic }}</p>
        <p name="professor">{{ quiz.professor }}</p>
        <p name="dificulty">{{ quiz.dificulty }}</p>
        <a data-value="${_item.id}" id="btn_enterTest" class="btn btn-success">
          Entrar
        </a>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import testManager from "@/assets/js/testManager.js";
import userTests from "@/assets/js/userTestsManager.js";

export default {
  name: "Finished",
  props: {
    currentUser: Object
  },
  data() {
    return {
      quizes: null
    };
  },
  created() {
    this.loadFinished();
  },
  methods: {
    loadFinished() {
      this.quizes = userTests.getFinishedTests(this.currentUser.email);
    },
    getQuizes() {
      return this.quizes;
    }
  }
};
</script>

<style>

</style>