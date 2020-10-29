<template>
  <div id="quiz_layout" class="quiz-layout">
    <header>
      <h2>Disciplina: {{ quiz.test.course }}</h2>
      <h4>Tópico: {{ quiz.test.topic }}</h4>
      <h2 id="quiz_timer">Tempo restante: <span :class="{'wrong': this.timeLeft <= '00:30'}">{{this.timeLeft}}</span></h2>
    </header>

    <div v-for="q in quiz.questions" :key="q.id">
      <div class="multiple" v-if="q.type === 'multiple'" :id="q.id">
        <h4>{{ q.question }}</h4>
        <div v-for="answer in q.answers" :key="answer.id">
          <div class="multChoice" :id="q.id">
            <input type="radio" :value="answer" :name="q.id" :id="q.id"/>
            <label> {{ answer }} </label>
          </div>
        </div>
      </div>

      <div class="direct" v-else-if="q.type === 'direct'">
        <h4>{{ q.question }}</h4>
        <input type="text" :id="q.id"/>
      </div>
    </div>
    <div>
      <button id="btn_submitTest" @click="submitTest(quiz.test.id)">Submit</button>
    </div>
  </div>
</template>

<script>
import testManager from "@/assets/js/testManager.js";

export default {
  name: "ActiveTest",
  props: {
    activeId: Number,
  },
  data() {
    return {
      quiz: {},
      count: "",
      timeLeft: ""
    };
  },
  created() {
    this.loadQuiz();
  },
  methods: {
    loadQuiz() {
      this.quiz = testManager.getCompleteQuiz(this.activeId);
      this.timeLeft = this.initTimer(this.quiz.test.duration);
      this.count = new Date(0);
      this.count.setMinutes(this.count.getMinutes() + this.quiz.test.duration);
      this.callTimer();
    },
    submitTest(id){
      const userQuizId = testManager.submitTest(id);

      this.$router.push({name: 'submitted-test', params:{quizId: userQuizId}});
    },
    initTimer(duration){
      const start = new Date(0);
      start.setMinutes(start.getMinutes() + duration);

      var minute = start.getMinutes().toString();
      var second = start.getSeconds().toString();
      
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }
      
      const value = minute + ':' + second;

      return value;
    },
    timer(){
      this.count.setSeconds(this.count.getSeconds() - 1);

      var minute = this.count.getMinutes().toString();
      var second = this.count.getSeconds().toString();
      
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }
      
      this.timeLeft = minute + ':' + second;

      if(this.timeLeft === '00:00'){
          this.submitTest(this.quiz.test.id);
      }

      return this.timeLeft;
    },
    callTimer(){
      setInterval(this.timer, 1000);
    }
  },
};
</script>