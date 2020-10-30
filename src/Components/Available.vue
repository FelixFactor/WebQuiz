<template>
  <section  class="main-element quiz-box">
      <div  v-for="quiz of getTests()" v-bind:key="quiz.id">
        <div class="quiz-element">
          <p name="course">Curso: {{ quiz.course }}</p>
          <p name="topic">Tópico: {{ quiz.topic }}</p>
          <p name="dificulty">Dificuldade: {{ quiz.dificulty }}</p>
          <p name="duration">Duração: {{ quiz.duration }} min</p>
          <p name="startDate">{{ quiz.startDate }}</p>
          <p name="maxScore">Nota Máxima: {{quiz.maxScore}}</p>
          <router-link :to="{name: 'active-test', params:{activeId: quiz.id}}" class="link">
            <a id="btn_enterTest" class="btn btn-success">Entrar</a>
          </router-link>
        </div>
      </div>
  </section>
</template>

<script>
import testManager from "@/assets/js/testManager.js";
import utils from "@/assets/js/utils.js";

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
      return this.quizes.filter(test => test.repeatTest == true || test.startDate === utils.getCurrentDate().split(' ')[0]);
    }
  }
};
</script>

<style >

</style>
