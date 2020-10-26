<template>
  <div>
    <div v-for="quiz of quizes" v-bind:key="quiz.id">
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
import {} from "@/assets/js/testManager.js";
export default {
  name: "Finished",
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
      this.quizes = [
        {
          id: 1,
          course: "Maths",
          topic: "Advanced Logic",
          professor: "João Félix",
          dificulty: "FHard"
        }
      ];
    }
  }
};
</script>

<style>

</style>