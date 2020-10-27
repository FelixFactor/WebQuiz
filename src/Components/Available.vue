<template>
  <section  class="main-element quiz-box">
      <div  v-for="quiz of getTests()" v-bind:key="quiz.id">
        <div class="quiz-element">
          <p name="course">{{ quiz.course }}</p>
          <p name="topic">{{ quiz.topic }}</p>
          <p name="professor">{{ quiz.professor }}</p>
          <p name="dificulty">{{ quiz.dificulty }}</p>
          <p name="dificulty">{{ quiz.duration }}</p>
          <p name="dificulty">{{ quiz.startDate }}</p>
          <router-link :to="{name: 'active-test', params:{activeId: quiz.id}}">
            <a id="btn_enterTest" class="btn btn-success">Entrar</a>
          </router-link>
        </div>
      </div>
  </section>
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
      return this.quizes.filter(test => test.repeatTest == true);
    }
  }
};
</script>

<style >

</style>
