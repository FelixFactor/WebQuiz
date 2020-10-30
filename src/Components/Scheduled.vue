<template>
  <div  class="main-element quiz-box">
    <div v-for="quiz of getQuizes()" v-bind:key="quiz.id">
      <div class="quiz-element">
        <p name="course">{{ quiz.course }}</p>
        <p name="topic">{{ quiz.topic }}</p>
        <p name="dificulty">Dificuldade: {{ quiz.dificulty }}</p>
        <p name="starDate">Data Agendada: {{quiz.startDate}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import testManager from "@/assets/js/testManager.js";
import utils from "@/assets/js/utils.js";

export default {
  name: "Scheduled",
  data() {
    return {
      quizes: null
    }
  },
  created() {
    this.loadQuizes();
  },
  methods: {
    loadQuizes() {
      this.quizes = testManager.getAllAvailableTests();
    },
    getQuizes() {
      return this.quizes.filter(t => utils.returnDate(t.startDate) > utils.returnDate(utils.getCurrentDate().split(' ')[0]));
    }
  }
}
</script>
