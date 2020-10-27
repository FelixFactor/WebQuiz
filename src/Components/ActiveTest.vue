<template>
  <div id="quiz_layout" class="quiz-layout">
    <header>
      <h2>{{ quiz.test.course }}</h2>
      <h4>{{ quiz.test.topic }}</h4>
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
    };
  },
  created() {
    this.loadQuiz();
  },
  methods: {
    loadQuiz() {
      this.quiz = testManager.getCompleteQuiz(this.activeId);
    },
    submitTest(id){
      testManager.submitTest(id);
    }
  },
};
</script>