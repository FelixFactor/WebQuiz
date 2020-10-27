<template>
  <div  class="main-element quiz-box">
    <div v-for="quiz of quizes" v-bind:key="quiz.id">
      <div class="quiz-element">
        <p name="course">{{ quiz.course }}</p>
        <p name="topic">{{ quiz.topic }}</p>
        <p name="professor">{{ quiz.professor }}</p>
        <p name="dificulty">{{ quiz.dificulty }}</p>
        <a id="btn_enterTest" class="btn btn-success">
          Entrar
        </a>
      </div>
    </div>
  </div>
</template>

<script>
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
      this.quizes = [
        {
           id: 1,
          course: "Português",
          topic: "Camões",
          professor: "Paula Matos",
          dificulty: "Média"
        }
      ]
    }
  }
}
</script>
